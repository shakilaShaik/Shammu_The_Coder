import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import createRoom from "./src/createRoom.js"
const app = express();
app.use(cors({
  origin :"http://localhost:5173"
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


  socket.on("create_room",({name})=>{
    console.log("listened create  room" ,name);
    const {roomId, state}= createRoom(socket.id,name,rooms)
    rooms[roomId]=state
    socket.join(roomId)


io.to(socket.id).emit("room_created", {roomId,state})

  })
})

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});






