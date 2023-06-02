class Bishop extends MovementPiece{
    constructor(color, tileX, tileY, board){
        super(color, tileX, tileY, board);
    }

    //Returns an array of all possible moves of this bishop
    getMoveInfo(){
        let topLeftMoves = this.getPossibleMoves(-1,-1,this.board);
        let topRightMoves = this.getPossibleMoves(1,-1,this.board);
        let botRightMoves = this.getPossibleMoves(1,1,this.board);
        let botLeftMoves = this.getPossibleMoves(-1,1,this.board);

        return topLeftMoves.concat(topRightMoves).concat(botRightMoves).concat(botLeftMoves);
    }
    getType(){
        return "bishop";
    }
}