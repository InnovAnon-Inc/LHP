// Execute Arbitrary JavaScript
function run() {
	var el = document.getElementById('cnsl');
	el && eval(el.value);
}
