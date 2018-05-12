var gameMain = {
    preload:function(){

    },
    create:function(){

        this.gameBoard = game.add.image(0, 0, 'gameBoard');
        this.trashCanBlue = game.add.image(0,0,'blueTrashCan');
        this.trashCanBlue = game.add.image(1120,620,'purpleTrashCan');
        this.player1 = game.add.image(200,315,'player1');
        this.player2 = game.add.image(937,315,'player2');
        this.setting = game.add.image(0,620,'setting');
        //create pointer to indicate the player's round
        this.arrowDownBlue = game.add.image(213,270,'arrowBlue');
        this.arrowDownBlue.scale.set(0.5,0.5);
        this.game.add.tween(this.arrowDownBlue).to({y: this.arrowDownBlue.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

        this.arrowDownPurple = game.add.image(948,270,'arrowPurple');
        this.arrowDownPurple.scale.set(0.5,0.5);
        this.game.add.tween(this.arrowDownPurple).to({y: this.arrowDownPurple.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);
        
        this.musicButton = game.add.sprite(1120,0,'musicButton');
        this.musicButton.frame = 2;

        

        this.BGM = game.add.audio('BGM');
        this.BGM.play();

        this.setFlag();


    },
    setFlag: function(){
        this.musicButton.inputEnabled = true;
        this.musicButton.events.onInputDown.add(this.toggleMusic,this);
    },
    toggleMusic:function(){
        musicOn = !musicOn;
        this.updateButtons();
    },
    updateMusic:function(){
        if(musicOn == true){
            if(this.musicPlaying == false){
                this.musicPlaying = true;
                this.BGM.play();
            }
        }else{
            this.musicPlaying = false;
            this.BGM.stop();
        }
    },
    updateButtons:function(){
        if (musicOn == true){
            this.musicButton.frame = 0;
        }else{
            this.musicButton.frame = 1;
        }
    },
    update:function(){

    }
}