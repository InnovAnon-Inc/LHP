

function test() {
	var con = document.getElementById("cnsl");
	con.value = drawCircle.toString() + "\n" +
		"drawCircle(\"testing-canvas\")";
	drawCircle("testing-canvas");
}

function test2() {
	var con = document.getElementById("cnsl");
	con.value = "alert ('test 2')";
	drawCircle("testing-canvas");
}

function showCircleCall() { showCall (circle, "testing-canvas") }

function showCircleCall2() {
	var con = document.getElementById("cnsl");
	con.value = drawCircle.toString() + "\n" +
		"drawCircle(\"testing-canvas\")";
	drawCircle("testing-canvas");
}







function showCall(f, a) {
	var con = document.getElementById("cnsl");
	con.value = f.toString();
	con.value += "\n";
	con.value += f + "(" + a + ")";
	//f(a);
}

function drawCircle(graphics) {
	var c = document.getElementById(graphics);
	var ctx = c.getContext("2d");

	var width=c.width;
	var height=c.height;
	var l = Math.min(width, height);

	ctx.beginPath();
	ctx.arc(width/2,height/2,l/2,0,2*Math.PI);
	ctx.stroke();
}