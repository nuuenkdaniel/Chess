class Queen extends MovementPiece{
    constructor(color, tileX, tileY, board){
        super(color, tileX, tileY, board);
    }

    getMoveInfo(){
        let up = this.getPossibleMoves(0,-1,this.board);
        let right = this.getPossibleMoves(1,0,this.board);
        let down = this.getPossibleMoves(0,1,this.board);
        let left = this.getPossibleMoves(-1,0,this.board);
        let topLeftMoves = this.getPossibleMoves(-1,-1,this.board);
        let topRightMoves = this.getPossibleMoves(1,-1,this.board);
        let botRightMoves = this.getPossibleMoves(1,1,this.board);
        let botLeftMoves = this.getPossibleMoves(-1,1,this.board);
        
        return up.concat(right).concat(down).concat(left).concat(topLeftMoves).concat(topRightMoves).concat(botRightMoves).concat(botLeftMoves);
    }
    getType(){
        return "queen";
    }
}