function PixelDrawer (context, canvas) {
	this.context = context;
	this.canvas = canvas;
	this.canvasData = context.getImageData (0, 0,
		canvas.width, canvas.height);
}
PixelDrawer.prototype.drawPixel = function (x, y, r, g, b, a) {
    var index = (x + y * this.canvas.width) * 4;

    this.canvasData.data[index + 0] = r;
    this.canvasData.data[index + 1] = g;
    this.canvasData.data[index + 2] = b;
    this.canvasData.data[index + 3] = a;
}
PixelDrawer.prototype.updateCanvas = function {
    this.context.putImageData (this.canvasData, 0, 0);
}


function Point (x, y) {
	this.x = x;
	this.y = y;
}
function PointView (point, context, canvas) {
	this.point = point;
	this.context = context;
	this.canvas = canvas;
}
PointView.prototype.draw = function () {
	var pd = new PixelDrawer (this.context, this.canvas);
	pd.drawPixel (0, 0, 255, 0, 0, 0);
	pd.updateCanvas ();
	//this.context.fillRect (this.point.x, this.point.y, .1, .1);
};




var canvas = document.getElementById ('wyrd-clock');
var context = canvas.getContext ("2d");

context.clearRect (0, 0, canvas.width, canvas.height);
context.save ();
try {
	context.scale (canvas.width / 2, canvas.height / 2); // scale to unit circle's cartesian coordinates
	context.scale (1, -1); // reflect about x-axis
	context.translate(1, -1); // reposition origin

	var origin = new Point (0, 0);
	var originView = new PointView (origin, context, canvas);

	context.fillStyle = "white";
	originView.draw ();
} catch (e) {
	alert (e);
	throw e;
} finally {
	context.restore ();
}












/*
function Circle (c, r) {
	this.c = c;
	this.r = r;
}

function normalizeScreenPoint (p) {
	var x = p.x;
	var y = p.y;
	x += 1;
	x /= 2;
	y += 1;
	y /= 2;
	return new Point (x, y);
}

function reflectNormalizedPoint (p) {
	var x = p.x;
	var y = y;
	y = 1 - y;
	return new Point (x, y);
}

function convertReflectedNormalizedPoint (p, width, height) {
	var x = p.x;
	var y = p.y;
	x *= width;
	y *= height;
	return new Point (x, y);
}

function Screen (topLeftPoint, width, height) {
	this.topLeftPoint = topLeftPoint;
	this.width = width;
	this.height = height;
}

Screen.prototype.convertPoint = function (p) {
	return convertReflectedNormalizedPoint (
		reflectNormalizedPoint (
			normalizeScreenPoint (p)),
			this.width, this.height);
};




var create = function (buffer) {
	return {
		get : function (key) {
			return buffer[(length + key) % length];},
		set : function (key, item) {
			buffer[(length + key) % length] = item;
		}
	};
};
*/








// sun - center - gold
// moon - bottom - blue
// mars - top left - red
// mercury - bottom left - yellow
// jupiter - top right - pink
// venus - bottom right - green
// saturn - top - purple

var d = new Date ();
var weekday = new Array (7);
weekday[0] = "Sun day";
weekday[1] = "Moon day";
weekday[2] = "Tiw's day";
weekday[3] = "Woden's day";
weekday[4] = "Thor's day";
weekday[5] = "Freya day";
weekday[6] = "Saturn day";

var weekimg = new Array (7);
weekimg[0] = "sun.png";
weekimg[1] = "moon.png";
weekimg[2] = "mars.png";
weekimg[3] = "mercury.png";
weekimg[4] = "jupiter.png";
weekimg[5] = "venus.png";
weekimg[6] = "saturn.png";

var weekcolor = new Array (7);
weekcolor[0] = "gold";
weekcolor[1] = "blue";
weekcolor[2] = "red";
weekcolor[3] = "yellow";
weekcolor[4] = "pink";
weekcolor[5] = "green";
weekcolor[6] = "purple";

var weekpt = new Array (7);
weekpt[0] = origin;
weekpt[1] = circumscription[3];
weekpt[2] = circumscription[1];
weekpt[3] = circumscription[2];
weekpt[4] = circumscription[5];
weekpt[5] = circumscription[4];
weekpt[6] = circumscription[0];

var name = weekday[d.getDay ()];
var img  = weekimg[d.getDay ()];








