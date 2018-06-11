var Boot = {
	preload: function(){
		game.load.image('title', 'assets/img/title blue.png');
		game.load.spritesheet('preloaderBar', 'assets/img/Loading bar.png',135,135,5);
		game.load.image('teamTitle', 'assets/img/Team Title.png');
	},
	create: function(){
		

	},
	update: function(){
		game.state.start('Preloader');
	}
}