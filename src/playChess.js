const boardLength = 8;
const boardWidth = 8;
const tileSize = 70;
const gridXOffSet = screen.width/2 - boardLength/2*tileSize;
const gridYOffSet = screen.height/2 - boardWidth/2*tileSize;
const board = new ChessBoard(boardLength, boardWidth, tileSize);
let tileSelected = [];
let possibleTiles = [];

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

function displayPossibleTiles(){
    for(let i = 0; i < possibleTiles.length; i++){
        const tileX = possibleTiles[i][0] * tileSize + gridXOffSet;
        const tileY = possibleTiles[i][1] * tileSize + gridYOffSet;
        fill("#00FF00");
        rect(tileX,tileY,tileSize);
    }
}

function mousePressedHandler(){
    if(mouseIsPressed === true){
        tilePressed();
    }
}

function tilePressed(){
    tileSelected = [];
    possibleTiles = [];
    for(let i = 0; i < boardLength; i++){
        for(let j = 0; j < boardWidth; j++){
            if(board.getTile(i,j).isClicked() && board.getTile(i,j).isTileOccupied()){
                console.log("("+i+","+j+"): was clicked");
                tileSelected = [i,j];
                possibleTiles = board.getTile(i,j).getPiece().getMoveInfo();
                displayPossibleTiles();
                return true;
            }
        }
    }
    return false;
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
    mousePressedHandler();
    displayPossibleTiles();
}