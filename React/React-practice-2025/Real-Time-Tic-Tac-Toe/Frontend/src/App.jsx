import { useEffect } from "react";
import { io } from "socket.io-client";
import CreateRoom from "./components/CreateRoom";
import  {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import JoinRoom from "./components/JoinRoom";


const socket = io("http://localhost:3001");

function App() {
  const navigate=useNavigate()
  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
     
      <Routes>

<Route path="/" element={<h1> welcome to the game </h1>}/>
        <Route path="/create-room" source element={<CreateRoom socket={socket} />}/>
         <Route path="/join-room" source element={<JoinRoom socket={socket} />}/>
       
      </Routes>
      
     
      <button onClick={() => navigate("/create-room")} className=" w-[200px] height-[50px] bg-yellow-500">
      Create Room and Play
    </button>
     
    </div>
  );
}

export default App;
