export const createRoom = (socketId, name) => {
    const roomId = Math.random().toString(36).substr(2, 6); // unique 6-char ID
  
    const state = {
      players: { X: { id: socketId, name }, O: null },
      board: Array(9).fill(""),
      turn: "X",
      status: "waiting", // waiting for 2nd player
      winner: null
    };
  
    return { roomId, state };
  };
  