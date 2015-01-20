
BasicGame.Preloader = function (game) {

  this.preloadBar = null;

  this.ready = false;

};

BasicGame.Preloader.prototype = {

  preload: function () {

    // Create a progress bar based on cropping on image
    this.preloadBar =
    this.add.sprite(this.game.width/2, this.game.height/2, 'preloader-bar');
    this.preloadBar.pivot.x = this.preloadBar.width/2;
    this.preloadBar.pivot.y = this.preloadBar.height/2;

    this.load.setPreloadSprite(this.preloadBar);


    // Load game assets here...
	
	this.load.image('titlepage', 'game/assets/images/title_getaway.png');

	this.load.image('city', 'game/assets/images/background.png');
	this.load.image('jungle', 'game/assets/images/background_jungle.png');
	this.load.image('planet', 'game/assets/images/background_planet.png');

	this.load.tilemap('map', 'game/assets/images/tileMap_stage0.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'game/assets/images/tileSet.png');

	this.load.image('star', 'game/assets/images/star1.png');
	this.load.spritesheet('dot_dog', 'game/assets/images/dot_dog.png', 32, 32);
	this.load.spritesheet('enemy', 'game/assets/images/ghoston.png', 32, 32);
	this.load.spritesheet('start-button', 'game/assets/ui/button_start.png', 98, 43);
	
	this.load.image('catch', 'game/assets/images/logo_catch.png');
	this.load.image('getaway', 'game/assets/images/logo_getaway.png');

	this.load.audio('getSound', ['game/assets/audio/jump08.mp3']);
	this.load.audio('jumpSound', ['game/assets/audio/idou_ochiru_normal.mp3']);	

  },

  create: function () {

    this.preloadBar.cropEnabled = false;
	this.state.start('MainMenu');
	//this.state.start('Game');

  },

};
