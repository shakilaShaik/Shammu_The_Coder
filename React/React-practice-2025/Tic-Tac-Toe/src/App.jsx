import { useState } from "react";
import Grid from "./components/Grid";
import "./App.css";

function App() {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [ winner, setWinner]=useState(null)

  const winningPattern=[
    [0,1,2],[3,4,5], [6,7,8],[0,4,6],[1,4,7],[2,5,8],[2,4,6],[0,4,8]
  ]
  const winnerFunction=()=>{
    for(winPattern in winningPattern){
      if (board[winningPattern[0]==winningPattern[1]==winningPattern[2]]){
        setWinner(board[index])
        setBoard(Array(9).fill(null))
        setPlayer(winner)
      }
    }
  }
  const handleClick = (index) => {
    // If square already taken, do nothing
    if (board[index]) return;

    // Copy board and update clicked square
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    // Switch player
    setPlayer(player === "X" ? "O" : "X");
    winnerFunction()

  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-amber-300">
      <div className="grid grid-cols-3 gap-2 w-64 h-64">
        {board.map((val, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-white text-3xl font-bold cursor-pointer"
            onClick={() => handleClick(index)}
          >
            <Grid value={val} />
          </div>
        ))}
      </div>


      {
        winner &&(
          <div>
          <h1>Game Over, Winner is {winner} </h1>
          </div>
        )}
    </div>
  );
}

export default App;
