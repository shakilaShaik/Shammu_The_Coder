import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import createRoom from "./src/createRoom.js"
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
    const { roomId, state } = createRoom(socket.id, name, rooms)
    rooms[roomId] = state
    socket.join(roomId)


    io.to(socket.id).emit("room_created", { roomId, state })

  })


  socket.on("join_room", ({ roomId , name}) => {
    if (!rooms[roomId]) return io.to(socket.id).emit("error","Room not found")
    
    const stateChange = joinRoom(socket.id, name, rooms[roomId])
    socket.join(roomId)
    io.to(socket.id).emit("room_state",{stateChange})
  })

})

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});






