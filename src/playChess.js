const boardLength = 8;
const boardWidth = 8;
const tileSize = 70;
const gridXOffSet = screen.width/2 - boardLength/2*tileSize;
const gridYOffSet = screen.height/2 - boardWidth/2*tileSize;
const board = new ChessBoard(boardLength, boardWidth, tileSize);
let tileSelected = [];
let possibleTiles = [];
let pieceSelected = [];
let turn = "white";
let chessPieces;

//Draws the tiles for the chess board
function drawBoard(){
    for(let i = 0; i < boardLength; i++){
        for(let j = 0; j < boardWidth; j++){
            const tileX = i * tileSize + gridXOffSet;
            const tileY = j * tileSize + gridYOffSet;
            board.getTile(i,j).giveX(tileX);
            board.getTile(i,j).giveY(tileY);
            fill(board.getTile(i,j).getColor());
            rect(tileX,tileY,tileSize);
            drawPiece(board.getTile(i,j));
        }
    }
    drawLetterCoords();
    drawNumCoords();
}

/**
 * Draws the image of the piece at the given tile on the chess board
 * @param {Tile} tile - A tile on the chess board
 */
function drawPiece(tile){
    let piece = tile.getPiece()
    if (!piece) return;
    let colorYOffSet = piece.getColor() === "white"? 0 : 333
    switch(piece.getType()){
        case "king":
            image(chessPieces, tile.getX(), tile.getY(), tileSize, tileSize, 0, colorYOffSet, 333, 333);
            break;
        case "queen":
            image(chessPieces, tile.getX(), tile.getY(), tileSize, tileSize, 333, colorYOffSet, 333, 333);
            break;
        case "bishop":
            image(chessPieces, tile.getX(), tile.getY(), tileSize, tileSize, 666, colorYOffSet, 333, 333);
            break;
        case "knight":
            image(chessPieces, tile.getX(), tile.getY(), tileSize, tileSize, 999, colorYOffSet, 333, 333);
            break;
        case "rooke":
            image(chessPieces, tile.getX(), tile.getY(), tileSize, tileSize, 1332, colorYOffSet, 333, 333);
            break;
        case "pawn":
            image(chessPieces, tile.getX(), tile.getY(), tileSize, tileSize, 1665, colorYOffSet, 333, 333);
            break;
    }
}

//draws the letter coordinates at the bottom of the board
function drawLetterCoords(){
    const letterCords = ['a','b','c','d','e','f','g','h'];
    const yPixel = board.getTile(0,boardWidth-1).getY()+tileSize+20;
    for(let i = 0; i < boardLength; i++) {
        const xPixel = board.getTile(i,0).getX()+tileSize/2-6;
        fill("#FFFFFF");
        textSize(20);
        text(letterCords[i],xPixel,yPixel);
    }
}

//draws the number coordinates on th left of the board
function drawNumCoords(){
    const xPixel = board.getTile(0,0).getX()-20;
    for(let i = boardWidth-1; i >= 0; i--) {
        const yPixel = board.getTile(0,i).getY()+tileSize/2+6;
        fill("#FFFFFF");
        textSize(20);
        text(str(boardWidth-i),xPixel,yPixel);
    }
}

//Event handler for when mouse pressed
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

/**
 * Checks if a tile was pressed and returns the tile pressed
 * If tile not pressed clear the selected piece and possible moves
 * @return {Array}- The tile that was pressed or an empty array if no tile pressed
 */
function tilePressed(){
    for(let i = 0; i < boardLength; i++){
        for(let j = 0; j < boardWidth; j++){
            if(board.getTile(i,j).isClicked()){
                return [i,j];
            }
        }
    }
    possibleTiles = [];
    pieceSelected = [];
    return [];
}

/**
 * Checks if a possible move for the selected piece was pressed and moves it to the possible moves the piece
 * Clear selected pieces and possible moves if possible move was pressed
 * Checks if the king is checked or checkmated
 * Swtiches the turn
 * @param {Tile} tile - A tile on the chess board
 * @return {Boolean} - True if a possible move was pressed; False if not
 */
function possibleMovePressed(tile){
    if(pieceSelected.length > 0){
        for(let tiles of possibleTiles){
            if((tiles[0] === tile[0]) && (tiles[1] === tile[1])){
                board.movePiece(pieceSelected[0],pieceSelected[1],tile[0],tile[1]);
                gameOver();
                board.whiteKing.giveCheckedTiles(board.checkedTiles("white"));
                board.blackKing.giveCheckedTiles(board.checkedTiles("black"));
                if(turn === "white"){
                    if(board.getTile(tile[0],tile[1]).getPiece().getType() === "king" && castlePressed(board.whiteKing,tile) === "left") board.castle(board.whiteKing,"left");
                    else if(castlePressed(board.whiteKing,tile) === "right") board.castle(board.whiteKing,"right");
                    if(board.blackKing.isChecked()) {
                        console.log("black is checked");
                    }
                    turn = "black";
                }
                else{
                    if(board.getTile(tile[0],tile[1]).getPiece().getType() === "king" && castlePressed(board.blackKing,tile) === "left") board.castle(board.blackKing,"left");
                    else if(castlePressed(board.blackKing,tile) === "right") board.castle(board.blackKing,"right");
                    if(board.whiteKing.isChecked()) {
                        console.log("white is checked");
                    }
                    turn = "white";
                }
                tileSelected = [];
                possibleTiles = [];
                pieceSelected = [];
                return true;
            }
        }
    }
    possibleTiles = [];
    return false;
}

/**
 * Gets the possible moves if there is a piece on the selected tile and displays them
 * @param {Tile} tile - A tile on the chess board
 * @return - True if the piece exists and is same color as the persons turn; False otherwise
 */
function setPossibleTiles(tile){
    if(board.getTile(tile[0],tile[1]).isTileOccupied()){
        if(board.getTile(tile[0],tile[1]).getPiece().getColor() == turn){
            if(board.getTile(tile[0],tile[1]).getPiece().getType() === "king"){
                board.getTile(tile[0],tile[1]).setTileOccupied(false);
                board.getTile(tile[0],tile[1]).getPiece().giveCheckedTiles(board.checkedTiles(turn));
                board.getTile(tile[0],tile[1]).setTileOccupied(true);
            }
            possibleTiles = board.getTile(tile[0],tile[1]).getPiece().getMoveInfo();
            pieceSelected = tile;
            possibleTiles = board.canMoveFilter(possibleTiles,tile);
            displayPossibleTiles();
            return true;
        }
    }
    return false;
}

//Draws green tiles over the chess board, of possible moves of the selected piece
function displayPossibleTiles(){
    for(let tile of possibleTiles){
        const tileX = tile[0] * tileSize + gridXOffSet;
        const tileY = tile[1] * tileSize + gridYOffSet;
        fill("#00FF00");
        rect(tileX,tileY,tileSize);
        drawPiece(board.getTile(tile[0],tile[1]));
    }
}

//Displays gameover screen if king is in checkmate
function gameOver(){
    if(board.checkMate(board.blackKing)){  
        console.log("Black Checkmate!");
    }
    else if(board.checkMate(board.whiteKing)){
        console.log("White Checkmate!");
    }
}

function castlePressed(king,tile){
    if(king.getX()+2 === pieceSelected[0] && board.getTile(tile[0],tile[1]).getPiece().getType() === "king") return "left";
    if(king.getX()-2 === pieceSelected[0] && board.getTile(tile[0],tile[1]).getPiece().getType() === "king") return "right";
}

//Main
board.defaultBoardSetUp();

function preload(){
    chessPieces = loadImage('src/assets/ChessPieces.png');
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