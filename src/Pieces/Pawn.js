class Pawn extends Piece{
    constructor(color){
        super(color);
    }

    moveInfo(){
        console.log("starts with 2 forward then 1 forward after first move");
    }
}