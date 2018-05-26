var gameMain = {

    preload: function () {

    },

    create: function () {
		this.gameBoardMain = game.add.image(0, 0, 'gameBoardMain');
        this.trashCanBlue = game.add.image(0,620,'blueTrashCan');
        this.trashCanPurple = game.add.image(1120,620,'purpleTrashCan');
        //player1 image
        this.player1 = game.add.sprite(135,30,'player1');
        this.player1.scale.set(2);
        this.player1.anchor.set(0.5);
        this.player1.animations.add('player1Clicked',[0,1],2,true);
        this.player1.animations.play('player1Clicked');
        //player2 image
        this.player2 = game.add.image(1065,30,'player2');
        this.player2.scale.set(2);
        this.player2.anchor.set(0.5);
        this.player2.animations.add('player2Clicked',[0,1],2,true);
        this.player2.animations.play('player2Clicked');
        //Bar1
        this.bar1Mpty = game.add.image(0,60,'blueBarMpty');        
        this.bar1Mpty.scale.set(0.2,0.5);
        this.bar1Filed  = game.add.image(0,60,'blueBarFilled');
        this.bar1Filed.scale.set(0.2,0.5);
        //Bar2
        this.bar2Mpty = game.add.image(1010,60,'prBarMpty');
        this.bar2Mpty.scale.set(0.2,0.5);
        this.bar2Filed  = game.add.image(1010,60,'prBarFilled');
        this.bar2Filed.scale.set(0.2,0.5);

        this.BGM = game.add.audio('BGM');
        this.BGM.play('', 0, 0.75, true);

    }, 


     update: function () {
     	//Bar controleller
        cursors = game.input.keyboard.createCursorKeys();
        if (cursors.left.isDown){
            this.bar1Filed.width = this.bar1Filed.width - 5;
            this.bar2Filed.width = this.bar2Filed.width - 5;
            if(this.bar1Filed.width<0){
                this.bar1Filed.width = 0
            }
            if(this.bar2Filed.width<0){
                this.bar2Filed.width = 0
            }
        }   else if (cursors.right.isDown){
            this.bar1Filed.width = this.bar1Filed.width + 5;
            this.bar2Filed.width = this.bar2Filed.width + 5;
            if(this.bar1Filed.width > this.bar1Mpty.width){
            this.bar1Filed.width = this.bar1Mpty.width;
            }
            if(this.bar2Filed.width > this.bar2Mpty.width){
            this.bar2Filed.width = this.bar2Mpty.width;
            }
        }
    }

    

}