var creditAnimation = {

    preload: function () {
        //load the start button
    	game.load.image('creditAnimation', 'assets/img/creditAnimation.png');
        game.load.spritesheet('restart', 'assets/img/restart.png',120,70,0);
    },

    create: function () {
        //game.title = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'title');
        //game.title.anchor.setTo(0.5);


        this.creditAnimation = game.add.image(0,0,'creditAnimation');
    	this.buttonStart = game.add.button(game.world.centerX , 600,"restart", this.startGame,this,0);
    	this.buttonStart.anchor.set(0.5,0.5);        

       

    }, 


    startGame:function(){
        select = true;
        turn = 1;
        gameState = 1;
        marbles = [];
        totalStrength = [];
        marbleIndex = -1;
        index = 0;
        selected = "none"

    	game.state.start("Boot");
    },
     update: function () {
    }

}