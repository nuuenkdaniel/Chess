class Tile{
    constructor(tileCoord, piece = null){
        this.tileCoord = tileCoord;
        this.tileOccupied = false;
        this.piece = piece;
    }

    isTileOccupied(){
        return this.tileOccupied;
    }
    getPiece(){
        return this.piece;
    }
    placePiece(piece){
        this.piece = piece;
    }
}
