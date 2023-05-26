let boardLength = 8;
let boardWidth = 8;
const board = new ChessBoard(boardLength, boardWidth);

function setup(){
    board.defaultBoardSetUp();
}

setup();

console.log(board.getTile(3,1).getPiece());
//board.getTile(3,1).rmPiece();
board.movePiece(4,1,3,3);
let possibleMoves = board.getTile(3,1).getPiece().getMoveInfo();
for(let i = 0; i < possibleMoves.length; i++){
    console.log("("+possibleMoves[i][0]+","+possibleMoves[i][1]+")");
}