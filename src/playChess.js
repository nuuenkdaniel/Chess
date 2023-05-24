let tiles = [];
let boardLength = 8;
let boardWidth = 8;

function tileSetUp(){
    let color = "FFFFFF";
    let otherColor = "A52A2A";
    for(let i = 0; i < boardLength; i++){
        tiles[i] = [];
        for(let j = 0; j < boardWidth; j++){
            tiles[i][j] = new Tile(i,j,color);
            let tempColor = color;
            color = otherColor;
            otherColor = tempColor;
        }
    }
}

function defaultPieceSetUp(){
    //black pieces set up
    let color = "black";
    for(let i = 0; i < boardLength; i++){
        tiles[i][1].plPiece(new Pawn(color, i, 1, boardWidth, boardLength, true));
    }
    tiles[0][0].plPiece(new Rooke(color, 0, 0, boardWidth, boardLength));
    tiles[1][0].plPiece(new Knight(color, 1, 0, boardWidth, boardLength));
    tiles[2][0].plPiece(new Bishop(color, 2, 0, boardWidth, boardLength));
    tiles[3][0].plPiece(new Queen(color, 3, 0, boardWidth, boardLength));
    tiles[4][0].plPiece(new King(color, 4, 0, boardWidth, boardLength));
    tiles[5][0].plPiece(new Bishop(color, 5, 0, boardWidth, boardLength));
    tiles[6][0].plPiece(new Knight(color, 6, 0, boardWidth, boardLength));
    tiles[7][0].plPiece(new Rooke(color, 7, 0, boardWidth, boardLength));

    //white pieces set up
    color = "white";
    for(let i = 0; i < boardLength; i++){
        tiles[i][6].plPiece(new Pawn(color, i, 6, boardWidth, boardLength, true));
    }
    tiles[0][7].plPiece(new Rooke(color, 0, 7, boardWidth, boardLength));
    tiles[1][7].plPiece(new Knight(color, 1, 7, boardWidth, boardLength));
    tiles[2][7].plPiece(new Bishop(color, 2, 7, boardWidth, boardLength));
    tiles[3][7].plPiece(new Queen(color, 3, 7, boardWidth, boardLength));
    tiles[4][7].plPiece(new King(color, 4, 7, boardWidth, boardLength));
    tiles[5][7].plPiece(new Bishop(color, 5, 7, boardWidth, boardLength));
    tiles[6][7].plPiece(new Knight(color, 6, 7, boardWidth, boardLength));
    tiles[7][7].plPiece(new Rooke(color, 7, 7, boardWidth, boardLength));
}

function possibleMoves(etile){

}

function movePiece(x1,y1,x2,y2){
    if(tiles[x2][y2].isTileOccupied()){
        tiles[x2][y2].rmPiece();
    }
    tiles[x2][y2].plPiece(tiles[x1][y1].getPiece());
    tiles[x2][y2].getPiece().giveX(x2);
    tiles[x2][y2].getPiece().giveY(y2);
    tiles[x1][y1].rmPiece();
}

tileSetUp();
defaultPieceSetUp();
console.log(tiles[2][0].getPiece())
movePiece(2,0,4,4);
console.log("Piece (2,0) moved to (4,4)");
console.log("Is tile occupied at (4,4) after move: "+tiles[4][4].isTileOccupied());
console.log(tiles[2][0].getPiece());
possibleMoves = tiles[4][4].getPiece().getMoveInfo();
for(let i = 0; i < possibleMoves.length; i++){
    console.log("("+possibleMoves[i][0]+","+possibleMoves[i][1]+")");
}
