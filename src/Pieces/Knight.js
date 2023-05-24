class Knight extends Piece{
    constructor(color, tileY, tileX, boardWidth, boardLength){
        super(color, tileY, tileX, boardWidth, boardLength);
    }

    getMoveInfo(){
        console.log("Moves 2 spaces in any direction and then 1 space to either left or right");
    }
}