var Boot = {
	preload: function(){
		game.load.image('title', 'assets/img/title blue.png');
		game.load.image('preloaderBar', 'assets/img/preloader-bar.png');
		game.load.image('teamTitle', 'assets/img/Team Title.png');
	},
	create: function(){
		

	},
	update: function(){
		game.state.start('Preloader');
	}
}