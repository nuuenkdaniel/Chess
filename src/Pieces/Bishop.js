class Bishop extends Piece{
    constructor(color){
        super(color);
    }

    getMoveInfo(){
        console.log("Moves infinite tiles diagnoly as long as there is no piece blocking it");
    }
}