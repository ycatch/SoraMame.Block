/** Turtle example for SoraMame.Block
	Copyright 2015 Yutaka Kachi under MIT License
	Modfy from HTML5 canvas turtle graphics
    Copyright 2012 Hannes Hirzel under CC by 3.0
	http://cnx.org/contents/85310cba-5bbc-4f1d-b437-778a1aef9d02@2/Turtle_graphics_with_the_HTML5
 */

// JavaScript statements
// =====================================================================================
var color = {
    black: "#ffffff",
    red: "#ff0000",
    green: "#00ff00",
    blue: "#0000ff",
    yellow: "#ffff00",
    fuchsia: "#ff00ff",
    aqua: "#00ffff"
};

var turtle = {
    x: 0,
    y: 0,
    angleInRadians: 0,
    penDown: false,
    penColor: "#000000",
    lineWidth: 2
};

var canvas = document.getElementById('myDrawing');

if (canvas && canvas.getContext) { // does the browser support 'canvas'?
    turtle.ct = canvas.getContext("2d"); // get drawing context
} else {
    alert('You need a browser which supports the HTML5 canvas!');
}

// =====================================================================================


turtle.logPenStatus = function () {
    console.log('x=' + this.x + "; y=" + this.y + '; angle = ' + this.angle + '; penDown = ' + this.penDown);
};


turtle.forward = function (length) {
    // console.log('forward(' + length + ')');
    // this.logPenStatus();
    var x0 = this.x,
        y0 = this.y;
    this.x += length * Math.sin(this.angleInRadians);
    this.y += length * Math.cos(this.angleInRadians);
    if (this.ct) {
        if (this.penDown) {
            //this.logPenStatus();
            this.ct.beginPath();
            this.ct.lineWidth = this.lineWidth;
            this.ct.strokeStyle = this.penColor;
            this.ct.moveTo(x0, y0);
            this.ct.lineTo(this.x, this.y);
            this.ct.stroke();
        }
    } else {
        this.ct.moveTo(this.x, this.y);
    }
    return this;
};

turtle.backward = function (length) {
    this.forward(-length);
    return this;
};

turtle.left = function (angleInDegrees) {
    // console.log('left(' + angleInDegrees + ')');
    // A complete circle, 360o, is equivalent to 2ƒÎ radians  
    // angleInDegrees is an angle measure in degrees
    this.angleInRadians += angleInDegrees * Math.PI / 180.0;
    return this;
};

turtle.right = function (angleInDegrees) {
    this.left(-angleInDegrees);
    return this;
};


turtle.angle = function () {
    // the turtle status is hold in this.angleInRadians;
    // degrees are often more convenient for the display
    return this.angleInRadians * 180.0 / Math.PI;
};



