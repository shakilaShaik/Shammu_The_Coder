import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { createRoom } from './src/createRoom.js';
import { joinRoom } from './src/joinRoom.js';
import { makeMove } from './src/makeMove.js';

const app = express();

// ✅ Allow frontend connection
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"]
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  },
});

// ✅ In-memory game state
let rooms = {}; // { roomId: { ...state } }

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // ========== 🧩 CREATE ROOM ==========
  socket.on("create_room", ({ name }) => {
    console.log("🟢 Creating room for:", name);

    // Check if player already in another room
    for (const [id, room] of Object.entries(rooms)) {
      const players = room.players;
      if (players.X?.id === socket.id || players.O?.id === socket.id) {
        socket.emit("error", "You are already in another game.");
        return;
      }
    }

    const { roomId, state } = createRoom(socket.id, name);
    rooms[roomId] = state;

    socket.join(roomId);
    console.log(`🎮 Room created: ${roomId} by ${name}`);

    socket.emit("room_state", { roomId, state });
  });

  // ========== 🧩 JOIN ROOM ==========
  socket.on("join_room", ({ roomId, name }) => {
    console.log(`🟡 ${name} trying to join room ${roomId}`);

    const room = rooms[roomId];
    if (!room) return socket.emit("error", "Room not found.");

    const updatedState = joinRoom({ socketId: socket.id, name, state: room });
    rooms[roomId] = updatedState;

    socket.join(roomId);
    io.to(roomId).emit("room_state", { roomId, state: updatedState });

    console.log(`✅ ${name} joined room ${roomId}`);
  });

  // ========== 🧩 MAKE MOVE ==========
  socket.on("make_move", ({ roomId, pos }) => {
    const room = rooms[roomId];
    if (!room) return socket.emit("error", "Room not found.");

    const updatedState = makeMove(pos, socket.id, room);
    rooms[roomId] = updatedState;

    // Broadcast the updated game state to both players
    io.to(roomId).emit("room_state", { roomId, state: updatedState });
  });

  // ========== 🧩 GET ROOM STATE ==========
  socket.on("room_state", ({ roomId }) => {
    const room = rooms[roomId];
    if (!room) return socket.emit("error", "Room not found.");
    socket.emit("room_state", { roomId, state: room });
  });

  // ========== 🧩 HANDLE DISCONNECT ==========
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);

    // Clean up player from any room
    for (const [roomId, state] of Object.entries(rooms)) {
      const { players } = state;
      let changed = false;

      // Remove disconnected player
      if (players.X?.id === socket.id) {
        players.X = null;
        changed = true;
      } else if (players.O?.id === socket.id) {
        players.O = null;
        changed = true;
      }

      // If both players gone → delete room
      if (!players.X && !players.O) {
        delete rooms[roomId];
        console.log(`🗑️ Deleted empty room ${roomId}`);
      } else if (changed) {
        // Update room status if someone left mid-game
        state.status = "waiting";
        state.turn = "X";
        state.winner = null;
        state.board = Array(9).fill("");
        io.to(roomId).emit("room_state", { roomId, state });
      }
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});




