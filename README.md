![manray](http://mattharrison.s3.amazonaws.com/manray/logo.png) 
#Manray
###Streaming image renderer for fabric.js canvas JSON data

Takes your canvas JSON from fabric and returns a stream of image data from phantomjs

###Why?

Capturing screenshots from canvas can be tricky, especially if you're using SVGs. SVGs when drawn on canvas using `drawImage()`, even from same-origin or using base64 data will taint your canvas and prevent you from calling `getImageData()` on your canvas.

This is a simple way to sidestep that restriction by having Manray do the rendering for you from JSON.

###How?

    var Manray = require('manray');

    var canvasData = {canvases:[{...}]}; // canvas data from fabric.Canvas.prototype.toDatalessJSON()

    var pool = new Manray.pool(5);       // Pool with 5 workers

    var stream = pool.render(canvasData, 
        {  
            output: 'base64'             // one of 'base64' (string) or 'binary' (buffer)
        }
    );

stream.pipe(toWherever);

###Don't want a stream? Use a callback instead.

    var Manray = require('manray');

    var canvasData = {canvases:[{...}]}; // canvas data from fabric.Canvas.prototype.toDatalessJSON()

    var pool = new Manray.pool(5);       // Pool with 5 workers

    pool.render(canvasData, 
        {  
            output: 'base64'
        },
        function (buff) {
        
        }
    );