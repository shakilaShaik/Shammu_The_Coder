import { useState } from "react";
import Grid from "./components/Grid";
import "./App.css";

function App() {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winnerFunction = (boardToCheck) => {
    for (let [a, b, c] of winningPattern) {
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        setWinner(boardToCheck[a]);
        return true;
      }
    }

    // Check for draw
    if (!boardToCheck.includes(null)) {
      setWinner("Draw");
      return true;
    }

    return false;
  };

  const handleClick = (index) => {
    // If square already taken or game over, ignore
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    // Check winner with updated board
    if (!winnerFunction(newBoard)) {
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setPlayer("X");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-amber-300">
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

      {winner && (
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold">
            {winner === "Draw"
              ? "Game Over: It's a Draw!"
              : `Game Over, Winner is ${winner}`}
          </h1>
          <button
            onClick={resetGame}
            className="mt-4 px-4 py-2 bg-black w-full h-full text-white rounded-lg"
          >
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
