define(['js/models/gate'], function(Gate) {
    function Map(game) {
        this.game = game;
        Phaser.Group.call(this, game, null, 'map');
        console.log(this);

        var sky = new Phaser.TileSprite(game, 0, 0, window.innerWidth, window.innerHeight, 'sky');
        this.add(sky);

        this.gate = new Gate(game, 300, game.world.height - 32);
        this.add(this.gate);

        //creates platforms
        this.platforms = new Phaser.Group(game, this, 'platforms');
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 32, 'ground');
        ground.scale.setTo(3,1);
        ground.body.immovable = true;
        var ledge = this.platforms.create(400,400, 'ground');
        ledge.body.immovable = true;
        ledge = this.platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;
        this.platforms.setAll('body.friction', new Phaser.Point(0,0));

        //creates berries
        this.berries = new Phaser.Group(game, this, 'berries');
        this.berries.enableBody = true;
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            var berry = this.berries.create(i * 70, 0, 'star');

            //  Let gravity do its thing
            berry.body.gravity.y = 700;

            //  This just gives each star a slightly random bounce value
            berry.body.bounce.y = 0;

            berry.body.collideWorldBounds = true;
        }
    }
    Map.prototype = Object.create(Phaser.Group.prototype, {
        constructor: Map.constructor,
    });
    return Map;
});
