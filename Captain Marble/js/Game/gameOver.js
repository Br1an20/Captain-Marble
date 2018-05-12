var gameOver={    
    
   preload:function()
    {
    //load the restart buttons
    game.load.spritesheet("buttons1", "assets/img/buttons2.png", 620,275);
    },
    
    create:function()
    {
        //setup the restart button
        this.buttonPlayAgain = game.add.button(game.world.centerX, game.world.centerY+100,"buttons1", this.replay,this,0,1);
        this.buttonPlayAgain.scale.set(0.5,0.5);
        this.buttonPlayAgain.anchor.set(0.5,0.5);
    },
    replay:function(){
        game.state.start("gameMain");
    },

    update:function()
    {       
        
    }    
    
}