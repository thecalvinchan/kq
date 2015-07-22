define([], function() {
    function Gate(game, x, y, type) {
        Phaser.Sprite.call(this, game, 32, 400, 'gate');
        if (type == Gate.SPEED_GATE || type == Gate.WARRIOR_GATE) {
            this.type = type;
        } else {
            throw "Invalid type passed into Gate constructor"
        }
        this.activate = function(worker) {
            switch(this.type) {
                case Gate.SPEED_GATE:
                    worker.becomeSuper();
                    break;
                case Gate.WARRIOR_GATE:
                    worker.becomeWarrior();
                    break;
                default:
                    throw "Invalid Gate type";
                    break;
            }
        }
    }
    Gate.SPEED_GATE = 0;
    Gate.WARRIOR_GATE = 1;

    Gate.prototype = Object.create(Phaser.Sprite.prototype, {
        constructor: Gate.constructor
    });

    return Gate;
});
