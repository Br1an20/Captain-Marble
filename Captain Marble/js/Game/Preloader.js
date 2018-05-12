this.ready = false;

var Preloader = {

	preload: function(){
	//place the game title
	game.teamTitle = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'teamTitle');
    game.teamTitle.anchor.setTo(0.5);

    //place the logo
    game.title = game.add.sprite(game.world.centerX, game.world.centerY, 'title');
    game.title.anchor.setTo(0.5);

    //place the preloaderBar
    game.preloaderBar = game.add.sprite(game.world.centerX, game.world.centerY + 100, 'preloaderBar');
    game.preloaderBar.anchor.setTo(0.5);
    game.load.setPreloadSprite(game.preloaderBar);

    //load the basic assets 
    game.load.image('arrowBlue', 'assets/img/arrowDownBlue.png');
    game.load.image('arrowPurple', 'assets/img/arrowDownPurple.png');
 	game.load.image('player1', 'assets/img/player1.png');
 	game.load.image('setting', 'assets/img/settingUp.png');
 	game.load.image('player2', 'assets/img/player2.png');
 	game.load.image('music', 'assets/img/music.png');
    game.load.image('gameBoard', 'assets/img/GameBoard.png');
    game.load.image('blueTrashCan', 'assets/img/trashCanBlue.png');
    game.load.image('purpleTrashCan', 'assets/img/trashCanPurple.png');
    game.load.spritesheet('musicButton', 'assets/img/musicButton.png',80,80,2);
    game.load.audio('BGM', 'assets/sounds/dino.mp3');

    this.loadCompleted();
	},

	loadCompleted: function() {
    this.ready = true;
  	},

  create: function(){
  		 
  },
  update: function(){
  	if(this.cache.isSoundDecoded('BGM') && this.ready == true){
  		this.state.start('gameStart');
  	}
  }

}