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
    let color = "black";
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
    color = "white";
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
    possibleTiles[0] = [-1,-1];
    switch(this.tile.getPiece()){
        case Pawn:
            possibileTiles[0] = [-1,-1];
            if(etile.getPiece().getColor() == "white"){
                if((!tile[etile.getTileY()-1][etile.getTileX()].isTileOccupied()) && (etile.getTileY()-1 > -1)){
                    possibleTiles[0] = [etile.getTileY()-1,etile.getTileX()];
                    if(etile.getPiece().isFirstMove()){
                        if((!tile[etile.getTileY()-2][etile.getTileX()].isTileOccupied()) && (etile.getTileY()-2 > -1)){
                            possibleTiles[1] = [etile.getTileY()-2,etile.getTileX()];
                        }
                    }
                }
            }
            else{
                if((!tile[etile.getTileY()+1][etile.getTileX()].isTileOccupied()) && (etile.getTileY()+1 < boardWidth)){
                    possibleTiles[0] = [etile.getTileY()+1,etile.getTileX()];
                    if(etile.getPiece().isFirstMove()){
                        if((!tile[etile.getTileY()+2][etile.getTileX()].isTileOccupied()) && (etile.getTileY()+2 < boardWidth)){
                            possibleTiles[1] = [etile.getTileY()+2,etile.getTileX()];
                        }
                    }
                }
            }
            return possibleTiles;
        //come back to king later
        case King:
            let arrKingIncr
            //Can king move up
            if(((!tile[etile.getTileY()-1][etile.getTileX()].isTileOccupied()) || !(tile[etile.getTileY()-1][etile.getTileX()].getPiece().getColor() == etile.getPiece().getColor())) && (etile.getTileY()-1 > -1)){
                possibleTiles[arrKingIncr] = [etile.getTileY()-1,etile.getTileX()];
                arrKingIncr++;
            }
            //Can king move top right
            if((!tile[etile.getTileY()-1][etile.getTileX()+1].isTileOccupied()) && (etile.getTileY()-1 > -1) && (etile.getTileX()+1 < boardLength)){
                possibleTiles[arrKingIncr] = [etile.getTileY()-1,etile.getTileX()+1];
                arrKingIncr++;
            }
            //Can king move right
            if((!tile[etile.getTileY()][etile.getTileX()+1].isTileOccupied()) && (etile.getTileX()+1 < boardLength)){
                possibleTiles[arrKingIncr] = [etile.getTileY(),etile.getTileX()];
                arrKingIncr++;
            }
            //Can king move bottom right
            if((!tile[etile.getTileY()+1][etile.getTileX()+1].isTileOccupied()) && (etile.getTileY()+1 < boardWidth) && (etile.getTileX+1 < boardLength)){
                possibleTiles[arrKingIncr] = [etile.getTileY()+1,etile.getTileX()+1];
                arrKingIncr++;
            }
            //Can king move down
            if((!tile[etile.getTileY()+1][etile.getTileX()].isTileOccupied()) && (etile.getTileY()+1 < boardWidth)){
                possibleTiles[arrKingIncr] = [etile.getTileY()+1,etile.getTileX()];
                arrKingIncr++;
            }
            //Can king move bottom left
            if((!tile[etile.getTileY()+1][etile.getTileX()-1].isTileOccupied()) && (etile.getTileY()+1 < boardWidth) && (etile.getTileX()-1 > -1)){
                possibleTiles[arrKingIncr] = [etile.getTileY()+1,etile.getTileX()-1];
                arrKingIncr++;
            }
            //Can king move left
            if((!tile[etile.getTileY()][etile.getTileX()-1].isTileOccupied()) && (etile.getTileX()-1 > -1)){
                possibleTiles[arrKingIncr] = [etile.getTileY(),etile.getTileX()-1];
                arrKingIncr++;
            }
            //Can king move top left
            if((!tile[etile.getTileY()-1][etile.getX()-1].isTileOccupied()) && (etile.getTileY()-1 > -1) && (etile.getTileX()-1 > -1)){
                possibleTiles[arrKingIncr] = [etile.getTileY()-1,etile,getX()-1];
            }
            return possibleTiles;
        case Bishop:
            //Can bishop move top left
            let bishopRowIndex = etile.getTileY()-1;
            let bishopColumnIndex = etile.getTileX()+1;
            let arrBishopIncr = 0;
            while((bishopRowIndex > -1) && (bishipColumnIndex < boardLength)){
                //need to change! piece needs to stop once it eats a piece
                if(!(tile[bishopRowIndex][bishopColumnIndex].isTileOccupied()) || (tile[bishopRowIndex][bishopColumnIndex].getPiece().getColor()!=etile.getPiece().getColor())){
                    possibleTiles[arrBishopIncr] = []
                }
            }
            return possibleTiles;
    }
}

function move(x1,y1,x2,y2){
    if(tile[y2][x2].isTileOccupied()){
        tile[y2][x2].rmPiece();
    }
    tile[y2][x2] = tile[y1][x1].getPiece();
    tile[y1][x1].rmPiece();
}