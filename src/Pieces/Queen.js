class Queen extends Piece{
    constructor(color, tileX, tileY, boardWidth, boardLength){
        super(color, tileX, tileY, boardWidth, boardLength);
    }

    getMoveInfo(){
        console.log("Is capable of moving like the bishop and rooke unless blocked by a piece");
    }
}