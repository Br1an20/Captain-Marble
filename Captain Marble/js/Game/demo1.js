var demo1 = {

    preload: function () {
        //load the start button
    	game.load.spritesheet('demo1', 'assets/img/demoAnimation1.png',1200,700,9);
        game.load.image('forward', 'assets/img/forward.png',80,80);
        game.load.image('backward', 'assets/img/backward.png',80,80);
    },

    create: function () {
        //game.title = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'title');
        //game.title.anchor.setTo(0.5);


        this.demoAnimation = game.add.sprite(0,0,'demo1');
        this.demoAnimation.animations.add('demoAnimation', [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8], 4);
        this.demoAnimation.animations.play('demoAnimation',true);


        this.buttonForward = game.add.button(1120, 665,"forward", this.forward,this,0);
        this.buttonForward.anchor.set(0.5,0.5);        
        this.buttonBackward = game.add.button(80 , 665,"backward", this.backward,this,0);
        this.buttonBackward.anchor.set(0.5,0.5);
       

    }, 

    backward:function(){
        game.state.start("gameStart");
    },
    forward:function(){

    	game.state.start("demo2");
    },
     update: function () {
    }

}