/*
var canvas = document.getElementById ('wyrd-clock');
var ctx = canvas.getContext ("2d");
// TODO i don't like this... the point is in a different coord system and accessing ctx.width and height should be behind the scenes
ctx = new Context (ctx, new Point (0, 0), ctx.width, ctx.height);

function Context (ctx, topLeft, width, height) {
	this.ctx = ctx;
}
Context.prototype.translateAndNormalize = function (n) {
	n += 1; // translate
	n /= 2; // normalize
	return n;
};
Context.prototype.scaleX = function (x) {
	x = translateAndNormalize (x);
	// no reflect
	x *= this.ctx.width; // scale
	return x;
};
Context.prototype.scaleY = function (y) {
	y = translateAndNormalize (y);
	y = 1 - y; // reflect
	y *= this.ctx.height; // scale
	return y;
};
Context.prototype.scaleAndTranslateX = function (x) {
	x = scaleX (x);
	x += topLeft.x;
	return x;
};
Context.prototype.scaleAndTranslateY = function (y) {
	y = scaleY (y);
	y += topLeft.y;
	return y;
};





var fullContext = new Context (new Point (-1, 1), 2, 2);

function Context (topLeft, width, height) {
	
}
function ContextView (context, canvas) {
	this.model = context;
	this.canvasContext = canvas.getContext ("2d");
}



function Point (x, y) {
	this.x = x;
	this.y = y;
}
var origin = new Point (0, 0);

function PointView (pt, ctx) {
	this.model = pt;
	this.ctx = ctx;
}
PointView.prototype.draw = function () {
	var scaledX = this.ctx.scaleX (this.model.x);
	var scaledY = this.ctx.scaleY (this.model.y);
	this.ctx.ctx.fillRect (scaledX, scaleY, 1, 1);
};
*/







// TODO how to draw?

function inscriptionCoordinates (n) {
	var pts = new Array (n);
	for (var i = 0; i < n; i++) {
		var theta = i / n * 2 * Math.PI;
		var x = cos (theta);
		var y = sin (theta);
		pts[i] = new Point (x, y);
	}
	return pts;
}

function Line (p1, p2) {
	this.p1 = p1;
	this.p2 = p2;
}

function normalizedModulus (i, n) {
	return (n + i) % n;
}

// no defensive copy
function CircularArray (array) {
	this.array = array;
}
CircularArray.prototype.get = function (key) {
	return array[normalizedModulus (key, array.length)];
};
CircularArray.prototype.set = function (key, item) {
	array[normalizedModulus (key, array.length)] = item;
};

function Polygon (pts) {
	pts = new CircularArray (pts);
	var lines = new Array (pts.length);
	for (var i = 0; i < n; i++) {
		lines[i] = new Line (pts[i], pts[i + 1]);
	}
	this.lines = lines;
}

function Stellation (center, pts) {
	var lines = new Array (pts.length);
	for (var i = 0; i < n; i++) {
		lines[i] = new Line (center, pts[i]);
	}
	this.lines = lines;
}

function Polygram (pts, offset) {
	pts = new CircularArray (pts);
	var lines = new Array (pts.length);
	for (var i = 0; i < n; i++) {
		lines[i] = new Line (pts[i], pts[i + offset]);
	}
	this.lines = lines;
}

function WyrdClock (canvas) {
	this.ctx = canvas.getContext ("2d");
	var insc = inscriptionCoordinates (6);
	var center = new Point (0, 0);
}
WyrdClock.prototype.draw = function () {
	
};
WyrdClock.prototype.draw = function () {
	
};

var canvas = document.getElementById ('wyrd-clock');
var wyrdClock = new WyrdClock (canvas);
wyrdClock.draw ();




var outer = new Array (6);
var center = (0, 0);

for (i = 0; i < outer.length; i++) {
	var theta = i / outer.length * 2 * Math.PI;
	var x = cos (theta);
	var y = sin (theta);
	outer[i] = (x, y);
}

var createModularArray = function (buffer) {
	return {
		get : function (key) {
			return buffer[(length + key) % length];},
		set : function (key, item) {
			buffer[(length + key) % length] = item;
		}
	};
};

function polygram (arr, spacing) {
	var mArr = createModularArray (arr);
	for (i = 0; i < arr.length; i++) {
		drawLine (mArr[i], mArr[i + spacing]);
	}
}

function stellation (center, outer) {
	for (i = 0; i < outer.length; i++) {
		drawLine (center, outer[i]);
	}
}

polygon (outer);
polygram (outer, 2);
stellation (center, outer);

var r = 1/8; // ?
for (i = 0; i < outer.length; i++) {
	// TODO draw planetary symbols in circles
	drawCircle (outer[i], r);
}
drawCircle (center, r);

// TODO need to translate, scale and reflect to canvas coordinates

// TODO a color correspondances

// TODO a reasonable way to highlight current day of week
