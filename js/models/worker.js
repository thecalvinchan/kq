define([], function () {
    var CONSTANTS = {
        BASE_SPEED: 150,
        GRAVITY: 700,
        SPAWN_X: 32,
        SPAWN_Y: 400
    };
    function Worker(game) {
        //Call Parent Constructor
        Phaser.Sprite.call(this, game, CONSTANTS.SPAWN_X, CONSTANTS.SPAWN_Y, 'dude');
        //Enable Arcade Physics for this object
        game.physics.arcade.enable(this);

        //Set object properties
        //this.body.bounce.y = 0.2;
        this.body.gravity.y = CONSTANTS.GRAVITY;
        this.body.collideWorldBounds = true;
        this.animations.add('left', [0,1,2,3], 10, true);
        this.animations.add('right', [5,6,7,8], 10, true);

        this.isSuperSpeed = false;
        this.holdingBerry = null;
        this.isRidingSnail = false;

        //Object methods
        this.moveLeft = function() {
            this.body.velocity.x = this.isSuperSpeed ? -2 * CONSTANTS.BASE_SPEED : -1 * CONSTANTS.BASE_SPEED;
            this.animations.play('left');
            console.log(this.body.velocity.x);
        };
        this.moveRight = function() {
            this.body.velocity.x = this.isSuperSpeed ? 2 * CONSTANTS.BASE_SPEED : CONSTANTS.BASE_SPEED;
            this.animations.play('right');
        };
        this.doNothing = function() {
            this.animations.stop();
            this.frame = 4;
        };
        this.jump = function() {
            if (this.body.touching.down) {
                this.body.velocity.y = -550;
            }
        };
        this.die = function() {
            if (this.holdingBerry) {
                // drops berry at current location
                this.holdingBerry.reset(this.x, this.y);
                this.holdingBerry = null;
            }
            this.reset(CONSTANTS.SPAWN_X, CONSTANTS.SPAWN_Y);
        };
        this.becomeSuper = function(worker, gate) {
            if (!this.isSuperSpeed && this.holdingBerry) {
                this.isSuperSpeed = true;
                gate.kill();
                // gets rid of berry
                this.holdingBerry.destroy();
                this.holdingBerry = null;
                return true;
            } else {
                return false;
            }
        };
        this.grabBerry = function(worker, berry) {
            if (this.holdingBerry == null) {
                this.holdingBerry = berry;
                berry.kill();
                return true;
            } else {
                return false;
            }
        };
    }

    Worker.prototype = Object.create(Phaser.Sprite.prototype, {
        constructor: Worker.constructor
    });

    return Worker;
});
