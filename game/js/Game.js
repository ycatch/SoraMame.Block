
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

	this._background = null;
	this._map = null;
	this._layer = null;

	this._player = null;
	this._enemy = null;
	this._flag = null;
	this._input = null;

	this._stars = null;
	this._score = 0;
	this._scoreText = null;

	this._title_getaway = null;
	this._num_star = 16;
};

BasicGame.Game.prototype = {

    create: function () {
	
		// get and exec code-block
		SORAMAME_BLOCK.execCodeBlock();
		
		//  We're going to be using physics, so enable the Arcade Physics system
		this.physics.startSystem(Phaser.Physics.ARCADE);

		//  A simple background for our game
		this._background = this.add.tileSprite(0, 0, 293, 293, SORAMAME_BLOCK.app.background);

		//  Create our map & layer
 		this._map = this.add.tilemap('map', 32, 32);
		this._map.addTilesetImage('tiles');
		this._layer = this._map.createLayer('ground');
		this._layer.resizeWorld();		
		this._map.setCollisionBetween(1, 5);
		
		//  Here we create our stars group
 		this._stars = this.add.group();
		this._stars.enableBody = true;
		this._map.createFromObjects('stars_layer', 7, 'star', 0, true, false, this._stars);
		//layer.debug = true;
		
		// ** FPS & score
		this.time.advancedTiming = true;
		// this.time.fpsMax = 30000;
		// this.time.fpsMin = 5000;
		this._score = 0;
		this._scoreText = this.add.text(0, 16, 'Stars: 0', { fontSize: '28px', fill: '#FFF' });

		// ** The player and its settings
		this._player = this.add.sprite(200, this.world.height - 100, 'dot_dog');
		this._enemy = this.add.sprite(10, 0, 'enemy');


		//  We need to enable physics on the player
		this.physics.arcade.enable(this._player);
		this.physics.arcade.enable(this._enemy);

		//  Player physics properties. Give the little guy a slight bounce.
		this._player.body.bounce.y = 0.1;
		this._player.body.gravity.y = 300;
		this._player.body.collideWorldBounds = true;

		this._enemy.body.bounce.y = 0.1;
		this._enemy.body.gravity.y = 300;
		this._enemy.body.collideWorldBounds = true;
		
		//  Our two animations, walking left and right.
		this._player.animations.add('right', [1, 0, 2, 0], 10, true);
		this._enemy.animations.add('right', [0, 1], 10, true);

		//  Our controls.
		this.input.onDown.add(this.jumpPlayer, this);
		// this._input = this.input.keyboard.createCursorKeys();
		
		this.getSound = this.add.audio('getSound');
		this.jumpSound = this.add.audio('jumpSound');

    },

    update: function () {

		// move to right
		if (this.game.time.fps > 30) {
			var move_step = SORAMAME_BLOCK.app.speed + 1;
		} else if(this.game.time.fps > 15) {
			var move_step = SORAMAME_BLOCK.app.speed + 2;
		} else {
			var move_step = SORAMAME_BLOCK.app.speed + 3;
		}
		
		// scroll running area, stop scroll in goal area.
		if (this.world.width > this.camera.x + this.camera.width)
		{
			this.camera.x += move_step;
			this._background.x = this.camera.x;
			this._background.tilePosition.x -= 1;
			this._scoreText.x = this.camera.x + 16;
		}

		if (this._player.body.y >= this.world.height - 32)
		{
			this._player.body.velocity.y = -300;
		}

		if (this._player.body.x >= this._enemy.body.x + 5)
		{
			this._player.body.x += move_step;
			this._enemy.body.x += move_step;
		}

		this._player.animations.play('right');
		this._enemy.animations.play('right');

		//  Collide the player and the stars with the platforms
		this.physics.arcade.collide(this._player, this._layer);
		this.physics.arcade.collide(this._enemy, this._layer);
		
		//  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
		this.physics.arcade.overlap(this._player, this._enemy, this.quitGame, null, this);
		this.physics.arcade.overlap(this._player, this._stars, this.collectStar, null, this);

		//  Reset the players velocity (movement)
		this._player.body.velocity.x = 0;

		// enemy's action
		if (this._enemy.body.blocked.right)
		{
			this._enemy.body.velocity.y = -150;
		}
		if (this._enemy.body.y >= this.world.height - 32)
		{
			this._enemy.body.velocity.y = -300;
		}
		if (this._enemy.body.x < this.camera.x + 40)
		{
			this._enemy.body.x += move_step;
		}

		// check goal
		if(this._player.body.x >= this.world.width - 64 && this._player.body.blocked.down) {
			this._player.frame = 4;
			this._enemy.frame = 2;
			this.quitGame('getaway');
		}
    },
	
/*  	render: function() {
	
        this.game.debug.text(this.game.time.fps + ' FPS', 16, 70, "#00ff00", "16px Courier"); 		
 
    }, */

    quitGame: function (status) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
		this.getSound.stop();
		if(status == 'getaway')
		{
			this.add.sprite(this.camera.x + (this.camera.width - 294) / 2, 40, 'getaway');
		} else {
			this._player.frame = 3;
			this.add.sprite(this.camera.x + (this.camera.width - 294) / 2, 40, 'catch');
		}
		//var button = this.add.sprite((this.game.width - 98) / 2, this.game.height - 120, 'start-button');
		
		this.game.paused = true;
		var pausedText = this.add.text(this.camera.x + 60, 240, "Click to Menu.", { fontSize: '8px', fill: '#000' });

		//  Then let's go back to the main menu.
		this.input.onDown.add(function(){
			pausedText.destroy();
			this.game.paused = false;
			this.state.start('MainMenu');
		}, this);
    },

	jumpPlayer: function(player) {
		if (this._player.body.blocked.down)
		{
			this.jumpSound.play();
			this._player.body.velocity.y = -250;
		}
	},

	collectStar: function(player, star) {
    
		// Removes the star from the screen
		star.kill();
		this.getSound.play();

		//  Add and update the score
		this._score += 10;
		this._scoreText.text = 'Stars:' + this._score;

	}

};

