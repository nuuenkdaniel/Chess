let tiles = [];
let boardLength = 8;
let boardWidth = 8;

function tileSetUp(){
    let color = "FFFFFF";
    let otherColor = "A52A2A";
    for(let i = 0; i < boardWidth; i++){
        tiles[i] = [];
        for(let j = 0; j < boardLength; j++){
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
        tiles[1][i].plPiece(new Pawn(color, 1, i, boardWidth, boardLength, true));
    }
    tiles[0][0].plPiece(new Rooke(color, 0, 0, boardWidth, boardLength));
    tiles[0][1].plPiece(new Knight(color, 0, 1, boardWidth, boardLength));
    tiles[0][2].plPiece(new Bishop(color, 0, 2, boardWidth, boardLength));
    tiles[0][3].plPiece(new Queen(color, 0, 3, boardWidth, boardLength));
    tiles[0][4].plPiece(new King(color, 0, 4, boardWidth, boardLength));
    tiles[0][5].plPiece(new Bishop(color, 0, 5, boardWidth, boardLength));
    tiles[0][6].plPiece(new Knight(color, 0, 6, boardWidth, boardLength));
    tiles[0][7].plPiece(new Rooke(color, 0, 7, boardWidth, boardLength));

    //white pieces set up
    color = "white";
    for(let i = 0; i < boardLength; i++){
        tiles[6][i].plPiece(new Pawn(color, 6, i, boardWidth, boardLength, true));
    }
    tiles[7][0].plPiece(new Rooke(color, 7, 0, boardWidth, boardLength));
    tiles[7][1].plPiece(new Knight(color, 7, 1, boardWidth, boardLength));
    tiles[7][2].plPiece(new Bishop(color, 7, 2, boardWidth, boardLength));
    tiles[7][3].plPiece(new Queen(color, 7, 3, boardWidth, boardLength));
    tiles[7][4].plPiece(new King(color, 7, 4, boardWidth, boardLength));
    tiles[7][5].plPiece(new Bishop(color, 7, 5, boardWidth, boardLength));
    tiles[7][6].plPiece(new Knight(color, 7, 6, boardWidth, boardLength));
    tiles[7][7].plPiece(new Rooke(color, 7, 7, boardWidth, boardLength));
}

function possibleMoves(etile){

}

function movePiece(x1,y1,x2,y2){
    if(tiles[y2][x2].isTileOccupied()){
        tiles[y2][x2].rmPiece();
    }
    tiles[y2][x2].plPiece(tile[y1][x1].getPiece());
    tiles[y2][x2].getPiece().giveY(y2);
    tiles[y2][x2].getPiece().giveX(x2);    
    tiles[y1][x1].rmPiece();
}

tileSetUp();
defaultPieceSetUp();
possibleMoves = tiles[0][2].getPiece().getMoveInfo();
for(let i = 0; i < boardLength; i++){
    console.log(tiles[i][0].getTileX());
}
