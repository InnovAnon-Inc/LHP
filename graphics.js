//var c = document.getElementById("graphics");
//var ctx = c.getContext("2d");

var width=100
var height=100

//ctx.moveTo(0,0);
//ctx.lineTo(200,100);
//ctx.stroke();



var c = document.getElementById("one-circle");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.arc(50,50,50,0,2*Math.PI);
ctx.stroke();



var c = document.getElementById("two-circles");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.arc(25,50,25,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(75,50,25,0,2*Math.PI);
ctx.stroke();



var c = document.getElementById("three-circles");
var ctx = c.getContext("2d");

var triangleHeight = 25 * Math.sqrt (3);

ctx.beginPath();
ctx.arc(50,50 - triangleHeight / 2,25,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(25,50 + triangleHeight / 2,25,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(75,50 + triangleHeight / 2,25,0,2*Math.PI);
ctx.stroke();



var c = document.getElementById("four-circles");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.arc(25,25,25,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(25,75,25,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(75,25,25,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(75,75,25,0,2*Math.PI);
ctx.stroke();



var c = document.getElementById("vesica-pisces");
var ctx = c.getContext("2d");

var l3 = 100 / 3;

ctx.beginPath();
ctx.arc(l3,50,l3,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(100 - l3,50,l3,0,2*Math.PI);
ctx.stroke();



var c = document.getElementById("vesica-pisces-recursive");
var ctx = c.getContext("2d");
vesicaPiscesRecursive (0, 0, width, height, 0);

function vesicaPiscesRecursive (topLeftX, topLeftY, width, height, depth) {
	var l3 = width / 3;
	
	ctx.beginPath();
	ctx.arc(topLeftX + width / 2,topLeftY + height / 2,width / 2,0,2*Math.PI);
	ctx.stroke();
	
	if (width < 5) return;

	if (depth % 2 == 0) {
		ctx.beginPath();
		ctx.arc(topLeftX + l3,topLeftY + height / 2,l3,0,2*Math.PI);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(topLeftX + width - l3,topLeftY + height / 2,l3,0,2*Math.PI);
		ctx.stroke();
	} else {
		ctx.beginPath();
		ctx.arc(topLeftX + width / 2,topLeftY + height / 2 - l3 / 2,l3,0,2*Math.PI);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(topLeftX + width / 2,topLeftY + height / 2 + l3 / 2,l3,0,2*Math.PI);
		ctx.stroke();
	}

	//ctx.beginPath();
	//ctx.arc(width / 2,height / 2,l3 / 2,0,2*Math.PI);
	//ctx.stroke();

	vesicaPiscesRecursive (topLeftX + width / 2 - l3 / 2, topLeftY + height / 2 - l3 / 2, l3, l3, depth + 1);
}



var c = document.getElementById("triquetra");
var ctx = c.getContext("2d");

var l3 = width / 3;
var triangleHeight = 100 / 3 / 2 * Math.sqrt (3);

// TODO shorten arcs
ctx.beginPath();
ctx.arc(50,50 - triangleHeight / 2,l3,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(50 - l3 / 2,50 + triangleHeight / 2,l3,0,2*Math.PI);
//ctx.arc(50 - triangleHeight / 2,50 + triangleHeight / 2,l3,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(50 + l3 / 2,50 + triangleHeight / 2,l3,0,2*Math.PI);
//ctx.arc(50 + triangleHeight / 2,50 + triangleHeight / 2,l3,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(50,50,l3,0,2*Math.PI);
ctx.stroke();



var c = document.getElementById("five-fold-knot");
var ctx = c.getContext("2d");

ctx.beginPath();
ctx.arc(50 - triangleHeight / 2,50 - triangleHeight / 2,l3,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(50 + triangleHeight / 2,50 - triangleHeight / 2,l3,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(50 - triangleHeight / 2,50 + triangleHeight / 2,l3,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(50 + triangleHeight / 2,50 + triangleHeight / 2,l3,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(50,50,l3,0,2*Math.PI);
ctx.stroke();



var c = document.getElementById("polygon-two");
var ctx = c.getContext("2d");
drawPolygon (2);

var c = document.getElementById("polygon-three");
var ctx = c.getContext("2d");
drawPolygon (3);

function drawPolygon (sides) {
	var angles = new Array (sides);
	for (i = 0; i < angles.length; i++)
		angles[i] = i / sides * 2 * Math.PI;

	ctx.moveTo(50 + 50 * Math.cos (angles[angles.length - 1]), 50 + 50 * Math.sin (angles[angles.length-1]));
	for (i = 0; i < angles.length; i++)
		ctx.lineTo (50 + 50 * Math.cos (angles[i]), 50 + 50 * Math.sin (angles[i]));
	ctx.stroke();
}

var c = document.getElementById("polygon-four");
var ctx = c.getContext("2d");
drawPolygon (4);

var c = document.getElementById("polygon-five");
var ctx = c.getContext("2d");
drawPolygon (5);

var c = document.getElementById("polygon-six");
var ctx = c.getContext("2d");
drawPolygon (6);

var c = document.getElementById("polygon-seven");
var ctx = c.getContext("2d");
drawPolygon (7);

var c = document.getElementById("polygon-eight");
var ctx = c.getContext("2d");
drawPolygon (8);



var c = document.getElementById("polygon-three");
var ctx = c.getContext("2d");
drawConstellation (3);

function drawConstellation (sides) {
	var angles = new Array (sides);
	for (i = 0; i < angles.length; i++)
		angles[i] = i / sides * 2 * Math.PI;

	for (i = 0; i < angles.length; i++) {
		ctx.moveTo (50, 50);
		ctx.lineTo (50 + 50 * Math.cos (angles[i]), 50 + 50 * Math.sin (angles[i]));
		ctx.stroke();
	}
}

var c = document.getElementById("polygon-four");
var ctx = c.getContext("2d");
drawConstellation (4);

var c = document.getElementById("polygon-five");
var ctx = c.getContext("2d");
drawConstellation (5);

var c = document.getElementById("polygon-six");
var ctx = c.getContext("2d");
drawConstellation (6);

var c = document.getElementById("polygon-seven");
var ctx = c.getContext("2d");
drawConstellation (7);

var c = document.getElementById("polygon-eight");
var ctx = c.getContext("2d");
drawConstellation (8);



var c = document.getElementById("pentagram");
var ctx = c.getContext("2d");
drawPolygram (5, 2);

function drawPolygram (sides, skip) {
	var angles = new Array (sides);
	for (i = 0; i < angles.length; i++)
		angles[i] = i / sides * 2 * Math.PI;

	var visited = new Array (sides);
	for (i = 0; i < angles.length; i++)
		visited[i] = false;

	for (j = 0; j < visited.length; j++) {
		if (visited[j]) continue;
		//visited[j] = true;
		ctx.moveTo(50 + 50 * Math.cos (angles[j]), 50 + 50 * Math.sin (angles[j]));
		i = j;
		do {
			alert (j + " " + i);
			ctx.lineTo (50 + 50 * Math.cos (angles[i]), 50 + 50 * Math.sin (angles[i]));
		
			visited[i] = true;
			i = (i + skip) % angles.length
		} while (! visited[i]);
		ctx.stroke();
	}
}




// polygrams