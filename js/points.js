function Points(game, points){
  this.game = game;
  this.points = points;
}

Points.prototype.increment = function(){
  this.points += 10;
}

Points.prototype.draw = function(){
  this.game.ctx.font = "30px sans-serif";
  this.game.ctx.fillStyle = "white";
  this.game.ctx.fillText("SCORE: "+this.points ,800, 50);
}