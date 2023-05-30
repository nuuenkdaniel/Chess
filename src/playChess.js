let boardLength = 8;
let boardWidth = 8;
let tileSize = 70;
let gridXOffSet = screen.width/2 - boardLength/2*tileSize;
let gridYOffSet = screen.height/2 - boardWidth/2*tileSize;
const board = new ChessBoard(boardLength, boardWidth, tileSize);
let chessPieces;

function drawBoard(){
    for(let i = 0; i < boardLength; i++){
        for(let j = 0; j < boardWidth; j++){
            const tileX = i * tileSize + gridXOffSet;
            const tileY = j * tileSize + gridYOffSet;
            board.getTile(i,j).giveX(tileX);
            board.getTile(i,j).giveY(tileY);
            fill(board.getTile(i,j).getColor());
            rect(tileX,tileY,tileSize);
        }
    }
}

function tilePressed(){
    if(mouseIsPressed === true){
        for(let i = 0; i < boardLength; i++){
            for(let j = 0; j < boardWidth; j++){
                if(board.getTile(i,j).isClicked()){
                    console.log("tile: ("+i+","+j+"): was clicked");
                    return true;
                }
            }
        }
    }
    return;
}

board.defaultBoardSetUp();

function preload(){
    //chessPieces = loadImage('assets/ChessPieces.png');
}

function setup(){
    createCanvas(displayWidth,displayHeight);
    background(0);
}

function draw(){
    drawBoard();
    tilePressed();
}