function Kick(context, freq, maxGain, harmonic) {
	this.context = context;
	this.freq = freq * harmonic;
	this.maxGain = maxGain;
	this.harmonic = harmonic;
}
Kick.prototype.setup = function() {
	this.osc = this.context.createOscillator();
	this.gain = this.context.createGain();
	this.osc.connect(this.gain);
	this.gain.connect(this.context.destination);
};
Kick.prototype.setDuration = function (duration) {
	this.duration = duration;
};
Kick.prototyp.getDuration = function () {
	return this.duration;
};
Kick.prototype.trigger = function(time) {
	var duration = this.getDuration ();
	this.setup();

	this.osc.frequency.setValueAtTime(this.freq, time);
	
	this.gain.gain.setValueAtTime(this.maxGain, time);
	this.gain.gain.exponentialRampToValueAtTime(this.maxGain / 100, time + duration);

	this.osc.start(time);
	this.osc.stop(time + duration);
};

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

function applyScale (baseFreq, scale, octave) {
	var ret = new Array (scale.length);
	var i;
	for (i = 0; i < ret.length; i++)
		ret[i] = baseFreq * Math.pow (2, octave) * scale[i];
	return applyScale;
}

var context = new AudioContext();
var now = context.currentTime;
now++;

var bf    = 432;
var scale = [];
var as = applyScale (bf, scale, 0);
var p = new Piano (context, as, .1, 5);

chordI = [0, 4, 7];
piano.setFreqs (chordI);
piano.setDuration (1);
piano.trigger (now);













function euclideanRhythm (onNotes, totalNotes) {
  var groups = [];
  for (var i = 0; i < totalNotes; i++) groups.push([Number(i < onNotes)]);

  var l;
  while (l = groups.length - 1) {
    var start = 0, first = groups[0];
    while (start < l && compareArrays(first, groups[start])) start++;
    if (start === l) break;

    var end = l, last = groups[l];
    while (end > 0 && compareArrays(last, groups[end])) end--;
    if (end === 0) break;

    var count = Math.min(start, l - end);
    groups = groups
      .slice(0, count)
      .map(function (group, i) { return group.concat(groups[l - i]); })
      .concat(groups.slice(count, -count));
  }
  return [].concat.apply([], groups);
};

function compareArrays (a, b) {
  // TODO: optimize
  return JSON.stringify(a) === JSON.stringify(b);
};

Array.prototype.rotate = (function() {
    var unshift = Array.prototype.unshift,
        splice = Array.prototype.splice;

    return function(count) {
        var len = this.length >>> 0,
            count = count >> 0;

        unshift.apply(this, splice.call(this, count % len, len));
        return this;
    };
})();










function mod(m, n) {
	return ((n % m) + m) % m;
}
function majorChord (scale, root) {
	return [
		scale[mod (scale.length, (root + 0))],
		scale[mod (scale.length, (root + 4))],
		scale[mod (scale.length, (root + 7))]
	];
}
function major7Chord (scale, root) {
	return [
		scale[mod (scale.length, (root +  0))],
		scale[mod (scale.length, (root +  4))],
		scale[mod (scale.length, (root +  7))],
		scale[mod (scale.length, (root + 11))]
	];
}
function dominant7Chord (scale, root) {
	return [
		scale[mod (scale.length, (root +  0))],
		scale[mod (scale.length, (root +  4))],
		scale[mod (scale.length, (root +  7))],
		scale[mod (scale.length, (root + 10))]
	];
}
function minorChord (scale, root) {
	return [
		scale[mod (scale.length, (root + 0))],
		scale[mod (scale.length, (root + 3))],
		scale[mod (scale.length, (root + 7))]
	];
}
function minor7Chord (scale, root) {
	return [
		scale[mod (scale.length, (root +  0))],
		scale[mod (scale.length, (root +  3))],
		scale[mod (scale.length, (root +  7))],
		scale[mod (scale.length, (root + 10))]
	];
}
function dimChord (scale, root) {
	return [
		scale[mod (scale.length, (root +  0))],
		scale[mod (scale.length, (root +  3))],
		scale[mod (scale.length, (root +  6))]
	];
}
function applyChord (chord, bf) {
	var ret = new Array (chord.length);
	var i;
	for (i = 0; i < chord.length; i++)
		ret[i] = bf * chord[i];
	return ret;
}

function transformChords (progression, r, pulses, skip) {
	var ret = new Array (progression.length);
	var c;
	for (c = 0; c < progression.length; c++) {
		ret[c] = new Array (pulses);
		
		var temp = progression[c].slice ();
		temp = temp.rotate (r);
		
		var p, P;
		for (p = P = 0; p < pulses; p++, P += skip) {
			ret[c][p] = temp[P % temp.length];
		}
	}
	return ret;
}

function product(input){
	 if (toString.call(input) !== "[object Array]")
		return false;
	  
			 var total   =   1;
	  
		   for(var i=0;i<input.length;i++){
				   if(isNaN(input[i])){
					 continue;
				   }
					total   *=  Number(input[i]);
				}
			  return total;
}
        
    	








function Pattern (nbeat, nnote, mode) {
	nbeat = Math.max (1, Math.floor (nbeat));
	nnote = Math.max (1, Math.floor (nnote));
	mode  = Math.floor (mode);
	/* TODO rotate euclid by mode */
	//this.euclid = euclid (nbeat, nnote);
	this.euclid = euclideanRhythm (nnote, nbeat);
	this.euclid = this.euclid.rotate (mode);
}
	
	
function Line (measureLength, measures, divisions, nnotes, mode) {
	this.duration = measureLength / divisions;
	this.pattern = new Pattern (divisions * measures, nnotes, mode);
	this.piano = new Piano (context, this.duration);
}	
Line.prototype.play = function (time, chord) {
	this.piano.setFreqs (chord);
	var i;
	for (i = 0; i < this.pattern.euclid.length; i+=1) {
		if (this.pattern.euclid[i]){
			this.piano.trigger (time);
		}
		time += this.duration;
	}
};



