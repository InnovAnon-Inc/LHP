function test() {
	var con = document.getElementById("cnsl");
	con.value = drawCircle.toString();
	drawCircle('test-canvas');
}

function test2() {
	var con = document.getElementById("cnsl");
	con.value = "alert (test 2)";
	drawCircle('test-canvas');
}

function showCircleCall() { showCall (circle, 'testing-canvas') }

function showCall(f, a) {
	var con = document.getElementById("cnsl");
	con.value = f.toString();
	f(a);
}

function drawCircle(graphics) {
	var width=100;
	var height=100;

	var l = Math.min(width, height);

	var c = document.getElementById(graphics);
	var ctx = c.getContext("2d");

	ctx.beginPath();
	ctx.arc(width/2,height/2,l/2,0,2*Math.PI);
	ctx.stroke();
}