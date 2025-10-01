import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import createRoom from "./src/createRoom.js"
import joinRoom from './src/joinRoom.js';
const app = express();
app.use(cors({
  origin: "http://localhost:5173"
}))
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  },
});
let rooms = {}; // in-memory storage
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("create_room", ({ name }) => {
    console.log("listened create  room", name);
    if (!rooms[roomId]) return io.to(socket.id).emit("error", "Room not found")


    const { roomId, state } = createRoom(socket.id, name)
    if (!roomId || !state) {
      return io.to(socket.id).emit("error", "Room creation failed");
    }

    rooms[roomId] = state
    socket.join(roomId)
    console.log("rooms present when created", rooms);

    io.to(socket.id).emit("room_created", { roomId, state })

  })


  socket.on("join_room", (roomId, name) => {
  
    if (!rooms[roomId]) return io.to(socket.id).emit("error", "Room not found")


    const state = joinRoom({ socketId: socket.id, name, state: rooms[roomId] })
    rooms[roomId] = stateChange
    socket.join(roomId)
    console.log("the state change with user", stateChange);
    io.to(roomId).emit("room_state", { state: rooms[roomId] })
  })

  

  socket.on("make_move",({roomId,pos})=>{
     if (!rooms[roomId]) return io.to(socket.id).emit("error", "Room not found");
    const {state}=makeMove(pos,socket.id,rooms[roomId])

    rooms[roomId]=state
  io.to(roomId).emit("room_state",{state: rooms[roomId]})

  })



  socket.on("disconnect", () => {
  for (const [roomId, state] of Object.entries(rooms)) {
    if (state.players[socket.id]) {
      delete state.players[socket.id];
      console.log(`Removed ${socket.id} from room ${roomId}`);
    }

    // delete room if empty
    if (Object.keys(state.players).length === 0) {
      delete rooms[roomId];
      console.log(`Deleted empty room ${roomId}`);
    }
  }
});


})

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});






