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
  this.bullets = []
}

Invader.prototype.isCollision = function (){
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
  this.bullets = this.bullets.filter(function(bullet) {
    return bullet.y < this.game.canvas.height;
  }.bind(this));

  this.bullets.forEach(function(bullet) {
    bullet.draw();
    bullet.move();
  });
  
};

Invader.prototype.move = function() {
  this.y += this.dy;
  if (this.y > this.game.player.y-70) this.game.gameOver()
};

Invader.prototype.shoot = function() {
    var bullet = new InvaderBullet(this.game, this.x + this.w/2, this.y + this.h);
    this.bullets.push(bullet); 
};