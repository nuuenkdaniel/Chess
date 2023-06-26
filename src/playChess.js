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
let whiteKing;
let blackKing;

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
}

/**
 * Combines all the possible moves of each piece
 * @param {string} color - the color opposite to the pieces you want to find the possible moves of
 * @return {Array} - Combination of the possible moves of each piece
 */
function checkedTiles(color){
    let possibleMoves = [];
    for(let i = 0; i < boardLength; i++){
        for(let e = 0; e < boardWidth; e++){
            if(board.getTile(i,e).getPiece() !== null){
                if(board.getTile(i,e).getPiece().getColor() !== color){
                    possibleMoves = possibleMoves.concat(board.getTile(i,e).getPiece().getMoveInfo("checkedTiles"));
                }
            }
        }
    }
    return possibleMoves;
}

/**
 * Filters the list of possible moves, removing any move that will put the king in check
 * @param {Array} possibleTiles - The list of possible moves that will be filtered
 * @param {Array} origin - The coordinates of the piece on the board corresponding to those possible moves
 * @return {Array} - The filtered list of possible moves
 */
function canMoveFilter(possibleTiles,origin){
    let piece = board.getTile(origin[0],origin[1]).getPiece();
    //If the first move does not put the king in check all other possible moves are allowed
    if(checkFirstPossibleMove(possibleTiles,origin,piece)) return possibleTiles;
    return moveAndCheck(possibleTiles,origin,piece);
}

/**
 * Checks the first move in the possibleTiles list to see if it will cause king to be checked
 * @param {Array} possibleTiles - the list of possible moves of a certain piece
 * @param {Array} origin - The coordinates of the piece corresponding to the possible moves
 * @param {piece} piece - The piece corresponding to the possible moves
 * @return {Boolean} - True if the king will not be checked; False if king will be checked
 */
function checkFirstPossibleMove(possibleTiles,origin,piece){
    board.getTile(origin[0],origin[1]).rmPiece();
    if(piece.getColor() === "white") {
        whiteKing.giveCheckedTiles(checkedTiles("white"));
        if(!whiteKing.isChecked()) {
            board.getTile(origin[0],origin[1]).plPiece(piece);
            whiteKing.giveCheckedTiles(checkedTiles("white"));
            return true;
        }
    }
    else{
        blackKing.giveCheckedTiles(checkedTiles("black"));
        if(!blackKing.isChecked()) {
            board.getTile(origin[0],origin[1]).plPiece(piece);
            whiteKing.giveCheckedTiles(checkedTiles("black"));
            return true;
        }
    }
    return false;
}

/**
 * Removes all moves that put king in check
 * @param {Array} possibleTiles - The list of possible moves
 * @param {Array} origin - The coordinates of the piece on the board corresponding to the possible moves
 * @param {piece} piece - The piece corresponding to the possible moves
 * @return {Array} - The modified list
 */
function moveAndCheck(possibleTiles,origin,piece){
    //Special case need to keep pawns, kings, or rookes initial state
    let pieces = ["pawn","king","rooke"];
    let firstMove;
    for(let j = 0; j < 3; j++) {
        if(piece.getType() === pieces[j]){
            firstMove = piece.isFirstMove();
            break;
        }
    }
    board.getTile(origin[0],origin[1]).plPiece(piece);
    for(let i = possibleTiles.length-1; i >= 0; i--) {
        //If another piece exists on the possible move, store info about that piece and place it back after the check
        if(board.getTile(possibleTiles[i][0],possibleTiles[i][1]).isTileOccupied()) {
            if(board.getTile(possibleTiles[i][0],possibleTiles[i][1]).getPiece().getColor() !== piece.getColor()){
                let piece2 = board.getTile(possibleTiles[i][0],possibleTiles[i][1]).getPiece();
                let tempPos = [possibleTiles[i][0],possibleTiles[i][1]];
                possibleTiles = canMoveChecks(possibleTiles,origin,piece,i);
                board.getTile(tempPos[0],tempPos[1]).plPiece(piece2);
            }
        }
        else {
            possibleTiles = canMoveChecks(possibleTiles,origin,piece,i);
        }
    }
    //reverts pawn, king, or rooke back to initial state
    for(let k = 0; k < 3; k++) {
        if(piece.getType() === pieces[k]){
            piece.setFirstMove(firstMove);
            break;
        }
    }
    return possibleTiles;
}

