import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()

const server= http.createServer(app)
const io = new Server(server)

app.get("/", (req,res) => {
  res.send(
    "Hello I am from socket connection"
  )
})

io.on("connection", (socket) => {
  console.log("connection established from  a user", socket.id)


  socket.on("msg", (msg) => {
    console.log("msg is", msg)
    
    socket.emit("emmitting", msg);
  })
  
  socket.on("disconnect", () => {
    console.log("user disconnected",socket.id)
  })

  

})

server.listen(3000, () => {
  console.log("server listening on 3000");
});




