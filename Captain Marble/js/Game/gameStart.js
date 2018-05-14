var gameStart = {

    preload: function () {
        //load the start button
    	game.load.image('startButton', 'assets/img/play1.png');
    },

    create: function () {
        //set up the start button
        game.title = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'title');
        game.title.anchor.setTo(0.5);
    	this.buttonStart = game.add.button(game.world.centerX, game.world.centerY+100,"startButton", this.startGame,this,0);
        
    	this.buttonStart.anchor.set(0.5,0.5);

        this.BGM = game.add.audio('startAndEnd');
        this.BGM.play('', 0, 0.75, true);
    }, 
    startGame:function(){
        this.BGM.stop();
    	game.state.start("gameMain");
    },
     update: function () {
    }

    

}