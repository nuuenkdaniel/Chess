class Rooke extends Piece{
    constructor(color, tileX, tileY, boardWidth, boardLength){
        super(color, tileY, tileX, boardWidth, boardLength);
    }

    getMoveInfo(){
        console.log("Moves infinitely forward, backward, left, or right as long as it is not blocked");

    }
    updateMoveInfo(){

    }
}