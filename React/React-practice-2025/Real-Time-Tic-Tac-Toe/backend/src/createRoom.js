

const createRoom=((socketId, name, rooms)=>{

    const roomId = Math.random().toString(36).substr(2, 6);
    const state={
        player:{X:{id:roomId,name}, O:null},
       
        board: Array(9).fill(""),
        turn: "X",
        status: "waiting",
        winner: null
    }
    console.log( "room created", {roomId,state});
    return {roomId,state}

})
export default createRoom