
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
    this.blocks = null;
    this.road = null;
    this.musicMain = null;
    this.score = 0;
    this.textScore = null;
    this.style = { font: "40px Arial", fill: "#fff", align: "center" };
    this.explosions = null;
    this.ready = false;
    this.starter;
    this.Diff;
    this.scoreText;
    this.speed = 1500;
    this.playButton;
    this.font;
    this.image;
    this.timerPress = 0;
    var valls;
    var texture;
    var emitter;
    var filter;
    var fragmentSrc;
    this.i;
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    init: function(difficult) {
        
        switch(difficult){
            case 'easy' : 
                this.speed = 1500;
                this.musicMain = this.add.audio('easy');
                fragmentSrc = [
                    "precision mediump float;",

                    "uniform vec2      resolution;",
                    "uniform float     time;",

                    "#define PI 90",

                    "void main( void ) {",

                    "vec2 p = ( gl_FragCoord.xy / resolution.xy ) - 0.0;",

                    "float sx = 0.5 + 0.5 * sin( 100.0 * p.x - 1. * pow(time, 0.5)*5.) * sin( 95.0 * p.x - 1. * pow(time, 0.9)*5.);",

                    "float dy = 1.0/ ( 1000. * abs(p.y - sx));",

                    "dy += 1./ (25. * length(p - vec2(p.x, 0.)));",

                    "gl_FragColor = vec4( (p.x + 0.3) * dy, 0.3 * dy, dy, 1.1 );",
                    "}"
                ];

            break;
            case 'medium': 
                this.speed = 1000;
                this.musicMain = this.add.audio('medium');
                fragmentSrc = [
                    "precision mediump float;",

                    "uniform vec2      resolution;",
                    "uniform float     time;",

                    "#define PI 90",

                    "void main( void ) {",

                    "vec2 p = ( gl_FragCoord.xy / resolution.xy ) - 0.0;",

                    "float sx = 0.5 + 0.5 * sin( 100.0 * p.x - 1. * pow(time, 0.5)*5.) * sin( 95.0 * p.x - 1. * pow(time, 0.9)*5.);",

                    "float dy = 1.0/ ( 1000. * abs(p.y - sx));",

                    "dy += 1./ (25. * length(p - vec2(p.x, 0.)));",

                    "gl_FragColor = vec4( (p.x + 0.3) * dy, 0.3 * dy, dy, 1.1 );",
                    "}"
                ];
            break;
            case 'hard': 
                this.speed = 500;
                this.musicMain = this.add.audio('hard');
                fragmentSrc = [
                    "precision mediump float;",

                    "uniform float     time;",
                    "uniform vec2      resolution;",

                    "// Oldskool plasm shader. (c) Victor Korsun, bitekas@gmail.com; 1996-2013.",
                    "//",
                    "// Attribution-ShareAlike CC License.",

                    "//----------------",
                    "const int ps = 8; // use values > 1..10 for oldskool",
                    "//----------------",

                    "void main( void ) {",

                        "float x = gl_FragCoord.x / resolution.x * 640.;",
                        "float y = gl_FragCoord.y / resolution.y * 480.;",

                        "if (ps > 0)",
                        "{",
                            "x = float(int(x / float(ps)) * ps);",
                            "y = float(int(y / float(ps)) * ps);",
                        "}",

                        "float mov0 = x+y+sin(time)*10.+sin(x/90.)*70.+time*2.;",
                        "float mov1 = (mov0 / 5. + sin(mov0 / 30.))/ 10. + time * 3.;",
                        "float mov2 = mov1 + sin(mov1)*5. + time*1.0;",
                        "float cl1 = sin(sin(mov1/4. + time)+mov1);",
                        "float c1 = cl1 +mov2/2.-mov1-mov2+time;",
                        "float c2 = sin(c1+sin(mov0/100.+time)+sin(y/57.+time/50.)+sin((x+y)/200.)*2.);",
                        "float c3 = abs(sin(c2+cos((mov1+mov2+c2) / 10.)+cos((mov2) / 10.)+sin(x/80.)));",

                        "float dc = float(16-ps);",

                        "if (ps > 0)",
                        "{",
                            "cl1 = float(int(cl1*dc))/dc;",
                            "c2 = float(int(c2*dc))/dc;",
                            "c3 = float(int(c3*dc))/dc;",
                        "}",

                        "gl_FragColor = vec4( cl1,c2,c3,1.0);",

                    "}"
                ];
            break;
        }
    },

    create: function () {
        
        this.i = 0;
        this.ready = false;
         
        filter = new Phaser.Filter(this.game, null, fragmentSrc);
        filter.setResolution(1280, 800);

        var sprite = this.game.add.sprite();
        sprite.width = 1280;
        sprite.height = 800;

        sprite.filters = [ filter ];

        this.score = 0;
        //Enable music
        this.musicMain.fadeIn(4000);

        this.game.input.onDown.add(this.requestLock, this);
        this.game.input.addMoveCallback(this.move, this);

        //enable physics 
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // create fire on object
        emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 400);
        emitter.makeParticles(['fire1', 'fire2', 'fire3', 'smoke']);
        emitter.gravity = -200;
        emitter.setAlpha(1, 0, 3000);
        emitter.setScale(0.8, 0, 0.8, 0, 3000);
        emitter.start(false, 3000, 5);

        //Create road (HUD)
        this.road = this.add.sprite(0, 480, 'hud');
        this.road.width = window.innerWidth;

        //Score display
         // this.textScore = this.game.add.text(100, 500, 'Score : ' + this.score, this.style);
        this.scoreText = this.game.add.retroFont('font2', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
        this.scoreText.setText("Score : " + this.score, true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);

        var scoreImage = this.game.add.image(220, 550, this.scoreText);
            scoreImage.anchor.set(0.5);

        //Create block
        this.blocks = this.game.add.group();
        this.blocks.enableBody = true; // Add Physics
        this.blocks.createMultiple(20, 'block');

        //create manu
        valls = this.game.add.sprite(0, 0, 'valls', 0);
        this.game.physics.arcade.enable(valls);
        this.game.physics.arcade.checkCollision.left = true;
        this.game.physics.arcade.checkCollision.right = true;

        valls.body.setSize(50, 50, 0, 0);
        valls.body.collideWorldBounds = true;

        valls.animations.add('pulse');
        valls.play('pulse', 30, true);
        valls.anchor.set(0.5);

        //create explosion
        this.explosions = this.game.add.group();
        this.explosions.createMultiple(30, 'explode');
        
        this.starter = this.time.events.add(3000, this.loop, this);
        
        this.Diff = this.time.events.add(30000, this.delay, this);

    },

    delay: function() {
        this.timer.delay = this.speed;
    },

    loop: function() {
         this.timer = this.time.events.loop(this.speed, this.addRowBlock, this);
    },
