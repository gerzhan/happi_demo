var Hapi = require('hapi');
var Good = require('good');
var Blipp = require('blipp');
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
  path: '/',
  handler: function(req, reply) {
    reply.view('index', {
      title: "Hapi Demo"
    });
  }
});

server.route({
  method: 'GET',
  path: '/hello/{name}',
  handler: function(req, reply) {
    reply("Hello " + encodeURIComponent(req.params.name) + "!")
  },
  config: {
    tags: ['api'],
    notes: ['See personal hello message'],
    validate: {
      params: {
        name: Joi.string().min(3).max(10)
      }
    }
  }
});

server.register([
    Inert,
    Vision,
    Blipp, {
      register: require('hapi-swagger'),
      options: {
        apiVersion: "0.0.1",
        basePath: server.info.uri,
        info: {
          title: 'HAPI Demo ',
          description: 'This web API was built to demonstrate some of the hapi features and functionality.',
          contact: 'nikolay.gerzhan@gmail.com',
          license: 'MIT',
          licenseUrl: '/license'
        }
      }
    }, {
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
// add templates support with handlebars
server.views({
  path: 'templates',
  engines: {
    html: require('handlebars')
  },
  isCached: false
});

module.exports = server;
