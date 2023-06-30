const boardLength = 8;
const boardWidth = 8;
const tileSize = 70;
const gridXOffSet = screen.width/2 - boardLength/2*tileSize;
const gridYOffSet = screen.height/2 - boardWidth/2*tileSize;
const board = new ChessBoard(boardLength, boardWidth, tileSize);
const [a,b,c,d,e,f,g,h] = [0,1,2,3,4,5,6,7,8];
let promotionBoard = [];
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
                possibleMovesPressedSection(tile);
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
 * Castles when king is moved 2 spaces
 * Checks whether king is checked
 * Ends the turn and changes turns to the opposite color
 * @param {Tile} tile - A tile on the chessboard
 */
function possibleMovesPressedSection(tile){
    let king = (turn === "white")? board.whiteKing : board.blackKing;
    turn = (turn === "white")? "black" : "white";
    if(board.getTile(tile[0],tile[1]).getPiece().getType() === "king" && castlePressed(king,tile) === "left") board.castle(king,"left");
    else if(castlePressed(king,tile) === "right") board.castle(king,"right");
    if(turn === "black" && board.blackKing.isChecked()) console.log("black is checked");
    else if(turn === "white" && board.whiteKing.isChecked()) console.log("white is checked");
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

// Creates the board that contains the pieces that a pawn can promote to
function createPromotionBoard(){
    let pieces = [new Bishop(null,0,0,board),new Knight(null,1,0,board),new Rooke(null,2,0,board),new Queen(null,3,0,board)];
    for(let i = 0; i < 4; i++) promotionBoard[i] = new Tile(i,0,"#A52A2A",tileSize,pieces[i]);
}

/**
 * Draws the board displaying the pieces the pawn can promote to 
 * @param {*} color - the color of the promoting pawn
 */
function drawPromotionBoard(color){
    for(let i = 0; i < 4; i++){
        const tileX = board.getTile(7,i).getX() + tileSize*2;
        const tileY = board.getTile(7,i).getY();
        promotionBoard[i].giveX(tileX);
        promotionBoard[i].giveY(tileY);
        promotionBoard[i].getPiece().giveColor(color);
        fill("#A52A2A");
        rect(tileX,tileY,tileSize);
        drawPiece(promotionBoard[i]);
    }
}

//Main
function preload(){
    chessPieces = loadImage('src/assets/ChessPieces.png');
}

function setup(){
    createCanvas(displayWidth,displayHeight);
    background(0);
    board.defaultBoardSetUp();
    createPromotionBoard();
}

function draw(){
    drawBoard();
    mousePressedHandler();
    displayPossibleTiles();
}