window.onload = function() {
  var soundID = "Intro";

  function loadSound() {
    createjs.Sound.registerSound("sounds/spaceinvaders.mp3", soundID);
  }

  function playSound() {
    createjs.Sound.play(soundID);
  }
  loadSound()
  $("#canvas").hide();
  document.getElementById("level-1").onclick = function() {
    //window.scrollTo(0,document.body.scrollHeight);
    $("#menu").hide();
    //$("#level-1").hide()
    $("#canvas").show("slow");
    playSound()
    startGame(1);
  };
  //startGame();
  document.getElementById("level-2").onclick = function() {
    $("#menu").hide();
    $("#canvas").show("slow");
    startGame(2);
  };

  document.getElementById("level-3").onclick = function() {
    $("#menu").hide();
    $("#canvas").show("slow");
    startGame(3);
  };
  document.getElementById("final-round").onclick = function() {
    $("#menu").hide();
    $("#canvas").show("slow");
    startGame(4);
  };
  function startGame(level) {
    var game = new Game("canvas", level);
    window.requestAnimationFrame(game.start.bind(game));
  }
};
