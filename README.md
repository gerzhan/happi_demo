# HAPI demo

    var Hapi = require('hapi');

    // Create a server with a host and port
    var server = new Hapi.Server();
    server.connection({ 
        host: 'localhost', 
        port: 8000 
    });

    // Add the route
    server.route({
        method: 'GET',
        path:'/hello', 
        handler: function (request, reply) {
            reply('hello world');
        }
    });

    // Start the server
    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });

## [Using plugins](http://hapijs.com/tutorials#using-plugins)

    npm install --save good
    npm install --save good-console

## [Validation](http://hapijs.com/tutorials/validation#validation)

    npm i joi -S   