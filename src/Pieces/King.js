class King extends Piece{
    constructor(color, tileX, tileY, board){
        super(color, tileX, tileY, board);
        this.checkedTiles = [];
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
                        return;
                    }
                }
                //If piece on move cannot move
                if((board.getTile(tMoveX,tMoveY).isTileOccupied()) && (board.getTile(tMoveX,tMoveY).getPiece().getColor() == this.getColor())){
                    return;
                }
            }
            possibleMoves.push([tMoveX,tMoveY]);
        }
    }

    getMoveInfo(mode){
        let possibleMoves = [];
        this.getPossibleMoves(-1,-1,this.board,possibleMoves,mode);
        this.getPossibleMoves(0,-1,this.board,possibleMoves,mode);
        this.getPossibleMoves(1,-1,this.board,possibleMoves,mode);
        this.getPossibleMoves(1,0,this.board,possibleMoves,mode);
        this.getPossibleMoves(1,1,this.board,possibleMoves,mode);
        this.getPossibleMoves(0,1,this.board,possibleMoves,mode);
        this.getPossibleMoves(-1,1,this.board,possibleMoves,mode);
        this.getPossibleMoves(-1,0,this.board,possibleMoves,mode);

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

    getColor(){
        return this.color;
    }
}