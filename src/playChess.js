let tiles = [];
let boardLength = 8;
let boardWidth = 8;

function tileSetUp(){
    let color = "FFFFFF";
    let otherColor = "A52A2A";
    for(let i = 0; i < boardWidth; i++){
        tile[i] = [];
        for(let j = 0; j < boardLength; j++){
            tile[i][j] = new Tile(j,i,color);
            let tempColor = color;
            color = otherColor;
            otherColor = tempColor;
        }
    }
}

function defaultPieceSetUp(){
    //black pieces set up
    let color = "A52A2A";
    for(let i = 0; i < boardLength; i++){
        tile[1][i] = new Pawn(color, true);
    }
    tile[0][0] = new Rooke(color);
    tile[0][1] = new Knight(color);
    tile[0][2] = new Bishop(color);
    tile[0][3] = new Queen(color);
    tile[0][4] = new King(color);
    tile[0][5] = new Bishop(color);
    tile[0][6] = new Knight(color);
    tile[0][7] = new Rooke(color);

    //white pieces set up
    color = "FFFFFF";
    for(let i = 0; i < boardLength; i++){
        tile[6][i] = new Pawn(color, true);
    }
    tile[7][0] = new Rooke(color);
    tile[7][1] = new Knight(color);
    tile[7][2] = new Bishop(color);
    tile[7][3] = new Queen(color);
    tile[7][4] = new King(color);
    tile[7][5] = new Bishop(color);
    tile[7][6] = new Knight(color);
    tile[7][7] = new Rooke(color);
}

function possibleMoves(tile){
    let possibleTiles = [];
    switch(tile.getPiece()){
        case Pawn:
            let tiles = tile.getPiece().isFirstMove()? 2 : 1;
            for(let i = 1; i <= tiles; i++){
                if(tile[tile.tileY()-i, tile.tileX()].isTileOccupied()){
                    break;
                }
                possibleTiles = tile[tile.tileY()-i, tile.tileX()].tile
            }
    }
}

function move(x1,y1,x2,y2){
    tile[y2][x2] = tile[y1][x1].getPiece();
    tile[y1][x1].rmPiece();
}