
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
        
    	
function Kick(context, duration, maxGain, harmonic) {
	this.context = context;
	//this.freqs = freqs;
	//this.i = 0;
	this.duration = duration;
	this.maxGain = maxGain;
	this.harmonic = harmonic;
}

Kick.prototype.setup = function() {
	this.osc = this.context.createOscillator();
	this.gain = this.context.createGain();
	this.osc.connect(this.gain);
	this.gain.connect(this.context.destination);
};
Kick.prototype.getFreq = function () {
	return this.freq * this.harmonic;
};
Kick.prototype.trigger = function(time) {
	this.setup();

	this.osc.frequency.setValueAtTime(this.getFreq (), time);
	
	this.gain.gain.setValueAtTime(this.maxGain, time);
	this.gain.gain.exponentialRampToValueAtTime(this.maxGain / 100, time + this.duration);

	this.osc.start(time);
	this.osc.stop(time + this.duration);
};

function Piano (context, duration) {
	var h = 6;
	this.kicks = new Array (1 + h * 2);
	var g = .1;
	this.kicks[0] = new Kick (context, duration, g, 1);
	var i;
	var p = 2;
	for (i = 0; i < h; i++, p *= 2) {
		this.kicks[1 + i * 2 + 0] = new Kick (context, duration, g / p, i + 2);
		this.kicks[1 + i * 2 + 1] = new Kick (context, duration, g / p, 1 / (i + 2));
	}
	
	this.i = 0;
}
Piano.prototype.getFreq = function () {
	this.i = this.i % this.freqs.length;
	var ret = this.freqs[this.i];
	this.i++;
	return ret;
}
Piano.prototype.setFreqs = function (freqs) {
	this.freqs = freqs;
	//this.i = 0;
};
Piano.prototype.trigger = function(time) {
	var freq = this.getFreq ();
	var i;
	for (i = 0; i < this.kicks.length; i++) {
		this.kicks[i].freq = freq;
		this.kicks[i].trigger (time);
	}
};





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



