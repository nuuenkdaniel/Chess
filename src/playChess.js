const boardLength = 8;
const boardWidth = 8;
const tileSize = 70;
const gridXOffSet = screen.width/2 - boardLength/2*tileSize;
const gridYOffSet = screen.height/2 - boardWidth/2*tileSize;
const board = new ChessBoard(boardLength, boardWidth, tileSize);
let tileSelected = [];
let possibleTiles = [];
let pieceSelected = [];

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
        tileSelected = tilePressed();
        if(tileSelected.length>0){
            if(!possibleMovePressed(tileSelected)){
                setPossibleTiles(tileSelected);
            }
        }
    }
}

function tilePressed(){
    for(let i = 0; i < boardLength; i++){
        for(let j = 0; j < boardWidth; j++){
            if(board.getTile(i,j).isClicked()){
                console.log("("+i+","+j+"): was clicked");
                return [i,j];
            }
        }
    }
    possibleTiles = [];
    pieceSelected = [];
    return [];
}

function possibleMovePressed(tile){
    if(pieceSelected.length > 0){
        for(let tiles of possibleTiles){
            if((tiles[0] === tile[0]) && (tiles[1] === tile[1])){
                board.movePiece(pieceSelected[0],pieceSelected[1],tile[0],tile[1]);
                tileSelected = [];
                possibleTiles = [];
                pieceSelected = [];
                return true;
            }
        }
    }
    return false;
}

function setPossibleTiles(tile){
    if(board.getTile(tile[0],tile[1]).isTileOccupied()){
        possibleTiles = board.getTile(tile[0],tile[1]).getPiece().getMoveInfo();
        pieceSelected = tile;
        displayPossibleTiles();
        return true;
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