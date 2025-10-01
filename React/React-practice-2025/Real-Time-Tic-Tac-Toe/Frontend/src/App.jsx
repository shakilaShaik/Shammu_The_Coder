import { useEffect } from "react";
import { io } from "socket.io-client";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import Game from "./components/Game"; // import Game component
import { Routes, Route, useNavigate } from "react-router-dom";

const socket = io("http://localhost:3001");

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>Welcome to the game</h1>} />
        <Route path="/create-room" element={<CreateRoom socket={socket} />} />
        <Route path="/join-room" element={<JoinRoom socket={socket} />} />
        <Route path="/game/:roomId" element={<Game socket={socket} />} />
      </Routes>

      <button
        onClick={() => navigate("/create-room")}
        className="w-[200px] h-[50px] bg-yellow-500"
      >
        Create Room and Play
      </button>
    </div>
  );
}

export default App;
