require.config({
    // put your RequireJS configuration here
    // not important for our sample, but here for reference
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'underscore': 'bower_components/underscore/underscore-min',
        'backbone': 'bower_components/backbone/backbone-min',
        //'phaser': 'bower_components/phaser/build/phaser.min'
    },
    shim: {
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }
    },
    baseUrl: '../',
    waitSeconds: 10
});

require(['js/app'], function(App) {
    // defines app.js as a dependency and
    // invokes the initialize method inside app.js
    new App({
        screenHeight: 600
    });
});
