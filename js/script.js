window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    //window.scrollTo(0,document.body.scrollHeight);
    $("#start-button").hide()
    startGame();
    
  };
  //startGame();

  function startGame() {
    var game = new Game("canvas");
    //game.start();
    window.requestAnimationFrame(game.start.bind(game))
  }

};