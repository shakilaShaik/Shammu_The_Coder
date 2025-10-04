import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function CreateRoom({ socket }) {
  const [roomName, setRoomName] = useState("");
  const [roomInfo, setRoomInfo] = useState(null);
  console.log("the room info type is", roomInfo);
  const navigate=useNavigate()

  const handleCreateRoom = () => {
    if (!roomName) return;
    console.log("trying to create room", roomName);

    socket.emit("create_room", { name: roomName });
  };
const handleJoinRoom=()=>{
  navigate("/join-room")
  }
  useEffect(() => {
    // Listen only once when mounted
    socket.on("room_state", ({ roomId, state }) => {
      console.log("the room id , state from backend", roomId,state);
      setRoomInfo({ roomId, state });
    });
   
    return () => {
      socket.off("room_created"); // cleanup listener
    };
  }, [socket]);
  // navigate("/game", state=)

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow">
      <div className="bg-white p-6 rounded-lg shadow-lg w-100 text-center">
        <h2 className="text-xl font-bold text-black mb-4">Create Room</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-100 text-black placeholder-gray-400  mb-3"
        />

       <div className=" gap-2.5 my-3">

         <button
          onClick={handleCreateRoom}
          className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition duration-200 cursor-pointe my-2"
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
          <div className="mt-4 text-left text-gray-300">
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Room Created!
            </h3>
            <p>
              <span className="font-bold">Room ID:</span> {roomInfo.roomId}
            </p>
            <p>
              <span className="font-bold">State:</span>{" "}
              {JSON.stringify(roomInfo.state)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateRoom;
