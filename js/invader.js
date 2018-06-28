function Invader(game, x, y, w, h, player, type, bulletAcc, lifes) {
  this.game = game;
  this.player = player;
  this.w = w;
  this.h = h;
  this.lifes = lifes;
  this.type = type;
  this.bulletAcc = bulletAcc;
  this.dy = 0.09;
  this.img = new Image();
  if (this.type == 0) {
    this.bulletRadio = 5;
    this.img.src = "images/invader.png";
  } else if (this.type == 1) {
    this.bulletRadio = 5;
    this.img.src = "images/invader2.png";
  } else if (this.type == 2) {
    this.bulletRadio = 7;
    this.img.src = "images/invader3.png";
  } else if (this.type == 3) {
    this.bulletRadio = 10;
    this.img.src = "images/finalinvader.png";
  } else if(this.type == 4){
    this.bulletRadio = 10;
    this.dx=2;
    this.dy = 0.15
    this.img.src = "images/spaceship.png";
  }

  this.x = x;
  this.y = y;
  this.bullet;
  this.bullets = [];
}

Invader.prototype.isCollision = function() {
  var arr = this.player.bullets;
  for (var i = 0; i < this.player.bullets.length; i++) {
    if (
      this.x <= arr[i].x + arr[i].r * 2 &&
      arr[i].x + arr[i].r * 2 <= this.x + this.w &&
      this.y + this.h >= arr[i].y
    ) {
      this.bullet = arr[i];
      this.player.points.increment();
      return true;
    }
  }
  return false;
};

Invader.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  this.bullets = this.bullets.filter(
    function(bullet) {
      return bullet.y < this.game.canvas.height;
    }.bind(this)
  );

  this.bullets.forEach(function(bullet) {
    bullet.draw();
    bullet.move();
  });
};

Invader.prototype.move = function() {
  this.y += this.dy;
  if (this.y > this.game.player.y - 70) this.game.gameOver();
  if(this.type == 4){
    this.x += this.dx;
    if(this.x > 700){
      this.dx *= -1
    } else if(this.x < 0){
      this.dx *= -1
    }
  }
};

Invader.prototype.shoot = function() {
  //var bullet;
  var bullets = []
  if(this.type != 4){
    bullets.push(new Bullet(
      this.game,
      this.x + this.w / 2,
      this.y + this.h,
      this.bulletRadio,
      1,
      this.bulletAcc,
      "red",
      "invader"
    ));
  } else {
    bullets.push(new Bullet(
      this.game,
      this.x + this.w / 2,
      this.y + this.h,
      this.bulletRadio,
      1,
      this.bulletAcc,
      "red",
      "invader"
    ));
    bullets.push(new Bullet(
      this.game,
      this.x + this.w,
      this.y + this.h,
      this.bulletRadio,
      1,
      this.bulletAcc,
      "red",
      "invader"
    ));
    bullets.push(new Bullet(
      this.game,
      this.x,
      this.y + this.h,
      this.bulletRadio,
      1,
      this.bulletAcc,
      "red",
      "invader"
    ));
  }
  //this.bullets.push(bullet);
  bullets.forEach(function(bullet){
    this.bullets.push(bullet)
  }.bind(this))
};
