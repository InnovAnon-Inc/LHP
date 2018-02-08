/* requires: note.js */

function Piano (context, notes, gain, richness) {
	//this.bf = bf;
	this.notes = new Array (notes.length);
	var i;
	for (i = 0; i < notes.length; i++)
		this.notes[i] = new Note (context, notes[i], gain, richness);
}
Piano.prototype.setFreqs = function (freqs) {
	this.freqs = freqs;
};
Piano.prototype.setDuration = function (duration) {
	for (i = 0; i < freqs.length; i++)
		this.notes[freqs[i]].setDuration (duration);
};
Piano.prototype.trigger = function(time) {
	var freq = this.getFreqs ();
	var i;
	for (i = 0; i < freqs.length; i++)
		this.notes[freqs[i]].trigger (time);
};
