class Tile{
    constructor(tileX, tileY, color, piece = null){
        this.tileY = tileY;
        this.tileX = tileX;
        this.tileOccupied = false;
        this.piece = piece;
    }
    
    getTileX(){
        return this.tileX;
    }
    getTileY(){
        return this.tileY;
    }
    isTileOccupied(){
        return this.tileOccupied;
    }
    getPiece(){
        return this.piece;
    }
    plPiece(piece){
        this.piece = piece;
        this.tileOccupied = true;
    }
    rmPiece(){
        this.piece = null;
        this.tileOccupied = false;
    }
}
