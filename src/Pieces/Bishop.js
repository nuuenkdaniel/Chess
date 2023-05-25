class Bishop extends Piece{
    constructor(color, tileX, tileY, board){
        super(color, tileX, tileY, board);
    }

    //returns an array of all possible moves of the given driection from moveX,moveY
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
                    possibleMoves[possibleMovesIndex] = [tMoveX,tMoveY];
                }
                break;
            }
            possibleMoves[possibleMovesIndex] = [tMoveX,tMoveY];
            tMoveX += moveX;
            tMoveY += moveY;
            possibleMovesIndex++;
        }
        return possibleMoves;
    }

    //Returns an array of all possible moves of this bishop
    getMoveInfo(){
        let topLeftMoves = this.getPossibleMoves(-1,-1,this.board);
        let topRightMoves = this.getPossibleMoves(1,-1,this.board);
        let botRightMoves = this.getPossibleMoves(1,1,this.board);
        let botLeftMoves = this.getPossibleMoves(-1,1,this.board);

        return topLeftMoves.concat(topRightMoves).concat(botRightMoves).concat(botLeftMoves);
    }
}