var selected = "none";
var index = 0;

buttons = [];

function newButton (x, y, type) {
    this.button = game.add.button(x, y, type, buttonPressed,this,0);
    this.button.anchor.setTo(0.5, 0.5);
}

function buttonPressed(item) {

    var passive;
    var active;
    var owner = 1;

    if (selected == "smite" || item.key == "smite" || selected == "swift" || item.key == "swift" || selected == "steady" || item.key == "steady") {
        passive = 1;
    }

    if (selected == "rush" || item.key == "rush" || selected == "sneak" || item.key == "sneak" || selected == "sling" || item.key == "sling") {
        active = 1;
    }

    if (selected == "bravery" || item.key == "bravery" || selected == "accurate" || item.key == "accurate" || selected == "firm" || item.key == "firm") {
        passive = 2;
    }

    if (selected == "warcry" || item.key == "warcry" || selected == "poison" || item.key == "poison" || selected == "towering" || item.key == "towering") {
        active = 2;
    }

    if (index > 1) {
        owner = 2;
    }

    if (index < 10) {

        if (selected == "none") {
            console.log("selected " + item.key);
            selected = item.key
        }

        else if (selected == item.key) {
            console.log("deselected " + selected);
            selected = "none";
        }
        
        else if (item.key == "rush" || item.key == "warcry") {
            if (selected == "smite" || selected == "bravery") {
                console.log("spawned Warrior Marble with " + item.key + " and " + selected);
                marbles.push(new marble(-20, -20, 1, active, passive, index, owner));
                index += 1;
                console.log("deselected " + selected);
                selected = "none";
            } else {
                console.log("deselected " + selected);
                selected = "none";
                console.log("selected " + item.key);
                selected = item.key;
            }
        }

        else if (item.key == "smite" || item.key == "bravery") {
            if (selected == "rush" || selected == "warcry") {
                console.log("spawned Warrior Marble with " + item.key + " and " + selected);
                marbles.push(new marble(-20, -20, 1, active, passive, index, owner));
                index += 1;
                console.log("deselected " + selected);
                selected = "none";
            } else {
                console.log("deselected " + selected);
                selected = "none";
                console.log("selected " + item.key);
                selected = item.key;
            }
        }

        else if (item.key == "sneak" || item.key == "poison") {
            if (selected == "swift" || selected == "accurate") {
                console.log("spawned Warrior Marble with " + item.key + " and " + selected);
                marbles.push(new marble(-20, -20, 2, active, passive, index, owner));
                index += 1;
                console.log("deselected " + selected);
                selected = "none";
            } else {
                console.log("deselected " + selected);
                selected = "none";
                console.log("selected " + item.key);
                selected = item.key;
            }
        }

        else if (item.key == "swift" || item.key == "accurate") {
            if (selected == "sneak" || selected == "poison") {
                console.log("spawned Warrior Marble with " + item.key + " and " + selected);
                marbles.push(new marble(-20, -20, 2, active, passive, index, owner));
                index += 1;
                console.log("deselected " + selected);
                selected = "none";
            } else {
                console.log("deselected " + selected);
                selected = "none";
                console.log("selected " + item.key);
                selected = item.key;
            }
        }

        else if (item.key == "sling" || item.key == "towering") {
            if (selected == "steady" || selected == "firm") {
                console.log("spawned Warrior Marble with " + item.key + " and " + selected);
                marbles.push(new marble(-20, -20, 3, active, passive, index, owner));
                index += 1;
                console.log("deselected " + selected);
                selected = "none";
            } else {
                console.log("deselected " + selected);
                selected = "none";
                console.log("selected " + item.key);
                selected = item.key;
            }
        }

        else if (item.key == "steady" || item.key == "firm") {
            if (selected == "sling" || selected == "towering") {
                console.log("spawned Warrior Marble with " + item.key + " and " + selected);
                marbles.push(new marble(-20, -20, 3, active, passive, index, owner));
                index += 1;
                console.log("deselected " + selected);
                selected = "none";
            } else {
                console.log("deselected " + selected);
                selected = "none";
                console.log("selected " + item.key);
                selected = item.key;
            }
        }
    }
}

var pickUpState = {

    preload: function () {
        game.load.image('pickUpBackground', 'assets/img/Pick up state background.png');
    },

    create: function () {
        //game.title = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'title');
        //game.title.anchor.setTo(0.5);
        this.pickUpBackground = game.add.image(0,0 ,'pickUpBackground');

        buttons.push(new newButton(272, 140, "rush"));
        buttons.push(new newButton(272, 190, "warcry"));
        buttons.push(new newButton(385, 140, "smite"));
        buttons.push(new newButton(385, 190, "bravery"));
        buttons.push(new newButton(555, 140, "sneak"));
        buttons.push(new newButton(555, 190, "poison"));
        buttons.push(new newButton(668, 140, "swift"));
        buttons.push(new newButton(668, 190, "accurate"));
        buttons.push(new newButton(849, 140, "sling"));
        buttons.push(new newButton(849, 190, "towering"));
        buttons.push(new newButton(962, 140, "steady"));
        buttons.push(new newButton(962, 190, "firm"));



        this.BGM = game.add.audio('startAndEnd');
        this.BGM.play('', 0, 0.75, true);
    },

    update: function() {

        //update marble location
        updateLocation();


        //==========Homemade Physics Engine Starts=============

        marbles.forEach(function(item) {

            //Setting basic friction
            if (item.speed > 0) {
                //console.log(item.frictionFactor);
                item.speed -= 1.80 * item.frictionFactor;
                game.physics.arcade.velocityFromAngle(item.angle, item.speed, item.marble.body.velocity);

                for (var i = 0; i < marbles.length; i++) {
                    if (distance(item.marble, marbles[i].marble) < 28) {
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
                            marbles[i].speed = (item.speed/2 + (item.speed * Math.cos(Math.abs(diff)*Math.PI/180))/3) * marbles[i].knockBackFactor;  //Target
                            item.speed = (item.speed/2.5 + (item.speed*(Math.sin(Math.abs(diff)*Math.PI/180)))/5) * item.knockBackFactor * marbles[i].returnFactor; //Attacker

                            game.physics.arcade.velocityFromAngle(item.angle, item.speed, item.marble.body.velocity); // move marbles 
                            game.physics.arcade.velocityFromAngle(marbles[i].angle, marbles[i].speed, marbles[i].marble.body.velocity);
                        }
                    }
                }
            }
        });

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
        }

         //==========Homemade Physics Engine Ends=============

        if (stationary() && index > 3) {
            for (var i = 0; i < marbles.length; i++) {
                marbles[i].marble.x = marbles[i].marble.body.x;
                marbles[i].marble.y = marbles[i].marble.body.y;
            }
            game.state.start("setUpState");
        }

    }

}