var Hapi = require('hapi'),
    Path = require('path');

var server = new Hapi.Server();
server.connection({ port: 1337 });

// Configure view engine
server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'templates')
});

server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: 'index'
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'static'
        }
    }
});

server.start(function() {
    console.log('Server running at:', server.info.uri);
});
