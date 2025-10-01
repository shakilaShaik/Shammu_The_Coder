import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateRoom({ socket }) {
  const [roomName, setRoomName] = useState("");
  const [roomInfo, setRoomInfo] = useState(null);
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (!roomName) return;
    console.log("Trying to create room:", roomName);
    socket.emit("create_room", { name: roomName });
  };

  const handleJoinRoom = () => {
    navigate("/join-room");
  };

  useEffect(() => {
    socket.on("room_created", ({ roomId, state }) => {
      setRoomInfo({ roomId, state });

      // Listen for updates when second player joins
      socket.on("room_state", ({ stateChange }) => {
        console.log("Game starting, redirecting to board", stateChange);
        navigate(`/game/${roomId}`, { state: { playerName: roomName } });
      });
    });

    return () => {
      socket.off("room_created");
      socket.off("room_state");
    };
  }, [socket, navigate, roomName]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold text-black mb-4">Create Room</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-100 text-black placeholder-gray-400 mb-3"
        />

        <div className="gap-2.5 my-3">
          <button
            onClick={handleCreateRoom}
            className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer my-2"
          >
            Create Room
          </button>
          <button
            onClick={handleJoinRoom}
            className="w-full bg-red-400 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointer my-2"
          >
            Join Room
          </button>
        </div>

        {roomInfo && (
          <div className="mt-4 text-left text-gray-700">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Room Created!
            </h3>
            <p>
              <span className="font-bold">Room ID:</span> {roomInfo.roomId}
            </p>
            <p>
              <span className="font-bold">Status:</span> {roomInfo.state.status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateRoom;
