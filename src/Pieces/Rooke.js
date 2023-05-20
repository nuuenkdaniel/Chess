class Rooke extends Piece{
    constructor(color){
        this.color = color;
    }

    getMoveInfo(){
        console.log("Moves infinitely forward, backward, left, or right as long as it is not blocked");
    }
}