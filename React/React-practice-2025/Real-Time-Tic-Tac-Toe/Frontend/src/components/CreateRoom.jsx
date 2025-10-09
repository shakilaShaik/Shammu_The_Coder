import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../App";

function CreateRoom() {
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const handleCreateRoom = () => {
    if (!playerName.trim()) return alert("Enter your name first!");
    socket.emit("create_room", { name: playerName });
  };

  const handleJoinRoom = () => {
    navigate("/join-room");
  };

  useEffect(() => {
    socket.on("room_state", ({ roomId, state }) => {
      console.log("✅ Room created:", roomId, state);
      navigate("/game", { state: { roomId, playerName, playerMark: "X" } });
    });

    socket.on("error", (msg) => alert(msg));

    return () => {
      socket.off("room_state");
      socket.off("error");
    };
  }, [socket, navigate, playerName]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-xl font-bold text-black mb-4">Create Game Room</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-100 text-black mb-3"
        />

        <button
          onClick={handleCreateRoom}
          className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md mb-2"
        >
          Create Room
        </button>

        <button
          onClick={handleJoinRoom}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

export default CreateRoom;
