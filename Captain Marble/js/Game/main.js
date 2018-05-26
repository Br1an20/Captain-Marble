var game;
var score = 0;
var scoreText; 
var demo;
var soundOn = true;
var musicOn = true; 

window.onload = function () {

    game = new Phaser.Game(1200, 700, Phaser.AUTO, "ph_game");
    //add a state or screen to the game
    game.state.add("gameMainDemo", gameMainDemo);
    game.state.add("gameMain", gameMain);
    game.state.add("Boot", Boot);
    game.state.add("Preloader", Preloader);
    game.state.add("gameOver1", gameOver1);
    game.state.add("gameOver2", gameOver2);
    game.state.add("gameStart", gameStart);
    game.state.start("Boot");
}