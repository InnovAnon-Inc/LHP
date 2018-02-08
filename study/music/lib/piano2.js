/* requires: piano.js */

function applyScale (baseFreq, scale, octaves, octave) {
	var ret = new Array (scale.length * octaves);
	var i;
	for (i = 0; i < ret.length; i++)
		ret[i] = baseFreq * Math.pow (2, octave + i) * scale[i % scale.length];
	return ret;
}

function Piano2 (context, bf, scale, octaves, octave, gain, richness) {
	var notes = applyScale (bf, scale, octaves, octave);
	this.piano = new Piano (context, notes, gain, richness);
}
Piano2.prototype.trigger = function(time, freqs, duration) {
	this.piano.trigger (time, freqs, duration);
};
