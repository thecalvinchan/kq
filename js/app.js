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
        var platforms = this.game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(2,2);
        ground.body.immovable = true;
        var ledge = platforms.create(400,400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;
    },
    update: function() {
    }
});
});
