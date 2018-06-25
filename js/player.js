function Player(game) {
  this.game = game;
  this.x = 475;
  this.y = 600;
  this.img = new Image();
  this.img.src = 'images/player.png';
  this.w =60;
  this.h = 60;
  this.vx = 0;
  this.bullets = []
  this.setListeners();
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
  this.bullets = this.bullets.filter(function(bullet) {
    return bullet.y< this.game.canvas.height;
  }.bind(this));

  this.bullets.forEach(function(bullet) {
    bullet.draw();
    bullet.move();
  });
};

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    
    if (event.keyCode == LEFT) {
      if(this.x <= 5){
        this.vx = 0;
      } else {
        this.vx = -10;
      }
    }
    if(event.keyCode == RIGHT){
      if(this.x >= 950){
        this.vx = 0;
      } else{
        this.vx = +10; 
      }
    }
    if (event.keyCode == SPACE) {
      this.shoot();
    }

  }.bind(this)
  document.onkeyup = function(event) {
    if (event.keyCode == LEFT) {
      this.vx = 0;
    }
    if(event.keyCode == RIGHT){
      this.vx = 0; 
    }
  }.bind(this)
};

Player.prototype.shoot = function() {
  var bullet = new Bullet(this.game, this.x + this.w/2, this.y + this.h -70);

  this.bullets.push(bullet);
};


var prevTime = 0
Player.prototype.move = function(time) {
  var delta = time - prevTime;
  prevTime = time;
  this.x += this.vx;
};

var SPACE = 32;
var LEFT = 37; // left
var RIGHT = 39; // right
var SPACE = 32;