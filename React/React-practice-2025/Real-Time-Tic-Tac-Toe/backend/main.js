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

app.get("/", (req, res) => {
  res.send("Welcome to the Socket.IO real time tic-tac-toe Server ");
});

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
    const { roomId, state } = createRoom(socket.id, name)
    rooms[roomId] = state
    socket.join(roomId)
    console.log("rooms present when created", rooms);




    io.to(socket.id).emit("room_created", { roomId, state })

  })


  socket.on("join_room", (roomId, name) => {
    console.log("triggering joining room", roomId, name);
    console.log("the rooms present here", rooms);
    console.log("Trying to join room:", `"${roomId}"`);
    console.log("Available rooms:", Object.keys(rooms));

    if (!rooms[roomId]) return io.to(socket.id).emit("error", "Room not found")


    const stateChange = joinRoom({ socketId: socket.id, name, state: rooms[roomId] })
    rooms[roomId] = stateChange
    socket.join(roomId)
    console.log("the state change with user", stateChange);
    io.to(roomId).emit("room_state", { stateChange })
  })

})

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});






