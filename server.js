var Hapi = require('hapi');
var Good = require('good')
var server = new Hapi.Server();


server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: function(req, reply) {
    reply('hello world');
  }
});

server.route({
  method: 'GET',
  path: '/hello/{name}',
  handler: function(req, reply) {
    reply("Hello " + encodeURIComponent(req.params.name) + "!")
  }
});

server.register({
    register: Good,
    options: {
      reporters: [{
        reporter: require('good-console'),
        events: {
          response: '*',
          log: '*'
        }

      }]
    }
  },
  function(err) {
    if (err) {
      throw err;
    }
    server.start(function() {
      console.log('Server running at:', server.info.uri);
    });
  }
);
