import { io } from "socket.io-client";

// Connect two simulated players
const playerX = io("http://localhost:3001");
const playerO = io("http://localhost:3001");

let roomId = null;

// ---------- PLAYER X ----------
playerX.on("connect", () => {
    console.log("[X] Connected with id:", playerX.id);

    // Create room as X
    playerX.emit("create_room", { name: "PlayerX" });
});

// Listen for room creation confirmation
playerX.on("room_created", ({ roomId: id, state }) => {
    console.log("[X] Room Created:", id);
    console.log("[X] Initial State:", state);
    roomId = id;

    // Wait 1 sec, then Player O joins
    setTimeout(() => {
        playerO.emit("join_room", roomId, "PlayerO");
    }, 1000);
});

// Listen for state updates for Player X
playerX.on("room_state", ({ stateChange }) => {
    console.log("[X] Room State Update:", stateChange);

    // Simulate X making a move if it's X's turn
    if (stateChange.turn === "X" && stateChange.status === "playing") {
        const emptyIndex = stateChange.board.findIndex(cell => cell === "");
        if (emptyIndex !== -1) {
            console.log("[X] Making move at index", emptyIndex);
            playerX.emit("make_move", { roomId, index: emptyIndex });
        }
    }
});

// ---------- PLAYER O ----------
playerO.on("connect", () => {
    console.log("[O] Connected with id:", playerO.id);
});

// Listen for state updates for Player O
playerO.on("room_state", ({ stateChange }) => {
    console.log("[O] Room State Update:", stateChange);

    // Simulate O making a move if it's O's turn
    if (stateChange.turn === "O" && stateChange.status === "playing") {
        const emptyIndex = stateChange.board.findIndex(cell => cell === "");
        if (emptyIndex !== -1) {
            console.log("[O] Making move at index", emptyIndex);
            playerO.emit("make_move", { roomId, index: emptyIndex });
        }
    }

    // Stop simulation if game finished
    if (stateChange.status === "finished") {
        console.log("[GAME OVER] Winner:", stateChange.winner);
        playerX.disconnect();
        playerO.disconnect();
    }
});

// Listen for errors
playerX.on("error", msg => console.error("[X] Error:", msg));
playerO.on("error", msg => console.error("[O] Error:", msg));
