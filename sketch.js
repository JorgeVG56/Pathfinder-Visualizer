function setup (){
  createCanvas(Global.columns * Global.cellSize, Global.rows * Global.cellSize)
    .parent("canvas-container");
  
  document.querySelector('canvas').addEventListener('contextmenu', e => e.preventDefault())
  
  Global.app = new App();
}

function draw(){
  Global.app.drawApp();
}