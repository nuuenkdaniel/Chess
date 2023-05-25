class Knight extends Piece{
    constructor(color, tileX, tileY, board){
        super(color, tileX, tileY, board);
    }

    //Checks if move is a possibleMove is possible return coords if not return [-99,-99]
    getPossibleMoves(moveX,moveY,board, possibleMoves){
        let tMoveX = this.tileX+moveX;
        let tMoveY = this.tileY+moveY;
        //if ti
        if(((tMoveX < board.boardLength) && (tMoveX > -1)) && ((tMoveY < board.boardWidth) && (tMoveY > -1))){
            if((board.getTile(tMoveX,tMoveY).isTileOccupied()) && (board.getTile(tMoveX,tMoveY).getPiece().getColor() == this.getColor())){
                return;
            }
            possibleMoves.push([tMoveX,tMoveY]);
        }
        return;
    }

    getMoveInfo(){
        let possibleMoves = [];
        this.getPossibleMoves(-1,-2,this.board,possibleMoves);
        this.getPossibleMoves(1,-2,this.board,possibleMoves);
        this.getPossibleMoves(2,-1,this.board,possibleMoves);
        this.getPossibleMoves(2,1,this.board,possibleMoves);
        this.getPossibleMoves(1,2,this.board,possibleMoves);
        this.getPossibleMoves(-1,2,this.board,possibleMoves);
        this.getPossibleMoves(-2,1,this.board,possibleMoves);
        this.getPossibleMoves(-2,-1,this.board,possibleMoves);

        return possibleMoves;
    }
}