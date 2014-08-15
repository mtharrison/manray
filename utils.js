var hbs = require('handlebars');
var crypto = require('crypto');
var fs = require('fs');

var Utils = {};

Utils.getRandomHash = function() {
  return crypto.randomBytes(20).toString('hex');
};

Utils.makeTempFile = function(content, callback) {
  var fn = __dirname + '/tmp/' + Utils.getRandomHash() + '.html';

  fs.writeFile(fn, content, function(err) {
    if (err) throw err;
    callback(fn);
  })
}

Utils.getTemplate = function() {
  return hbs.compile(fs.readFileSync(__dirname + '/public/index.hbs').toString());
};

Utils.getRandomImageName = function() {
  return __dirname + '/images/' + Utils.getRandomHash() + '.png';
}

module.exports = Utils;