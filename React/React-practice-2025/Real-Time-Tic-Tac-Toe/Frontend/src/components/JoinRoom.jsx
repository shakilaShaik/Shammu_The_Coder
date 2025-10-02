import React, { useState } from "react";
import { useEffect } from "react";
import Game from "./Game";
import { useNavigate } from "react-router-dom";

const JoinRoom = ({ socket }) => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [roomInfo, setRoomInfo] = useState(null);
  useEffect(() => {
    socket.on("room_state", ({ state }) => {
      console.log("listening for state change event after joining user", state);
      setRoomInfo(state);
    });
    socket.on("error", (msg) => {
      console.error(msg);
      alert(msg); // or set some error state
    });
    return () => {
      socket.off("room_state");
      socket.off("error");
    };
  }, [socket]);

  const handleJoinRoom = () => {
    if (!roomId) return;
    socket.emit("join_room", roomId, name);
  };
  if (roomInfo) {
    navigate("/game");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-100 text-center">
        <h2 className="text-xl font-bold text-black mb-4">Join Room</h2>

        <input
          type="text"
          placeholder="Enter room ID"
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value.trim());
          }}
          className="w-full px-3 py-2 rounded-md bg-gray-100 text-black placeholder-gray-400  mb-3"
        />

        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-full px-3 py-2 rounded-md bg-gray-100 text-black placeholder-gray-400  mb-3"
        />

        <div className=" gap-2.5 my-3">
          <button
            onClick={handleJoinRoom}
            className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer my-2">
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
