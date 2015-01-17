
BasicGame.MainMenu = function(game) {
	this.music = null;
	this.playButton = null;
};

BasicGame.MainMenu.prototype = {

	create: function() {

		var logo = this.add.sprite(0, 0, 'titlepage');
		var leadText = this.add.text(50, 120,
		 "Jump:Tap/Click", { fontSize: '6px', fill: '#FFF' });

		var button = this.add.button((this.game.width - 98) / 2, 
		 this.game.height - 120, 'start-button', this.startGame, this, 1, 0);
	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}
};
