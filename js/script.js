window.onload = function() {
  $("#canvas").hide()
  document.getElementById("level-1").onclick = function() {
    //window.scrollTo(0,document.body.scrollHeight);
    $("#menu").hide()
    //$("#level-1").hide()
    $("#canvas").show("slow")
    startGame(1);
    
  };
  //startGame();
  document.getElementById("level-2").onclick = function() {
    $("#menu").hide()
    $("#canvas").show("slow")
    startGame(2);
    
  };  
  document.getElementById("level-3").onclick = function() {
    $("#menu").hide()
    $("#canvas").show("slow")
    startGame(3);
  };  
  function startGame(level) {
    var game = new Game("canvas", level);
    window.requestAnimationFrame(game.start.bind(game))
  }

};