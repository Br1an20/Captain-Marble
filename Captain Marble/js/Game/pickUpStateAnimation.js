var timer;
var pickUpStateAnimation = {

    preload: function () {

    },

    create: function () {
 

    this.timer = game.time.create(false);
    this.timer.loop(1000, this.gameReady, this);
    this.timer.start();

    

    this.pickUpStateAnimation = game.add.sprite(0,0,'pickUpStateAnimation');
    this.pickUpStateAnimation.animations.add('play',[0,1,2,3,4,5,6],7);
},

    gameReady:function(){
      //if(this.cache.isSoundDecoded('BGM') && this.ready == true){
      this.state.start('pickUpState');
//}
  },
     update: function () {
        this.pickUpStateAnimation.animations.play('play',true);
    

     

}
}