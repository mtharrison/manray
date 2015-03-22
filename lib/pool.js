// Load modules

var Phantom = require('phantom-render-stream');
var Base64 = require('base64-stream');
var Uuid = require('node-uuid');
var Stream = require('stream');
var Path = require('path');
var Joi = require('joi');
var Fs = require('fs');


var Utils = require('./utils');


// Set internals


var internals = {};


module.exports = internals.Pool = function (size) {

    this.phantom = Phantom({ pool: size });
};


internals.validateInputs = function (data, options, next) {

    // Validate data

    var dataSchema = {
        canvases: Joi.array().required().items({
            objects: Joi.array().required(),
            background: Joi.any()
        })
    };

    var dataValidation = Joi.validate(data, dataSchema);

    if (dataValidation.error) {
        throw dataValidation.error;
    }

    // Validate options

    var optionsSchema = {
        output: Joi.string().valid(['base64', 'binary']),
        width: Joi.number().default(640),
        height: Joi.number().default(480)
    };

    var optionsValidation = Joi.validate(options, optionsSchema);

    if (optionsValidation.error) {
        throw optionsValidation.error;
    }

    next(dataValidation.value, optionsValidation.value);
};


internals.Pool.prototype.render = function (data, options, callback) {

    var self = this;

    var buffer = options.output === 'base64' ? '' : new Buffer('');
    var ouputStream = new Stream.PassThrough;
    var tmpFile = Path.join('/tmp/', Uuid.v4()) + '.html';

    internals.validateInputs(data, options, function (data, options) {

        // Make HTML

        var viewData = Utils.prepareViewData(data, options);
        var html = Utils.getTemplate()(viewData);

        // Render and stream

        Fs.writeFile(tmpFile, html, function (err) {

            switch (options.output) {
                case 'base64': 
                    self.phantom(tmpFile).pipe(Base64.encode()).pipe(ouputStream);
                break;
                case 'binary':
                    self.phantom(tmpFile).pipe(ouputStream);
                break;
            }
        });

        // Listen for the stream's end event to clean up the temp file

        ouputStream.on('data', function (chunk) {

            switch (options.output) {
                case 'base64': 
                    buffer += chunk
                break;
                case 'binary':
                    buffer = Buffer.concat([buffer, chunk]);
                break;
            }
        });

        ouputStream.on('end', function () {

            Fs.unlink(tmpFile);

            if (callback) {
                callback(buffer);
            }
        });
    });

    return ouputStream;
};