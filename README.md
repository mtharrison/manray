![manray](http://mattharrison.s3.amazonaws.com/manray/logo.png) 
#Manray
###Fabric.js rendering as a service.

A simple webservice written in Node.js. Post your canvas JSON from fabric to Manray and get back a URL to a rendered image.

###Why?

Capturing screenshots from canvas can be tricky, especially if you're using SVGs. SVGs when drawn on canvas using `drawImage()`, even from same-origin or using base64 data will taint your canvas and prevent you from calling `getImageData()` on your canvas.

This is a simple way to sidestep that restriction by having Manray do the rendering for you from JSON.

###How?

In your client side canvas script:

	var canvas = new fabric.Canvas('canvas');
	... 
	... # Add some things to canvas
	...
	var json = canvas.toDatalessJSON();
	
Then you post that JSON to Manray who will create an HTML document with a canvas and restore that canvas using your json. Manray will then open the document in PhantomJS, take a shot and save it to disk, handing back to you in the original response a nice clean URL for you to use however you wish.
