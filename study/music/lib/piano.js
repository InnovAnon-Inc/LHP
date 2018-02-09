/* requires: note.js */

function Piano (context, notes, gain, richness) {
	this.notes = new Array (notes.length);
	var i;
	for (i = 0; i < notes.length; i++)
		this.notes[i] = new Note (context, notes[i], gain, richness);
}
Piano.prototype.trigger = function(time, freqs, duration) {
	var i;
	for (i = 0; i < freqs.length; i++) {
		if (freqs[i] < 0) alert (freqs);
		this.notes[freqs[i] % this.notes.length].trigger (time, duration);
	}
};
