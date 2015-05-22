
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;
	this.background = null;
	this.timer = null;
	this.difficult = 'easy';
	var imageEasy,
		imageMedium,
		imageHard;

};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.game.global = {
        mute: false,
        score: 0,
        bestScore: 0,
        tmpScore: 0,
        easyScore: 0,
        mediumScore: 0,
        hardScore: 0,
        difficult: this.difficult
    };

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
		this.background = this.add.sprite(0, 0, 'menu');

		this.music = this.add.audio('titleMusic');
		this.music.fadeIn(2000);

		this.playButtonReal = this.add.button(250, 150, 'start', this.startGame, this);
		this.playButton = this.add.button(350, 300, 'playButton', this.startGame, this);


		var buttonEasy = this.game.add.retroFont('font', 32, 32, Phaser.RetroFont.TEXT_SET2, 10);
        	buttonEasy.setText("Easy", true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);

        imageEasy = this.game.add.image(650, 120, buttonEasy);
        	imageEasy.anchor.set(0.5);
        	imageEasy.inputEnabled = true;
        	imageEasy.events.onInputDown.add(this.setEasy, this);

        var buttonMedium = this.game.add.retroFont('font', 32, 32, Phaser.RetroFont.TEXT_SET2, 10);
        	buttonMedium.setText("Medium", true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);

        imageMedium = this.game.add.image(850, 120, buttonMedium);
        	imageMedium.anchor.set(0.5);
        	imageMedium.inputEnabled = true;
        	imageMedium.events.onInputDown.add(this.setMedium, this);

        var buttonHard = this.game.add.retroFont('font', 32, 32, Phaser.RetroFont.TEXT_SET2, 10);
        	buttonHard.setText("Hard", true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);

        imageHard = this.game.add.image(1050, 120, buttonHard);
        	imageHard.anchor.set(0.5);
        	imageHard.inputEnabled = true;
        	imageHard.events.onInputDown.add(this.setHard, this);

        	imageEasy.tint =  0xFFFFFF;
        	imageMedium.tint =  0x6E6601;
        	imageHard.tint = 0x6E6601;
	},

	setEasy: function() {
		this.difficult = 'easy';
		this.game.global.difficult = 'easy';
		imageEasy.tint = 0xFFFFFF;
		imageMedium.tint = 0x6E6601;
		imageHard.tint = 0x6E6601;
	},
	setMedium: function() {
		this.difficult = 'medium';
		this.game.global.difficult = 'medium';
		imageMedium.tint = 0xFFFFFF;
		imageEasy.tint = 0x6E6601;
		imageHard.tint = 0x6E6601;
	},
	setHard: function() {
		this.difficult = 'hard';
		this.game.global.difficult = 'hard';
		imageHard.tint = 0xFFFFFF;
		imageMedium.tint = 0x6E6601;
		imageEasy.tint = 0x6E6601;
	},

	update: function () {
		this.timer += 100;
		if(this.timer >= 2000)
		{
			this.timer -= 2000;
			this.playButton.visible = !this.playButton.visible;
		}
	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game', true, false, this.difficult);

	},

	resize: function (width, height) {

		//	If the game container is resized this function will be called automatically.
		//	You can use it to align sprites that should be fixed in place and other responsive display things.

	    this.background.width = width;
	    this.background.height = height;
	}

};
