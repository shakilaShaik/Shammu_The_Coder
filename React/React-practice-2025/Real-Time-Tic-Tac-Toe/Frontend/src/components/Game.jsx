import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Game = ({ socket, playerName }) => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  const [playerSymbol, setPlayerSymbol] = useState(null);

  // Listen to room state updates
  useEffect(() => {
    socket.on("room_state", ({ stateChange }) => {
      setState(stateChange);

      // Determine your symbol (X or O)
      if (stateChange.players.X.id === socket.id) setPlayerSymbol("X");
      else if (stateChange.players.O && stateChange.players.O.id === socket.id)
        setPlayerSymbol("O");
    });

    socket.on("error", (msg) => {
      alert(msg);
      navigate("/");
    });

    return () => {
      socket.off("room_state");
      socket.off("error");
    };
  }, [socket, navigate]);

  if (!state) return <div>Loading game...</div>;

  const handleCellClick = (index) => {
    if (
      state.status !== "playing" ||
      state.board[index] !== "" ||
      state.turn !== playerSymbol
    )
      return;

    socket.emit("make_move", { roomId, index });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
      <h2 className="text-xl font-bold mb-2">Room ID: {roomId}</h2>
      <h3 className="text-lg mb-4">
        You are: <span className="font-bold">{playerSymbol}</span>
      </h3>
      <h3 className="text-lg mb-4">
        {state.status === "finished"
          ? `Winner: ${state.winner}`
          : state.turn === playerSymbol
          ? "Your Turn"
          : "Opponent's Turn"}
      </h3>

      <div className="grid grid-cols-3 gap-2 w-64">
        {state.board.map((cell, idx) => (
          <div
            key={idx}
            onClick={() => handleCellClick(idx)}
            className="w-16 h-16 flex items-center justify-center bg-white border text-2xl font-bold cursor-pointer hover:bg-gray-100"
          >
            {cell}
          </div>
        ))}
      </div>

      {state.status === "finished" && (
        <button
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      )}
    </div>
  );
};

export default Game;
