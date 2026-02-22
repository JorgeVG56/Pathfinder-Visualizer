p5.prototype.BFS = class {
  run() {
    let steps = []
    
    const dx = [0, 1, 1, 1, 0, -1, -1, -1];
    const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
    
    let start = Global.grid.startCell;
    
    let queue = []; 
    queue.push(start);
    
    let vis = this.createVisited(); 
    vis[start.y][start.x] = true;
    
    while(queue.length > 0){
      let front = queue.shift();
      
      steps.push([front, 'processed']);
      
      if(front == Global.grid.endCell) break;
      
      for(let i = 0; i < 8; i++){
        if(!Global.directions.checked() && (i & 1)) continue;
        let nx = front.x + dx[i], ny = front.y + dy[i];
        
        if(this.isInvalid(nx, ny)) continue;
        
        if(vis[ny][nx]) continue;
        
        queue.push(Global.grid.cells[ny][nx]); 
        vis[ny][nx] = true;
        
        steps.push([Global.grid.cells[ny][nx], 'waiting']);
        Global.grid.cells[ny][nx].from = front;
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
