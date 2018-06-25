function Invader(game, x, y, player) {
  this.game = game;
  this.player = player
  this.w = 70;
  this.h = 70;

  this.dy = 0.25;
  this.img = new Image()
  this.img.src = "images/invader.png"
  this.x = x ;
  this.y = y;
  this.bullet;
}

Invader.prototype.isCollision = function (){
  /*return this.player.bullets.some(function(bullet){
    return (
      ((this.x <= bullet.x + bullet.r*2 && bullet.x + bullet.r*2 <= this.x + this.w) &&
       this.y >= bullet.y)
    );
  }.bind(this))*/
  var arr = this.player.bullets;
  for(var i=0; i<this.player.bullets.length; i++){
    if(((this.x <= arr[i].x + arr[i].r*2 &&arr[i].x +arr[i].r*2 <= this.x + this.w) &&
    this.y+ this.h>=arr[i].y)){
      this.bullet = arr[i]
      return true;
    }
  }
  return false;
}


Invader.prototype.draw = function() {
  this.game.ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
  //this.game.ctx.drawImage(this.img, this.x, this.y + this.game.canvas.height, this.game.canvas.width, this.game.canvas.height);
};

Invader.prototype.move = function() {
  this.y += this.dy;
  if (this.y > this.game.player.y-70) location.reload()
};