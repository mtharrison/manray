var Uuid = require('node-uuid');
var Hbs = require('handlebars');
var Crypto = require('crypto');
var Path = require('path');
var Fs = require('fs');


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


exports.getTemplate = function() {

    return Hbs.compile(Fs.readFileSync(Path.join(__dirname, '../public/index.hbs')).toString());
};


exports.prepareViewData = function (data, options) {

    data.height = options.height;
    data.width = options.width;

    for (var i = 0; i < data.canvases.length; ++i) {
        data.canvases[i].data = JSON.stringify(data.canvases[i]);
        data.canvases[i].id = internals.makeId();
    }

    return data;
};
