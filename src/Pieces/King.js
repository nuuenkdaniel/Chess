class King extends Piece{
    constructor(color){
        this.color = color;
    }

    getMoveInfo(){
        console.log("Moves 1 space in any direction including diagnoly unless something blocks it");
    }
}