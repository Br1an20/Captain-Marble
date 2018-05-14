var inSideOfArena = false;
var selectedMarble = false;
var spawnedArrow = false;
var aimedAndFired = false;
var targetMoved = false;
var targetStopped = false;
var selectedShootMarble = false;
var spanwedAimArrow = false;
var aimedAndShot = false;
var blackMarbleMoved = false;
var blackMarbleStopped = false;

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

        this.blackMarble = game.add.sprite(100, 340, 'blackMarble');
        this.blackMarble.scale.set(0.04,0.04);
        this.blackMarble.anchor.setTo(0.5,0.5);
        this.blackMarble.inputEnabled = true;
        this.blackMarble.input.enableDrag();
        this.blackMarble.enableBody = true;
        game.physics.arcade.enable(this.blackMarble);
        // this.blackMarble.events.onDragStart.add(onDragStart, this);
        // this.blackMarble.events.onDragStop.add(onDragStop, this);

        this.targetMarble = game.add.sprite(600, 350, 'blackMarble');
        this.targetMarble.scale.set(0.04,0.04);
        this.targetMarble.anchor.setTo(0.5,0.5);
        this.targetMarble.inputEnabled = true;
        this.targetMarble.enableBody = true;
        game.physics.arcade.enable(this.targetMarble);

        /*this.blackArrow; = game.add.image(this.blackMarble.x, this.blackMarble.y, 'blackArrow');
        this.blackArrow.scale.set(0.05,0.05);
        this.blackArrow.anchor.setTo(0.5,1.5);*/

        this.musicButton = game.add.sprite(1120,0,'musicButton');
        this.musicButton.frame = 2;

        var Label = game.add.text(300,50, '1. Drag Your Marble From the Rest\n  Area on the Left to the Arena', { fontSize: '20px', fill: '#fff' });
        Label.anchor.set(0.5);
        Label2 = game.add.text(900, 50, '2. The Archer Marble Can push \nan Enemy for a Certain Distance\n Select Your Target by Clicking', { fontSize: '20px', fill: '#fff' });
        Label2.anchor.set(0.5);
        Label3 = game.add.text(300, 650, '3.After Deploy Your Marble \n You May Select Your Marble to Shoot', { fontSize: '20px', fill: '#fff' });
        Label3.anchor.set(0.5);
        Label4 = game.add.text(900, 650, '4.Shoot in Any Direction \n (No need to select target', { fontSize: '20px', fill: '#fff' });
        Label4.anchor.set(0.5);

        this.BGM = game.add.audio('BGM');
        this.BGM.play('', 0, 0.75, true);

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

        if (!inSideOfArena) {
            this.blackMarble.events.onDragStart.add(function(item) {
                var choose = game.add.audio('choose');
                choose.play('', 0, 0.75, false);
                item.scale.setTo(0.05, 0.05);
            })
            this.blackMarble.events.onDragStop.add(function(item) {
                item.scale.setTo(0.04, 0.04);
                var placing = game.add.audio('placing');
                placing.play('', 0, 0.2, false);
             
                if (item.x > 330 && item.x < 870 && item.y > 80 && item.y < 620) {
                    inSideOfArena = true;
                }
            })
        } else {
            if (!(this.blackMarble.x > 330 && this.blackMarble.x < 870 && this.blackMarble.y > 80 && this.blackMarble.y < 620)) {
                var Lose = game.add.text(600, 350, 'YOU LOST', { fontSize: '30px', fill: '#000' });
                Lose.anchor.set(0.5);
                this.blackMarble.kill();
                game.state.start("gameOver");
            }

            if(!(this.targetMarble.x > 330 && this.targetMarble.x < 870 && this.targetMarble.y > 80 && this.targetMarble.y < 620)) {
                var Win = game.add.text(600, 350, 'YOU WIN', { fontSize: '30px', fill: '#000' });
                Win.anchor.set(0.5);
                this.targetMarble.kill();
                game.state.start("gameOver");
                
            }

            this.blackMarble.input.disableDrag();
            if (!selectedMarble) {
                selectedMarble = true;
            } else {
                if (!spawnedArrow) {
                    this.blackArrow = game.add.image(this.blackMarble.x, this.blackMarble.y, 'blackArrow');
                    this.blackArrow.scale.set(0.05,0.05);
                    this.blackArrow.anchor.setTo(0.5,1.5);
                    spawnedArrow = true;
                } else {
                    var Label2;
                    var Label3;
                    var Label4;
                    if (!aimedAndFired) {

                        var angle = game.physics.arcade.angleBetween(this.blackMarble, game.input.mousePointer) * 180 / Math.PI;
                        this.blackArrow.angle = angle + 90;
                        this.blackArrow.x = this.blackMarble.x;
                        this.blackArrow.y = this.blackMarble.y;
                        this.targetMarble.events.onInputDown.add(function(item) {
                            aimedAndFired = true;
                            var shooting = game.add.audio('shooting');
                            shooting.play('', 0, 0.75, false);
                            
                            item.events.destroy();

                        })

                    } else {
                        if (!targetMoved) {
                            this.blackArrow.kill();
                            var angle = game.physics.arcade.angleBetween(this.blackMarble, this.targetMarble) * 180 / Math.PI;
                            game.physics.arcade.velocityFromAngle(angle, 200, this.targetMarble.body.velocity);
                            targetMoved = true;
                        } else {
                            if(!targetStopped && Phaser.Math.distance(this.targetMarble.x, this.targetMarble.y, 600, 350) > 100) {
                                game.physics.arcade.velocityFromAngle(angle, 0, this.targetMarble.body.velocity);
                                targetStopped = true;
                            } else {
                              
                                if(!selectedShootMarble) {
                                    this.blackMarble.events.onInputDown.add(function(item) {
                                        
                                        selectedShootMarble = true;
                                        var choose = game.add.audio('choose');
                                        choose.play('', 0, 0.75, false);
                                       
                                        item.events.destroy();
                                    });
                                } else {
                                    if(!spanwedAimArrow) {
                                        
                                        this.blackArrow = game.add.image(this.blackMarble.x, this.blackMarble.y, 'blackArrow');
                                        this.blackArrow.scale.set(0.05,0.05);
                                        this.blackArrow.anchor.setTo(0.5,1.5);
                                        spanwedAimArrow = true;
                                    } else {
                                        var x_ = 0;
                                        var y_ = 0;
                                       
                                        var angle = game.physics.arcade.angleBetween(this.blackMarble, game.input.mousePointer) * 180 / Math.PI;
                                        if(!aimedAndShot) {
                                            this.blackArrow.angle = angle + 90;
                                            this.blackArrow.x = this.blackMarble.x;
                                            this.blackArrow.y = this.blackMarble.y;
                                            game.input.onDown.add(function(item) {
                                                var shooting = game.add.audio('shooting');
                                                shooting.play('', 0, 0.75, false);
                                                
                                                x_ = game.input.mousePointer.x;
                                                y_ = game.input.mousePointer.y; 
                                                aimedAndShot = true;
                                            });
                                        } else {
                                            if (!blackMarbleMoved) {
                                                this.blackArrow.kill();
                                                angle = game.physics.arcade.angleBetween(this.blackMarble, game.input.mousePointer) * 180 / Math.PI;
                                                game.physics.arcade.velocityFromAngle(angle, 200, this.blackMarble.body.velocity);
                                                blackMarbleMoved = true;
                                            } else {
                                                var x__ = 0;
                                                var y__ = 0;
                                                if (!blackMarbleStopped) {
                                                    angle = game.physics.arcade.angleBetween(this.blackMarble, this.targetMarble) * 180 / Math.PI;
                                                    if ((this.blackMarble.body.x < this.targetMarble.body.x + 26 && this.blackMarble.body.x > this.targetMarble.body.x - 26 && this.blackMarble.body.y < this.targetMarble.body.y + 26 && this.blackMarble.body.y > this.targetMarble.body.y - 26)) {
                                                        console.log("collision");
                                                        var hit = game.add.audio('hit');
                                                        hit.play('', 0, 0.75, false);
                                                        game.physics.arcade.velocityFromAngle(angle - 180, 200, this.blackMarble.body.velocity);
                                                        blackMarbleStopped = true;
                                                        x__ = this.blackMarble.body.x;
                                                        y__ = this.blackMarble.body.y;
                                                    }
                                                } else {                                                   
                                                    if(Phaser.Math.distance(this.blackMarble.body.x, this.blackMarble.body.y, x__, y__) > 100) {
                                                        game.physics.arcade.velocityFromAngle(angle - 180, 0, this.blackMarble.body.velocity);
                                                    }
                                                    var angle = game.physics.arcade.angleBetween(this.blackMarble, this.targetMarble) * 180 / Math.PI;
                                                    game.physics.arcade.velocityFromAngle(angle, 200, this.targetMarble.body.velocity);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}