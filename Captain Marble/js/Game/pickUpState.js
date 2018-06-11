var selected = "none";
var index = 0;

buttons = [];

function newButton (x, y, type) {
    this.button = game.add.button(x, y, type, buttonPressed,this,1,1,0);
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

    if (index > 4) {
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


        this.pickUpStateAnimation = game.add.sprite(0,0,'pickUpStateAnimation');
        this.pickUpStateAnimation.animations.add('play',[0,1,2,3,4,5,6,7],7);
        this.pickUpStateAnimation.animations.play('play',true);

        this.rushDetail = game.add.image(272,80,"rushDetail");
        this.rushDetail.anchor.setTo(0.5);
        this.rushDetail.alpha = 0; 

        this.warcryDetail = game.add.image(272,250 ,"warcryDetail");
        this.warcryDetail.anchor.setTo(0.5);
        this.warcryDetail.alpha = 0.5; 

        this.smiteDetail = game.add.image(385,80,"smiteDetail");
        this.smiteDetail.anchor.setTo(0.5);
        this.smiteDetail.alpha = 0.5; 

        this.braveryDetail = game.add.image(385,250,"braveryDetail");
        this.braveryDetail.anchor.setTo(0.5);
        this.braveryDetail.alpha = 0.5; 

        this.poisonDetail = game.add.image(555,250,"poisonDetail");
        this.poisonDetail.anchor.setTo(0.5);
        this.poisonDetail.alpha = 0.5; 

        this.sneakDetail = game.add.image(555,250,"sneakDetail");
        this.sneakDetail.anchor.setTo(0.5);
        this.sneakDetail.alpha = 0.5; 

        this.swiftDetail = game.add.image(668,80,"swiftDetail");
        this.swiftDetail.anchor.setTo(0.5);
        this.swiftDetail.alpha = 0.5; 

        this.accurateDetail = game.add.image(668,250,"accurateDetail");
        this.accurateDetail.anchor.setTo(0.5);
        this.accurateDetail.alpha = 0.5; 

        this.slingDetail = game.add.image(849,80,"slingDetail");
        this.slingDetail.anchor.setTo(0.5);
        this.slingDetail.alpha = 0.5; 

        this.toweringDetail = game.add.image(849,250,"toweringDetail");
        this.toweringDetail.anchor.setTo(0.5);
        this.toweringDetail.alpha = 0.5; 


        this.steadyDetail = game.add.image(962,80,"steadyDetail");
        this.steadyDetail.anchor.setTo(0.5);
        this.steadyDetail.alpha = 0.5; 


        this.firmDetail = game.add.image(962,250,"firmDetail");
        this.firmDetail.anchor.setTo(0.5);
        this.firmDetail.alpha = 0.5; 

        


        this.BGM = game.add.audio('startAndEnd');
        this.BGM.play('', 0, 0.75, true);
    },

    update: function() {


        //console.log(game.input.mousePointer.x,game.input.mousePointer.y);
        if(game.input.mousePointer.x >237 &&game.input.mousePointer.x < 306 && game.input.mousePointer.y >124 && game.input.mousePointer.y < 154 ){
            this.rushDetail.alpha = 1;
        }else{
            this.rushDetail.alpha = 0;
        }

        if(game.input.mousePointer.x >237 &&game.input.mousePointer.x < 306 && game.input.mousePointer.y >175 && game.input.mousePointer.y < 204 ){
            this.warcryDetail.alpha = 1;
        }else{
            this.warcryDetail.alpha = 0;
        }

        if(game.input.mousePointer.x >350 &&game.input.mousePointer.x < 420 && game.input.mousePointer.y >124 && game.input.mousePointer.y < 154 ){
            this.smiteDetail.alpha = 1;
        }else{
            this.smiteDetail.alpha = 0;
        }

        if(game.input.mousePointer.x >350 &&game.input.mousePointer.x < 420 && game.input.mousePointer.y >175 && game.input.mousePointer.y < 204 ){
            this.braveryDetail.alpha = 1;
        }else{
            this.braveryDetail.alpha = 0;
        }

        if(game.input.mousePointer.x >520 &&game.input.mousePointer.x < 590 && game.input.mousePointer.y >124 && game.input.mousePointer.y < 154 ){
            this.sneakDetail.alpha = 1;
        }else{
            this.sneakDetail.alpha = 0;
        }

        if(game.input.mousePointer.x >520 &&game.input.mousePointer.x < 590 && game.input.mousePointer.y >175 && game.input.mousePointer.y < 204 ){
            this.poisonDetail.alpha = 1;
        }else{
            this.poisonDetail.alpha = 0;
        }

        if(game.input.mousePointer.x >630 &&game.input.mousePointer.x < 700 && game.input.mousePointer.y >124 && game.input.mousePointer.y < 154 ){
            this.swiftDetail.alpha = 1;
        }else{
            this.swiftDetail.alpha = 0;
        }


        if(game.input.mousePointer.x >630 &&game.input.mousePointer.x < 700 && game.input.mousePointer.y >175 && game.input.mousePointer.y < 204 ){
            this.accurateDetail.alpha = 1;
        }else{
            this.accurateDetail.alpha = 0;
        }


        if(game.input.mousePointer.x >815 &&game.input.mousePointer.x < 883 && game.input.mousePointer.y >124 && game.input.mousePointer.y < 154 ){
            this.slingDetail.alpha = 1;
        }else{
            this.slingDetail.alpha = 0;
        }

        if(game.input.mousePointer.x >815 &&game.input.mousePointer.x < 883 && game.input.mousePointer.y >175 && game.input.mousePointer.y < 204 ){
            this.toweringDetail.alpha = 1;
        }else{
            this.toweringDetail.alpha = 0;
        }

        if(game.input.mousePointer.x >925 &&game.input.mousePointer.x < 996 && game.input.mousePointer.y >124 && game.input.mousePointer.y < 154 ){
            this.steadyDetail.alpha = 1;
        }else{
            this.steadyDetail.alpha = 0;
        }

        if(game.input.mousePointer.x >925 &&game.input.mousePointer.x < 996 && game.input.mousePointer.y >175 && game.input.mousePointer.y < 204 ){
            this.firmDetail.alpha = 1;
        }else{
            this.firmDetail.alpha = 0;
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
                            marbles[i].speed = (item.speed/2 + (item.speed * Math.cos(Math.abs(diff)*Math.PI/180))/3) / marbles[i].knockBackResistFactor;  //Target
                            item.speed = (item.speed/2.5 + (item.speed*(Math.sin(Math.abs(diff)*Math.PI/180)))/5) / item.knockBackResistFactor * marbles[i].returnFactor; //Attacker

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

        if (stationary() && index > 9) {
            for (var i = 0; i < marbles.length; i++) {
                marbles[i].marble.x = marbles[i].marble.body.x;
                marbles[i].marble.y = marbles[i].marble.body.y;
            }
            gameState = 2;
            game.state.start("toBlack");
        }

    }

}