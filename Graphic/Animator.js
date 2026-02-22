p5.prototype.Animator = class {
  constructor() {
    this.steps = [];
    this.index = 0;
    this.timeoutId = null;
  }

  run(steps) {
    Global.hasRun = true;
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    this.steps = steps;
    this.index = 0;
    
    this.animate(Global.speed);
  }

  animate(speed) {
    if (!Global.hasRun) return;
    
    if(this.index >= this.steps.length){
      Global.finishedRun = true;
      return; 
    }

    const step = this.steps[this.index];

    if(step[1] == 'waiting') step[0].isWaiting = true;
    if(step[1] == 'processed') step[0].isProcessed = true;
    
    if(step[2] != undefined)
      step[0].value = step[2];
    
    if(step[3] != undefined)
      step[0].cost = step[3];
    
    if(step[4] != undefined)
      step[0].heuristic = step[4];

    this.index++;
    if(Global.stepByStep.checked()) 
      this.timeoutId = null;
    else 
      this.timeoutId = setTimeout(() => this.animate(speed), speed);
  }
}
