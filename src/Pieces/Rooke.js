class Rooke extends MovementPiece{
    constructor(color, tileX, tileY, board){
        super(color, tileX, tileY, board);
    }

    getMoveInfo(mode){
        let up = this.getPossibleMoves(0,-1,this.board,mode);
        let right = this.getPossibleMoves(1,0,this.board,mode);
        let down = this.getPossibleMoves(0,1,this.board,mode);
        let left = this.getPossibleMoves(-1,0,this.board,mode);

        return up.concat(right).concat(down).concat(left);
    }
    getType(){
        return "rooke";
    }
}