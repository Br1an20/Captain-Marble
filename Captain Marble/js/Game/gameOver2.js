var gameOver2={    
    
   preload:function()
    {

    },
    
    create:function()
    {
        //setup the restart button
        this.buttonPlayAgain = game.add.button(game.world.centerX, game.world.centerY+100,"restart1", this.replay,this,0,1);
        this.buttonPlayAgain.anchor.set(0.5,0.5);

        this.WannaPlayAgain = game.add.image(game.world.centerX, game.world.centerY,'WannaPlayAgain');
        this.WannaPlayAgain.anchor.set(0.5,0.5);

        this.BGM = game.add.audio('startAndEnd');
        this.BGM.play('', 0, 0.75, true);
    },
    replay:function(){
        this.BGM.stop();
        game.state.start("Boot");
    },

    update:function()
    {       
        
    }    
    
}