var game;
var score = 0;
var scoreText; 
var demo;
var select = true;
var soundOn = true;
var musicOn = true; 

function marble (x, y, type, firstSkill, secondSkill, index, owner) {
    
    if (owner == 1) {
        this.marble = game.add.sprite(x, y, 'purpleMarble');
    } else {
        this.marble = game.add.sprite(x, y, 'blueMarble');
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
    
    game.physics.arcade.enable(this.marble);

    this.location = 1; // 0 fall  1 rest  2 arena
    this.speed = 0;
    this.angle = 0;
    this.lastTarget = -1;
    

    this.strengthFactor = 1;
    this.knockBackFactor = 1;
    this.frictionFactor = 1;
    this.returnFactor = 1;

    //console.log("created marble");
    if (type == 1) { //Warrior
        if (secondSkill == 1) { //Smite
            this.strengthFactor += this.strengthFactor * 0.18;
        }
        else if (secondSkill == 2) { //Bravery
            this.knockBackFactor -= this.knockBackFactor * 0.12;
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
            this.knockBackFactor -= this.knockBackFactor * 0.2;
        }
        else if (secondSkill == 2) { //Firm
            this.returnFactor += this.returnFactor * 0.3;
            this.frictionFactor += this.frictionFactor * 0.12;
        }
    }

    //uncomment this to enable drag
    this.marble.events.onDragStart.add(function(item) {
        item.scale.setTo(1.2, 1.2);
    });

    this.marble.events.onDragStop.add(function(item) {
        item.scale.setTo(1, 1);
        if (insideOfArena(item)) {
            item.input.disableDrag();
        }
    });

    //select
    this.marble.events.onInputDown.add(function(item) {
        if(select) {
            //console.log("marble " + item.name + " selected");
            marbleIndex = item.name;
            disableSelect();
        }
    });
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
                item.marble.kill();
                marbles.pop();
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

    game.state.add("setUpState", setUpState);
    game.state.add("pickUpState", pickUpState);
    game.state.start("Boot");
}