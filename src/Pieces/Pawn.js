class Pawn extends Piece{
    constructor(color, tileX, tileY, board, firstMove = true){
        super(color, tileX, tileY, board);
        this.firstMove = firstMove;
    }

    getMoveInfo(){
        if(this.getColor() == "black"){
            return this.getMoveInfoBlackPawn();
        }
        return this.getMoveInfoWhitePawn();
    }

    getMoveInfoBlackPawn(){
        let possibleMoves = [];
        //Is there a white piece to bottom left
        if((this.tileX-1 > -1) && (this.tileY+1 < this.board.boardWidth) && (this.board.getTile(this.tileX-1,this.tileY+1).isTileOccupied())){
            if(this.board.getTile(this.tileX-1,this.tileY+1).getPiece().getColor() == "white"){
                possibleMoves.push([this.tileX-1,this.tileY+1]);
            }
        }
        //Is there a white piece to bottom right
        if((this.tileX+1 < this.board.boardLength) && (this.tileY+1 < this.board.boardWidth) && (this.board.getTile(this.tileX+1,this.tileY+1).isTileOccupied())){
            if(this.board.getTile(this.tileX+1,this.tileY+1).getPiece().getColor() == "white"){
                possibleMoves.push([this.tileX+1,this.tileY+1]);
            }
        }
        //Can move down
        if((this.tileY+1 >= this.board.boardWidth) || (this.board.getTile(this.tileX,this.tileY+1).isTileOccupied())){
            return possibleMoves;
        }
        possibleMoves.push([this.tileX,this.tileY+1]);
        //Can move down 2 spaces if first move
        if(this.firstMove){
            if((this.tileY+2 >= this.board.boardWidth) || (this.board.getTile(this.tileX,this.tileY+2).isTileOccupied())){
                return possibleMoves;
            }
            possibleMoves.push([this.tileX,this.tileY+2]);
        }
        return possibleMoves;
    }

    getMoveInfoWhitePawn(){
        let possibleMoves = [];
        //Is there a black piece to top left
        if((this.tileX-1 > -1) && (this.tileY-1 > -1) && (this.board.getTile(this.tileX-1,this.tileY-1).isTileOccupied())){
            if(this.board.getTile(this.tileX-1,this.tileY-1).getPiece().getColor() == "black"){
                possibleMoves.push([this.tileX-1,this.tileY-1]);
            }
        }
        //Is there a black piecce to top right
        if((this.tileX+1 < this.board.boardLength) && (this.tileY-1 > -1) && (this.board.getTile(this.tileX+1,this.tileY-1).isTileOccupied())){
            
            if(this.board.getTile(this.tileX+1,this.tileY-1).getPiece().getColor() == "black"){
                possibleMoves.push([this.tileX+1,this.tileY-1]);
            }
        }
        //Can move up
        if((this.tileY-1 <= -1) || (this.board.getTile(this.tileX,this.tileY-1).isTileOccupied())){
            return possibleMoves;
        }
        possibleMoves.push([this.tileX,this.tileY-1]);
        //Can move down 2 spaces if first move
        if(this.firstMove){
            if((this.tileY-2 <= -1) || (board.getTile(this.tileX,this.tileY-2).isTileOccupied())){
                return possibleMoves;
            }
            possibleMoves.push([this.tileX,this.tileY-2]);
        }
        return possibleMoves
    }

    isFirstMove(){
        return this.firstMove;
    }

    setFirstMove(bool){
        this.firstMove = bool;
    }

    getType(){
        return "pawn";
    }
}