/**
 * Checks the the list of possible moves at the given index to see if it will put king in check and removes it if it does
 * @param {Array} possibleTiles - The list of possible moves
 * @param {Array} origin - The coordinates of the piece corresponding to the possible moves
 * @param {piece} piece - The piece corresponding to the possible moves
 * @param {Number} index - The index of the list being checked
 * @return {Array}- The modified list of possible moves
 */
function canMoveChecks(possibleTiles,origin,piece,index) {
    board.movePiece(origin[0],origin[1],possibleTiles[index][0],possibleTiles[index][1]);
    if(piece.getColor() === "white"){
        whiteKing.giveCheckedTiles(checkedTiles("white"));
        if(whiteKing.isChecked()) {
            board.movePiece(possibleTiles[index][0],possibleTiles[index][1],origin[0],origin[1]);
            possibleTiles.splice(index,1);
        }
        else{
            board.movePiece(possibleTiles[index][0],possibleTiles[index][1],origin[0],origin[1]);
        }
    }
    else{
        blackKing.giveCheckedTiles(checkedTiles("black"));
        if(blackKing.isChecked()) {
            board.movePiece(possibleTiles[index][0],possibleTiles[index][1],origin[0],origin[1]);
            possibleTiles.splice(index,1);
        }
        else{
            board.movePiece(possibleTiles[index][0],possibleTiles[index][1],origin[0],origin[1]);
        }
    }
    return possibleTiles;
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
    if(checkMate(blackKing)){  
        console.log("Black Checkmate!");
    }
    else if(checkMate(whiteKing)){
        console.log("White Checkmate!");
    }
}

/**
 * Checks if the king is in check and if any pieces can move if so the king is in checkmate
 * @param {King} king 
 * @return {Boolean} - true if king is checkmated; false if king is not checkmated
 */
function checkMate(king){
    let possibleMoves = [];
    for(let i = 0; i < boardLength; i++){
        for(let e = 0; e < boardWidth; e++){
            if(board.getTile(i,e).isTileOccupied()){
                if(board.getTile(i,e).getPiece().getColor() === king.getColor()){
                    possibleMoves = possibleMoves.concat(canMoveFilter(board.getTile(i,e).getPiece().getMoveInfo(),[i,e]));
                }
            }
        }
    }
    return (possibleMoves.length < 1 && king.isChecked())
}

function castlePressed(king,tile){
    console.log(king.getX());
    console.log(pieceSelected[0]);
    if(king.getX()+2 === pieceSelected[0] && board.getTile(tile[0],tile[1]).getPiece().getType() === "king") return "left";
    if(king.getX()-2 === pieceSelected[0] && board.getTile(tile[0],tile[1]).getPiece().getType() === "king") return "right";
    return;
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
                whiteKing.giveCheckedTiles(checkedTiles("white"));
                blackKing.giveCheckedTiles(checkedTiles("black"));
                if(turn === "white"){
                    if(board.getTile(tile[0],tile[1]).getPiece().getType() === "king" && castlePressed(whiteKing,tile) === "left") board.castle(whiteKing,"left");
                    else if(castlePressed(whiteKing,tile) === "right") board.castle(whiteKing,"right");
                    if(blackKing.isChecked()) {
                        console.log("black is checked");
                    }
                    turn = "black";
                }
                else{
                    if(board.getTile(tile[0],tile[1]).getPiece().getType() === "king" && castlePressed(blackKing,tile) === "left") board.castle(blackKing,"left");
                    else if(castlePressed(blackKing,tile) === "right") board.castle(blackKing,"right");
                    if(whiteKing.isChecked()) {
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
                board.getTile(tile[0],tile[1]).getPiece().giveCheckedTiles(checkedTiles(turn));
                board.getTile(tile[0],tile[1]).setTileOccupied(true);
            }
            possibleTiles = board.getTile(tile[0],tile[1]).getPiece().getMoveInfo();
            pieceSelected = tile;
            possibleTiles = canMoveFilter(possibleTiles,tile);
            displayPossibleTiles();
            return true;
        }
    }
    return false;
}

//Main
board.defaultBoardSetUp();
whiteKing = board.getTile(4,7).getPiece();
blackKing = board.getTile(4,0).getPiece();

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