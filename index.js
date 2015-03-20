var Hapi = require('hapi');
var Fs = require('fs');
var Path = require('path');


// Make the dirs, if they don't exist

try {
    Fs.mkdirSync(Path.join(__dirname, '/images'), 0755);
    Fs.mkdirSync(Path.join(__dirname, '/tmp'), 0755);
} catch (e) {
    if (e.code != 'EEXIST') {
        throw e;
    }
}

var server = new Hapi.Server();
server.connection({ port: 5555, routes: {cors: true} })

server.route(require('./routes'));

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
