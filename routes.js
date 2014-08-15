var phantom = require('phantom-render-stream');
var render = phantom({
  pool: 5
});
var fs = require('fs');
var path = require('path');
var Utils = require('./utils');
var template = Utils.getTemplate();
const HOST = "http://manray.vpplatform.com";

module.exports = function(server) {
  return [{
    method: 'POST',
    path: '/',
    handler: function(request, reply) {
      var name = Utils.getRandomImageName();
      var html = template({
        data: JSON.stringify(request.payload)
      });

      Utils.makeTempFile(html, function(fn) {
        var htmlView = "http://127.0.0.1/views/" + path.basename(fn);
        render(htmlView, {
            width: request.payload.width || 1280,
            height: request.payload.height || 960,
          }).pipe(fs.createWriteStream(name))
          .on('finish', function() {
            reply(HOST + '/images/' + path.basename(name));

            fs.unlink(fn, function() {});
          });
      });

    }
  }, {
    method: 'GET',
    path: '/images/{param*}',
    handler: {
      directory: {
        path: 'images',
        listing: true
      }
    }
  }, {
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public',
        listing: true
      }
    }
  }, {
    method: 'GET',
    path: '/views/{param*}',
    handler: {
      directory: {
        path: 'tmp',
        listing: true
      }
    }
  }];
};