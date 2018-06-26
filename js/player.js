function Player(game, invaders, lifes) {
  this.game = game;
  this.x = 475;
  this.y = 625;
  this.img = new Image();
  this.img.src = "images/player2.png";
  this.w = 80;
  this.h = 80;
  this.vx = 0;
  this.bullets = [];
  this.setListeners();
  this.lifes = lifes;
  this.bullet;
  this.invaders = invaders;
  this.points = new Points(game,0)
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  this.bullets = this.bullets.filter(
    function(bullet) {
      return bullet.y < this.game.canvas.height;
    }.bind(this)
  );

  this.bullets.forEach(function(bullet) {
    bullet.draw();
    bullet.move();
  });
  this.points.draw()
};

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode == LEFT) {
      if (this.x <= 5) {
        this.vx = 0;
      } else {
        this.vx = -10;
      }
    }
    if (event.keyCode == RIGHT) {
      if (this.x >= 950) {
        this.vx = 0;
      } else {
        this.vx = +10;
      }
    }
    if (event.keyCode == SPACE) {
      this.shoot();
    }
  }.bind(this);
  document.onkeyup = function(event) {
    if (event.keyCode == LEFT) {
      this.vx = 0;
    }
    if (event.keyCode == RIGHT) {
      this.vx = 0;
    }
  }.bind(this);
};

Player.prototype.shoot = function() {
  var bullet = new Bullet(
    this.game,
    this.x + this.w / 2,
    this.y + this.h - 70,
    6,
    1,
    0.25,
    "white",
    "player"
  );
  this.bullets.push(bullet);
};

var prevTime = 0;
Player.prototype.move = function(time) {
  var delta = time - prevTime;
  prevTime = time;
  this.x += this.vx;
};

Player.prototype.isCollision = function() {
  var arr = this.invaders;
  var x = this.x;
  var y = this.y;
  for(var i = 0; i < arr.length; i++){
    for (var j = 0; j<arr[i].bullets.length; j++) {
      if (
        this.x <= arr[i].bullets[j].x + arr[i].bullets[j].r * 2 &&
        arr[i].bullets[j].x + arr[i].bullets[j].r * 2 <= this.x + this.w &&
        this.y <= arr[i].bullets[j].y
      ) {
        this.invader = arr[i]
        this.bullet = arr[i].bullets[j];
        return true;
      }
    }
  }
  return false;
};

var SPACE = 32;
var LEFT = 65; // left
var RIGHT = 68; // right
var SPACE = 32;
