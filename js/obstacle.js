function Obstacle(game, x, y, player) {
  this.game = game;
  this.player = player;
  this.w = 20;
  this.h = this.w;

  this.dx = 10;
  this.bullet;
  this.x = x;
  this.y = y;
  this.bullet;
  this.squares = [
    { x: this.x, y: this.y },
    { x: this.x + this.w, y: this.y - this.h },
    { x: this.x + this.w*2, y: this.y - this.h*2},
    { x: this.x + this.w*3, y: this.y - this.h},
    { x: this.x + this.w*4, y: this.y }
  ];
  this.square;
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

Obstacle.prototype.isCollision = function() {
  var arr = this.player.bullets;
  var squares = this.squares;
  var w = this.w;
  var h = this.h;
  for (var i = 0; i < this.player.bullets.length; i++) {
    for(var j=0; j<squares.length;j++){
      if (squares[j].x <= arr[i].x + arr[i].r * 2 && arr[i].x + arr[i].r * 2 <= squares[j].x + w && squares[j].y + h >= arr[i].y) {
        this.bullet = arr[i];
        this.square = squares[j];
        //arr.splice(arr.indexOf(arr[i]), 1)
        //squares.splice(squares.indexOf(square), 1)
        return true;
      }
    }
  }
  return false;
};

Obstacle.prototype.clearRect = function(posx, posy) {
  this.game.ctx.clearRect(posx, posy, this.w, this.h);
};
