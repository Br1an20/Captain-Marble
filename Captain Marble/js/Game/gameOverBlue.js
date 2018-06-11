
var gameOverBlue = {

    preload: function () {
       game.load.spritesheet('GameoverBlue', 'assets/img/Gameover Blue.png',1200,700,21);
       game.load.spritesheet('restart', 'assets/img/restart.png',120,70,0);
       game.load.spritesheet('credit', 'assets/img/credit.png',120,70,0);
    },

    create: function () {
 
        //setup the restart button
  

    this.timer = game.time.create(false);
    this.timer.loop(5000, this.gameReady, this);
    this.timer.start();

    this.GOB = game.add.sprite(0,0,'GameoverBlue');
    this.GOB.animations.add('GameoverBlue1',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,20,20,20],6);
    this.GOB.animations.play('GameoverBlue1',true);


},

    gameReady:function(){

      
      this.buttonPlayAgain = game.add.button(500, 600,"restart", this.replay,this,0);
      this.buttonPlayAgain.anchor.set(0.5,0.5);

      this.credit = game.add.button(700, 600,"credit", this.replay,this,0);
      this.credit.anchor.set(0.5,0.5);
//}
  },
      replay:function(){
       
        game.state.start("Boot");
    },

     update: function () {
        
    console.log(game.input.mousePointer.x,game.input.mousePointer.y);

}
    
}