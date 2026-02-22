p5.prototype.Dijkstra = class {
  run() {
    let steps = []
    
    const dx = [0, 1, 1, 1, 0, -1, -1, -1];
    const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
    
    let start = Global.grid.startCell;
    
    let priorityQueue = [];
    this.pushToPQ(priorityQueue, [start, 0]);
    
    let vis = this.createVisited();
    vis[start.y][start.x] = 0;
    
    while(priorityQueue.length > 0){
      let top = priorityQueue.pop();
      
      if(top[1] > vis[top[0].y][top[0].x]) continue;
      
      steps.push([top[0], 'processed', top[1]]);
      
      if(top[0] == Global.grid.endCell) break;
      
      for(let i = 0; i < 8; i++){
        if(!Global.directions.checked() && (i & 1)) continue;
        let nx = top[0].x + dx[i], ny = top[0].y + dy[i];
        
        if(this.isInvalid(nx, ny)) continue;
        
        let targetCell = Global.grid.cells[ny][nx];
        
        let cost = Global.terrainCost[targetCell.type];
        if(i & 1) cost *= 1.4;
        
        if(top[1] + cost >= vis[ny][nx]) continue;
          
        vis[ny][nx] = top[1] + cost;
        this.pushToPQ(priorityQueue, [targetCell, top[1] + cost]);
        
        steps.push([targetCell, 'waiting', top[1] + cost]);
        targetCell.from = top[0];
      }
    }
    
    return steps;
  }
  
  isInvalid(x, y){
    return x < 0 || x >= Global.columns ||
           y < 0 || y >= Global.rows || 
           Global.grid.cells[y][x].type == 'wall';
  }
  
  pushToPQ(priorityQueue, item){
    let fl = false;

    for (let i = 0; i < priorityQueue.length; i++) {
      if (priorityQueue[i][1] < item[1]) {
        priorityQueue.splice(i, 0, item);
        fl = true;
        break;
      }
    }

    if (!fl) {
      priorityQueue.push(item);
    }
  }
  
  createVisited(){
    let vis = [];

    for (let i = 0; i < Global.rows; i++) {
      vis.push([]);
      for (let j = 0; j < Global.columns; j++) {
        vis[i].push(100000);
      }
    }
    
    return vis;
  }
}