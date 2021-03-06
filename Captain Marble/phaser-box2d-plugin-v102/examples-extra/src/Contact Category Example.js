
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, render: render });

var caption;

function create() {
	
	game.stage.backgroundColor = '#124184';

	// Enable Box2D physics
	game.physics.startSystem(Phaser.Physics.BOX2D);

    game.physics.box2d.gravity.y = 200;
    game.physics.box2d.setBoundsToWorld();
    
    //normal rectangle, will be used to demonstrate bodyContactCallback which works fine
    var rectangle = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, game.world.centerY + 150, 0);
    rectangle.setRectangle(90, 50, 0, 0, 0);
   
    //  Another rectangle, this one has its collision category set to 2.
    var categoryRect = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, game.world.centerY - 150, 0);
    categoryRect.setRectangle(90, 50, 0, 0, 0);
    categoryRect.setCollisionCategory(2);
    
    //  Circle to drag around and test out callbacks
    var circle = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, game.world.centerY, 2);
    circle.setCircle(30);

    circle.setCategoryContactCallback(2, categoryCollide, this);
    circle.setBodyContactCallback(rectangle, bodyCollide, this);
    
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);
    
    caption = game.add.text(5, 5, 'last contact callback: none - drag the circle', { fill: '#ffffff', font: '14pt Arial' });
    
}

function categoryCollide(body1, body2, fixture1, fixture2, begin, contact) {

    caption.text = 'Last contact type: categoryCollide';
    
}                                                                                                                                                                                                   

function bodyCollide(body1, body2, fixture1, fixture2, begin, contact) {
 
    caption.text = 'Last contact type: bodyCollide';
    
}

function mouseDragStart() {
    
    game.physics.box2d.mouseDragStart(game.input.mousePointer);
    
}

function mouseDragMove() {
    
    game.physics.box2d.mouseDragMove(game.input.mousePointer);
    
}

function mouseDragEnd() {
    
    game.physics.box2d.mouseDragEnd();
    
}

function render() {

    game.debug.box2dWorld();

}
