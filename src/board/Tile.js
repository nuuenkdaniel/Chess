class Tile{
    constructor(tileX, tileY, color, piece = null){
        this.tileX = tileX;
        this.tileY = tileY;
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
    }
    rmPiece(){
        this.piece = null;
    }
}
