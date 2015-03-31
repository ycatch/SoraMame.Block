/** Turtle example for SoraMame.Block
	Copyright 2015 Yutaka Kachi under MIT License
	
	Modfied from HTML5 canvas turtle graphics
    Copyright 2012 Hannes Hirzel under CC by 3.0
	http://cnx.org/contents/85310cba-5bbc-4f1d-b437-778a1aef9d02@2/Turtle_graphics_with_the_HTML5
 */

 (function() {

	// JavaScript statements
	// =====================================================================================
	var turtle = {
		x: 0,
		y: 0,
		angleInRadians: 0,
		penDown: false,
		penColor: "#000000",
		lineWidth: 2
	};

	turtle.color = {
		black: "#000000",
		gray: "#808080",
		lightgray: "#C0C0C0",
		red: "#ff0000",
		green: "#00ff00",
		blue: "#0000ff",
		yellow: "#ffff00",
		fuchsia: "#ff00ff",
		aqua: "#00ffff"
	};

	var canvas = document.getElementById('myDrawing');

	if (canvas && canvas.getContext) { // does the browser support 'canvas'?
		turtle.ct = canvas.getContext("2d"); // get drawing context
	} else {
		alert('You need a browser which supports the HTML5 canvas!');
	}

	// =====================================================================================


	turtle.logPenStatus = function () {
		console.log(
			'x=' + this.x + 
			'; y=' + this.y + 
			'; angle=' + this.angle() + 
			'; penColor = ' + this.penColor +
			'; penDown=' + this.penDown);
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
	
	turtle.setAngle = function (angle) {
		// set angle by degrees 0 - 360
		this.angleInRadians = angle * Math.PI / 180.0;
	};
	
	turtle.clear = function () {
		// clear CANVAS
		this.ct.clearRect(0, 0, canvas.width, canvas.height);
	};
	
	turtle.mark = function () {
		// drawing turtle symbol.
		var path = 5;

		var x0 = this.x,
			y0 = this.y,
			x1 = x0 + path * 1.5 * Math.sin(this.angleInRadians),
			y1 = y0 + path * 1.5 * Math.cos(this.angleInRadians);
		
		this.ct.fillStyle = turtle.color.gray;
		this.ct.beginPath();
		this.ct.arc(x0, y0, path, 0, Math.PI*2, true);
		this.ct.fill();
		
		this.ct.strokeStyle = turtle.color.lightgray;
 		this.ct.beginPath();
		this.ct.moveTo(x0, y0);
		this.ct.lineTo(x1, y1);
		this.ct.stroke();
	};
	
	/** add Global Single var. */
	if (typeof window.TURTLE == "undefined") {
		window.TURTLE = turtle;
	}
})()


