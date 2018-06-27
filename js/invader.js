function Invader(game, x, y, player, type, bulletAcc) {
  this.game = game;
  this.player = player;
  this.w = 70;
  this.h = 70;
  this.bulletAcc = bulletAcc;
  this.dy = 0.09;
  this.img = new Image();
  if (type == 0) {
    this.bulletRadio = 5;
    this.img.src = "images/invader.png";
  } else if (type == 1) {
    this.bulletRadio = 5;
    this.img.src = "images/invader2.png";
  } else if (type == 2) {
    this.bulletRadio = 7;
    this.img.src = "images/invader3.png";
  } else if (type == 3) {
    this.bulletRadio = 10;
    this.img.src = "images/finalinvader.png";
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
};

Invader.prototype.shoot = function() {
  var bullet = new Bullet(
    this.game,
    this.x + this.w / 2,
    this.y + this.h,
    this.bulletRadio,
    1,
    this.bulletAcc,
    "red",
    "invader"
  );
  this.bullets.push(bullet);
};
