class Bishop extends Piece{
    constructor(color, tileX, tileY, boardWidth, boardLength){
        super(color, tileX, tileY, boardWidth, boardLength);
    }

    //find all possible moves for a bishop piece ignoring if a piece is in its way, handle that later
    //returns movement instructions to move
    getMoveInfo(){
        let possibleMoves = [];
        let possibleMovesIndex = 0;
        let moveY;
        let moveX;
        let tMoveY;
        let tMoveX;
        possibleMoves[0] = [0,0];

        function update(){
            possibleMoves[possibleMovesIndex] = [tMoveX,tMoveY]; 
            tMoveY += moveY;
            tMoveX += moveX;
            possibleMovesIndex++;
        }

        //loops all the possible moves top left
        [moveY, tMoveY, moveX, tMoveX] = [-1, -1, -1, -1];
        while((this.tileY+tMoveY > -1) && (this.tileX+tMoveX > -1)){
            update();
        }

        [moveY, tMoveY, moveX, tMoveX] = [-1, -1, 1, 1];
        //loops all the possible moves top right
        while((this.tileY+tMoveY > -1) && (this.tileX+tMoveX < this.boardLength)){
            update();
        }

        //loops all the possible moves bottom right
        [moveY, tMoveY, moveX, tMoveX] = [1, 1, 1, 1];
        while((this.tileY+tMoveY < this.boardWidth) && (this.tileX+tMoveX < this.boardLength)){
            update();
        }

        //loops all the possible moves bottom left
        [moveY, tMoveY, moveX, tMoveX] = [1, 1, -1, -1];
        while((this.tileY+tMoveY < this.boardWidth) && (this.tileX+tMoveX > -1)){
            update();
        }

        return possibleMoves;
    }
}