window.onload = function() {
  $("#canvas").hide()
  document.getElementById("level-1").onclick = function() {
    //window.scrollTo(0,document.body.scrollHeight);
    $("#menu").hide()
    $("#start-button").hide()
    $("#canvas").show("slow")
    
    startGame();
    
  };
  //startGame();

  function startGame() {
    var game = new Game("canvas");
    window.requestAnimationFrame(game.start.bind(game))
  }

};