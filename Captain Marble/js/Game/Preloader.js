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

    game.load.image('cannon', 'assets/img/cannon.png');
    game.load.image('bow', 'assets/img/bow.png'); 
    game.load.image('pointer', 'assets/img/arrow.png');
    game.load.image('setting', 'assets/img/settingUp.png');
  
    game.load.image('gameBoardMain', 'assets/img/GameBoardMain.png');
    game.load.image('gameBoard', 'assets/img/GameBoard.png');
    game.load.image('blueTrashCan', 'assets/img/trashCanBlue.png');
    game.load.image('purpleTrashCan', 'assets/img/trashCanPurple.png');

    game.load.spritesheet('toBlack', 'assets/img/toBlack.png',1200,700,14);
    game.load.spritesheet('fromBlack', 'assets/img/fromBlack.png',1200,700,18);

    game.load.spritesheet('bow', 'assets/img/bow.png', 38,38,6);
    game.load.image('bowArrow', 'assets/img/bowArrow.png');
    game.load.image('crosshair', 'assets/img/crosshair.png');

    game.load.spritesheet('player1', 'assets/img/player1.png',132,60,2);
    game.load.spritesheet('player2', 'assets/img/player2.png',132,60,2);
    game.load.spritesheet('sample4', 'assets/img/sample4.png',55,60);

    game.load.image('warcryDetail', 'assets/img/Warcry detail.png');
    game.load.image('toweringDetail', 'assets/img/Tower detail.png');
    game.load.image('swiftDetail', 'assets/img/Swift detail.png');
    game.load.image('steadyDetail', 'assets/img/Steady detail.png');
    game.load.image('sneakDetail', 'assets/img/Sneak detail.png');
    game.load.image('smiteDetail', 'assets/img/Smite detail.png');
    game.load.image('slingDetail', 'assets/img/Sling detail.png');
    game.load.image('rushDetail', 'assets/img/Rush detail.png');
    game.load.image('poisonDetail', 'assets/img/Poison detail.png');
    game.load.image('firmDetail', 'assets/img/Firm detail.png');
    game.load.image('braveryDetail', 'assets/img/Bravery detail.png');
    game.load.image('accurateDetail', 'assets/img/Accurate detail.png');


    game.load.spritesheet('warcry', 'assets/img/Warcry skill name.png',71,31,2);
    game.load.spritesheet('towering', 'assets/img/Tower skill name.png',71,31,2);
    game.load.spritesheet('swift', 'assets/img/Swift skill name.png',71,31,2);
    game.load.spritesheet('steady', 'assets/img/Steady skill name.png',71,31,2);
    game.load.spritesheet('sneak', 'assets/img/Sneak skill name.png',71,31,2);
    game.load.spritesheet('smite', 'assets/img/Smite skill name.png',71,31,2);
    game.load.spritesheet('sling', 'assets/img/Sling skill name.png',71,31,2);
    game.load.spritesheet('rush', 'assets/img/Rush skill name.png',71,31,2);
    game.load.spritesheet('poison', 'assets/img/Poison skill name.png',71,31,2);
    game.load.spritesheet('firm', 'assets/img/Firm skill name.png',71,31,2);
    game.load.spritesheet('bravery', 'assets/img/Bravery skill name.png',71,31,2);
    game.load.spritesheet('accurate', 'assets/img/Accurate skill name.png',71,31,2);
    game.load.spritesheet('sneak', 'assets/img/Sneak.png',71,31,2);

    game.load.spritesheet('rushDetail', 'assets/img/Rush detail.png',121,48,5);

    game.load.spritesheet('pickUpStateAnimation', 'assets/img/pick up state.png',1200,700,8);
   
    game.load.audio('placing', 'assets/sounds/placing.mp3');
    game.load.audio('shooting', 'assets/sounds/shooting.mp3');
    game.load.audio('startAndEnd', 'assets/sounds/startAndEnd.mp3');
    game.load.audio('choose', 'assets/sounds/choose.mp3');
    game.load.audio('hit', 'assets/sounds/hit.mp3');
    game.load.audio('mainBGM', 'assets/sounds/mainBGM.mp3');

    game.load.image('blackMarble', 'assets/img/black-sphere.png');
    game.load.image('fireMarble', 'assets/img/fire-sphere.png');
    game.load.image('blackArrow', 'assets/img/black-arrow.png');
    game.load.image('purpleMarble', 'assets/img/purpleMarble.png');
    game.load.image('blueMarble', 'assets/img/blueMarble.png');

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