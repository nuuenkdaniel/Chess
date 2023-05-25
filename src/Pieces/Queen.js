class Queen extends MovementPiece{
    constructor(color, tileX, tileY, board){
        super(color, tileX, tileY, board);
    }

    getMoveInfo(){
        console.log("Is capable of moving like the bishop and rooke unless blocked by a piece");
    }
}