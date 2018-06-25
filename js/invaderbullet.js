function InvaderBullet(game, x, y) {
  this.game = game;

  this.x = x;
  this.y = y;

  this.r = 5;
  this.vy = 1;
  this.a = 0.25;
}

InvaderBullet.prototype.draw = function() {
  this.game.ctx.beginPath();
  this.game.ctx.fillStyle = "red";
  this.game.ctx.arc(this.x, this.y , this.r, 0, Math.PI * 2);
  this.game.ctx.fill();
  this.game.ctx.closePath();
}

InvaderBullet.prototype.move = function() {

  this.vy += this.a;
  this.y += this.vy;

 
};