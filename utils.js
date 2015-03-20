var Hbs = require('handlebars');
var Crypto = require('crypto');
var Path = require('path');
var Fs = require('fs');
var Uuid = require('node-uuid');

var Utils = {};

Utils.writeTempTemplateFile = function(contents, callback) {

    var uuid = Uuid.v4();
    var filename = Path.resolve(Path.join(__dirname, '/tmp/', uuid)) + '.html';

    Fs.writeFile(filename, contents, function(err) {

        if (err) {
            throw err;
        }

        callback(filename);
    })
}

Utils.getTemplate = function() {

    return Hbs.compile(Fs.readFileSync(Path.join(__dirname, '/public/index.hbs')).toString());
};

Utils.getRandomImageName = function() {

    return __dirname + '/images/' + Uuid.v4() + '.png';
}


module.exports = Utils;