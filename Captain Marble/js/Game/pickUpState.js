var pickUpState = {

    preload: function () {
        game.load.image('pickUpBackground', 'assets/img/Pick up state background.png');
    },

    create: function () {
        //game.title = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'title');
        //game.title.anchor.setTo(0.5);
        this.pickUpBackground = game.add.image(0,0 ,'pickUpBackground');
        this.warcry = game.add.image(600, 350, 'warcry');
        this.tower = game.add.image(600, 350, 'tower');
        this.swift = game.add.image(600, 350, 'swift');
        this.steady = game.add.image(600, 350, 'steady');
        this.sneak = game.add.image(600, 350, 'sneak');
        this.smite = game.add.image(600, 350, 'smite');
        this.sling = game.add.image(600, 350, 'sling');
        this.rush = game.add.image(600, 350, 'rush');
        this.poison = game.add.image(600, 350, 'poison');
        this.firm = game.add.image(600, 350, 'firm');
        this.bravery = game.add.image(600, 350, 'bravery');
        this.accurate = game.add.image(600, 350, 'accurate');

        

        this.warcry.inputEnabled = true;
        this.tower.inputEnabled = true;
        this.swift.inputEnabled = true;
        this.steady.inputEnabled = true;
        this.sneak.inputEnabled = true;
        this.smite.inputEnabled = true;
        this.sling.inputEnabled = true;
        this.rush.inputEnabled = true;
        this.poison.inputEnabled = true;
        this.firm.inputEnabled = true;
        this.bravery.inputEnabled = true;
        this.accurate.inputEnabled = true;

        this.warcry.input.enableDrag();
        this.tower.input.enableDrag();
        this.swift.input.enableDrag();
        this.steady.input.enableDrag();
        this.sneak.input.enableDrag();
        this.smite.input.enableDrag();
        this.sling.input.enableDrag();
        this.rush.input.enableDrag();
        this.poison.input.enableDrag();
        this.firm.input.enableDrag();
        this.bravery.input.enableDrag();
        this.accurate.input.enableDrag();




        this.BGM = game.add.audio('startAndEnd');
        this.BGM.play('', 0, 0.75, true);
    }, 

     update: function () {
    }

    

}