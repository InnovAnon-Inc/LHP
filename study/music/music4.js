




function SongA (context, measureLength, pulses, pulsesP) {
		this.context = context;
		var measures = 1;
		var bf = 432;
		this.scale = [1/1, 16/15, 9/8, 6/5, 5/4, 4/3, 7/5, 3/2,	8/5, 5/3, 16/9, 15/8];
		var roots = [0, 2, 4, 5, 7, 9, 11];
		this.lines  = new Array (pulses.length);
		this.linesP = new Array (pulsesP.length);
		var pl;
		for (pl = 0; pl < pulses.length; pl++)
			this.lines[pl]  = new Line (measureLength, measures, pulses[pl],  pulses[pl]  * measures * 1 / 2 + 1, pulsesP[pl] * measures / 3 + pl + 1);
		for (pl = 0; pl < pulsesP.length; pl++)
			this.linesP[pl] = new Line (measureLength, measures, pulsesP[pl], pulsesP[pl] * measures * 2 / 3 + 1, pulsesP[pl] * measures / 2 + pl + 1);
		
		this.progressionLength = 4;
		var root, p;
		var progressions = new Array (this.scale.length);
		for (p = root = 0; p < this.scale.length; p++, root += 5) {
			var chordI    = applyChord (majorChord     (this.scale, root + roots[0]), bf);
			var chordii   = applyChord (minorChord     (this.scale, root + roots[1]), bf);
			//var chordiii  = applyChord (minorChord     (this.scale, root + roots[2]), bf);
			//var chordiii7 = applyChord (minor7Chord    (this.scale, root + roots[2]), bf);
			//var chordIV   = applyChord (majorChord     (this.scale, root + roots[3]), bf);
			var chordV    = applyChord (majorChord     (this.scale, root + roots[4]), bf);
			//var chordV7   = applyChord (dominant7Chord (this.scale, root + roots[4]), bf);
			var chordvi   = applyChord (minorChord     (this.scale, root + roots[5]), bf);
			//var chordviid = applyChord (diminishedChord (this.scale, root + roots[6]), bf);
			var progression = [chordI, chordV, chordii, chordvi];
			progressions[p] = progression;
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
		

	}
	
	
	SongA.prototype.play = function (now, I) {
try {
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
} catch (e) { alert (e) }
	};
	
	
	
	
	

	
	
	
	
	
	function Song2 (context, measureLength, pulses, pulsesP) {
try{
		this.context = context;
		var measures = 1;
		var bf = 432;
		this.scale = [1/1, 16/15, 9/8, 6/5, 5/4, 4/3, 7/5, 3/2,	8/5, 5/3, 16/9, 15/8];
		var roots = [0, 2, 4, 5, 7, 9, 11];
		this.lines  = new Array (pulses.length);
		this.linesP = new Array (pulsesP.length);
		var pl;
		for (pl = 0; pl < pulses.length; pl++)
			this.lines[pl]  = new Line (measureLength, measures, pulses[pl],  pulses[pl]  * measures * 1 / 2 + 1, pulsesP[pl] * measures / 3 + pl + 1);
		for (pl = 0; pl < pulsesP.length; pl++)
			this.linesP[pl] = new Line (measureLength, measures, pulsesP[pl], pulsesP[pl] * measures * 2 / 3 + 1, pulsesP[pl] * measures / 2 + pl + 1);
		
	
		this.progressionLength = 3;
		var root, p;
		var progressions = new Array (this.scale.length);
		for (p = root = 0; p < this.scale.length; p++, root += 5) {
			//var chordI    = applyChord (majorChord     (this.scale, root + roots[0]), bf);
			//var chordii   = applyChord (minorChord     (this.scale, root + roots[1]), bf);
			var chordiii  = applyChord (minorChord     (this.scale, root + roots[2]), bf);
			//var chordiii7 = applyChord (minor7Chord    (this.scale, root + roots[2]), bf);
			var chordIV   = applyChord (majorChord     (this.scale, root + roots[3]), bf);
			//var chordV    = applyChord (majorChord     (this.scale, root + roots[4]), bf);
			//var chordV7   = applyChord (dominant7Chord (this.scale, root + roots[4]), bf);
			//var chordvi   = applyChord (minorChord     (this.scale, root + roots[5]), bf);
			var chordviid = applyChord (dimChord       (this.scale, root + roots[6]), bf);
			var progression = [chordiii, chordviid, chordIV];
			progressions[p] = progression;
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
	Song2.prototype.play = function (now, I) {
try {
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
} catch (e) { alert (e) }
	};
	

