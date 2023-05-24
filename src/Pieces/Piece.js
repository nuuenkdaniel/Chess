class Piece{
    constructor(color, tileY, tileX, boardWidth, boardLength){
        if(constructor == Piece){
            throw new error("Abstract classes can't be instantiated.");
        }
        this.color = color;
        this.tileY = tileY;
        this.tileX = tileX;
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