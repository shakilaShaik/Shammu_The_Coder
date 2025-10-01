


const checkWinner=(board)=>{
    const winPatterns=[[0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]]

for(const [a,b,c] of winPatterns){
    if(board[a]==board[b] && board[a]==board[c]){
        return board[a]
    }

    if (board.every(cell => cell !== "")) return "draw";
  return null;
}


}
const makeMove=(pos,socketId,state)=>{
      if (state.winner || state.status !== "playing") return state;
      const playerSymbol=state.players.X.id===socketId?X:state.players.O?.id === socketId ? "O" : null;

      if(!playerSymbol) return state
       if (state.turn !== playerSymbol) return state;
     if (state.board[pos] !== "") return state;
      if(playerSymbol){
        state.board[pos]=playerSymbol
      }
    state.turn = playerSymbol === "X" ? "O" : "X";
    const {winner}= checkWinner(state.board)
    if(winner){
        state.winner=winner
        state.status='ended'
       

    }
return state
}