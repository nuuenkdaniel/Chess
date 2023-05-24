class Pawn extends Piece{
    constructor(color, tileX, tileY, boardWidth, boardLength, firstMove = true){
        super(color, tileX, tileY, boardWidth, boardLength);
        this.firstMove = firstMove;
    }

    getMoveInfo(){
        console.log("Moves forward 2 if first move and 1 if after first move unless something is blocking it");
    }
    isFirstMove(){
        return this.firstMove;
    }
    setFirstMove(bool){
        this.firstMove = bool;
    }
}