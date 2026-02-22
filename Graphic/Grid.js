p5.prototype.Grid = class {
  constructor() {
    this.createGrid();
    this.startCell = null;
    this.endCell = null;
  }

  createGrid() {
    this.cells = [];

    for (let i = 0; i < Global.rows; i++) {
      this.cells.push([]);
      for (let j = 0; j < Global.columns; j++) {
        this.cells[i].push(new Cell(j, i, Global.cellSize));
      }
    }
  }

  resetGrid() {
    for (let i = 0; i < Global.rows; i++)
      for (let j = 0; j < Global.columns; j++)
        this.cells[i][j].resetCell();
  }
  
  drawGrid(){
    background('#FFFFFF'); 
    stroke('#000000'); strokeWeight(2);
    for(let i = 1; i < Global.columns; i++)
      line(Global.cellSize * i, 0, 
           Global.cellSize * i, Global.rows * Global.cellSize);
    
    for(let i = 1; i < Global.rows; i++)
      line(0, Global.cellSize * i, 
           Global.columns * Global.cellSize, Global.cellSize * i);
    
    for(let i = 0; i < Global.rows; i++)
      for(let j = 0; j < Global.columns; j++)
        this.cells[i][j].drawCell();
    
    if(Global.hasRun) {
      if(Global.finishedRun) this.drawPath();
      return;
    }
    
    if(mouseIsPressed) this.paintCell();
    else this.drawHover();
  }
  
  drawPath(){
    stroke(Global.colorTypes.path);
    strokeWeight(4);
    
    let current = this.endCell;
    while(current.from){
      line(current.x * Global.cellSize + Global.cellSize / 2,
           current.y * Global.cellSize + Global.cellSize / 2,
           current.from.x * Global.cellSize + Global.cellSize / 2,
           current.from.y * Global.cellSize + Global.cellSize / 2);
      current = current.from;
    }
  }
  
  paintCell(){
    if(this.currentCell() == null) return;
    
    let value = Global.selector.cell.value()
      .split(' ')[1]
      .toLowerCase();
    
    if(mouseButton == 'right') value = 'empty';
    
    if(value != 'start' && this.startCell == this.currentCell())
      this.startCell = null;
    
    if(value != 'end' && this.endCell == this.currentCell())
      this.endCell = null;
    
    if(value == 'start'){
      if(this.startCell) this.startCell.type = 'empty';
      this.startCell = this.currentCell();
    } else if(value == 'end'){
      if(this.endCell) this.endCell.type = 'empty';
      this.endCell = this.currentCell();
    }
    
    this.currentCell().type = value;
  }
  
  drawHover(){
    let posX = (mouseX / Global.cellSize) | 0, posY = (mouseY / Global.cellSize) | 0;
    
    if(this.currentCell() == null) return;
    
    let value = Global.selector.cell.value()
      .split(' ')[1]
      .toLowerCase();
    
    fill(Global.colorTypes[value] + '80');
    square(posX * Global.cellSize, posY * Global.cellSize, Global.cellSize);
  }
  
  currentCell(){
    let posX = (mouseX / Global.cellSize) | 0, posY = (mouseY / Global.cellSize) | 0;
    
    if(mouseX >= 0 && mouseY >= 0 && 
       posX >= 0 && posX < Global.columns &&
       posY >= 0 && posY < Global.rows)
      return this.cells[posY][posX];
    
    return null;
  }
}
