class Piece{
    constructor(color){
        if(constructor == Piece){
            throw new error("Abstract classes can't be instantiated.");
        }
        this.color = color;
    }
    
    getColor(){
        return this.color;
    }
    getMoveInfo(){
        throw new error("Method 'moveInfo()' must be implemented");
    }
}