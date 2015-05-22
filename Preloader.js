
BasicGame.Preloader = function (game) {

	this.background = null;
	this.text = null;
	this.timer = 0;
	this.ready = false;
	this.style = { font: "65px Arial", fill: "#fff", align: "center" };
	
};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.text = this.add.text(500, 20, "Loading", this.style);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('playButton', 'images/pressstart.gif');
		this.game.load.image('start', 'images/start.png');
		this.game.load.image('gameMenu', 'images/gameMenu.png');
		this.game.load.image('font', 'fonts/bluepink_font.png');
		this.game.load.image('font2', 'fonts/KNIGHT3.png');
		this.load.image('menu', 'images/menu.png');
		this.load.audio('titleMusic', ['audio/main_menu.ogg']);
		this.load.audio('gameOver', ['audio/gameover.wav']);
		this.load.audio('gameOverMain', ['audio/HorseSteppin.ogg']);
		this.load.audio('easy', ['audio/easy.ogg']);
		this.load.audio('medium', ['audio/medium.ogg']);
		this.load.audio('hard', ['audio/hard.ogg']);
		// this.load.audio('main', ['audio/Perturbator.ogg']);
		this.load.image('block', 'images/block.png');
		this.load.image('hud', 'images/hud.png');
		this.load.image('valls', 'images/valls.png');
		this.load.image('button', 'images/block.png');
		this.game.load.image('fire1', 'images/fire1.png');
  		this.game.load.image('fire2', 'images/fire2.png');
   		this.game.load.image('fire3', 'images/fire3.png');
   		this.game.load.image('smoke', 'images/smoke-puff.png');
   		this.game.load.spritesheet('explode', 'images/explode.png', 128, 128, 16);
		//	+ lots of other required assets here

	},

	create: function () {

	},

	update: function () {
		

		this.timer += 1000;
		this.text.alpha = 0.5;
		if(this.timer >= 3000)
		{
			this.timer -= 5000;
			this.text.alpha = 1;
			// this.text.visible = !this.text.visible;
		}

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
    	
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
