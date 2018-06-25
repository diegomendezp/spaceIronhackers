
function square(x, y) {
  ctx.fillStyle = '#66FF00';
  ctx.fillRect(x, y, side, side);
  ctx.strokeStyle = '#000';
  ctx.strokeRect(x, y, side, side);
}

function draw() { 
  ctx.fillRect(0, 0, 30, 30);
  ctx.save();

  for(var i = 0; i < 30; i++) {   
      for(var j = 0; j < i + 1; j++) {
          square(
              //Pos X    
              //This is what we have to change to
              //make it look like a pyramid instead of stairs
              30 / 2  - ((side / 2) + (j * side)),


              //Pos Y
              side * (i + 1)
          );
      }
  }

  ctx.restore();
}