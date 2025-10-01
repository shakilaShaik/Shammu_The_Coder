function makeMove({ socketId, index, state }) {
    const { players, board, turn, status } = state;

    if (status !== "playing") return state; // game not in progress

    const playerRole =
        players.X?.id === socketId ? "X" :
            players.O?.id === socketId ? "O" : null;

    if (!playerRole) return state; // invalid player
    if (turn !== playerRole) return state; // not this player's turn
    if (board[index] !== "") return state; // cell already taken

    // Make the move
    board[index] = playerRole;

    // Check for winner
    const winner = checkWinner(board);
    if (winner === "X" || winner === "O") {
        state.winner = winner;
        state.status = "finished";
    } else if (winner === "draw") {
        state.winner = "draw";
        state.status = "finished";
    } else {
        // switch turn
        state.turn = turn === "X" ? "O" : "X";
    }

    return state;
}

// Helper to check winner
function checkWinner(board) {
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6]          // diagonals
    ];

    for (let [a, b, c] of wins) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // X or O
        }
    }

    return board.includes("") ? null : "draw";
}

export default makeMove;
