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

//draws the tiles
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

//returns all the possible moves of the opposing color to the color given
function checkedTiles(color){
    let possibleMoves = [];
    //loops through every tile on the board, if piece exists on tile and is the opposite color then add its possible moves to the list
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

function isKingChecked(king){
    for(let tiles of king.getCheckedTiles()){
        if(tiles[0] === king.getX() && tiles[1] === king.getY()){
            return true;
        }
    }
    return false;
}

function canMove(possibleTiles,origin){
    let piece = board.getTile(origin[0],origin[1]).getPiece();
    board.getTile(origin[0],origin[1]).rmPiece();
    if(piece.getColor() === "white") {
        whiteKing.giveCheckedTiles(checkedTiles("white"));
        if(!isKingChecked(whiteKing)) {
            board.getTile(origin[0],origin[1]).plPiece(piece);
            whiteKing.giveCheckedTiles(checkedTiles("white"));
            return possibleTiles;
        }
    }
    else{
        blackKing.giveCheckedTiles(checkedTiles("black"));
        if(!isKingChecked(blackKing)) {
            board.getTile(origin[0],origin[1]).plPiece(piece);
            whiteKing.giveCheckedTiles(checkedTiles("black"));
            return possibleTiles;
        }
    }

    let firstMove;
    if(piece.getType() === "pawn"){
        firstMove = piece.isFirstMove();
    }
    board.getTile(origin[0],origin[1]).plPiece(piece);
    for(let i = possibleTiles.length-1; i >= 0; i--) {
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
    if(piece.getType() === "pawn"){
        piece.setFirstMove(firstMove);
    }
    return possibleTiles;
}

function canMoveChecks(possibleTiles,origin,piece,index) {
    board.movePiece(origin[0],origin[1],possibleTiles[index][0],possibleTiles[index][1]);
    if(piece.getColor() === "white"){
        whiteKing.giveCheckedTiles(checkedTiles("white"));
        if(isKingChecked(whiteKing)) {
            board.movePiece(possibleTiles[index][0],possibleTiles[index][1],origin[0],origin[1]);
            possibleTiles.splice(index,1);
        }
        else{
            board.movePiece(possibleTiles[index][0],possibleTiles[index][1],origin[0],origin[1]);
        }
    }
    else{
        blackKing.giveCheckedTiles(checkedTiles("black"));
        if(isKingChecked(blackKing)) {
            board.movePiece(possibleTiles[index][0],possibleTiles[index][1],origin[0],origin[1]);
            possibleTiles.splice(index,1);
        }
        else{
            board.movePiece(possibleTiles[index][0],possibleTiles[index][1],origin[0],origin[1]);
        }
    }
    return possibleTiles;
}

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

function displayPossibleTiles(){
    for(let tile of possibleTiles){
        const tileX = tile[0] * tileSize + gridXOffSet;
        const tileY = tile[1] * tileSize + gridYOffSet;
        fill("#00FF00");
        rect(tileX,tileY,tileSize);
        drawPiece(board.getTile(tile[0],tile[1]));
    }
}

function gameOver(){
    if(checkMate(blackKing)){  
        console.log("Black Checkmate!");
    }
    else if(checkMate(whiteKing)){
        console.log("White Checkmate!");
    }
}

function checkMate(king){
    let possibleMoves = [];
    for(let i = 0; i < boardLength; i++){
        for(let e = 0; e < boardWidth; e++){
            if(board.getTile(i,e).isTileOccupied()){
                if(board.getTile(i,e).getPiece().getColor() === king.getColor()){
                    possibleMoves = possibleMoves.concat(canMove(board.getTile(i,e).getPiece().getMoveInfo(),[i,e]));
                }
            }
        }
    }
    if((possibleMoves.length < 1) && isKingChecked(king)){
        return true;
    }
    return false;
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
                //console.log("("+i+","+j+"): was clicked");
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
                gameOver();
                tileSelected = [];
                possibleTiles = [];
                pieceSelected = [];
                whiteKing.giveCheckedTiles(checkedTiles("white"));
                blackKing.giveCheckedTiles(checkedTiles("black"));
                if(turn === "white"){
                    if(isKingChecked(blackKing)) {
                        console.log("black is checked");
                    }
                    turn = "black";
                }
                else{
                    if(isKingChecked(whiteKing)) {
                        console.log("white is checked");
                    }
                    turn = "white";
                }
                return true;
            }
        }
    }
    possibleTiles = [];
    return false;
}

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
            possibleTiles = canMove(possibleTiles,tile);
            displayPossibleTiles();
            return true;
        }
    }
    return false;
}

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