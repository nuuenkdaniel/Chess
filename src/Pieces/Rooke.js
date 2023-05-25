class Rooke extends Piece{
    constructor(color, tileX, tileY, board){
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

    getMoveInfo(){
        let up = this.getPossibleMoves(0,-1,this.board);
        let right = this.getPossibleMoves(1,0,this.board);
        let down = this.getPossibleMoves(0,1,this.board);
        let left = this.getPossibleMoves(-1,0,this.board);

        return up.concat(right).concat(down).concat(left);
    }
}