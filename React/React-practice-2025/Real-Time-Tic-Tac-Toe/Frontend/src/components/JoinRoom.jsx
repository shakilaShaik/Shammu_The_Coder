import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../App";

function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!roomId || !name) return alert("Enter both name and room ID!");
    socket.emit("join_room", { roomId, name });
  };

  useEffect(() => {
    socket.on("room_state", ({ roomId, state }) => {
      console.log("✅ Joined Room:", roomId, state);
      navigate("/game", { state: { roomId, playerName: name, playerMark: "O" } });
    });

    socket.on("error", (msg) => alert(msg));

    return () => {
      socket.off("room_state");
      socket.off("error");
    };
  }, [socket, navigate, name]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-xl font-bold text-black mb-4">Join Game Room</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-100 text-black mb-3"
        />

        <input
          type="text"
          placeholder="Enter room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-100 text-black mb-3"
        />

        <button
          onClick={handleJoin}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

export default JoinRoom;
