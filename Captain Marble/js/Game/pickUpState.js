var pickUpState = {

    preload: function () {
        game.load.image('pickUpBackground', 'assets/img/Pick up state background.png');
    },

    create: function () {
        //game.title = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'title');
        //game.title.anchor.setTo(0.5);
        this.pickUpBackground = game.add.image(0,0 ,'pickUpBackground');



        this.BGM = game.add.audio('startAndEnd');
        this.BGM.play('', 0, 0.75, true);
    }, 

     update: function () {
    }

    

}