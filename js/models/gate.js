define([], function() {
    function Gate(game, x, y) {
        Phaser.Image.call(this, game, 32, 400, 'gate');
    }
    Gate.prototype = Object.create(Phaser.Sprite.prototype, {
        constructor: Gate.constructor
    });
    return Gate;
});
