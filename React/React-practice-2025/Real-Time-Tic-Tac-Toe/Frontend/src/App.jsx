import { createContext, useEffect } from "react";
import { io } from "socket.io-client";
import CreateRoom from "./components/CreateRoom";
import  {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import JoinRoom from "./components/JoinRoom";
import Game from "./components/Game";

import { useContext } from "react";
 const socket = io("http://localhost:3001");
export const SocketContext=createContext()
 export  const  SocketProvider=(({children})=>{
    return <SocketContext.Provider value={ socket} >
      {children}
    </SocketContext.Provider> 
  
  })

function App() {

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  

  return (
    <div>
     
      <Routes>


        <Route path="/"  element={<CreateRoom  />}/>
         <Route path="/join-room"  element={<JoinRoom  />}/>
         <Route path="/game"  element={<Game />}/>
       
      </Routes>
      
     
     
     
    </div>
  );
}

export default App;
