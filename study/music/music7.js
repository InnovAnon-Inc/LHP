





















/*











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



*/
