function Invader(game, x, y) {
  this.game = game;

  this.w = 70;
  this.h = 70;

  this.dy = 0.25;
  this.img = new Image()
  this.img.src = "images/invader.png"
  this.x = x ;
  this.y = y;
}

Invader.prototype.isCollision = function (){
  
}
Invader.prototype.draw = function() {
  this.game.ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
  //this.game.ctx.drawImage(this.img, this.x, this.y + this.game.canvas.height, this.game.canvas.width, this.game.canvas.height);
};

Invader.prototype.move = function() {
  this.y += this.dy;

  if (this.y > this.game.player.y-70) location.reload()
};