class King extends Piece{
    constructor(color, tileY, tileX, boardWidth, boardLength){
        super(color, tileY, tileX, boardWidth, boardLength);
    }

    getMoveInfo(){
        let possibleMoves = [];
        let possibleMovesIndex = 0;
        let moveY = 0;
        let moveX = 0;
        possibleMoves[0] = [0,0];
        function update(){
            possibleMoves[possibleMovesIndex] = [moveY,moveX]; 
            possibleMovesIndex++;
        }

        //can move up?
        moveY = -1;
        moveX = 0;
        if(this.tileY+moveY > -1){
            update();
        }

        //can move top right?
        moveY = -1;
        moveX = 1;
        if((this.tileY+moveY > -1) && (this.tileX+moveX < boardLength)){
            update();
        }

        //can move right?
        moveY = 0;
        moveX = 1;
        if((this.tileX < boardLength)){
            update();
        }

        //can move bottom right?
        moveY = 1;
        moveX = 1;
        if((this.tileY+moveY < boardWidth) && (this.tileX+moveX < boardLength)){
            update();
        }

        //can move down?
        moveY = 1;
        moveX = 0;
        if(this.tileY+moveY < this.boardWidth){
            update();
        }

        //can move bottom left?
        moveY = 1;
        moveX = -1;
        if((this.tileY+moveY < this.boardWidth) && (this.tileX+moveX > -1)){
            update();
        }

        //can move left?
        moveY = 0;
        moveX = -1;
        if(this.tileX+moveX > -1){
            update();
        }

        //can move top left?
        moveY = -1;
        moveX = -1;
        if((this.tileY+moveY > -1) && (this.tileX+moveX > -1)){
            update();
        }
        return possibleMoves;
    }
}