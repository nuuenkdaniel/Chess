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
    for(let tile of possibleTiles){
        const tileX = tile[0] * tileSize + gridXOffSet;
        const tileY = tile[1] * tileSize + gridYOffSet;
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
    console.log("mouseClicked");
    for(let i = 0; i < boardLength; i++){
        for(let j = 0; j < boardWidth; j++){
            if(board.getTile(i,j).isClicked()){
                //console.log("("+i+","+j+"): was clicked");
                if(possibleTiles.length > 0){
                    //console.log("got here");
                    for(let tile of possibleTiles){
                        if((tile[0] == i) && (tile[1] == j)){
                            board.movePiece(tileSelected[0],tileSelected[1],i,j);
                            //console.log("got here");
                            tileSelected = [];
                            possibleTiles = [];
                            return true;
                        }
                    }
                }
                if(board.getTile(i,j).isTileOccupied()){
                    //console.log("got here 2");
                    tileSelected = [i,j];
                    possibleTiles = board.getTile(i,j).getPiece().getMoveInfo();
                    displayPossibleTiles();
                }
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