function Game(canvasId, level) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.level = level;
  this.reset();
}

Game.prototype.start = function(delta) {
  this.clear();
  this.framesCounter++;
  if (this.framesCounter > 1000) {
    this.framesCounter = 0;
  }
  if (this.framesCounter % this.framesFall === 0) {
    this.invaderFall();
  }
  if (this.framesCounter % this.framesShoot === 0) {
    this.invaderShoot();
  }
  this.draw();
  this.moveAll(delta);
  this.isCollisionInvader();
  this.isCollisionPlayer();
  this.isCollisionObstacle();
  this.isCollisionObstacle2();
  if (this.invaders.length == 0) {
    this.youWin();
  }
  if (this.player.lifes == 0) {
    this.gameOver();
  }
  window.requestAnimationFrame(this.start.bind(this));
};

Game.prototype.gameOver = function() {
  if (confirm("GAME OVER. Play again?")) {
    this.reset();
    this.start.bind(this);
  } else {
    location.reload();
    window.scrollTo(0, -document.body.scrollHeight);
  }
};

Game.prototype.youWin = function() {
  $("#canvas").hide();
  $("#menu").show();
  if (this.level == 1) {
    this.clear();
    location.reload();
    //$("#level-2").removeClass("block");
  } else if (this.level == 2) {
    this.clear();
    location.reload();
    //$("#level-3").removeClass("block");
  }
};

Game.prototype.reset = function() {
  this.framesCounter = 0;
  this.score = 0;
  this.levels();
  this.background = new Background(this);
  this.invaders = [];
  this.obstacles = [];
  this.player = new Player(this, this.invaders, PLAYERLIFES);
  this.generateInvaders();
  this.generateObstacles();
};

Game.prototype.levels = function() {
  switch (this.level) {
    case 1:
      this.invadersNumber = 6;
      this.framesFall = 250;
      this.framesShoot = 60;
      this.obstaclesNumber = 3;
      this.invaderAcc = 0.15;
      this.dyInvaderFall = 1;
      this.space = 300;
      this.rows = 3
      break;
    case 2:
      this.invadersNumber = 8;
      this.framesFall = 150;
      this.framesShoot = 40;
      this.obstaclesNumber = 6;
      this.invaderAcc = 0.2;
      this.dyInvaderFall = 1.5;
      this.space = 200;
      this.rows = 3
      break;
    case 3:
      this.invadersNumber = 12;
      this.framesFall = 130;
      this.framesShoot = 35;
      this.obstaclesNumber = 8;
      this.invaderAcc = 0.25;
      this.dyInvaderFall = 1.75;
      this.space = 100
      this.rows = 4;
      break;
  }
};

Game.prototype.generateInvaders = function() {
  var pos1, pos2,pos3;
  if(this.invadersNumber == 6){
    pos1 = 260;
    pos2 = pos1;
  } else if(this.invadersNumber == 8){
    pos1 = 185;
    pos2 = pos1;
  } else {
    pos1 = 50;
    pos2 = pos1;
  }
    
  /*for (var i = 0; i < this.invadersNumber; i++) {
    if (i % ROWS == 0) {
      this.invaders.push(
        new Invader(this, pos1, 0, this.player, 1, this.invaderAcc)
      );
      pos1 += 75;
    } else {
      this.invaders.push(
        new Invader(this, pos2, 70, this.player, 2, this.invaderAcc)
      );
      pos2 += 75;
    }
  }*/
  for (var i = 0; i < this.invadersNumber; i++) {
    for(var j = 0; j<this.rows; j++){
      this.invaders.push(
        new Invader(this, pos1, 70*j, this.player, j, this.invaderAcc)
      );
      
    }
    pos1 += 75;
  }
};

Game.prototype.generateObstacles = function() {
  var pos;
  if(this.obstaclesNumber == 3){
    pos = 130
  }
  if(this.obstaclesNumber == 6){
    pos = 100
  }
  if(this.obstaclesNumber == 8){
    pos = 100
  }


  for (var j = 0; j < this.obstaclesNumber; j++) {
    this.obstacles.push(
      new Obstacle(
        this,
        pos *j + this.space,
        500,
        this.player,
        this.invaders
      )
    );
  }
};

Game.prototype.isCollisionObstacle = function() {
  var obstacles = this.obstacles;
  this.obstacles.forEach(function(obstacle) {
    if (obstacle.isCollisionPlayer()) {
      obstacle.player.bullets.splice(
        obstacle.player.bullets.indexOf(obstacle.bullet),
        1
      );
      obstacle.squares.splice(obstacle.squares.indexOf(obstacle.square), 1);
    }
    /*if(obstacle.isCollisionInvader()){
      obstacle.invader.bullets.splice(obstacle.invader.bullets.indexOf(obstacle.bullet2), 1)
      obstacle.squares.splice(obstacle.squares.indexOf(obstacle.square2), 1)
    }*/
  });
};

Game.prototype.isCollisionObstacle2 = function() {
  var obstacles = this.obstacles;
  this.obstacles.forEach(function(obstacle) {
    if (obstacle.isCollisionInvader()) {
      obstacle.invader.bullets.splice(
        obstacle.invader.bullets.indexOf(obstacle.bullet2),
        1
      );
      obstacle.squares.splice(obstacle.squares.indexOf(obstacle.square2), 1);
    }
  });
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
  this.obstacles.forEach(element => {
    element.draw();
  });
  this.ctx.font = "30px sans-serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText("LIFES: " + this.player.lifes, 20, 50);
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
      this.score += 10;
      invader.player.bullets.splice(
        invader.player.bullets.indexOf(invader.bullet),
        1
      );
      invaders.splice(invaders.indexOf(invader), 1);
    }
  });
};

Game.prototype.isCollisionPlayer = function() {
  if (this.player.isCollision()) {
    this.player.invader.bullets.splice(
      this.player.invader.bullets.indexOf(this.player.bullet),
      1
    );
    this.player.lifes--;
  }
};

Game.prototype.invaderShoot = function() {
  if (this.invaders.length != 0) {
    var random = Math.floor(Math.random() * this.invaders.length);
    this.invaders[random].shoot();
  }
};

Game.prototype.invaderFall = function() {
  if (this.invaders.length != 0) {
    var random = Math.floor(Math.random() * this.invaders.length);
    var invader = this.invaders[random];
    invader.dy = this.dyInvaderFall;
  }
};

var INVADERS = 8;
var PLAYERLIFES = 3;
var ROWS = 2;
