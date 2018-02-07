
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
function diminishedChord (scale, root) {
	return [
		scale[mod (scale.length, (root +  0))],
		scale[mod (scale.length, (root +  3))],
		scale[mod (scale.length, (root +  6))]
	];
}
function augmentedChord (scale, root) {
	return [
		scale[mod (scale.length, (root +  0))],
		scale[mod (scale.length, (root +  4))],
		scale[mod (scale.length, (root +  8))]
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

	var freq = this.getFreq ();
	this.osc.frequency.setValueAtTime(freq, time);
	
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


/*
const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
     }
   }
 }

 permute(inputArr)

 return result;
}
*/
function permute(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}




function Song (context, measureLength, pulses, pulsesP) {
try{
		this.context = context;
		var measures = 1;
		var bf = 432;
		this.scale = [1/1, 16/15, 9/8, 6/5, 5/4, 4/3, 7/5, 3/2,	8/5, 5/3, 16/9, 15/8];
		var roots = [0, 2, 3, 6, 7, 9, 11];
		this.lines  = new Array (pulses.length);
		this.linesP = new Array (pulsesP.length);
		var pl;
		for (pl = 0; pl < pulses.length; pl++)
			this.lines[pl]  = new Line (measureLength, measures, pulses[pl],  pulses[pl]  * measures * 1 / 2 + 1, pulsesP[pl] * measures / 3 + pl + 1);
		for (pl = 0; pl < pulsesP.length; pl++)
			this.linesP[pl] = new Line (measureLength, measures, pulsesP[pl], pulsesP[pl] * measures * 2 / 3 + 1, pulsesP[pl] * measures / 2 + pl + 1);
		
	
		//this.progressionLength = 13;
		var root, p;
		var progressions = new Array (this.scale.length);
		for (p = root = 0; p < this.scale.length; p++) {
			var chordi    = applyChord (minorChord     (this.scale, root + roots[0]), bf);
			var chordII   = applyChord (majorChord     (this.scale, root + roots[1]), bf);
			var chordIIIa = applyChord (augmentedChord (this.scale, root + roots[2]), bf);
			var chordivd  = applyChord (diminishedChord(this.scale, root + roots[3]), bf);
			var chordV    = applyChord (majorChord     (this.scale, root + roots[4]), bf);
			var chordvid  = applyChord (diminishedChord(this.scale, root + roots[5]), bf);
			var chordvii  = applyChord (minorChord     (this.scale, root + roots[6]), bf);
			//var progression = [chordii, chordI, chordV7, chordvi, chordiii7, chordIV, chordI, chordii, chordV7, chordI, chordIV, chordiii7, chordvi];
			/*var progression = [chordi, chordII, chordIIIa, chordIV, chordvd, chordvid, chordvii];
			progression = [].concat (...permute (progression));*/
			//var progression = [chordi, chordII, chordIIIa, chordivd, chordV, chordvid, chordvii];
			var progression = [
				chordV,   chordvii,  chordivd,  chordvid,
				chordi, chordivd,  chordvii, chordIIIa, chordvid,  chordII,   chordV,
				chordi, chordV,    chordII,  chordvid,  chordIIIa, chordvii,  chordivd,
				chordi, chordvid,  chordivd, chordII,   chordvii,  chordV,    chordIIIa,
				chordi, chordvii,  chordvid, chordV,    chordivd,  chordIIIa, chordII,
			];
			//var progression = [
			//	chordII, chordvid, chordvd, chordIIIa, chordvii, chordIV, chordi,
			//	chordIV, chordIIIa, ];
			
			this.progressionLength = progression.length;
			
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
				this.lpP[i][p] = transformChords (progressions[p], i, pulsesP[i], 2 * i + 1);
			}
		}
		
		this.primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61];
		this.M  = product (this.primes.slice (0, this.lines.length));
		this.MP = product (this.primes.slice (0, this.linesP.length));
		this.mLm = measureLength * measures;
		
		this.p = 0;
		this.c = 0;
		
} catch (e) { alert (e) }
	}
	Song.prototype.play2 = function (now, I) {
		var p = this.p;
		var c = this.c;
		
		
			var lll;
			for (lll = 0; lll < lines.length; lll++) {
				if (m % primes[lines.length - lll - 1] == 0)
					lines[lll].play (now, lp[lll][p][c]);
			}
			for (lll = 0; lll < linesP.length; lll++) {
				if (m % primes[linesP.length - lll - 1] != 0)
					linesP[lll].play (now, lpP[lll][p][c]);
			}
	
			now += mLm;
			
			m++;
			//if (m == M) m = 1;
			//if (m == M) m = 0;
			
			c++;
			if (c == progressionLength) {
				c = 0;
				
				p++;
				if (p == scale.length) p = 0;
			}
			
			this.c = c;
			this.p = p;
	};
	
	
	
    Song.prototype.play = function (now, I) {
try {
      //var total, p, c, lll;
	  var p = 0;
	  var c = 0;
	  var rotAmt = 1;
	  //var k = 1;

		//var m = 1;
		//var m = 0;
		//m += this.lp[0][0].length * (this.scale.length * 1) * I;
		var m = I;
		//if (m > this.M) m = m % this.M + 1;
		//if (m > this.M) m = m % this.M;
	
		//for (total =  0; total < this.scale.length * 1; total++) {
		var lp = this.lp;
		var lpP = this.lpP;
		var primes = this.primes;
		var lines = this.lines;
		var linesP = this.linesP;
		var mLm = this.mLm;
		var progressionLength = this.progressionLength;
		var M = this.M;
		var scale = this.scale;
		var context = this.context;
		function cycle () {
			var lll;
			for (lll = 0; lll < lines.length; lll++) {
				if (m % primes[lines.length - lll - 1] == 0)
					lines[lll].play (now, lp[lll][p][(c * rotAmt) % progressionLength]);
			}
			for (lll = 0; lll < linesP.length; lll++) {
				if (m % primes[linesP.length - lll - 1] != 0)
					linesP[lll].play (now, lpP[lll][p][(c * rotAmt) % progressionLength]);
			}
	
			now += mLm;
			
			m++;
			//if (m == M) m = 1;
			//if (m == M) m = 0;
			
			c++;
			if (c == progressionLength) {
				c = 0;
				
				p++;
				if (p == scale.length) {
					p = 0;
					
					rotAmt++;
					if (rotAmt % progressionLength == 0) rotAmt++;
				}
			}
			
			setTimeout(cycle, Math.max (0, (now - context.currentTime) * 1000 - 100));
		}
		cycle ();
} catch (e) { alert (e) }
	};
	
