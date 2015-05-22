
BasicGame.GameMenu = function(game) {

	this.background = null;
	this.music = null;
	this.playButton = null;
	this.group = null;
	this.style = { font: "65px Arial", fill: "#000", align: "center" };
	this.difficult;
	var imageEasy,
		imageMedium,
		imageHard;

};

BasicGame.GameMenu.prototype = {

	create: function() {

		this.difficult = this.game.global.difficult;

		this.background = this.add.sprite(0, 0, 'gameMenu');

		this.music = this.add.audio('titleMusic');
		this.music.fadeIn(2000);

		var buttonEasy = this.game.add.retroFont('font', 32, 32, Phaser.RetroFont.TEXT_SET2, 10);
        	buttonEasy.setText("Easy", true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);

        imageEasy = this.game.add.image(650, 90, buttonEasy);
        	imageEasy.anchor.set(0.5);
        	imageEasy.inputEnabled = true;
        	imageEasy.events.onInputDown.add(this.setEasy, this);

        var buttonMedium = this.game.add.retroFont('font', 32, 32, Phaser.RetroFont.TEXT_SET2, 10);
        	buttonMedium.setText("Medium", true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);

        imageMedium = this.game.add.image(850, 90, buttonMedium);
        	imageMedium.anchor.set(0.5);
        	imageMedium.inputEnabled = true;
        	imageMedium.events.onInputDown.add(this.setMedium, this);

        var buttonHard = this.game.add.retroFont('font', 32, 32, Phaser.RetroFont.TEXT_SET2, 10);
        	buttonHard.setText("Hard", true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);

        imageHard = this.game.add.image(1050, 90, buttonHard);
        	imageHard.anchor.set(0.5);
        	imageHard.inputEnabled = true;
        	imageHard.events.onInputDown.add(this.setHard, this);

        	switch(this.game.global.difficult) {
        		case 'easy' :
        			imageEasy.tint =  0xFFFFFF;
        			imageMedium.tint =  0x6E6601;
        			imageHard.tint = 0x6E6601;
        		break;
        		case 'medium' :
        			imageEasy.tint =  0x6E6601;
        			imageMedium.tint =  0xFFFFFF;
        			imageHard.tint = 0x6E6601;
        		break;
        		case 'hard' :
        			imageEasy.tint =  0x6E6601;
        			imageMedium.tint =  0x6E6601;
        			imageHard.tint = 0xFFFFFF;
        		break;
        	}

		this.group = this.game.add.group();
		var button = this.game.make.button(170, 350, 'start', this.startGame, this);
		this.group.add(button);

		var scoreText = this.game.add.retroFont('font2', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
        	scoreText.setText("Score : " + this.game.global.score, true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);
        
        var bestText = this.game.add.retroFont('font2', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
        	bestText.setText("Best Score : " + this.game.global.bestScore, true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);

        var bestEasyText = this.game.add.retroFont('font2', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
        	bestEasyText.setText("Easy Score : " + this.game.global.easyScore, true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);

        var bestMediumText = this.game.add.retroFont('font2', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
        	bestMediumText.setText("Medium Score : " + this.game.global.mediumScore, true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);

        var bestHardText = this.game.add.retroFont('font2', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
        	bestHardText.setText("Hard Score : " + this.game.global.hardScore, true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);
       
       	// score display
        scoreImage = this.game.add.image(850, 160, scoreText);
        	scoreImage.anchor.set(0.5);
        //best score display
        bestScoreImage = this.game.add.image(850, 240, bestText);
        	bestScoreImage.anchor.set(0.5);
        // easy score dislpay
        easyScoreImage = this.game.add.image(620, 280, bestEasyText);
        	bestScoreImage.anchor.set(0.5);
        //medium score display
        mediumScoreImage = this.game.add.image(620, 320, bestMediumText);
        	bestScoreImage.anchor.set(0.5);
        //hard score display
        hardScoreImage = this.game.add.image(620, 360, bestHardText);
        	bestScoreImage.anchor.set(0.5);
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


	update: function() {

	},

	startGame: function() {
		this.music.stop();
		this.state.start('Game', true, false, this.difficult);
	},

};