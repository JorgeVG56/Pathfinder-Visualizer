p5.prototype.App = class {
  constructor() {
    this.createSearchAlgorithms();
    
    this.createNewSelect('cell', ['🟦 Start', '🟥 End', '⬛️ Wall', '🟫 Mud']);
    this.createNewSelect('algorithm', ['BFS', 'DFS', 'Dijkstra', 'A*']);
    this.createNewSelect('heuristic', ['Manhattan', 'Euclidiana', 'Diagonal']);
    
    Global.directions = createCheckbox('8 Directions').parent('ui');
    
    this.createNewInput('Rows', this.onRowsChange, 5);
    this.createNewInput('Columns', this.onColumnsChange, 5);
    this.createNewInput('Speed', this.onSpeedChange, 100);
    
    let group = createDiv()
      .parent("ui")
      .style("display", "flex")
      .style("gap", "8px");
    
    Global.stepByStep = createCheckbox('Step By Step')
      .parent(group)
      .style('width', '140px');
    
    createButton('Next Step')
      .parent(group)
      .style('width', '80px')
      .mousePressed( (e) => { 
        if(Global.animator.timeoutId == null)
          Global.animator.animate(Global.speed) 
      } );
    
    this.createNewButton('Start', this.runSearch);
    this.createNewButton('Clear', this.restart);
    
    Global.grid = new Grid();
    Global.animator = new Animator();
  }
  
  createNewInput(label, action, val){
    let group = createDiv()
    .parent("ui")
    .style('display', 'flex');
    
    createSpan(label + ': ')
      .parent(group)
      .style('width', '170px');
    
    let newInput = createInput()
      .parent(group)
      .attribute('type', 'number')
      .style('width', '48px');
    
    newInput.value(val)
      .input(() => action(newInput));
  }
  
  onRowsChange(input){
    Global.rows = int(input.value());
    Global.app.restart();
  }
  
  onColumnsChange(input){
    Global.columns = int(input.value());
    Global.app.restart();
  }
  
  onSpeedChange(input){
    Global.speed = int(input.value());
  }
  
  createSearchAlgorithms(){
    Global.algorithms.bfs = new BFS();
    Global.algorithms.dfs = new DFS();
    Global.algorithms.dijkstra = new Dijkstra();
    Global.algorithms['a*'] = new AStar();
  }
  
  createNewSelect(name, options){
    Global.selector[name] = createSelect().parent('ui');
    options.forEach((option) => Global.selector[name].option(option));
    Global.selector[name].mousePressed((e) => e.stopPropagation());
  }
  
  createNewButton(label, action){
    Global.buttons[label] = createButton(label).parent('ui');
    Global.buttons[label].mousePressed((e) => action());
  }
  
  runSearch(){
    if(Global.hasRun){
      Global.grid.resetGrid();
      Global.hasRun = false;
      Global.finishedRun = false;
      Global.buttons.Start.html('Start');
      return;
    } 
    
    if(!Global.grid.startCell || !Global.grid.endCell){
      alert('There must be a 🟦 start and a 🟥 end');
      return;
    }
    
    let algorithmSelected = Global.selector.algorithm
      .value()
      .toLowerCase();
    
    let steps = Global.algorithms[algorithmSelected].run();
    
    Global.animator.run(steps);
    
    Global.buttons.Start.html('Reset');
  }
  
  restart(){
    Global.hasRun = false;
    Global.finishedRun = false;   
    Global.buttons.Start.html('Start');
    
    Global.grid = new Grid();
  
    resizeCanvas(
      Global.columns * Global.cellSize,
      Global.rows * Global.cellSize
    );
  }
  
  drawApp(){
    Global.grid.drawGrid();
  }
}
