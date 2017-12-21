// TODO helper function to add button to panel

function clearConsole() {
	var con = document.getElementById("cnsl");
	con.value = "";
}

function clearCanvas() {
	var con = document.getElementById("testing-canvas");
	// TODO showCall how to clear canvas
}

function test() {
	var con = document.getElementById("cnsl");
	con.value += "alert ('test');\n";
}

function showCall(f, a) {
	var con = document.getElementById("cnsl");
	con.value += f.toString();
	con.value += "\n";
	con.value += f.name + "(\"" + a + "\");\n";
	//f(a);
}

function drawCircle(graphics) {
	var c = document.getElementById(graphics);
	var ctx = c.getContext("2d");
	ctx.strokeStyle = "white";
	ctx.fillStyle = "white";

	var width=c.width;
	var height=c.height;
	var l = Math.min(width, height);

	ctx.beginPath();
	ctx.arc(width/2,height/2,l/2,0,2*Math.PI);
	ctx.stroke();
}