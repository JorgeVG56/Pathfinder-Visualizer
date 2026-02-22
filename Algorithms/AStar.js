p5.prototype.AStar = class {
  run() {
    let steps = []
    
    const dx = [0, 1, 1, 1, 0, -1, -1, -1];
    const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
    
    let start = Global.grid.startCell;
    
    let priorityQueue = [];
    
    let cost = 0;
    let heuristic = this.calcHeuristic(start.x, start.y);
    let total = cost + heuristic;
    
    steps.push([start, 'waiting', total, cost, heuristic]);
    
    this.pushToPQ(priorityQueue, [start, total, cost]);
    
    let vis = this.createVisited();
    vis[start.y][start.x] = total;
    
    while(priorityQueue.length > 0){
      let top = priorityQueue.pop();
      
      if(top[1] > vis[top[0].y][top[0].x]) continue;
      
      steps.push([top[0], 'processed']);
      
      if(top[0] == Global.grid.endCell) break;
      
      for(let i = 0; i < 8; i++){
        if(!Global.directions.checked() && (i & 1)) continue;
        let nx = top[0].x + dx[i], ny = top[0].y + dy[i];
        
        if(this.isInvalid(nx, ny)) continue;
        
        let targetCell = Global.grid.cells[ny][nx];
        
        let cost = top[2] + Global.terrainCost[targetCell.type];
        if(i & 1) cost += Global.terrainCost[targetCell.type] * 0.4;
        let heuristic = this.calcHeuristic(nx, ny);
        let total = cost + heuristic;
        
        if(total >= vis[ny][nx]) continue;
          
        vis[ny][nx] = total;
        this.pushToPQ(priorityQueue, [targetCell, total, cost]);
        
        steps.push([targetCell, 'waiting', total, cost, heuristic]);
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
  
  calcHeuristic(x, y){
    let value = Global.selector.heuristic.value().toLowerCase();
    let end = Global.grid.endCell;
    
    let dx = abs(x - end.x), dy = abs(y - end.y);
      
    if(value == 'manhattan')
      return (dx + dy) * 10;
    else if(value == 'diagonal')
      return min(dx, dy) * 14 + abs(dx - dy) * 10;
    else 
      return (sqrt(dx * dx + dy * dy) * 10) | 0;
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
