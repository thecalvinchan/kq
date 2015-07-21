define([
'backbone',
//'phaser'
], function(Backbone) {
return Backbone.View.extend({
    initialize: function(options) {
        this.options = options ? options : {};
        var screenWidth = this.options.hasOwnProperty('screenWidth') ? options.screenWidth : window.innerWidth, 
            screenHeight = this.options.hasOwnProperty('screenHeight') ? options.screenHeight : window.innerHeight; 

        var preload = this.options.hasOwnProperty('preload') ? options.preload : this.preload,
            create = this.options.hasOwnProperty('create') ? options.create : this.create,
            update = this.options.hasOwnProperty('update') ? options.update : this.update;

        this.game = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, this.$el.attr('id'), {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    },
    preload: function() {
        this.game.load.image('sky', 'assets/sprites/sky.png');
        this.game.load.image('ground', 'assets/sprites/platform.png');
        this.game.load.image('star', 'assets/sprites/star.png');
        this.game.load.spritesheet('dude', 'assets/sprites/dude.png', 32, 48);
    },
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.sprite(0,0,'sky');
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(2,2);
        ground.body.immovable = true;
        var ledge = this.platforms.create(400,400, 'ground');
        ledge.body.immovable = true;
        ledge = this.platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        //player
        this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
        this.game.physics.arcade.enable(this.player);

        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        
        this.player.animations.add('left', [0,1,2,3], 10, true);
        this.player.animations.add('right', [5,6,7,8], 10, true);
    },
    update: function() {
        this.game.physics.arcade.collide(this.player, this.platforms);
        
        var cursors = this.game.input.keyboard.createCursorKeys();

        this.player.body.velocity.x = 0;
        if (cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
        } else if (cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        } else {
            this.player.animations.stop();
            this.player.frame = 4;
        }

        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
    }
});
});
