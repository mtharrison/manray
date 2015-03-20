// Load modules
var Phantom = require('phantom-render-stream');
var Fs = require('fs');
var Joi = require('joi')
var Path = require('path');
var Utils = require('./utils');
var Uuid = require('node-uuid');


// Declare internals

var internals = {};

internals.render = Phantom({ pool: 5 });


// Delcare exports

module.exports = [{
    method: 'POST',
    path: '/',
    handler: function(request, reply) {

        var schema = {
            width: Joi.number().default(640),
            height: Joi.number().default(480),
            canvases: Joi.array().required().items({
                objects: Joi.array().required(),
                background: Joi.any()
            })
        };

        Joi.validate(request.payload, schema, function (err, value) {

            if (err) {
                throw err;
            }

            var viewData = Utils.convertViewData(value);
            var html = Utils.getTemplate()(viewData);

            Utils.writeTempTemplateFile(html, function(filename) {

                var uri = require('os').hostname() === 'ip-172-30-2-133' ? 'http://54.172.33.249:5555' : request.server.info.uri;

                var baseName  = Path.basename(filename, '.html');
                var viewUrl   = uri + '/views/' +  baseName + '.html';
                var imagePath = Path.join(__dirname, 'images') + '/' + baseName + '.png';
                var imageUrl  = uri + '/images/' +  baseName + '.png';

                internals.render(viewUrl, {
                    width: request.payload.width || 1280,
                    height: request.payload.height || 960,
                })
                .pipe(Fs.createWriteStream(imagePath))
                .on('finish', function() {

                    reply(imageUrl);
                    // Fs.unlink(filename);
                });
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