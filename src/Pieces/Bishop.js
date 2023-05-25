class Bishop extends Piece{
    constructor(color, tileX, tileY, board){
        super(color, tileX, tileY, board);
    }

    getPossibleMoves(moveX, moveY, board){
        let tMoveX = moveX;
        let tMoveY = moveY;
        let possibleMoves = [];
        let possibleMovesIndex = 0;
        possibleMoves[possibleMovesIndex] = [-99,-99];
        possibleMovesIndex++;
        while((this.tileX+tMoveX < board.boardLength) && (this.tileY+tMoveY < board.boardWidth) && (this.tileX+tMoveX > -1) && (this.tileY+tMoveY > -1)){
            possibleMoves[possibleMovesIndex] = [tMoveX,tMoveY];
            tMoveX += moveX;
            tMoveY += moveY;
            possibleMovesIndex++;
        }
        return possibleMoves;
    }

    getMoveInfo(){
        let topLeftMoves = this.getPossibleMoves(-1,-1,this.board);
        let topRightMoves = this.getPossibleMoves(1,-1,this.board);
        let bottomRightMoves = this.getPossibleMoves(1,1,this.board);
        let bottomLeftMoves = this.getPossibleMoves(-1,1,this.board);

        return topLeftMoves.concat(topRightMoves).concat(bottomRightMoves).concat(bottomLeftMoves);
    }
    
}