import { Socket } from "socket.io";

const createRoom=((SocketId, name)=>{

    const roomId = Math.random().toString(36).substr(2, 6);
    const state={
        players:{X:{id:SocketId,name}, O:null},
       
        board: Array(9).fill(""),
        turn: "X",
        status: "waiting",
        winner: null
    }
    console.log( "room created", {roomId,state});
    return {roomId,state}

})
export default createRoom