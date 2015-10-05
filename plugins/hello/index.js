var helloPlugin = {
  register: function(server, options, next) {
    server.route({
      method: 'GET',
      path: '/hello',
      handler: function(req, reply) {
        reply("Hello from helloPlugin!")
      }
    })
    next();
  }
}

helloPlugin.register.attributes = {
  name: "helloPlugin",
  version: "0.0.1"
}
module.exports = helloPlugin;
