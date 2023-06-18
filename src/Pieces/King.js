class King extends Piece{
    constructor(color, tileX, tileY, board, firstMove = true){
        super(color, tileX, tileY, board);
        this.checkedTiles = [];
        this.firstMove = firstMove;
    }

    isFirstMove(){
        return this.firstMove;
    }

    setFirstMove(bool){
        this.firstMove = bool;
    }

    /**
    * Checks if the king is checked
    * @return {Boolean} - returns true if king is checked and false if king is not checked
    */
    isChecked(){
        for(let tiles of this.checkedTiles){
            if(tiles[0] === this.tileX && tiles[1] === this.tileY) return true;
        }
        return false;
    }

    /**
     * Checks if the king can castle in this direction 
     * @param {String} direction - left or right rooke
     * @return {Boolean} - True if the piece can castle; False if otherwise
     */
    canCastle(direction){
        if(this.firstMove === true){
            if(direction === "left"){
                let piece = this.board.getTile(0,this.tileY).getPiece();
                if(piece.getType() === "rooke") {
                    if(piece.isFirstMove() === false || piece.getColor() !== this.getColor()) return false;
                    if(this.board.getTile(this.tileX-1,this.tileY).isTileOccupied() || this.board.getTile(this.tileX-2,this.tileY).isTileOccupied()) return false;
                    return true;
                } 
                return false;
            }
            else{
                let piece = this.board.getTile(7,this.tileY).getPiece();
                if(piece.getType() === "rooke") {
                    if(piece.isFirstMove() === false || piece.getColor() === this.getColor()) return false;
                    if(this.board.getTile(this.tileX+1,this.tileY).isTileOccupied() || this.board.getTile(this.tileX+2,this.tileY).isTileOccupied()) return false;
                    return true;
                }
            }
        }
        return false;
    }

    getPossibleMoves(moveX,moveY,board,possibleMoves,mode){
        let tMoveX = this.tileX+moveX;
        let tMoveY = this.tileY+moveY;
        // Makes sure move is within bounds of the board
        if(((tMoveX < board.boardLength) && (tMoveX > -1)) && ((tMoveY < board.boardWidth) && (tMoveY > -1))){
            // If mode is checked tiles then skip this
            if(mode !== "checkedTiles"){
                // If tile is checkable tile cannot move there
                for(let tiles of this.checkedTiles){
                    if((tiles[0] === tMoveX) && (tiles[1] === tMoveY)){
                        return possibleMoves;
                    }
                }
                //If piece on move cannot move
                if((board.getTile(tMoveX,tMoveY).isTileOccupied()) && (board.getTile(tMoveX,tMoveY).getPiece().getColor() == this.getColor())){
                    return possibleMoves;
                }
            }
            possibleMoves.push([tMoveX,tMoveY]);
        }
        return possibleMoves;
    }

    getMoveInfo(mode){
        let possibleMoves = [];
        possibleMoves = this.getPossibleMoves(-1,-1,this.board,possibleMoves,mode);
        possibleMoves = this.getPossibleMoves(0,-1,this.board,possibleMoves,mode);
        possibleMoves = this.getPossibleMoves(1,-1,this.board,possibleMoves,mode);
        possibleMoves = this.getPossibleMoves(1,0,this.board,possibleMoves,mode);
        possibleMoves = this.getPossibleMoves(1,1,this.board,possibleMoves,mode);
        possibleMoves = this.getPossibleMoves(0,1,this.board,possibleMoves,mode);
        possibleMoves = this.getPossibleMoves(-1,1,this.board,possibleMoves,mode);
        possibleMoves = this.getPossibleMoves(-1,0,this.board,possibleMoves,mode);

        return possibleMoves;
    }

    giveCheckedTiles(checkedTiles){
        this.checkedTiles = checkedTiles;
    }

    getCheckedTiles(){
        return this.checkedTiles;
    }

    getType(){
        return "king";
    }
}