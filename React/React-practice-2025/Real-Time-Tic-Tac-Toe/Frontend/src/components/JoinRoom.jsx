import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoom = ({ socket }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("room_state", ({ stateChange }) => {
      console.log("Received room state after joining:", stateChange);
      // Navigate to game page when joined successfully
      navigate(`/game/${roomId}`, { state: { playerName: name } });
    });

    socket.on("error", (msg) => {
      console.error(msg);
      alert(msg); // or set some error state
    });

    return () => {
      socket.off("room_state");
      socket.off("error");
    };
  }, [socket, roomId, name, navigate]);

  const handleJoinRoom = () => {
    if (!roomId || !name) return;
    socket.emit("join_room", roomId, name);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold text-black mb-4">Join Room</h2>

        <input
          type="text"
          placeholder="Enter room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value.trim())}
          className="w-full px-3 py-2 rounded-md bg-gray-100 text-black placeholder-gray-400 mb-3"
        />

        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-100 text-black placeholder-gray-400 mb-3"
        />

        <div className="gap-2.5 my-3">
          <button
            onClick={handleJoinRoom}
            className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer my-2"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
