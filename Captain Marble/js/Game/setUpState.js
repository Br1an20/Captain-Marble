var marbleIndex = -1;

function pointDistanceFromPointByAngle(x, y, distance, angle) {
    var x_ = x + Math.sin(angle) * distance;
    var y_ = y + Math.cos(angle) * distance;

    console.log("inside function: " + x_ + ", " + y_)

    return Phaser.Point(x_, y_);
}

function shootMarble(strength, angle, item) {
    item.speed = strength;
    item.angle = angle;
    game.physics.arcade.velocityFromAngle(item.angle, item.speed, item.marble.body.velocity);
    deselectMarble();
}

function noDeployingMarble() {
    for (var i = 0; i < marbles.length; i++) {
        if (marbles[i].marble.status == 1) {
            return false;
        }
    }
    return true;
}

function noDeployInProgress() {
    for (var i = 0; i < marbles.length; i++) {
        if (marbles[i].marble.status == 2) {
            return false;
        }
    }
    return true;
}

/*function allEndTurnTriggered() {
    //console.log("allEndTurnTriggered function")
    for (var i = 0; i < marbles.length; i++) {
        if (marbles[i].marble.endTurnTriggered == false && marbles[i].marble.firstSkill == 1 && marbles[i].marble.type == 3) {
            return false;
        }
    }
    return true;
}*/

function allMarblesDeployed () {
    for (var i = 0; i < marbles.length; i++) {
        if (marbles[i].marble.status != 3) {
            return false;
        }
    }
    return true;
}

