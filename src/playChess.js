let boardLength = 8;
let boardWidth = 8;
const board = new ChessBoard(boardLength, boardWidth);

function setup(){
    board.defaultBoardSetUp();
}

setup();

board.getTile(1,1).rmPiece();
board.getTile(3,1).rmPiece();
board.movePiece(7,7,5,3);
let possibleMoves = board.getTile(2,0).getPiece().getMoveInfo();
for(let i = 0; i < possibleMoves.length; i++){
    console.log("("+possibleMoves[i][0]+","+possibleMoves[i][1]+")");
}
