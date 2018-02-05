
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
        
    	
function Kick(context, duration) {
	this.context = context;
	//this.freqs = freqs;
	this.i = 0;
	this.duration = duration;
}

Kick.prototype.setup = function() {
	this.osc = this.context.createOscillator();
	this.gain = this.context.createGain();
	this.osc.connect(this.gain);
	this.gain.connect(this.context.destination);
};

Kick.prototype.getFreq = function () {
	this.i = this.i % this.freqs.length;
	var ret = this.freqs[this.i];
	this.i++;
	return ret;
}

Kick.prototype.setFreqs = function (freqs) {
	this.freqs = freqs;
	//this.i = 0;
}

Kick.prototype.trigger = function(time) {
	this.setup();

	var freq = this.getFreq ();
	this.osc.frequency.setValueAtTime(freq, time);
	this.gain.gain.setValueAtTime(1, time);

	this.gain.gain.exponentialRampToValueAtTime(0.01, time + this.duration);

	this.osc.start(time);

	this.osc.stop(time + this.duration);
};



// TODO this algorithm seems borked
function euclid (nbeat, nnote) {
	if (nnote < 0) { nnote = 0; }
	if (nbeat < 0) { nbeat = 0; }
	if (nnote > nbeat) {
		var tmp = nnote;
		nnote   = nbeat;
		nbeat   = tmp;
	}
	if (nbeat == 0) { return []; }
	var rests = nbeat - nnote;
	var result = new Array (nnote);
	var i;
	for (i = 0; i < nnote; i+=1){
		result[i] = 1;
	}
	var pivot = 1;
	var interval = 2;
	while (rests > 0) {
		if (pivot > result.length) {
			pivot = 1;
			interval +=1;
		}
		result.splice (pivot, 0, 0);
		pivot += interval;
		rests -=1;
	}
	return result;
}


function Pattern (nbeat, nnote, mode) {
	/* TODO rotate euclid by mode */
	//this.euclid = euclid (nbeat, nnote);
	this.euclid = euclideanRhythm (nnote, nbeat);
	//alert (this.euclid);
}
	
	
function Line (measureLength, measures, divisions, nnotes, mode) {
	this.duration = measureLength / divisions;
	this.pattern = new Pattern (divisions * measures, nnotes, mode);
	this.kick = new Kick (context, this.duration);
}	
Line.prototype.play = function (time, chord) {
	//this.kick.freqs = chord;
	//this.kick.i     = 0;
	this.kick.setFreqs (chord);
	var i;
	for (i = 0; i < this.pattern.euclid.length; i+=1) {
		if (this.pattern.euclid[i]){
			this.kick.trigger (time);
		}
		time += this.duration;
	}
};




