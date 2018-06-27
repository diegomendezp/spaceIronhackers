function Obstacle(game, x, y, player, invaders) {
  this.game = game;
  this.player = player;
  this.w = 22.5;
  this.h = this.w;

  this.dx = 10;
  this.bullet;
  this.x = x;
  this.y = y;
  this.bullet;
  this.bullet2;
  this.squares = [
    { x: this.x, y: this.y },
    { x: this.x + this.w, y: this.y - this.h },
    { x: this.x + this.w*2, y: this.y - this.h*2},
    { x: this.x + this.w*3, y: this.y - this.h},
    { x: this.x + this.w*4, y: this.y }
  ];
  this.square;
  this.square2;
  this.invader;
  this.invaders = invaders;
}

Obstacle.prototype.draw = function() {
  this.game.ctx.fillStyle = "green";
  var game = this.game;
  var w = this.w;
  var h = this.h;
  this.squares.forEach(function(square) {
    game.ctx.fillStyle = "green";
    game.ctx.fillRect(square.x, square.y, w, h);
  });
};

Obstacle.prototype.move = function() {
  this.x -= this.dx;
};

Obstacle.prototype.isCollisionPlayer = function() {
  var arr = this.player.bullets;
  var squares = this.squares;
  var w = this.w;
  var h = this.h;
  for (var i = 0; i < this.player.bullets.length; i++) {
    for(var j=0; j<squares.length;j++){
      if(squares[j].x < arr[i].x + arr[i].r * 2 && squares[j].x + w > arr[i].x && squares[j].y < arr[i].y + arr[i].r && squares[j].y + h > arr[i].y){
        this.bullet = arr[i];
        this.square = squares[j];
        return true;
      }
    }
  }
  return false;
};

Obstacle.prototype.isCollisionInvader = function(){
  var arr = this.invaders;
  var squares = this.squares;
  var w = this.w;
  var h = this.h;
  for(var i = 0; i < arr.length; i++){
    for (var j = 0; j<arr[i].bullets.length; j++) {
      for(var k=0; k<squares.length;k++){
        if(squares[k].x < arr[i].bullets[j].x + arr[i].bullets[j].r * 2 && squares[k].x + w > arr[i].bullets[j].x && squares[k].y < arr[i].bullets[j].y + arr[i].bullets[j].r && squares[k].y + h < arr[i].bullets[j].y){
          this.bullet2 = arr[i].bullets[j]
          this.invader = arr[i]
          this.square2 = squares[k];
          return true;
        }
      }
    }
  }
  return false;
}

Obstacle.prototype.clearRect = function(posx, posy) {
  this.game.ctx.clearRect(posx, posy, this.w, this.h);
};