class Queen extends Piece{
    constructor(color, tileY, tileX, boardWidth, boardLength){
        super(color, tileY, tileX, boardWidth, boardLength);
    }

    getMoveInfo(){
        console.log("Is capable of moving like the bishop and rooke unless blocked by a piece");
    }
}