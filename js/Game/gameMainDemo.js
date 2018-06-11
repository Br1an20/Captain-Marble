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

var gameMainDemo = {
    preload:function(){

    },
    create:function(){
        this.gameBoard = game.add.image(0, 0, 'gameBoard');
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

       // this.game.add.tween(this.arrowDownBlue).to({y: this.arrowDownBlue.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);

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




        /*this.blackArrow; = game.add.image(this.blackMarble.x, this.blackMarble.y, 'blackArrow');
        this.blackArrow.scale.set(0.05,0.05);
        this.blackArrow.anchor.setTo(0.5,1.5);*/



        var Label = game.add.text(250,125, '1. Drag Your Marble From the Rest\n  Area on the Left to the Arena', { fontSize: '20px', fill: '#fff' });
        Label.anchor.set(0.5);
        Label2 = game.add.text(970, 125, '2. The Archer Marble Can push \nan Enemy for a Certain Distance\n Select Your Target by Clicking', { fontSize: '20px', fill: '#fff' });
        Label2.anchor.set(0.5);
        Label3 = game.add.text(250, 600, '3.After Deploy Your Marble \n You May Select Your Marble to Shoot', { fontSize: '20px', fill: '#fff' });
        Label3.anchor.set(0.5);
        Label4 = game.add.text(970, 600, '4.Shoot in Any Direction \n (No need to select target', { fontSize: '20px', fill: '#fff' });
        Label4.anchor.set(0.5);

        this.BGM = game.add.audio('BGM');
        this.BGM.play('', 0, 0.75, true);

    },

    update:function(){
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
                
                
                this.blackMarble.kill();
                inSideOfArena = false;
                selectedMarble = false;
                spawnedArrow = false;
                aimedAndFired = false;
                targetMoved = false;
                targetStopped = false;
                selectedShootMarble = false;
                spanwedAimArrow = false;
                aimedAndShot = false;
                blackMarbleMoved = false;
                blackMarbleStopped = false;
                game.state.start("gameOver2");
            }

            if(!(this.targetMarble.x > 330 && this.targetMarble.x < 870 && this.targetMarble.y > 80 && this.targetMarble.y < 620)) {
                
                this.targetMarble.kill();
                inSideOfArena = false;
                selectedMarble = false;
                spawnedArrow = false;
                aimedAndFired = false;
                targetMoved = false;
                targetStopped = false;
                selectedShootMarble = false;
                spanwedAimArrow = false;
                aimedAndShot = false;
                blackMarbleMoved = false;
                blackMarbleStopped = false;
                game.state.start("gameOver1");
                
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