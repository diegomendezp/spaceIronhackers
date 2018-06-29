function Game(canvasId, level) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");
  this.level = level;
  this.id = 0;
  this.reset();
}

Game.prototype.start = function(delta) {
  if (this.level != 4) {
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
  } else {
    this.finalRound();
  }
  this.id = window.requestAnimationFrame(this.start.bind(this));
};

Game.prototype.gameOver = function() {
  /*window.cancelAnimationFrame(this.id);
  if (confirm("GAME OVER. Play again?")) {
    this.reset();
    this.start.bind(this);
  } else {
    location.reload();
  }*/
  if (this.level == 1) {
    this.showGameOver();
    if (this.lose == 0) this.restartLevel();
  } else if (this.level == 2) {
    this.showGameOver();
    if (this.lose == 0) this.restartLevel();
  } else if(this.level == 3){
    this.showGameOver();
    if (this.lose == 0) this.restartLevel();
  } else if(this.level == 4){
    this.showGameOver()
    if (this.lose == 0) this.restartLevel();
  }
  this.lose++;
};

Game.prototype.youWin = function() {
  if (this.level == 1) {
    this.showLevel();
    // window.cancelAnimationFrame(this.id);
    if (this.win == 0) this.changeLevel();
  } else if (this.level == 2) {
    this.showLevel();
    // window.cancelAnimationFrame(this.id);
    if (this.win == 0) this.changeLevel();
  } else if(this.level == 3){
    this.showLevel();
    if (this.win == 0) this.changeLevel();
  } else if(this.level == 4){
    if (this.win == 0){
      alert("CONGRATULATIONS YOU WIN!!!");
      location.reload();
    }
  }
  this.win++;
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
  this.win = 0;
  this.lose = 0;
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
      this.rows = 3;
      break;
    case 2:
      this.invadersNumber = 8;
      this.framesFall = 150;
      this.framesShoot = 40;
      this.obstaclesNumber = 6;
      this.invaderAcc = 0.2;
      this.dyInvaderFall = 1.5;
      this.space = 200;
      this.rows = 3;
      break;
    case 3:
      this.invadersNumber = 12;
      this.framesFall = 130;
      this.framesShoot = 35;
      this.obstaclesNumber = 8;
      this.invaderAcc = 0.25;
      this.dyInvaderFall = 1.75;
      this.space = 100;
      this.rows = 4;
      break;
    case 4:
      this.invadersNumber = 1;
      this.framesFall = 130;
      this.framesShoot = 35;
      this.obstaclesNumber = 8;
      this.invaderAcc = 0.2;
      this.dyInvaderFall = 1.75;
      this.space = 100;
      this.rows = 0;
      break;
  }
};

Game.prototype.generateInvaders = function() {
  var pos1;
  var lifes = 0;
  var w = 70;
  var h = w;
  if (this.invadersNumber == 6) {
    pos1 = 260;
  } else if (this.invadersNumber == 8) {
    pos1 = 185;
  } else {
    pos1 = 40;
  }
  if(this.level == 4){
    pos1 = 350;
    lifes = 10;
    w = 300;
    h = 200; 
  }
  for (var i = 0; i < this.invadersNumber; i++) {
    for (var j = 0; j < this.rows; j++) {
      /*var number = Math.floor(Math.random()* 5)
      if(number == 4)number++*/
        this.invaders.push(
          new Invader(this, pos1, 75 * j, w ,h, this.player, j, this.invaderAcc, lifes)
        ); 
    }
    if(this.level == 4){
      console.log(this.level)
      this.invaders.push(new Invader(this, pos1, 0, w ,h, this.player, 4, this.invaderAcc, lifes))
    } 
    pos1 += 75;
  }
};

Game.prototype.generateObstacles = function() {
  var pos;
  if (this.obstaclesNumber == 3) {
    pos = 130;
  }
  if (this.obstaclesNumber == 6) {
    pos = 100;
  }
  if (this.obstaclesNumber == 8) {
    pos = 100;
  }

  for (var j = 0; j < this.obstaclesNumber; j++) {
    this.obstacles.push(
      new Obstacle(this, pos * j + this.space, 500, this.player, this.invaders)
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
  if(this.level == 4){
    this.ctx.font = "30px sans-serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText("INVADER LIFES: " + this.invaders[0].lifes, this.canvas.width/2 - 100, 50);
  }
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
      if(this.level != 4){
        invader.player.bullets.splice(invader.player.bullets.indexOf(invader.bullet),1);
        invaders.splice(invaders.indexOf(invader), 1);
      } else {
        if(invader.lifes != 0)invader.lifes--;
        invader.player.bullets.splice(invader.player.bullets.indexOf(invader.bullet),1);
        if(invader.lifes == 0){
          invaders.splice(invaders.indexOf(invader), 1);
        }
      }
    }
  }.bind(this));
};

Game.prototype.isCollisionPlayer = function() {
  if (this.player.isCollision()) {
    this.player.invader.bullets.splice(
      this.player.invader.bullets.indexOf(this.player.bullet),
      1
    );
    if(this.level != 4){
      if(this.player.lifes != 0) this.player.lifes--;
    } else {
      if(this.player.lifes != 0)this.player.lifes -= PLAYERLIFES
    } 
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

Game.prototype.showLevel = function() {
  this.ctx.font = "40px sans-serif";
  this.ctx.fillStyle = "white";
  var level = this.level + 1;
  console.log(level)
  if(level == 4){
    this.ctx.fillText("FINAL ROUND ", 350, this.canvas.height / 2);
  }else{
    this.ctx.fillText("LEVEL " + level, 400, this.canvas.height / 2);
  }
};

Game.prototype.showGameOver = function() {
  this.ctx.font = "40px sans-serif";
  this.ctx.fillStyle = "white";
  /*if(level == 4){
    this.ctx.fillText("FINAL ROUND ", 350, this.canvas.height / 2);
  }else{
    this.ctx.fillText("LEVEL " + level, 400, this.canvas.height / 2);
  }*/
  this.ctx.fillText(" GAME OVER ", 400, this.canvas.height / 2);
};

Game.prototype.showWin = function() {
  this.ctx.font = "40px sans-serif";
  this.ctx.fillStyle = "white";
  this.ctx.fillText("CONGRATULATIONS YOU WIN! ", 200, this.canvas.height / 2);
};

Game.prototype.changeLevel = function() {
  setTimeout(
    function() {
      this.level++;
      this.reset();
      this.start.bind(this);
    }.bind(this),
    3000
  );
};

Game.prototype.restartLevel = function() {
  setTimeout(
    function() {
      this.reset();
      this.start.bind(this);
    }.bind(this),
    3000
  );
};

Game.prototype.finishGame = function() {
  setTimeout(
    function() {
      location.reload()
    }.bind(this),
    5000
  );
};

Game.prototype.finalRound = function (){
  this.clear();
  this.framesCounter++;
  if (this.framesCounter % this.framesShoot === 0) {
    this.invaderShoot();
  }
  this.draw();
  this.moveAll();
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
}

var INVADERS = 8;
var PLAYERLIFES = 3;
var ROWS = 2;
