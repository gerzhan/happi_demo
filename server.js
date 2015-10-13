var Hapi = require('hapi');
var Good = require('good');
var Joi = require('joi');
var Inert = require('inert');
var Vision = require('vision');
var server = new Hapi.Server();


server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path: '/hello/{name}',
  handler: function(req, reply) {
    reply("Hello " + encodeURIComponent(req.params.name) + "!")
  },
  config: {
    validate: {
      params: {
        name: Joi.string().min(3).max(10)
      }
    }
  }
});

server.register([
    Inert,
    Vision, {
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
    }, {
      register: require('./plugins/hello'),
      options: {}
    }
  ],
  function(err) {
    if (err) {
      throw err;
    }
    if (!module.parent) {
      server.start(function() {
        console.log('Server running at:', server.info.uri);
      });
    }
  }
);

module.exports = server;
