import React, { useEffect, useState } from 'react'





const Game = ({ socket,roomId}) => {
  
  const [roomState, setRoomState] = useState(null)
  

socket.on("room_state", (state) => setRoomState({ ...state }));
  const makeMove = (pos) => socket.emit("make_move", { roomId, pos });

  


  return (
    <div>
      <h2>Room: {roomId}</h2>
      {roomState && (
        <>
          <Board board={roomState.board} makeMove={makeMove} />
          <p>Turn: {roomState.turn}</p>
          {roomState.winner && <h3>Winner: {roomState.winner}</h3>}
        </>
      )}
    </div>
  );
}

export default Game;