var setUpState = {

    preload: function () {

    },

    create: function () {

        this.gameBoardMain = game.add.image(0, 0, 'gameBoard');
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

        for (var i = 0; i < marbles.length; i++) {
            marbles[i] = new marble(marbles[i].marble.x + 16, marbles[i].marble.y + 16, marbles[i].marble.type, marbles[i].marble.firstSkill, marbles[i].marble.secondSkill, i, marbles[i].marble.owner);
            marbles[i].marble.input.enableDrag();

            marbles[i].marble.events.onDragStop.add(function(item) {
            if (insideOfArena(item)) {

                if (turn == 1) {
                    turn = 2;
                } else {
                    turn = 1;
                }

                //console.log(item.type + " " + item.firstSkill + " " + item.secondSkill)
                item.status = 1;

                if (item.type == 1) {
                    if (item.firstSkill == 1) { // Rush
                        console.log("Warrior - Rush");
                        for (var i = 0; i < marbles.length; i++) {
                            if (i != item.name && marbles[i].location) {

                                if (distance(marbles[i].marble, item) <= 150) {

                                    var angle = game.physics.arcade.angleBetween(item, marbles[i].marble) * 180 / Math.PI;

                                    shootMarble(140, angle, marbles[i]);

                                }

                            }
                        }
                        item.status = 2;
                    }
                    else if (item.firstSkill == 2) {
                        console.log("Warrior - Warcry");
                        item.status = 2;
                    }
                }
                else if (item.type == 2) {
                    if (item.firstSkill == 1) {
                        console.log("Ranger - Sneak");
                        var angle = game.physics.arcade.angleBetween(item, game.input.mousePointer);
                        console.log("in side of ranger");
                        marbles.push(new marble(item.x + Math.cos(angle) * 30, item.y + Math.sin(angle) * 30, 0, 0, 0, marbles.length, 0));
                        game.input.onUp.add(function(item) {
                            for (var i = 0; i < marbles.length; i++) {
                                if (marbles[i].marble.status == 1 && marbles[i].marble.type == 2 && marbles[i].marble.firstSkill == 1) {
                                    marbles[i].marble.status = 2;
                                    shootMarble(600, game.physics.arcade.angleBetween(marbles[i].marble, game.input.mousePointer) * 180 / Math.PI, marbles[marbles.length - 1]);
                                }
                            }
                        });
                    }
                    else if (item.firstSkill == 2) {
                        console.log("Ranger - Poison");
                        item.status = 2;
                    }
                }
                else if (item.type == 3) {
                    if (item.firstSkill == 1) {
                        console.log("Castle - Sling");
                        item.status = 2;
                    }
                    else if (item.firstSkill == 2) {
                        console.log("Castle - Towering");
                        item.status = 2;
                    }
                }

            }
    });
        }
    }, 


     update: function () {

        //update marble location
        updateLocation();

        for (var i = 0; i < marbles.length; i++) {
            if (marbles[i].marble.owner != turn || (marbles[i].marble.status == 3 && insideOfRestArea(marbles[i].marble)) || (insideOfArena(marbles[i].marble) && marbles[i].marble.status != 0)  || !noDeployInProgress()) {
                marbles[i].marble.input.disableDrag();
            } else {
                marbles[i].marble.input.enableDrag();
            }
        }
        //==========Homemade Physics Engine Starts=============

        marbles.forEach(function(item) {

            //Setting basic friction
            if (item.speed > 0) {
                //console.log(item.frictionFactor);
                if (item.marble.owner != 0) {
                    item.speed -= 1.80 * item.frictionFactor;
                    game.physics.arcade.velocityFromAngle(item.angle, item.speed, item.marble.body.velocity);
                }

                for (var i = 0; i < marbles.length; i++) {
                    if (distance(item.marble, marbles[i].marble) < 28) {
                        if (item.marble.name != marbles[i].lastTarget && i != item.marble.name && marbles[i].marble.name != item.lastTarget) {

                            if (item.marble.owner == 0) { //arrow sprite
                                item.marble.kill();
                                marbles.pop();
                            }

                            item.lastTarget = marbles[i].marble.name;//record the last hit marble, to prevent double collision;

                            marbles[i].angle = game.physics.arcade.angleBetween(item.marble, marbles[i].marble) * 180 / Math.PI;
                            
                            var diff = 0; //Calculate the difference between the original angle between two marbles and angle at collision
                            if (Math.abs(marbles[i].angle - item.angle) > 90) {
                                diff = marbles[i].angle - item.angle + 360;
                            } else {
                                diff = marbles[i].angle - item.angle
                            }
                
                            item.angle = item.angle + Math.sin(Math.abs(diff)*Math.PI/180)*diff*2 + 180; //Determine angle difference by included angle

                            //determine speed by decomposed force
                            if (item.marble.owner != 0) {
                                marbles[i].speed = (item.speed/2 + (item.speed * Math.cos(Math.abs(diff)*Math.PI/180))/3) * marbles[i].knockBackFactor;  //Target
                                item.speed = (item.speed/2.5 + (item.speed*(Math.sin(Math.abs(diff)*Math.PI/180)))/5) * item.knockBackFactor * marbles[i].returnFactor; //Attacker
                            } else {
                                marbles[i].speed = 180;
                            }
                            game.physics.arcade.velocityFromAngle(item.angle, item.speed, item.marble.body.velocity); // move marbles 
                            game.physics.arcade.velocityFromAngle(marbles[i].angle, marbles[i].speed, marbles[i].marble.body.velocity);
                        }
                    }
                }
            }
        });

        disableSelect();

        if (stationary()) {
            enableSelect();
            for (var i = 0; i < marbles.length; i++) {
                marbles[i].lastTarget = -1;
                marbles[i].marble.body.velocity.x = 0;
                marbles[i].marble.body.velocity.y = 0;
                if (!insideOfArena(marbles[i].marble) && !(insideOfRestArea(marbles[i].marble)) && marbles[i].marble.scale.x == 1) {
                    enterRestArea(marbles[i]);
                }
                if (marbles[i].marble.status == 2) {
                    marbles[i].marble.status = 3;
                    console.log("player " + turn + " turn");
                }
            }
            /*if (!allEndTurnTriggered() && noDeployingMarble() && noDeployInProgress()) {
                for (var i = 0; i < marbles.length; i++) {
                    if (marbles[i].marble.type == 3 && marbles[i].marble.firstSkill == 1 && marbles[i].marble.status == 3 && !marbles[i].endTurnTriggered) {
                        console.log("Sling triggered");
                        marbles[i].endTurnTriggered = true;
                        break;
                    }
                }
            }
            if (allEndTurnTriggered() && noDeployInProgress() && noDeployingMarble()) {
                console.log("turn end");
                for (var i = 0; i < marbles.length; i++) {
                    marbles[i].endTurnTriggered = false;
                }
            }*/
        }


         //==========Homemade Physics Engine Ends=============

        for (var i = 0; i < marbles.length; i++) {
            if (marbles[i].marble.firstSkill == 1 && marbles[i].marble.type == 2 && marbles[i].marble.status == 1) {
                marbles[marbles.length - 1].marble.body.x = marbles[i].marble.body.x + Math.cos(game.physics.arcade.angleBetween(marbles[i].marble, game.input.mousePointer)) * 30
                marbles[marbles.length - 1].marble.body.y = marbles[i].marble.body.y + Math.sin(game.physics.arcade.angleBetween(marbles[i].marble, game.input.mousePointer)) * 30
            }
        }

        //Print detail to console
        marbles.forEach(function(item) {
            if (distance(item.marble, game.input.mousePointer) < 32){
                /*console.log("marble: " + item.marble.name);
                console.log("owner: player " + item.marble.owner);
                console.log("location: " + item.location)
                if (item.marble.type == 1) {
                    console.log("type: Warrior");
                    if (item.marble.secondSkill == 1) {
                        console.log("Passive: Smite - Much higher strength");
                    }
                    else if (item.marble.secondSkill == 2) {
                        console.log("Passive: Bravery - Receive less knock back and higher strength");
                    }
                } 
                else if (item.marble.type == 2) {
                    console.log("type: Ranger");
                    if (item.marble.secondSkill == 1) {
                        console.log("Passive: Swift - Less friction and higher strength");
                    }
                    else if (item.marble.secondSkill == 2) {
                        console.log("Passive: Accurate - Fire to the center of the nearest marble to mousePointer");
                    }
                }
                else if (item.marble.type == 3) {
                    console.log("type: Castle");
                    if (item.marble.secondSkill == 1) {
                        console.log("Passive: Steady - Receive much less knock back");
                    }
                    else if (item.marble.secondSkill == 2) {
                        console.log("Passive: firm - Return higher strength when hit");
                    }
                }*/
                
                //console.log("Active: Not Implemented");

                

                console.log();
            }
        });


        if (allMarblesDeployed()) {
            gameState = 3;
            game.state.start("gameMain");
        }

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