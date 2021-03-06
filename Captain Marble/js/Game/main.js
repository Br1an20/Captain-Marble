var game;
var demo;
var select = true;
 
var turn = 1;
var gameState = 1;

function marble (x, y, type, firstSkill, secondSkill, index, owner) {
    
    if (owner == 1) {
        this.marble = game.add.sprite(x, y, 'blueMarble');
    }
    else if (owner == 2) {
        this.marble = game.add.sprite(x, y, 'purpleMarble');
    } else {
        if (type == 4) { // pointing arrow sprite
            this.marble = game.add.sprite(x,y,'pointer');
        }
        else if (type == 5) { //  empty bow  

            this.marble = game.add.sprite(x,y,'bow');
            this.marble.animations.add('arrowAnimation', [0,1],2);
            this.marble.animations.add('arrowAnimation2', [4,5,6],3);
            this.marble.animations.play('arrowAnimation',true);


        } else if (type == 6) { // projectile


            this.marble = game.add.sprite(x, y, 'bowArrow');

        } else if (type == 7) { //accurate marble

            this.marble = game.add.sprite(x,y,'crosshair');

        }
    }
    this.marble.x = x;
    this.marble.y = y;
    this.marble.scale.set(1,1);
    this.marble.anchor.setTo(0.5,0.5);
    this.marble.inputEnabled = true;
    this.marble.enableBody = true;
    this.marble.input.disableDrag(); //uncomment this to enable drag
    this.marble.name = index.toString();
    this.marble.type = type;
    this.marble.firstSkill = firstSkill;
    this.marble.secondSkill = secondSkill;
    this.marble.owner = owner;
    this.marble.status = 0; // 0 undeplyed   1 deploying   2 deployInProgress    3 deployed    4 dead
    this.marble.endTurnTriggered = false;
    this.marble.arrowSpawned = 0;
    
    game.physics.arcade.enable(this.marble);

    this.location = 1; // 0 fall  1 rest  2 arena
    this.speed = 0;
    this.angle = 0;
    this.lastTarget = -1;
    

    this.strengthFactor = 1;
    this.knockBackResistFactor = 1;
    this.frictionFactor = 1;
    this.returnFactor = 1;

    //console.log("created marble");
    if (type == 1) { //Warrior
        if (secondSkill == 1) { //Smite
            this.strengthFactor += this.strengthFactor * 0.18;
        }
        else if (secondSkill == 2) { //Bravery
            this.knockBackResistFactor += this.knockBackResistFactor * 0.12;
            this.strengthFactor += this.strengthFactor * 0.08;
        }
    }
    else if (type == 2) {
        if (secondSkill == 1) { //Swift
            this.frictionFactor -= this.frictionFactor * 0.12;
            this.strengthFactor += this.strengthFactor * 0.10;
        }
    }
    else if (type == 3) {
        if (secondSkill == 1) { //Steady
            this.knockBackResistFactor += this.knockBackResistFactor * 0.2;
        }
        else if (secondSkill == 2) { //Firm
            this.returnFactor += this.returnFactor * 0.3;
            this.frictionFactor += this.frictionFactor * 0.12;
        }
    }

    //uncomment this to enable drag
    this.marble.events.onDragStart.add(function(item) {
        item.scale.setTo(1.2, 1.2);
        choose = game.add.audio('choose');
        choose.play('', 0, 1, false);
    });

    this.marble.events.onDragStop.add(function(item) {
        if (overOtherMarbles(item)) {

        } else {
            item.scale.setTo(1, 1);
            if (insideOfArena(item)) {
                item.input.disableDrag();
                placing = game.add.audio('placing');
                placing.play('', 0, 1, false);
            }
        }
    });

    //select
    this.marble.events.onInputDown.add(function(item) {
        if(select && insideOfArena(item) && turn == item.owner) {
            //console.log("marble " + item.name + " selected");
            marbleIndex = item.name;
            disableSelect();
            if (gameState == 3) {
                //console.log("arrowspanwed: " + item.arrowSpawned)
                if (item.arrowSpawned == 0) {
                    if (item.type != 2 || item.secondSkill != 2) {
                        var angle = game.physics.arcade.angleBetween(item, game.input.mousePointer);
                        marbles.push(new marble(item.x + Math.cos(angle) * 16, item.y + Math.sin(angle) * 16, 4, 0, 0, marbles.length, 0));
                    } else {
                        console.log("spawned ball")
                        marbles.push(new marble(game.input.mousePointer.x, game.input.mousePointer.y, 7, 0, 0, marbles.length, 0));
                    }
                    item.arrowSpawned = 1;
                }
            }
        }
    });
}

