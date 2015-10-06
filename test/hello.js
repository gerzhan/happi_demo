var Lab = require('lab');
var lab = exports.lab = Lab.script();
var code = require('code');
var server = require('../server.js');

lab.experiment("Hello ",
  function() {
    lab.test(" exist ", function(done) {
      var options = {
        method: 'GET',
        url: '/hello'
      };
      server.inject(options, function(response) {
        var result = response.result;
        code.expect(response.statusCode).to.equal(200);
        done();
      });
    });
  }
);
