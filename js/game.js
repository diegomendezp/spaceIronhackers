function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.reset();
}

Game.prototype.start = function(delta) {
  this.clear();
  this.draw();
  this.moveAll(delta);
  /*
    this.clearObstacles();
    
    if (this.isCollision()) {
      this.gameOver();
    }*/
  this.isCollisionInvader()
  window.requestAnimationFrame(this.start.bind(this));
};

Game.prototype.gameOver = function() {
  if (
    confirm(
      "GAME OVER. Your score is: " +
        Math.floor(this.score.toFixed(0)) +
        " points. Play again?"
    )
  ) {
    this.reset();
    this.start.bind(this);
  } else {
    location.reload();
    window.scrollTo(0, -document.body.scrollHeight);
  }
};

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
  this.invaders = [];
  this.generateInvaders(); 
};


Game.prototype.generateInvaders = function() {
  var pos1 = 200;
  var pos2 = 200;
  for (var i = 0; i < INVADERS; i++) {
    if (i % 2 == 0) {
      this.invaders.push(new Invader(this, 100 + pos1, 0, this.player));
      pos1 += 75;
    } else {
      this.invaders.push(new Invader(this, 100 + pos2, 70, this.player));
      pos2 += 75;
    }
  }
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.invaders.forEach(element => {
    element.draw();
  });
  
};

Game.prototype.moveAll = function(delta) {
  this.background.move();
  this.player.move(delta);
  this.invaders.forEach(element => {
    element.move();
  });
};

Game.prototype.isCollisionInvader = function(){
  var invaders = this.invaders;
  this.invaders.forEach(function(invader){
    if(invader.isCollision()){
      invader.player.bullets.splice(invader.player.bullets.indexOf(invader.bullet), 1)
      invaders.splice(invaders.indexOf(invader), 1);
    }
  })
}

var INVADERS = 10;
