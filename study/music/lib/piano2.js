/* requires: piano.js */

function applyScale (baseFreq, scale, octaves, octave) {
	var ret = new Array (scale.length * octaves);
	var i, j, k;
	for (i = k = 0; i < octaves; i++)
		for (j = 0; j < scale.length; j++, k++)
			ret[k] = baseFreq * Math.pow (2, octave + i) * scale[j];
	return ret;
}

function Piano2 (context, bf, scale, octaves, octave, gain, richness) {
	var notes = applyScale (bf, scale, octaves, octave);
	alert (notes);
	this.piano = new Piano (context, notes, gain, richness);
}
Piano2.prototype.trigger = function(time, freqs, duration) {
	this.piano.trigger (time, freqs, duration);
};
