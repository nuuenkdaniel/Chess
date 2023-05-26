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

    defaultBoardSetUp(){
        //black pieces set up
        let color = "black";
        for(let i = 0; i < boardLength; i++){
            board.getTile(i,1).plPiece(new Pawn(color, i, 1, board, true));
        }
        this.getTile(0,0).plPiece(new Rooke(color, 0, 0, board));
        this.getTile(1,0).plPiece(new Knight(color, 1, 0, board));
        this.getTile(2,0).plPiece(new Bishop(color, 2, 0, board));
        this.getTile(3,0).plPiece(new Queen(color, 3, 0, board));
        this.getTile(4,0).plPiece(new King(color, 4, 0, board));
        this.getTile(5,0).plPiece(new Bishop(color, 5, 0, board));
        this.getTile(6,0).plPiece(new Knight(color, 6, 0, board));
        this.getTile(7,0).plPiece(new Rooke(color, 7, 0, board));

        //white pieces set up
        color = "white";
        for(let i = 0; i < boardLength; i++){
            this.getTile(i,6).plPiece(new Pawn(color, i, 6, board, true));
        }
        this.getTile(0,7).plPiece(new Rooke(color, 0, 7, board));
        this.getTile(1,7).plPiece(new Knight(color, 1, 7, board));
        this.getTile(2,7).plPiece(new Bishop(color, 2, 7, board));
        this.getTile(3,7).plPiece(new Queen(color, 3, 7, board));
        this.getTile(4,7).plPiece(new King(color, 4, 7, board));
        this.getTile(5,7).plPiece(new Bishop(color, 5, 7, board));
        this.getTile(6,7).plPiece(new Knight(color, 6, 7, board));
        this.getTile(7,7).plPiece(new Rooke(color, 7, 7, board));
    }

    movePiece(x1,y1,x2,y2){
        if(this.getTile(x2,y2).isTileOccupied()){
            this.getTile(x2,y2).rmPiece();
        }
        if(this.getTile(x1,y1).getPiece() == Pawn){
            this.getTile(x1,y1).getPiece().setFirstMove(false);
        }
        this.getTile(x2,y2).plPiece(this.getTile(x1,y1).getPiece());
        this.getTile(x2,y2).getPiece().giveX(x2);
        this.getTile(x2,y2).getPiece().giveY(y2);
        this.getTile(x1,y1).rmPiece();
    }
}