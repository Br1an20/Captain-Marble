var gameStart = {

    preload: function () {
        //load the start button
    	game.load.spritesheet('startButton', 'assets/img/play.png',120,60,2);
        game.load.spritesheet('gameStartAnimation', 'assets/img/gameStart animation.png',1200,700,9);
        game.load.image('testPlay','assets/img/play1.png');
        game.load.image('demoButton', 'assets/img/demo.png');
    },

    create: function () {
        //game.title = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'title');
        //game.title.anchor.setTo(0.5);

        this.gameStart = game.add.sprite(0,0,'gameStartAnimation');
        this.gameStart.animations.add('startAnimationPlayed',[0,1,2,3,4,5,6,7,8],2);
        this.gameStart.animations.play('startAnimationPlayed',true);

        this.buttonTest = game.add.button(game.world.centerX + 480, game.world.centerY - 100,"testPlay", this.startTest,this,0);
        this.buttonTest.anchor.set(0.5,0.5);

    	this.buttonStart = game.add.button(game.world.centerX + 480, game.world.centerY,"startButton", this.startGame,this,0);
    	this.buttonStart.anchor.set(0.5,0.5);

        this.demoStart = game.add.button(game.world.centerX + 480, game.world.centerY+100,"demoButton", this.startDemo,this,0);
        this.demoStart.anchor.set(0.5);


        this.BGM = game.add.audio('startAndEnd');
        this.BGM.play('', 0, 0.75, true);
    }, 
    startTest: function(){
        this.BGM.stop();
        game.state.start("pickUpState")
    },
    startDemo: function(){
        this.BGM.stop();
        game.state.start("gameMainDemo")
    },
    startGame:function(){
        this.buttonStart.animations.add('clicked',[1],1);
        this.buttonStart.animations.play('clicked',true);
        this.BGM.stop();
    	game.state.start("gameMain");
    },
     update: function () {
    }

    

}