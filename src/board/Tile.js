class Tile{
    constructor(tileX, tileY, color, tileSize, piece = null){
        this.tileY = tileY;
        this.tileX = tileX;
        this.tileOccupied = (piece === null) ? false : true;
        this.color = color;
        this.tileSize = tileSize;
        this.piece = piece;
        this.x = 0;
        this.y = 0;
    }
    
    getTileX(){
        return this.tileX;
    }
    getTileY(){
        return this.tileY;
    }
    isTileOccupied(){
        return this.tileOccupied;
    }
    getColor(){
        return this.color;
    }
    getPiece(){
        return this.piece;
    }
    plPiece(piece){
        this.piece = piece;
        this.tileOccupied = true;
    }
    rmPiece(){
        this.piece = null;
        this.tileOccupied = false;
    }
    giveX(x){
        this.x = x;
    }
    getX(){
        return this.x;
    }
    giveY(y){
        this.y = y;
    }
    getY(){
        return this.y;
    }
    isClicked(){
        return ((mouseX < this.x+this.tileSize) && (mouseX > this.x) && (mouseY < this.y+this.tileSize) && (mouseY > this.y));
    }
}
