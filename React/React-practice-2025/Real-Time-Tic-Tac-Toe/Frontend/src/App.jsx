import { useEffect } from "react";
import { io } from "socket.io-client";
import CreateRoom from "./components/CreateRoom";
import  {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import JoinRoom from "./components/JoinRoom";
import Game from "./components/Game";


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
        <Route path="/create-room"  element={<CreateRoom socket={socket} />}/>
         <Route path="/join-room"  element={<JoinRoom socket={socket} />}/>
         <Route path="/game"  element={<Game socket={socket}/>}/>
       
      </Routes>
      
     
     
     
    </div>
  );
}

export default App;
