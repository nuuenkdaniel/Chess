let tiles = [];
let boardLength = 8;
let boardWidth = 8;

function tileSetUp(){
    let color = "FFFFFF";
    let otherColor = "A52A2A";
    for(let i = 0; i < boardWidth; i++){
        tile[i] = [];
        for(let j = 0; j < boardLength; j++){
            tile[i][j] = new Tile(j,i,color);
            let tempColor = color;
            color = otherColor;
            otherColor = tempColor;
        }
    }
}

function blackSetUp(){
    let color = "A52A2A";
    for(let i = 0; i < boardLength; i++){
        tile[1][i] = new Pawn(color, true);
    }
    tile[0][0] = new Rooke(color);
    tile[0][1] = new Knight(color);
    tile[0][2] = new Bishop(color);
    tile[0][3] = new Queen(color);
    tile[0][4] = new King(color);
    tile[0][5] = new Bishop(color);
    tile[0][6] = new Knight(color);
    tile[0][7] = new Rooke(color);
}

function whiteSetUp(){
    let color = "FFFFFF";
    for(let i = 0; i < boardLength; i++){
        tile[6][i] = new Pawn(color, true);
    }
    tile[7][0] = new Rooke(color);
    tile[7][1] = new Knight(color);
    tile[7][2] = new Bishop(color);
    tile[7][3] = new Queen(color);
    tile[7][4] = new King(color);
    tile[7][5] = new Bishop(color);
    tile[7][6] = new Knight(color);
    tile[7][7] = new Rooke(color);
}