export const joinRoom = ({ socketId, name, state }) => {
  if (!state) return null;

  if (state.players.X.id === socketId || state.players.O?.id === socketId) {
    console.warn("Player already in the room");
    return state;
  }

  if (!state.players.O) {
    state.players.O = { id: socketId, name };
    state.status = "playing";
  } else {
    console.warn("Room is full!");
  }

  return state;
};