function overOtherMarbles(item) {
    for (var i = 0; i < marbles.length; i++) {

        if (i != item.name) {
            if (distance(item, marbles[i].marble) < 28) {
                console.log("you cannot place it there")
                return true;
            }
        }

    }
    return false;
}

function disableSelect() {
    select = false;
}

function enableSelect() {
    select = true;
}

function enterRestArea(item) {
    var x_ = -20;
    var x_dest = 200;

    if (item.marble.owner == 2) {
        x_ = 1220;
        x_dest = 1000;
    }

    item.location = 0;
    var y_ = game.rnd.integerInRange(150, 550);
    item.marble.body.x = x_;
    item.marble.body.y = y_;
    item.angle = game.physics.arcade.angleBetween(new Phaser.Point(x_, y_), new Phaser.Point(x_dest, game.rnd.integerInRange(300, 400))) * 180 / Math.PI + game.rnd.integerInRange(-15, 15)
    item.speed = game.rnd.integerInRange(130, 170);
    game.physics.arcade.velocityFromAngle(item.angle, item.speed, item.marble.body.velocity);

}

function updateLocation () {
    marbles.forEach(function(item) {
        if (insideOfArena(item.marble)) {
            item.location = 2;
        } else 
        if (insideOfRestArea(item.marble)) {
            item.location = 1;
            //item.marble.input.enableDrag();
        } else if (item.location != 0 && item.marble.scale.x == 1) { 
            //animation
            if (item.marble.owner != 0) {
                item.lastTarget = -1;
                enterRestArea(item);
            } else {
                if (gameState == 2) {
                    if (item.marble.type == 6) {
                        console.log("it is six")
                        marbles[marbles.length - 1].marble.kill();
                        marbles.pop();
                    }
                    marbles[marbles.length - 1].marble.kill();
                    marbles.pop();
                }
            }
        }
    })
}

function stationary() {
    for (var i = 0; i < marbles.length; i++) {
        if (marbles[i].speed > 0) {
            return false;
        }
    }
    return true;
}


function distance (a, b) {
    return Phaser.Math.distance(a.x, a.y, b.x, b.y)
}

function insideOfArena(item) {
    return distance(new Phaser.Point(600,350),item) < 300;
}

function insideOfRestArea(item) {
    return ((distance(new Phaser.Point(-120,350),item) < 280 || distance(new Phaser.Point(1320,350),item) < 280)) && (item.body.x > -2) && (item.body.x < 1192);
}

window.onload = function () {

    game = new Phaser.Game(1200, 700, Phaser.AUTO, "ph_game");

    marbles = [];

    //add a state or screen to the game
    game.state.add("gameMainDemo", gameMainDemo);
    game.state.add("gameMain", gameMain);
    game.state.add("Boot", Boot);
    game.state.add("Preloader", Preloader);
    game.state.add("gameOver1", gameOver1);
    game.state.add("gameOver2", gameOver2);
    game.state.add("gameStart", gameStart);
    game.state.add("toBlack", toBlack);
    game.state.add("toBlack2", toBlack2);
    game.state.add("pickUpStateAnimation", pickUpStateAnimation);
    game.state.add("setUpState", setUpState);
    game.state.add("pickUpState", pickUpState);
    game.state.add("demo1", demo1);
    game.state.add("demo2", demo2);
    game.state.add("demo3", demo3);
    game.state.add("gameOverPurple", gameOverPurple);
    game.state.add("gameOverBlue", gameOverBlue);
    game.state.add("creditAnimation", creditAnimation);
    game.state.start("Boot");
}