import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../App";
import Board from "./Board";

const Game = () => {
  const socket = useContext(SocketContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { roomId, playerName, playerMark } = location.state || {};
  const [roomState, setRoomState] = useState(null);

  useEffect(() => {
    if (!roomId) {
      navigate("/");
      return;
    }

    socket.emit("room_state", { roomId });

    socket.on("room_state", ({ state }) => {
      console.log("♻️ Updated room state:", state);
      setRoomState(state);
    });

    socket.on("error", (msg) => alert(msg));

    return () => {
      socket.off("room_state");
      socket.off("error");
    };
  }, [socket, roomId, navigate]);

  const handleMove = (pos) => {
    if (!roomId || !roomState) return;
    if (roomState.status !== "playing") return alert("Game not started yet!");
    if (roomState.turn !== playerMark) return alert("Not your turn!");
    socket.emit("make_move", { roomId, pos });
  };

  if (!roomState) return <p className="text-center mt-10">Loading game...</p>;

  const isMyTurn = roomState.turn === playerMark;
  const { board, turn, winner, status } = roomState;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100">
      <h2 className="text-2xl font-bold mb-2">Room ID: {roomId}</h2>
      <p className="mb-2">You are: {playerName} ({playerMark})</p>

      <Board board={board} makeMove={handleMove} disabled={!isMyTurn || status !== "playing"} />

      <p className="mt-2 text-lg">
        {winner === "draw"
          ? "🤝 It's a Draw!"
          : winner
          ? `🏆 Winner: ${winner}`
          : status === "waiting"
          ? "Waiting for another player..."
          : `Turn: ${turn}`}
      </p>

      {winner && (
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Back to Home
        </button>
      )}
    </div>
  );
};

export default Game;
