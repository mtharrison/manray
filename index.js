var Hapi = require('hapi');

var server = new Hapi.Server(80);

server.route(require('./routes')(server));

server.start(function(){
	console.log('Server running at:', server.info.uri);
})