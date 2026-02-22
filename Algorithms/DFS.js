p5.prototype.DFS = class {
  run() {
    let steps = []
    
    const dx = [0, 1, 1, 1, 0, -1, -1, -1];
    const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
    
    let start = Global.grid.startCell;
    
    let stack = []; 
    stack.push(start);
    
    let vis = this.createVisited();
    
    while(stack.length > 0){
      let top = stack.pop();
      
      if(vis[top.y][top.x]) continue;
      vis[top.y][top.x] = true;
      
      steps.push([top, 'processed']);
      
      if(top == Global.grid.endCell) break;
      
      for(let i = 7; i >= 0; i--){
        if(!Global.directions.checked() && (i & 1)) continue;
        
        let nx = top.x + dx[i], ny = top.y + dy[i];
        
        if(this.isInvalid(nx, ny)) continue;
        
        if(vis[ny][nx]) continue;
        
        stack.push(Global.grid.cells[ny][nx]);
        
        Global.grid.cells[ny][nx].from = top;
      }
    }
    
    return steps;
  }
  
  isInvalid(x, y){
    return x < 0 || x >= Global.columns ||
           y < 0 || y >= Global.rows || 
           Global.grid.cells[y][x].type == 'wall';
  }
  
  createVisited(){
    let vis = [];

    for (let i = 0; i < Global.rows; i++) {
      vis.push([]);
      for (let j = 0; j < Global.columns; j++) {
        vis[i].push(false);
      }
    }
    
    return vis;
  }
}
