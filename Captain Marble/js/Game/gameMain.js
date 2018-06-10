var marbleIndex = -1;
var totalStrength = []


/*function disableAllDrag() {
    for (var i = 0; i < marbles.length; i++) {
        marbles[i].marble.input.disableDrag();
    }
}*/

function mainShootMarble(strength, item) {
    //console.log("shot at strength: " + strength);
    item.speed = strength;
    if (item.marble.type == 2 && item.marble.secondSkill == 2) {
        var nearest = 0;
        for (var i = 0; i < marbles.length; i++) {
            if (insideOfArena(marbles[i].marble)) {
                nearest = marbles[i].marble.name;
            }
        }
        for (var i = 0; i < marbles.length; i++) {
            if (insideOfArena(marbles[i].marble)) {
                if (distance(marbles[i].marble, game.input.mousePointer) < distance(marbles[nearest].marble, game.input.mousePointer) && i != item.marble.name) {
                    nearest = i;
                }
            }
        }
        //console.log("nearest: " + nearest)
        item.angle = game.physics.arcade.angleBetween(marbles[nearest].marble, item.marble) * 180 / Math.PI + 180;
    } else {
        item.angle = game.physics.arcade.angleBetween(item.marble, game.input.mousePointer) * 180 / Math.PI + 180;
    }
    game.physics.arcade.velocityFromAngle(item.angle, item.speed, item.marble.body.velocity);
    item.marble.status = 1;
    deselectMarble();
}

function deselectMarble(item) {
    marbleIndex = -1;
}


var gameMain = {

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
            //function marble (x, y, type, firstSkill, secondSkill, index, owner) {};
            marbles[i] = new marble(marbles[i].marble.x, marbles[i].marble.y, marbles[i].marble.type, marbles[i].marble.firstSkill, marbles[i].marble.secondSkill, i, marbles[i].marble.owner);
            //console.log(marbles[i].marble.firstSkill + " " + marbles[i].marble.secondSkill + " " + marbles[i].marble.x + " " + marbles[i].marble.y);
        }
        selected = -1;

        totalStrength.push(300);
        totalStrength.push(300);
    }, 


     update: function () {

        //trigger shoot
        game.input.onUp.add(function(item) {
            if (marbleIndex > -1) {

                if (marbles[marbleIndex].marble.arrowSpawned == 1) {
                    marbles[marbles.length-1].marble.kill();
                    marbles.pop();
                    marbles[marbleIndex].marble.arrowSpawned = 0;
                }

                var strength = 0;
                
                if (marbles[marbleIndex].marble.type == 2 && marbles[marbleIndex].marble.secondSkill == 2) {
                    strength = 160;
                } else {
                    if (distance(marbles[marbleIndex].marble, game.input.mousePointer) * 2 > 230) {
                        strength = 230;
                    } else {
                        strength = distance(marbles[marbleIndex].marble, game.input.mousePointer) * 2
                    }
                }

                if (totalStrength[turn - 1] < strength) {
                    strength = totalStrength[turn - 1];
                    totalStrength[turn - 1] = 0;
                } else {
                    totalStrength[turn - 1] -= strength;
                }

                console.log("shot at strength: " + strength);

                mainShootMarble((strength + 120)*marbles[marbleIndex].strengthFactor, marbles[marbleIndex]);

            }
        });

        //update arrow
        for (var i = 0; i < marbles.length; i++) {
            if (marbles[i].marble.arrowSpawned == 1) {
                if (marbles[i].marble.type != 2 || marbles[i].marble.secondSkill != 2) {
                    marbles[marbles.length - 1].marble.body.x = marbles[i].marble.body.x + Math.cos(game.physics.arcade.angleBetween(marbles[i].marble, game.input.mousePointer) + Math.PI) * 30;
                    marbles[marbles.length - 1].marble.body.y = marbles[i].marble.body.y + Math.sin(game.physics.arcade.angleBetween(marbles[i].marble, game.input.mousePointer) + Math.PI) * 30;
                } else {
                    marbles[marbles.length - 1].marble.body.x = game.input.mousePointer.x - 16;
                    marbles[marbles.length - 1].marble.body.y = game.input.mousePointer.y - 16;
                }
            }
        }


        //update marble location
        updateLocation();


        //==========Homemade Physics Engine Starts=============

        marbles.forEach(function(item) {

            //Setting basic friction
            if (item.speed > 0) {
                //console.log(item.frictionFactor);
                item.speed -= 1.80 * item.frictionFactor;
                game.physics.arcade.velocityFromAngle(item.angle, item.speed, item.marble.body.velocity);

                for (var i = 0; i < 10; i++) {
                    if (distance(item.marble, marbles[i].marble) < 28 && item.marble.owner != 0) {
                        if (item.marble.name != marbles[i].lastTarget && i != item.marble.name && marbles[i].marble.name != item.lastTarget) {

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
                            marbles[i].speed = (item.speed/1.8 + (item.speed * Math.cos(Math.abs(diff)*Math.PI/180))/3) * marbles[i].knockBackFactor;  //Target
                            item.speed = (item.speed/2.4 + (item.speed*(Math.sin(Math.abs(diff)*Math.PI/180)))/5) * item.knockBackFactor * marbles[i].returnFactor; //Attacker

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
            }
            for (var i = 0; i < marbles.length; i++) {
                if (!insideOfArena(marbles[i].marble) && !(insideOfRestArea(marbles[i].marble))) {
                    enterRestArea(marbles[i]);
                }
            }
            for (var i = 0; i < marbles.length; i++) {
                if (marbles[i].marble.status == 1) {
                    marbles[i].marble.status = 0;
                    if (turn == 1) {
                        turn = 2;
                        if (totalStrength[turn - 1] + 120 > 300) {
                            totalStrength[turn - 1] = 300;
                        } else {
                            totalStrength[turn - 1] += 120;
                        }
                        console.log("player " + turn + " turn");
                        console.log("remaining strength: " + totalStrength[turn - 1])
                    } else {
                        turn = 1;
                        if (totalStrength[turn - 1] + 120 > 300) {
                            totalStrength[turn - 1] = 300;
                        } else {
                            totalStrength[turn - 1] += 120;
                        }
                        console.log("player " + turn + " turn");
                        console.log("remaining strength: " + totalStrength[turn - 1])
                    }
                }
            }
            
        }

         //==========Homemade Physics Engine Ends=============



        //Print detail to console
        /*marbles.forEach(function(item) {
            if (distance(item.marble, game.input.mousePointer) < 28){
                console.log();
                console.log("marble: " + item.marble.name);
                console.log("owner: player " + item.marble.owner);
                console.log("status: " + item.status)
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
                }
                
                //console.log("Active: Not Implemented");

                

                console.log();
            }
        });*/

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