class King extends Piece{
    constructor(color, tileX, tileY, board){
        super(color, tileX, tileY, board);
    }

    getPossibleMoves(moveX,moveY,board,possibleMoves){
        let tMoveX = this.tileX+moveX;
        let tMoveY = this.tileY+moveY;
        if(((tMoveX < board.boardLength) && (tMoveX > -1)) && ((tMoveY < board.boardWidth) && (tMoveY > -1))){
            if((board.getTile(tMoveX,tMoveY).isTileOccupied()) && (board.getTile(tMoveX,tMoveY).getPiece().getColor() == this.getColor())){
                return;
            }
            possibleMoves.push([tMoveX,tMoveY]);
        }
    }

    getMoveInfo(){
        let possibleMoves = [];
        this.getPossibleMoves(-1,-1,this.board,possibleMoves);
        this.getPossibleMoves(0,-1,this.board,possibleMoves);
        this.getPossibleMoves(1,-1,this.board,possibleMoves);
        this.getPossibleMoves(1,0,this.board,possibleMoves);
        this.getPossibleMoves(1,1,this.board,possibleMoves);
        this.getPossibleMoves(0,1,this.board,possibleMoves);
        this.getPossibleMoves(-1,1,this.board,possibleMoves);
        this.getPossibleMoves(-1,0,this.board,possibleMoves);

        return possibleMoves;
    }
}