p5.prototype.Cell = class {
  constructor(x, y) {
    this.type = 'empty';
    this.from = null;
    this.x = x;
    this.y = y;
    this.value = -1;
    this.cost = -1;
    this.heuristic = -1;
    this.isWaiting = false;
    this.isProcessed = false;
  }

  resetCell() {
    this.from = null;
    this.value = -1;
    this.cost = -1;
    this.heuristic = -1;
    this.isWaiting = false;
    this.isProcessed = false;
  }
  
  drawCell(){
    fill(Global.colorTypes[this.type]);
    let posX = this.x * Global.cellSize;
    let posY = this.y * Global.cellSize;
        
    fill(Global.colorTypes[this.type]);
    square(posX, posY, Global.cellSize);
    
    if(this.isProcessed){
      fill(Global.colorTypes.processed);
      square(posX, posY, Global.cellSize);
    } else if(this.isWaiting){
      fill(Global.colorTypes.waiting);
      square(posX, posY, Global.cellSize);
    }
    
    if(this.value >= 0){
      textSize(Global.cellSize * 0.33);
      fill('#0000000');
      text(this.value, 
           posX + Global.cellSize * 0.30, 
           posY + Global.cellSize * 0.66);
    }
    
    if(this.cost >= 0){
      textSize(Global.cellSize * 0.16);
      fill('#0000000');
      text(this.cost, 
           posX + Global.cellSize * 0.10, 
           posY + Global.cellSize * 0.20);
    }
    
    if(this.heuristic >= 0){
      textSize(Global.cellSize * 0.16);
      fill('#0000000');
      text(this.heuristic, 
           posX + Global.cellSize * 0.75, 
           posY + Global.cellSize * 0.20);
    }
  }
}
