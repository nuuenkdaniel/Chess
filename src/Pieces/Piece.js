class Piece{
    constructor(color, tileX, tileY, boardWidth, boardLength){
        if(constructor == Piece){
            throw new error("Abstract classes can't be instantiated.");
        }
        this.color = color;
        this.tileX = tileX;
        this.tileY = tileY;
        this.boardWidth = boardWidth;
        this.boardLength = boardLength;
        this.moveInfo = [];
    }
    
    getColor(){
        return this.color;
    }
    getMoveInfo(){
        throw new error("Method 'getMoveInfo()' must be implemented");
    }
    giveY(yCoord){
        this.tileY = yCoord;
    }
    giveX(xCoord){
        this.tileX = xCoord;
    }
}