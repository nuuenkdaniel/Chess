class MovementPiece extends Piece{
    constructor(color, tileX, tileY, board){
        if(constructor == MovementPiece){
            throw new error("Abstract classes can't be instantiated.");
        }
        super(color, tileX, tileY, board);
    }

    getPossibleMoves(moveX, moveY, board){
        let tMoveX = this.tileX+moveX;
        let tMoveY = this.tileY+moveY;
        let possibleMoves = [];
        let possibleMovesIndex = 0;
        //Loops and appends possibleMoveCoords if position is within boundaries of the board
        while(((tMoveX < board.boardLength) && (tMoveX > -1)) && ((tMoveY < board.boardWidth) && (tMoveY > -1))){
            //Stop piece before if same color piece is in the way and stops on top if different color piece
            if(board.getTile(tMoveX,tMoveY).isTileOccupied()){
                if(board.getTile(tMoveX,tMoveY).getPiece().getColor() != this.getColor()){
                    possibleMoves.push([tMoveX,tMoveY]);
                }
                break;
            }
            possibleMoves.push([tMoveX,tMoveY]);
            tMoveX += moveX;
            tMoveY += moveY;
        }
        return possibleMoves;
    }

    getMoveInfo(){
        throw new error("Method 'getMoveInfo()' must be implemented");
    }
}