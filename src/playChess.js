let boardLength = 8;
let boardWidth = 8;
let board = new ChessBoard(boardLength, boardWidth);

//defaultPieceSetUp();
board.defaultBoardSetUp();
console.log(board.getTile(2,0).getPiece());
board.movePiece(2,0,4,4);
//console.log("Piece (2,0) moved to (4,4)");
//console.log("Is tile occupied at (4,4) after move: "+tiles[4][4].isTileOccupied());
//console.log(tiles[2][0].getPiece());
possibleMoves = board.getTile(2,0).getPiece().getMoveInfo();
for(let i = 0; i < possibleMoves.length; i++){
    console.log("("+possibleMoves[i][0]+","+possibleMoves[i][1]+")");
}
