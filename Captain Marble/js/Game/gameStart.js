var gameStart = {

    preload: function () {
        //load the start button
    	game.load.spritesheet('startButton', 'assets/img/play.png',120,60,2);
        game.load.image('demoButton', 'assets/img/demo.png');
    },

    create: function () {
        //game.title = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'title');
        //game.title.anchor.setTo(0.5);
    	this.buttonStart = game.add.button(game.world.centerX, game.world.centerY+100,"startButton", this.startGame,this,0);
    	this.buttonStart.anchor.set(0.5,0.5);

        this.demoStart = game.add.button(game.world.centerX, game.world.centerY+200,"demoButton", this.startDemo,this,0);
        this.demoStart.anchor.set(0.5);

        this.BGM = game.add.audio('startAndEnd');
        this.BGM.play('', 0, 0.75, true);
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