var select = true;
var marbleIndex = -1;

function marble (x, y, index) {
	//var x = game.world.randomX;
	//var y = game.world.randomY;

	this.marble = game.add.sprite(x, y, 'blackMarble');
    this.marble.scale.set(0.04,0.04);
    this.marble.anchor.setTo(0.5,0.5);
    this.marble.inputEnabled = true;
    this.marble.enableBody = true;
    //this.marble.input.enableDrag(); //uncomment this to enable drag
    game.physics.arcade.enable(this.marble);
    this.marble.name = index.toString();

    this.speed = 0;
    this.angle = 0;
    this.lastTarget = -1;

    //uncomment this to enable drag
    /*this.marble.events.onDragStart.add(function(item) {
        item.scale.setTo(0.05, 0.05);
    });

    this.marble.events.onDragStop.add(function(item) {
        item.scale.setTo(0.04, 0.04);
    });*/

    //select
    this.marble.events.onInputDown.add(function(item) {
    	if(select) {
    		console.log("marble " + item.name + " selected");
    		marbleIndex = item.name;
    		disableSelect();
    	}
    });
}

function distance (a, b) {
	return Phaser.Math.distance(a.x, a.y, b.x, b.y)
}

function disableSelect() {
	select = false;
}

function enableSelect() {
	select = true;
}

function stationary() {
	for (var i = 0; i < marbles.length; i++) {
		if (marbles[i].speed > 0) {
			return false;
		}
	}
	return true;
}

function shootMarble(strength, item) {
	console.log("marble " + item.marble.name + " shot");
	item.speed = strength;
	item.angle = game.physics.arcade.angleBetween(item.marble, game.input.mousePointer) * 180 / Math.PI + 180;
	game.physics.arcade.velocityFromAngle(item.angle, item.speed, item.marble.body.velocity);
	deselectMarble();
}

function deselectMarble(item) {
	marbleIndex = -1;
}

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

        marbles = [];

        /*for (var i = 0; i < 6; i++) {
        	marbles.push(new marble(i));
        }*/
        marbles.push(new marble(600, 300, 0));
        marbles.push(new marble(600, 400, 1));
        marbles.push(new marble(800, 300, 2));
        marbles.push(new marble(800, 400, 3));
        marbles.push(new marble(400, 300, 4));
        marbles.push(new marble(400, 400, 5));
        
    }, 


     update: function () {

     	game.input.onUp.add(function(item) {
            if (marbleIndex > -1) {
            	if (distance(marbles[marbleIndex].marble, game.input.mousePointer)*2 < 400) {
            		shootMarble(distance(marbles[marbleIndex].marble, game.input.mousePointer)*2, marbles[marbleIndex]);
            	} else {
            		shootMarble(400, marbles[marbleIndex]);
            	}
            }
        });

        //==========Homemade Physics Engine Starts=============

        marbles.forEach(function(item) {
            if (item.speed > 0) {

            	item.speed -= 1.8;
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

            				marbles[i].speed = item.speed/2.5 + (item.speed * Math.cos(Math.abs(diff)*Math.PI/180))/3; //determine speed by decomposed force
            				item.speed = item.speed/2.5 + (item.speed*(Math.sin(Math.abs(diff)*Math.PI/180)))/5;

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
    	}

    	 //==========Homemade Physics Engine Ends=============

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