class ChessBoard{
    constructor(boardLength, boardWidth){
        this.boardLength = boardLength;
        this.boardWidth = boardWidth;
        this.board = [];
        this.createBoard();
    }

    createBoard(){
        let color = "FFFFFF";
        let otherColor = "A52A2A";
        for(let i = 0; i < this.boardLength; i++){
            this.board[i] = [];
            for(let j = 0; j < this.boardWidth; j++){
                this.board[i][j] = new Tile(i,j,color);
                let tempColor = color;
                color = otherColor;
                otherColor = tempColor;
            }
        }
    }

    getTile(x,y){
        return this.board[x][y];
    }
}