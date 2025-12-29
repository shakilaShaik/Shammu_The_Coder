import React from "react";

function Board({ board, makeMove, disabled }) {
  return (
    <div className="grid grid-cols-3 gap-1.5 mx-auto my-5 bg-amber-300">
      {board.map((cell, idx) => (
        <button
          key={idx}
          onClick={() => !disabled && makeMove(idx)}
          className={`w-24 h-24 text-3xl font-bold border border-gray-400 flex items-center justify-center 
            ${cell === "" && !disabled ? "cursor-pointer hover:bg-yellow-200" : "cursor-not-allowed bg-white"}`}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}

export default Board;
