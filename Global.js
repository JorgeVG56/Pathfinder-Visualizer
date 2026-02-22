p5.prototype.Global = {
  colorTypes: {
    'empty': '#FFFFFF',
    'start': '#03A9F4',
    'end': '#FF00FF',
    'wall': '#000000',
    'waiting': '#80FF8080',
    'processed': '#FF808080',
    'path': '#FFFF00',
    'mud': '#705543'
  },
  terrainCost: {
    'empty': 10,
    'start': 10,
    'end': 10,
    'mud': 20
  },
  algorithms:{
    bfs: null,
    dfs: null,
    dijkstra: null,
    'a*': null
  },
  buttons:{
    'Start': null,
    'Clear': null
  },
  selector:{
    cell: null,
    algorithm: null,
    heuristic: null
  },
  stepByStep: null,
  directions: false,
  app:null,
  grid: null,
  animator: null,
  columns: 5, 
  rows: 5, 
  speed: 100,
  cellSize: 48,
  hasRun: false,
  finishedRun: false
}
