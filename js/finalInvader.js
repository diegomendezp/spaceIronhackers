function FinalInvader(game, player) {
  this.game = game;
  this.player = player;
  this.w = 300;
  this.h = 300;
  this.dy = 0.25;
  this.img = new Image()
  this.img.src = "images/finalInvader.png"
  this.x = 300;
  this.y = 0;
  this.bullet;
  this.bullets = []
}

FinalInvader.prototype.isCollision = function (){
  var arr = this.player.bullets;
  for(var i=0; i<this.player.bullets.length; i++){
    if(((this.x <= arr[i].x + arr[i].r*2 &&arr[i].x +arr[i].r*2 <= this.x + this.w) &&
    this.y+ this.h>=arr[i].y)){
      this.bullet = arr[i]
      this.player.points.increment()
      return true;
    }
  }
  return false;
}


FinalInvader.prototype.draw = function() {
  this.game.ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
  this.bullets = this.bullets.filter(function(bullet) {
    return bullet.y < this.game.canvas.height;
  }.bind(this));

  this.bullets.forEach(function(bullet) {
    bullet.draw();
    bullet.move();
  });
  
};

FinalInvader.prototype.move = function() {
  this.y += this.dy;
  if (this.y > this.game.player.y-70) this.game.gameOver()
};

FinalInvader.prototype.shoot = function() {
    var bullet = new Bullet(this.game, this.x + this.w/2, this.y + this.h, 20, 1, 0.5, "red", "invader");
    this.bullets.push(bullet); 
};