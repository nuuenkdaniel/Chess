class Knight extends Piece{
    constructor(color){
        this.color = color;
    }

    getMoveInfo(){
        console.log("Moves 2 spaces in any direction and then 1 space to either left or right");
    }
}