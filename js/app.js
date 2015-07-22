define([
'backbone',
'js/models/map',
'js/models/worker'
//'phaser'
], function App(Backbone, Map, Worker) {
return Backbone.View.extend({
    initialize: function(options) {
        this.options = options ? options : {};
        console.log(this.options);
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
        this.game.load.image('gate', 'assets/sprites/baddie.png');
    },
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = new Map(this.game);
        this.game.add.existing(this.map);

        this.worker = new Worker(this.game);
        this.game.add.existing(this.worker);
        console.log(this.worker);
    },
    update: function() {
        this.game.physics.arcade.collide(this.worker, this.map.platforms);
        this.game.physics.arcade.collide(this.worker, this.map.berries, function(worker, berry) {
            worker.die();
        });
        this.game.physics.arcade.collide(this.map.platforms, this.map.berries);
        this.game.physics.arcade.collide(this.map.berries, this.map.berries);
        
        var cursors = this.game.input.keyboard.createCursorKeys();

        this.worker.body.velocity.x = 0;
        if (cursors.left.isDown) {
            this.worker.moveLeft();
        } else if (cursors.right.isDown) {
            this.worker.moveRight();
        } else {
            this.worker.doNothing();
        }
        if (cursors.up.isDown) {
            this.worker.jump();
        }
    }
});
});
