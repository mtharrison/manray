var Hbs = require('handlebars');
var Crypto = require('crypto');
var Path = require('path');
var Fs = require('fs');
var Uuid = require('node-uuid');


// Declare internals

var internals = {};


internals.makeId = function () {

    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i=0; i < 10; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return 'x' + id;
};


exports.writeTempTemplateFile = function(contents, callback) {

    var uuid = Uuid.v4();
    var filename = Path.resolve(Path.join(__dirname, '/tmp/', uuid)) + '.html';

    Fs.writeFile(filename, contents, function(err) {

        if (err) {
            throw err;
        }

        callback(filename);
    })
};


exports.getTemplate = function() {

    return Hbs.compile(Fs.readFileSync(Path.join(__dirname, '/public/index.hbs')).toString());
};


exports.getRandomImageName = function() {

    return __dirname + '/images/' + Uuid.v4() + '.png';
};


exports.convertViewData = function (data) {

    for (var i = 0; i < data.canvases.length; ++i) {
        data.canvases[i].data = JSON.stringify(data.canvases[i]);
        data.canvases[i].id = internals.makeId();
    }

    return data;
};
