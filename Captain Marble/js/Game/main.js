var game;
var score = 0;
var scoreText; 
var demo;
var soundOn = true;
var musicOn = true; 

function marble (x, y, type, firstSkill, secondSkill, index, owner) {
    //var x = game.world.randomX;
    //var y = game.world.randomY;
    if (owner == 1) {
        this.marble = game.add.sprite(x, y, 'blackMarble');
    } else {
        this.marble = game.add.sprite(x, y, 'fireMarble');
    }
    this.marble.scale.set(0.04,0.04);
    this.marble.anchor.setTo(0.5,0.5);
    this.marble.inputEnabled = true;
    this.marble.enableBody = true;
    //this.marble.input.enableDrag(); //uncomment this to enable drag
    this.marble.name = index.toString();
    this.marble.type = type;
    this.marble.firstSkill = firstSkill;
    this.marble.secondSkill = secondSkill;
    this.marble.owner = owner;
    
    game.physics.arcade.enable(this.marble);

    this.status = 1; // 0 fall  1 rest  2 arena
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
        item.scale.setTo(0.05, 0.05);
    });

    this.marble.events.onDragStop.add(function(item) {
        item.scale.setTo(0.04, 0.04);
        /*if (insideOfArena) {
            item.marble.input.DisableDrag();
        }*/
        
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

function distance (a, b) {
    return Phaser.Math.distance(a.x, a.y, b.x, b.y)
}

function insideOfArena(item) {
    return distance(new Phaser.Point(600,350),item) < 300;
}

function insideOfRestArea(item) {
    return (distance(new Phaser.Point(-120,350),item) < 280 || distance(new Phaser.Point(1320,350),item) < 280) && (item.body.x > -20) && (item.body.x < 1200);
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
    
    game.state.add("pickUpState", pickUpState);
    game.state.start("Boot");
}