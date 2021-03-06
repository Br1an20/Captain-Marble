
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

	game.load.image('a', 'assets/sprites/a.png');
	game.load.image('b', 'assets/sprites/b.png');

}

var cursors;
var gear;
var ratioText;
function create() {
	
	game.stage.backgroundColor = '#124184';

	// Enable Box2D physics
	game.physics.startSystem(Phaser.Physics.BOX2D);
	game.physics.box2d.debugDraw.joints = true;
	game.physics.box2d.gravity.y = 500;

	var revoluteJoint;
	var prismaticJoint;
	
    
    
	// Prismatic joint. This will be connected to the Revolute Joint by the gear joint, tying the revolute joints rotation to this joints X-axis movement
	{
		// Static box
		var spriteA = game.add.sprite(game.world.centerX, 200, 'a');
		game.physics.box2d.enable(spriteA);
		spriteA.body.static = true;
		
		// Dynamic box
		var spriteB = game.add.sprite(game.world.centerX, 200, 'b');
		game.physics.box2d.enable(spriteB);
		
		// bodyA, bodyB, axisX, axisY, ax, ay, bx, by, motorSpeed, motorForce, motorEnabled, lowerLimit, upperLimit, limitEnabled
		prismaticJoint = game.physics.box2d.prismaticJoint(spriteA, spriteB, 1, 0, 0, 0, 0, 0, 0, 0, false);
		
	}
	
	// Revolute joint. Will be connected to prismatic joint via gear joint.
	{
		// Static box
		var spriteA = game.add.sprite(game.world.centerX, 400, 'a');
		game.physics.box2d.enable(spriteA);
		spriteA.body.static = true;
		
		// Dynamic box
		var spriteB = game.add.sprite(game.world.centerX, 400, 'b');
		game.physics.box2d.enable(spriteB);
		
		// bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled, lowerLimit, upperLimit, limitEnabled
		revoluteJoint = game.physics.box2d.revoluteJoint(spriteA, spriteB);
	}
	
	// Gear joint. Connects a prismatic joint to a revolute joint. This relates the rotation of the revolute joint to the linear motion of the prismatic joint at a 1:2(0.5) ratio, meaning the prismatic joint will move half as far as the revolute joint rotates.
	{
		// joint1, joint2, ratio
		gear = game.physics.box2d.gearJoint(prismaticJoint, revoluteJoint, 0.5);
	}

	// Set up handlers for mouse events
	game.input.onDown.add(mouseDragStart, this);
	game.input.addMoveCallback(mouseDragMove, this);
	game.input.onUp.add(mouseDragEnd, this);
	
	game.add.text(5, 5, 'Gear joint. Click to start. use up and down arrow keys to change the ratio', { fill: '#ffffff', font: '14pt Arial' });
    //display the current gear ratio to user
    ratioText = game.add.text(15, 50, 'Gear Ratio: ' + gear.GetRatio(), { fill: '#dddddd', font: '12pt Arial' });
    
	// Start paused so user can see how the joints start out
	game.paused = true;
	game.input.onDown.add(function(){game.paused = false;}, this);
    
    cursors = game.input.keyboard.createCursorKeys();
    
}


function mouseDragStart() { game.physics.box2d.mouseDragStart(game.input.mousePointer); }
function mouseDragMove() {  game.physics.box2d.mouseDragMove(game.input.mousePointer); }
function mouseDragEnd() {   game.physics.box2d.mouseDragEnd(); }


var pressed = false;
function update() {
    
    //increase ratio by .1 each time up key is pressed
	if (cursors.up.isDown) {
        if (!pressed) {
            gear.SetRatio(gear.GetRatio() + 0.1);
            ratioText.text = 'Gear Ratio: ' + (Math.round(gear.GetRatio() * 10) / 10);
            pressed = true;
        }
    } else if (cursors.down.isDown) { //decrease ratio by .5 each time down key is pressed
        if (!pressed) {
            gear.SetRatio(gear.GetRatio() - 0.1);
            ratioText.text = 'Gear Ratio: ' + (Math.round(gear.GetRatio() * 10) / 10);
            pressed = true;
        }
    } else {
        pressed = false;
    }
	
}

function render() {
	
	// update will not be called while paused, but we want to change the caption on mouse-over
	if ( game.paused ) {
		update();
	}
	
	game.debug.box2dWorld();
	
}