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

function possibleMoves(etile){
    let possibleTiles = [];
    switch(this.tile.getPiece()){
        case Pawn:
            possibileTiles[0] = [-1,-1];
            if(!tile[etile.getTileY()-1][etile.getTileX()].isTileOccupied()){
                possibleTiles[0] = [etile.getTileY()-1,etile.getTileX()];
                if(etile.getPiece().isFirstMove()){
                    if(!tile[etile.getTileY()-2][etile.getTileX()].isTileOccupied()){
                        possibleTiles[1] = [etile.getTileY()-2,etile.getTileX()];
                    }
                }
            }
            return possibleTiles;

        case King:
            let i = 0;
            possibleTiles[0] = [-1,-1];
            if((!tile[etile.getTileY()-1][etile.getTileX()].isTileOccupied()) && (etile.getTileY()-1 > tileRow-1)){
                possibleTiles[i] = [etile.getTileY()-1,etile.getTileX()];
                i++;
            }
            if(!tile[etile.getTileY()-1][etile.getTileX()+1].isTileOccupied()){
                possibleTiles[i] = [etile.getTileY()-1,etile.getTileX()+1];
                i++;
            }
            if(!tile[etile.getTileY()][etile.getTileX()+1].isTileOccupied()){
                possibleTiles[i] = [etile.getTileY(),etile.getTileX()];
                i++;
            }
            if(!tile[etile.getTileY()]){
                
            }
            return possibleTiles;
        case Bishop:
            return possibleTiles;
    }
}

function move(x1,y1,x2,y2){
    tile[y2][x2] = tile[y1][x1].getPiece();
    tile[y1][x1].rmPiece();
}