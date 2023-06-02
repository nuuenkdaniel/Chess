class Piece{
    constructor(color, tileX, tileY, board){
        if(constructor == Piece){
            throw new error("Abstract classes can't be instantiated.");
        }
        this.color = color;
        this.tileX = tileX;
        this.tileY = tileY;
        this.board = board;
        this.moveInfo = [];
        this.pieceType = null;
    }
    
    getColor(){
        return this.color;
    }
    getMoveInfo(){
        throw new error("Method 'getMoveInfo()' must be implemented");
    }
    getType(){
        throw new error("Method 'getType()' must be implemented");
    }
    giveY(yCoord){
        this.tileY = yCoord;
    }
    giveX(xCoord){
        this.tileX = xCoord;
    }
}