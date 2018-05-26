this.ready = false;
var timer;

var Preloader = {

	preload: function(){
	//place the game title


    //place the preloaderBar


    //load the basic assets

    game.load.image('prBarFilled', 'assets/img/prBarFilled.png');
    game.load.image('prBarMpty', 'assets/img/prBarMpty.png'); 
    game.load.image('blueBarMpty', 'assets/img/blueBarMpty.png'); 
    game.load.image('blueBarFilled', 'assets/img/blueBarFilled.png'); 


    game.load.image('YouWin', 'assets/img/YouWin.png');
    game.load.image('YouLost', 'assets/img/YouLost.png');
    game.load.image('WannaPlayAgain', 'assets/img/WannaPlayAgain.png');
    game.load.image('restart1', 'assets/img/restart1.png');

 
 	  game.load.image('setting', 'assets/img/settingUp.png');

 	  game.load.image('music', 'assets/img/music.png');
    game.load.image('gameBoardMain', 'assets/img/GameBoardMain.png');
    game.load.image('gameBoard', 'assets/img/GameBoard.png');
    game.load.image('blueTrashCan', 'assets/img/trashCanBlue.png');
    game.load.image('purpleTrashCan', 'assets/img/trashCanPurple.png');

    game.load.spritesheet('player1', 'assets/img/player1.png',132,60,2);
    game.load.spritesheet('player2', 'assets/img/player2.png',132,60,2);
    game.load.spritesheet('sample4', 'assets/img/sample4.png',55,60);


    game.load.audio('BGM', 'assets/sounds/loop.mp3');
    game.load.audio('placing', 'assets/sounds/placing.mp3');
    game.load.audio('shooting', 'assets/sounds/shooting.mp3');
    game.load.audio('startAndEnd', 'assets/sounds/startAndEnd.mp3');
    game.load.audio('choose', 'assets/sounds/choose.mp3');
    game.load.audio('hit', 'assets/sounds/hit.mp3');

    game.load.image('blackMarble', 'assets/img/black-sphere.png');
    game.load.image('blackArrow', 'assets/img/black-arrow.png');

    this.loadCompleted();
	},

	loadCompleted: function() {
    this.ready = false;
  	},

  create: function(){
    game.preloaderBar = game.add.sprite(game.world.centerX,game.world.centerY + 100, "preloaderBar");
    game.preloaderBar.animations.add('loading', [0,1,2,3,4], 5);
    game.preloaderBar.animations.play('loading',true);
    game.preloaderBar.anchor.set(0.5);
    

  	game.teamTitle = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'teamTitle');
    game.teamTitle.anchor.setTo(0.5);

    //place the logo
    game.title = game.add.sprite(game.world.centerX, game.world.centerY, 'title');
    game.title.anchor.setTo(0.5);

    this.timer = game.time.create(false);
    this.timer.loop(1000, this.gameReady, this);
    this.timer.start();

  },
  gameReady:function(){
      //if(this.cache.isSoundDecoded('BGM') && this.ready == true){
      this.state.start('gameStart');
//}
  },
  update: function(){
 }
}