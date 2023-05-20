class Queen extends Piece{
    constructor(color){
        this.color = color;
    }

    getMoveInfo(){
        console.log("Is capable of moving like the bishop and rooke unless blocked by a piece");
    }
}