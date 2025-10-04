function joinRoom({ socketId,name, state }) {
    console.log("the state passes to join room function", state);
    if(socketId==state.players.X.id){
      alert("you are already in the room")
    }

  if(!state.players.O){
    state.players.O={id:socketId,name}
    state.status="playing"
  }
return state

  
}
export default joinRoom