// Request user to lock the pointer
    requestLock: function() {
        this.game.input.mouse.requestPointerLock();
    },
// Move Manu with pointer
    move: function(pointer, x, y) {
        if(this.game.input.mouse.locked) {
            valls.x += this.input.mouse.event.webkitMovementX;
            valls.y += this.input.mouse.event.webkitMovementY;
        }
    },

    update: function () {

        if(this.ready == true){
            console.log(this.timerPress);
            this.timerPress += 100;
            if(this.timerPress > 2000)
            {
                this.timerPress -= 2000;
                this.playButton.visible = !this.playButton.visible;
            }
        }

        if(this.score > this.game.global.bestScore && this.i < 1) {
            this.beatScore();
            this.i += 1;
        }
        
        filter.update();

        var px = valls.body.velocity.x;
        var py = valls.body.velocity.y;
            px *= -10;
            py *= -10;

        emitter.minParticleSpeed.set(px, py);
        emitter.maxParticleSpeed.set(px, py);

        emitter.emitX = valls.x - 5;
        emitter.emitY = valls.y;

        // emitter.forEachExists(game.world.wrap, game.world);
        this.game.world.wrap(valls, 64);

        this.game.physics.arcade.collide(valls, this.blocks, this.detectCollide,null, this);

    },

// Collision listener
    detectCollide: function() {
        //remove mouse event and release pointer
        this.game.input.onDown.remove(this.requestLock, this);
        this.game.input.mouse.locked = false;
        this.game.input.mouse.releasePointerLock();

        // EXPLOSION !
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(valls.body.x, valls.body.y);
        explosion.play('explode', 30,false, true);

        this.score = this.score;
         //Kill manu 
        // this.blocks.callAll('kill');
        valls.kill();
        emitter.kill();
        explosion.kill();
        // this.quitGame();
        //Game over and show menu
        this.displayGameOver();
        
    },

    displayGameOver: function() {

        this.ready = true;

        var gameOver = this.game.add.retroFont('font2', 31, 25, Phaser.RetroFont.TEXT_SET6, 10, 1, 1);
            gameOver.setText(" GAME OVER ", true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);

        var gameOverImage = this.game.add.image(this.game.world.centerX, this.game.world.centerY-200, gameOver);
            gameOverImage.anchor.set(0.5);

        this.playButton = this.add.button(this.game.world.centerX - 300, this.game.world.centerY-100, 'playButton', null, this);
        this.game.input.onDown.add(this.quitGame, this);
    },
    
    addOneBlock: function(x, y) {

        var block = this.blocks.getFirstDead();

        block.reset(x, y);
        block.body.velocity.x -= 1200;

        block.checkWorldBounds = true;
        block.outOfBoundsKill = true;
    },

    addRowBlock: function() {
        if(this.ready == false){
            var hole = Math.floor(Math.random() * 5 ) + 1;
            this.score += 11;
            this.scoreText.text = 'Score : ' + this.score;
            for(var i = 0; i < 8; i++)
                if(i != hole && i != hole + 1)
                    this.addOneBlock(1100, i * 60 + 10);
        } 
    },

    quitGame: function (pointer) {

        this.game.global.score = this.score;
        this.game.global.tmpScore = this.score;
        if(this.game.global.tmpScore > this.game.global.bestScore) {
            this.game.global.bestScore = this.game.global.tmpScore;
        } else {
            this.game.global.bestScore = this.game.global.bestScore;
        }
        switch(this.game.global.difficult) {
            case 'easy':
                 if(this.game.global.tmpScore > this.game.global.easyScore) {
                    this.game.global.easyScore = this.game.global.tmpScore;
                } else {
                    this.game.global.easyScore = this.game.global.easyScore;
                }
            break;
            case 'medium':
                 if(this.game.global.tmpScore > this.game.global.mediumScore) {
                    this.game.global.mediumScore = this.game.global.tmpScore;
                } else {
                    this.game.global.mediumScore = this.game.global.mediumScore;
                }
            break;
            case 'hard':
                 if(this.game.global.tmpScore > this.game.global.hardScore) {
                    this.game.global.hardScore = this.game.global.tmpScore;
                } else {
                    this.game.global.hardScore = this.game.global.hardScore;
                }
            break;
        }

        this.musicMain.stop();
        this.state.start('GameMenu');
        
    },

    ////
    //  Achievements Messages
    ////
    ///
    beatScore: function() {
        this.timerAchivement = this.time.events.add(10, this.displayMsg, this);
    },

    change: function() {
         this.image.tint = Math.random() * 0xFFFFFF;
    },

    fadeOutMsg: function() {
         this.game.add.tween(this.image).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    },

    displayMsg: function() {
        font = this.game.add.retroFont('font', 32, 32, Phaser.RetroFont.TEXT_SET2, 10);
        font.setText("BEST SCORE BEATEN !!", true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);

        this.image = this.game.add.image(this.game.world.centerX + 50, 600, font);
        this.image.anchor.set(0.5);

        this.image.alpha = 0;

        this.game.add.tween(this.image).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        this.game.time.events.repeat(1000, 8, this.change, this);
    },

};
