function PlayerBullet(game, x, y) {
  this.game = game;

  this.x = x;
  this.y = y;

  this.r = 6;
  this.vy = 1;
  this.a = 0.25;
}

PlayerBullet.prototype.draw = function() {
  this.game.ctx.beginPath();
  this.game.ctx.fillStyle = "white";
  this.game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  this.game.ctx.fill();
  this.game.ctx.closePath();
}

PlayerBullet.prototype.move = function() {

  this.vy += this.a;
  this.y -= this.vy;

  if (this.y > this.game.player.y + this.game.player.h) {
    this.vy *= -1;
  }
};