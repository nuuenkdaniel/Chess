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
    let 
}