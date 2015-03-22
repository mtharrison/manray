var Manray = require('../');

var canvasData = {
    canvases: [{
        "objects": [{
            "type": "rect",
            "originX": "left",
            "originY": "top",
            "left": 0,
            "top": 0,
            "width": 300,
            "height": 100,
            "fill": "blue",
            "stroke": null,
            "strokeWidth": 1,
            "strokeDashArray": null,
            "strokeLineCap": "butt",
            "strokeLineJoin": "miter",
            "strokeMiterLimit": 10,
            "scaleX": 1,
            "scaleY": 1,
            "angle": 0,
            "flipX": false,
            "flipY": false,
            "opacity": 1,
            "shadow": null,
            "visible": true,
            "clipTo": null,
            "backgroundColor": "",
            "rx": 0,
            "ry": 0,
            "x": 0,
            "y": 0
        }],
        "background": "red"
    }]
};

new Manray.Pool(10)
    .render(canvasData, {
        output: 'base64'
    })
    .pipe(process.stdout);