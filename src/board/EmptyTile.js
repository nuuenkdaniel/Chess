class EmptyTile extends Tile{
    constructor(tileCoord){
        super(tileCoord);
    }

    isTileOccupied(){
        return false;
    }
    getPiece(){
        return null;
    }
}