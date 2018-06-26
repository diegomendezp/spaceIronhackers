function Bullet(game, x, y, r, vy, a, color, character) {
  this.game = game;

  this.x = x;
  this.y = y;
  this.color = color;
  this.character = character;
  this.r = r;
  this.vy = vy;
  this.a = a;
}

Bullet.prototype.draw = function() {
  this.game.ctx.beginPath();
  this.game.ctx.fillStyle = this.color;
  this.game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  this.game.ctx.fill();
  this.game.ctx.closePath();
};

Bullet.prototype.move = function() {
  switch (this.character) {
    case "player":
      this.vy += this.a;
      this.y -= this.vy;

      if (this.y > this.game.player.y + this.game.player.h) {
        this.vy *= -1;
      }
      break;
    case "invader":
      this.vy += this.a;
      this.y += this.vy;
      break;
  }
};
