var timer;
var toBlack2 = {

    preload: function () {

    },

    create: function () {
 

    this.timer = game.time.create(false);
    this.timer.loop(1000, this.gameReady, this);
    this.timer.start();

    this.pickUpStateAnimation = game.add.sprite(0,0,'gameBoard');

 

    this.toBlack = game.add.sprite(0,0,'toBlack');
    this.toBlack.animations.add('blacked',[0,1,2,3,4,5,6,7,8,9,10,11,12,13],12);
},

    gameReady:function(){
      //if(this.cache.isSoundDecoded('BGM') && this.ready == true){
      this.state.start('gameMain');
//}
  },
     update: function () {
        this.toBlack.animations.play('blacked',true);
    

     

}
}