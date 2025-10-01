import React from "react";

function Board({ board, makeMove }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,100px)", gap: "5px", margin: "20px auto" }}>
      {board.map((cell, idx) => (
        <button
          key={idx}
          onClick={() => makeMove(idx)}
          style={{
            width: "100px",
            height: "100px",
            fontSize: "2rem",
            cursor: cell === "" ? "pointer" : "not-allowed"
          }}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}

export default Board;