function Song (context) {
try{
		var measureLength = 60 / 40;
		var measures = 1;
		var bf = 432;
		this.scale = [1/1, 16/15, 9/8, 6/5, 5/4, 4/3, 7/5, 3/2,	8/5, 5/3, 16/9, 15/8];
		var roots = [0, 2, 4, 5, 7, 9];
		//var pulses  = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2];
		//var pulsesP = [4, 3, 5, 2, 4, 3, 5, 2, 4, 3, 5, 2];
		var pulses  = [1, 2, 3, 5, 4, 3, 2, 1];
		var pulsesP = [4, 5, 2, 3, 4, 5, 2, 3];
		this.lines  = new Array (pulses.length);
		this.linesP = new Array (pulsesP.length);
		var pl;
		for (pl = 0; pl < pulses.length; pl++)
			this.lines[pl] = new Line (measureLength, measures, pulses[pl], pulses[pl] * measures, 0);
		for (pl = 0; pl < pulsesP.length; pl++)
			this.linesP[pl] = new Line (measureLength, measures, pulsesP[pl], pulsesP[pl] * measures / 2 + 1, pulsesP[pl] * measures / 3 + pl + 1);
		/*
		this.lines = [
			new Line (measureLength, measures, pulses[0], pulses[0] * measures, 0),
			
			new Line (measureLength, measures, pulses[1], pulses[1] * measures, 0),
			new Line (measureLength, measures, pulses[2], pulses[2] * measures, 0),
			new Line (measureLength, measures, pulses[3], pulses[3] * measures, 0),
			
			new Line (measureLength, measures, pulses[4], pulses[4] * measures, 0),
			new Line (measureLength, measures, pulses[5], pulses[5] * measures, 0),
			
			new Line (measureLength, measures, pulses[6], pulses[6] * measures, 0),
			new Line (measureLength, measures, pulses[7], pulses[7] * measures, 0),
			new Line (measureLength, measures, pulses[8], pulses[8] * measures, 0),
			new Line (measureLength, measures, pulses[9], pulses[9] * measures, 0),
		];
		this.linesP = [
			new Line (measureLength, measures, pulsesP[0], pulsesP[0] * measures / 2 + 1, pulsesP[0] * measures / 3 + 1),
		
			new Line (measureLength, measures, pulsesP[1], pulsesP[1] * measures / 2 + 1, pulsesP[1] * measures / 3 + 2),
			new Line (measureLength, measures, pulsesP[2], pulsesP[2] * measures / 2 + 1, pulsesP[2] * measures / 3 + 3),
			new Line (measureLength, measures, pulsesP[3], pulsesP[3] * measures / 2 + 1, pulsesP[3] * measures / 3 + 4),
			
			new Line (measureLength, measures, pulsesP[4], pulsesP[4] * measures / 2 + 1, pulsesP[4] * measures / 3 + 5),
			new Line (measureLength, measures, pulsesP[5], pulsesP[5] * measures / 2 + 1, pulsesP[5] * measures / 3 + 6),
			
			new Line (measureLength, measures, pulsesP[6], pulsesP[6] * measures / 2 + 1, pulsesP[6] * measures / 3 +  7),
			new Line (measureLength, measures, pulsesP[7], pulsesP[7] * measures / 2 + 1, pulsesP[7] * measures / 3 +  8),
			new Line (measureLength, measures, pulsesP[8], pulsesP[8] * measures / 2 + 1, pulsesP[8] * measures / 3 +  9),
			new Line (measureLength, measures, pulsesP[9], pulsesP[9] * measures / 2 + 1, pulsesP[8] * measures / 3 + 10),
		];
		*/
	
		var root, p;
		var progressions = new Array (this.scale.length);
		for (p = root = 0; p < this.scale.length; p++) {
			var chordI    = applyChord (majorChord     (this.scale, root + roots[0]), bf);
			var chordii   = applyChord (minorChord     (this.scale, root + roots[1]), bf);
			var chordiii7 = applyChord (minor7Chord    (this.scale, root + roots[2]), bf);
			var chordIV   = applyChord (majorChord     (this.scale, root + roots[3]), bf);
			var chordV7   = applyChord (dominant7Chord (this.scale, root + roots[4]), bf);
			var chordvi   = applyChord (minorChord     (this.scale, root + roots[5]), bf);
			var progression = [chordii, chordI, chordV7, chordvi, chordiii7, chordIV, chordI, chordii, chordV7, chordI, chordIV, chordiii7, chordvi];
			progressions[p] = progression;
			root += 5;
		}
		
		this.lp  = new Array (this.lines.length);
		this.lpP = new Array (this.linesP.length);
		
		var i;
		for (i = 0; i < this.lp.length; i++) {
			this.lp[i] = new Array (this.scale.length);
			for (p = 0; p < this.lp[i].length; p++) {
				this.lp[i][p] = transformChords (progressions[p], i, pulses[i], i + 0);
			}
		}
		for (i = 0; i < this.lpP.length; i++) {
			this.lpP[i] = new Array (this.scale.length);
			for (p = 0; p < this.lpP[i].length; p++) {
				this.lpP[i][p] = transformChords (progressions[p], i, pulsesP[i], 2* i + 1);
			}
		}
		
		this.primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43];
		this.M  = product (this.primes.slice (0, this.lines.length));
		this.MP = product (this.primes.slice (0, this.linesP.length));
		this.mLm = measureLength * measures;
		
} catch (e) { alert (e) }
	}
	
	
    Song.prototype.play = function (now, I) {
try {
      var total, p, c, lll;
	  p = 0;
	  //var k = 1;

		var m = 1;
		//var m = 0;
		m += this.lp[0][0].length * (this.scale.length * 1) * I;
		if (m > this.M) m = m % this.M + 1;
		//if (m > this.M) m = m % this.M;
	
		//for (total =  0; total < this.scale.length * 1; total++) {
		var lp = this.lp;
		var lpP = this.lpP;
		var primes = this.primes;
		var lines = this.lines;
		var linesP = this.linesP;
		var mLm = this.mLm;
		var M = this.M;
		var scale = this.scale;
		function cycle () {
		
			for (c = 0; c < lp[0][p].length; c++) {
				//var count = 0;
				//var P = true;
				/*
				for (lll = 0; lll < lines.length; lll++) {
					if (m % primes[lines.length - lll - 1] != 0) {
						count++;
					}
				}
				if (count >= 4) {
					for (lll = 0; lll < lines.length; lll++) {
						if (m % primes[lines.length - lll - 1] != 0)
							lines[lll].play (now, lp[lll][p][c]);
					}
				} else {
						for (lll = 0; lll < linesP.length; lll++) {
							if (m % primes[linesP.length - lll - 1] == 0) {
								linesP[lll].play (now, lpP[lll][p][c]);
							}
						}
						//k++;
						//if (k == this.MP) k = 0;
				}
				*/
				for (lll = 0; lll < linesP.length; lll++) {
					if (m % primes[linesP.length - lll - 1] != 0)
						linesP[lll].play (now, lpP[lll][p][c]);
				}
				for (lll = 0; lll < lines.length; lll++) {
					if (m % primes[lines.length - lll - 1] == 0)
						lines[lll].play (now, lp[lll][p][c]);
				}
		
				now += mLm;
				
				m++;
				if (m == M) m = 1;
				//if (m == M) m = 0;
			}
			
			p++;
			if (p == scale.length) p = 0;
			
			setTimeout(cycle, mLm * lp[0][p].length * 999);
		}
		cycle ();
} catch (e) { alert (e) }
	};
	
