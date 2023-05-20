class Tile{
    constructor(tileCoord){
        if(constructor == Tile){
            throw new Error("Abstract classes can't be instantiated.")
        }
        this.tileCoord = tileCoord;
    }

    isTileOccupied(){
        throw new Error("Method 'isTileOccupied()' must be implemented.");
    }
    getPiece(){
        throw new Error("Method 'getPiece()' must be implemented.");
    }
}
