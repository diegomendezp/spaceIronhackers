function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.reset();
}

Game.prototype.start = function(delta) {
  this.clear();
  this.framesCounter++;
  if (this.framesCounter > 1000) {
    this.framesCounter = 0;
  }
  if (this.framesCounter % 250 === 0) {
    this.invaderFall()
  }
  if (this.framesCounter % 50 === 0) {
    this.invaderShoot();
  }
  this.draw();
  this.moveAll(delta);
  this.isCollisionInvader();
  this.isCollisionPlayer();
  this.isCollisionObstacle()
  if(this.invaders.length == 0){
    this.youWin()
  }
  if(this.player.lifes == 0){
    this.gameOver()
  }
  window.requestAnimationFrame(this.start.bind(this));
};

Game.prototype.gameOver = function() {
  if (
    confirm(
      "GAME OVER. Play again?"
    )
  ) {
    this.reset();
    this.start.bind(this);
  } else {
    location.reload();
    window.scrollTo(0, -document.body.scrollHeight);
  }
};

Game.prototype.youWin = function() {
  if (
    confirm(
      "You win. Play again?"
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
  this.framesCounter = 0;
  this.score =0;
  this.background = new Background(this);
  this.invaders = [];
  this.obstacles = []
  this.player = new Player(this, this.invaders, PLAYERLIFES);
  this.generateInvaders();
  this.generateObstacles();
};

Game.prototype.generateInvaders = function() {
  var pos1 = (70*(INVADERS/2)+75*(INVADERS/2-1)) ;
  console.log(pos1)
  var pos2 = (70*(INVADERS/2)+75*(INVADERS/2-1))
  for (var i = 0; i < INVADERS; i++) {
    if (i % ROWS == 0) {
      this.invaders.push(new Invader(this, pos1, 0, this.player, 1));
       pos1 += 75;
    } else {
      this.invaders.push(new Invader(this, pos2, 70, this.player, 2));
      pos2 += 75;
    }
  }
};

Game.prototype.generateObstacles = function() {
  for(var j = 0; j<2; j++){
    this.obstacles.push(new Obstacle(this, 200*j + this.canvas.width/2 - 150, 500, this.player, this.invaders))
  }
};

Game.prototype.isCollisionObstacle =  function(){
  var obstacles = this.obstacles;
  this.obstacles.forEach(function(obstacle) {
    if(obstacle.isCollisionPlayer()){
      obstacle.player.bullets.splice(obstacle.player.bullets.indexOf(obstacle.bullet), 1)
      obstacle.squares.splice(obstacle.squares.indexOf(obstacle.square), 1)
    }
    if(obstacle.isCollisionInvader()){
      obstacle.invader.bullets.splice(obstacle.invader.bullets.indexOf(obstacle.bullet2), 1)
      obstacle.squares.splice(obstacle.squares.indexOf(obstacle.square2), 1)
    }
  })  
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();
  this.invaders.forEach(element => {
    element.draw();
  });
  this.obstacles.forEach(element => {
    element.draw();
  });
  this.ctx.font = "30px sans-serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText("LIFES: "+this.player.lifes, 20, 50);
  this.ctx.font = "30px sans-serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText("SCORE: "+this.score, 850, 50);
};

Game.prototype.moveAll = function(delta) {
  this.background.move();
  this.player.move(delta);
  this.invaders.forEach(element => {
    element.move();
  });
};

Game.prototype.isCollisionInvader = function() {
  var invaders = this.invaders;
  this.invaders.forEach(function(invader) {
    if (invader.isCollision()) {
      this.score+=10;
      invader.player.bullets.splice(invader.player.bullets.indexOf(invader.bullet),1);
      invaders.splice(invaders.indexOf(invader), 1);
    }
  });
};

Game.prototype.isCollisionPlayer = function() {
  if(this.player.isCollision()){
    this.player.invader.bullets.splice(this.player.invader.bullets.indexOf(this.player.bullet),1);
    this.player.lifes--;
  }
};

Game.prototype.invaderShoot = function() {
  var random = Math.floor(Math.random() * this.invaders.length);
  this.invaders[random].shoot();
};

Game.prototype.invaderFall = function (){
  var random = Math.floor(Math.random() * this.invaders.length)
  var invader = this.invaders[random]
  invader.dy = 1;
}


var INVADERS = 6;
var PLAYERLIFES = 3;
var ROWS = 2;
