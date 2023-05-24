class Bishop extends Piece{
    constructor(color, tileY, tileX, boardWidth, boardLength){
        super(color, tileY, tileX, boardWidth, boardLength);
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
            possibleMoves[possibleMovesIndex] = [tMoveY,tMoveX]; 
            tMoveY += moveY;
            tMoveX += moveX;
            possibleMovesIndex++;
        }

        [moveY, tMoveY] = -1;
        [moveX, tMoveX] = 1;
        //loops all the possible moves top left
        while((this.tileY+tMoveY > -1) && (this.tileX+tMoveX < this.boardWidth)){
            update();
        }

        //loops all the possible moves top right
        [moveY, tMoveY] = -1;
        [moveX, tMoveX] = -1;
        while((this.tileY+tMoveY > -1) && (this.tileX+tMoveX > -1)){
            update();
        }

        //loops all the possible moves bottom right
        [moveY, tMoveY] = 1;
        [moveX, tMoveX] = -1;
        while((this.tileY+tMoveY < this.boardLength) && (this.tileX+tMoveX > -1)){
            update();
        }

        //loops all the possible moves bottom left
        [moveY, tMoveY] = 1;
        [moveX, tMoveX] = 1;
        while((this.tileY+tMoveY < this.boardWidth) && (this.tileX+tMoveX < this.boardLength)){
            update();
        }

        return possibleMoves;
    }
}