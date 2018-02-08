/* requires: kick.js */

function Note (context, freq, gain, richness) {
	var h = richness;
	this.kicks = new Array (1 + h * 2);
	var g = gain;
	this.kicks[0] = new Kick (context, freq, g, 1);
	var i;
	for (i = 0; i < h; i++) {
		g /= 2;
		var hGain   = g;
		var hFactor = i + 2;
		this.kicks[1 + i * 2 + 0] = new Kick (context, freq, hGain, hFactor / 1);
		this.kicks[1 + i * 2 + 1] = new Kick (context, freq, hGain, 1 / hFactor);
	}
}
Note.prototype.setDuration = function (duration) {
	for (i = 0; i < this.kicks.length; i++)
		this.kicks[i].setDuration (duration);
};
Note.prototype.trigger = function(time) {
	var i;
	for (i = 0; i < this.kicks.length; i++)
		this.kicks[i].trigger (time);
};
