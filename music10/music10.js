var solfeggio = [
	174, //  0 - red,    white
	471, //  1 - orange, black
	285, //  2 - yellow, white
	369, //  3 - green,  black
	396, //  4 - blue,   white
	258, //  5 - purple, black

	417, //  6 - red,    white
	147, //  7 - orange, black
	528, //  8 - yellow, white
	936, //  9 - green,  black
	639, // 10 - blue,   white
	825, // 11 - purple, black

	741, // 12 - red,    white
	714, // 13 - orange, black
	852, // 14 - yellow, white
	693, // 15 - green,  black
	963, // 16 - blue,   white
	582, /* 17 - purple, black */ ];
// TODO select base_frequency using solfeggio

// TODO display graph
// TODO allow to play base frequency
var base_frequency = 432;

function getFrequencyFromRatio(ratio)     { return base_frequency * ratio; }
function getFrequency         (note, key) { return getFrequencyFromRatio(getFrequencyRatio(note, key)); }

function getRatio(intervalName) {
	// if interval is d or m, then return 0th element
	// if interval is M or A, then return 1th element
}

// TODO combination tones?

// TODO display circle with tick marks
// TODO allow to play chromatic scale ascending/descending
var chromatics = {
	//  note names        :      A     A#/Bb        B       C    C#/Db       D        D#      Eb      E        F    F#/Gb        G     G#/Ab
	//  intervals         :     P1        m2       M2      m3       M3      P4        A4      d5     P5       m6       M6       m7        M7
	//  3-limit tuning
	"pythagorean"         : [(1/1), (256/243), ( 9/8), (32/27), (81/64), (4/3), (729/512),        (3/2), (128/81), (27/16), (16/9), (243/128)],
	//  5-limit tuning
	"symmetric1"          : [(1/1), ( 16/ 15), ( 9/8), ( 6/ 5), ( 5/ 4), (4/3), ( 45/ 32, 64/45), (3/2), (  8/ 5), ( 5/ 3), (16/9), ( 15/  8)],
	"symmetric2"          : [(1/1), ( 16/ 15), (10/9), ( 6/ 5), ( 5/ 4), (4/3), ( 45/ 32, 64/45), (3/2), (  8/ 5), ( 5/ 3), ( 9/5), ( 15/  8)],
	"asymmetric_standard" : [(1/1), ( 16/ 15), ( 9/8), ( 6/ 5), ( 5/ 4), (4/3), ( 45/ 32, 64/45), (3/2), (  8/ 5), ( 5/ 3), ( 9/5), ( 15/  8)],
	"asymmetric_extended" : [(1/1), ( 16/ 15), ( 9/8), ( 6/ 5), ( 5/ 4), (4/3), ( 25/ 18, 36/25), (3/2), (  8/ 5), ( 5/ 3), ( 9/5), ( 15/  8)],
	//  7-limit tuning
	"limit7"              : [(1/1), ( 15/  4), ( 8/7), ( 6/ 5), ( 5/ 4), (4/3), (  7/  5, 10/ 7), (3/2), (  8/ 5), ( 5/ 3), ( 7/4), ( 15/  8)],
	// 17-limit tuning
	"limit17_1"           : [(1/1), ( 14/ 13), ( 8/7), ( 6/ 5), ( 5/ 4), (4/3), (  7/  5, 10/ 7), (3/2), (  8/ 5), ( 5/ 3), ( 7/4), ( 13/  7)],
	"limit17_2"           : [(1/1), ( 14/ 13), ( 8/7), ( 6/ 5), ( 5/ 4), (4/3), ( 17/ 12, 10/ 7), (3/2), (  8/ 5), ( 5/ 3), ( 7/4), ( 13/  7)],
	"limit17_3"           : [(1/1), ( 14/ 13), ( 8/7), ( 6/ 5), ( 5/ 4), (4/3), (  7/  5, 24/17), (3/2), (  8/ 5), ( 5/ 3), ( 7/4), ( 13/  7)],
	"limit17_4"           : [(1/1), ( 14/ 13), ( 8/7), ( 6/ 5), ( 5/ 4), (4/3), ( 17/ 12, 24/17), (3/2), (  8/ 5), ( 5/ 3), ( 7/4), ( 13/  7)], };
var chromatic = [
	1/1,   //  0 - C,     A
	16/15, //  1 - C#/Db, A#/Bb
	9/8,   //  2 - D,     B
	6/5,   //  3 - D#/Eb, C
	5/4,   //  4 - E,     C#/Db
	4/3,   //  5 - F,     D
	// TODO TT     F#/Gb, D#/Eb
	3/2,   //  7 - G,     E
	8/5,   //  8 - G#/Ab, F
	5/3,   //  9 - A,     F#/Gb
	16/9,  // 10 - A#/Bb, G
	15/8,  /* 11 - B,     G#/Ab */ ];

function modHelper(off, deg, arr, mf, af) {
	var a = off + deg;
	var b = a % arr.length;
	var c = Math.floor(a / arr.length);
	var d = mf(c);
	return  af(d, arr[b]);
}

// TODO need to name the notes first
function getFrequencyRatio(key, note) { return modHelper(key, note, chromatic, (c => Math.pow(2, c)), ((d, b) => d * b)); }

// TODO display circle of fifths
// TODO allow to call functions
function brightenKeyUp    (key) { return key + 7; }
function brightenKeyDown  (key) { return key - 5; }
function darkenKeyUp      (key) { return key + 5; }
function darkenKeyDown    (key) { return key - 7; }
// TODO display chromatic circle
// TODO allow to call functions
function brightenKeyUp1   (key) { return key + 2; }
function brightenKeyDown1 (key) { return key - 2; }
function darkenKeyUp1     (key) { return key + 1; }
function darkenKeyDown1   (key) { return key - 1; }

function getRange(center) { return range(center - chromatic.length, center + chromatic.length); }

// TODO
var ranges = {
	// "infra"   : ,
	"bass"    : getRange(-24),
	"baritone": getRange(-12,), // ?
	"tenor"   : range(), // ?
	"alto"    : range(-24, 0),
	"soprano" : range(-12, 12),
	"super"   : range(), };
var rangesFrequencyRatios = Object.keys(ranges).forEach((x) => getFrequencyRatio(key, x));
var rangesFrequencies     = Object.keys(ranges).forEach((x) => getFrequency     (key, x));

// TODO display constellation (5 ticks, 3 spokes)
// TODO allow to play tetrachord ascending/descending
var tetrachords = {
	"major"       : [2, 2, 1],
	"minor"       : [2, 1, 2],
	"upper_minor" : [1, 2, 2],
	"harmonic"    : [1, 3, 1], };
function createScale (t1, t2) { return tetrachords[t1].concat(2, tetrachords[t2]); }
var tetrachords_lower = [
	[3, 2, 1], // 0
	[3, 1, 2], // 1
	[2, 2, 2], // 2
	[1, 3, 2], // 3
	[2, 1, 3], // 4
	[1, 2, 3], /* 5 */ ];
var tetrachords_upper = [
	[3, 1, 1], // 0
	[2, 2, 1], // 1
	[1, 3, 1], // 2
	[2, 1, 2], // 3
	[1, 2, 2], // 4
	[1 ,1, 3], /* 5 */ ];
// TODO display constellation (12 ticks, 7 spokes)
// TODO allow to play scale ascending/descending
function createScale1(t1, t2) { return tetrachords_lower[t1].concat(1, tetrachords_upper[t2]); }
function createScale2(t1, t2) { return tetrachords_upper[t1].concat(1, tetrachords_lower[t2]); }
var scales7 = {
	"lydian"           : createScale1(2, 1),
	"ionian"           : createScale ("major",       "major"),
	"mixolydian"       : createScale ("major",       "minor"),
	"dorian"           : createScale ("minor",       "minor"),
	"aeolian"          : createScale ("minor",       "upper_minor"),
	"phrygian"         : createScale ("upper_minor", "upper_minor"),
	"locrian"          : createScale2(4, 2),
	"harmonic_minor"   : createScale ("minor",       "harmonic"),
	"melodic_minor"    : createScale ("minor",       "major"),
	"harmonic_major"   : createScale ("major",       "harmonic"),
	"melodic_major"    : createScale ("major",       "upper_minor"),
	"neopolitan_minor" : createScale ("upper_minor", "harmonic"),
	"neopolitan_major" : createScale ("upper_minor", "major"),
	"byzantine"        : createScale ("harmonic",    "harmonic"),
	"hungarian_minor"  : createScale1(4, 2),
	"hungarian_major"  : createScale1(1, 3),
};
var trichords = {
	"ryukyu"       : [4, 1],
	"min-yo"       : [3, 2],
	"ritsu"        : [2, 3],
	"miyako-bushi" : [1, 4], };
var trichords1 = [
	[2, 2], /* 0 */ ];
// TODO display constellation (12 ticks, 5 spokes)
// TODO allow to play scale ascending/descending
function createScale3(t1, t2) { return trichords [t1].concat(2, trichords [t2]); }
function createScale4(t1, t2) { return trichords1[t1].concat(3, trichords [t2]); }
function createScale5(t1, t2) { return trichords [t1].concat(3, trichords1[t2]); }
var scales5 = {
	"major_pentatonic" : createScale4(0,              "ritsu"),        // ionian
	"blues_major"      : createScale3("ritsu",        "ritsu"),        // mixolydian
	"egyptian"         : createScale3("ritsu",        "min-yo"),       // dorian
	"minor_pentatonic" : createScale3("min-yo",       "min-yo"),       // aeolian
	"blues_minor"      : createScale5("min-yo",       0),              // phrygian
	"ryukyu"           : createScale3("ryukyu",       "ryukyu"),       // ionian?
	"miyako-bushi"     : createScale3("miyako-bushi", "miyako-bushi"), /* phrygian dominant */ };

var getNote(scale, mode, degree) { return modHelper(mode, degree, scale, (b => b * scale.length), ((c, a) => c + a)); }
function getFrequencyFromDegree(key, scale, mode, degree) { return getFrequency(getNote(scale, mode, degree), key); }

function modeHelper(key, mode, arr, off1, off2) {
	var a = mode + off1;
	var b = Math.floor(a / arr.length);
	var c = a % arr.length;
	return  (key + off2 * b, c);
}
// TODO display mode reflection diagram and circle of modes
// TODO allow to change mode
// TODO allow to play mode
function brightenModeUp  (key, mode, arr) { return modeHelper(key, mode, arr, +(Math.floor(arr.length / 2), +1); }
function darkenModeDown  (key, mode, arr) { return modeHelper(key, mode, arr, -(Math.floor(arr.length / 2), -1); }
function brightenModeDown(key, mode, arr) { return modeHelper(key, mode, arr, -(Math.ceil (arr.length / 2), +1); }
function darkenModeUp    (key, mode, arr) { return modeHelper(key, mode, arr, +(Math.ceil (arr.length / 2), -1); }

// TODO display pitch axis diagram
var functions = Object.freeze([
	"tonic",       // 0
	"subdominant", // 1
	"dominant",    /* 2 */ ]);
function getPitchAxis(mode, degree) { return modHelper(mode, degree, functions, (b => 0), ((c, a) => a)); }

var intervalNames = [
	{ 1: "P",
		  2: "d" },	//	//	//	//	//	//	//  0 - P1
	{ 1: "A",
		  2: "m" },	//	//	//	//	//	//	//  1 - m2
		{ 2: "M",
			  3: "d" },	//	//	//	//	//	//  2 - M2
		{ 2: "A",
			  3: "m" },	//	//	//	//	//	//  3 - m3
			{ 3: "M",
				  4: "d" },	//	//	//	//	//  4 - M3
			{ 3: "A",
				  4: "P" },	//	//	//	//	//  5 - P4
				{ 4: "A",
					  5: "d" },	//	//	//	//  6 - A4/d5
					{ 5: "P",
						  6 : "d" },	//	//	//  7 - P5
					{ 5: "A",
						  6: "m" },	//	//	//  8 - m6
						{ 6: "M",
							  7: "d" },	//	//  9 - M6
						{ 6: "A",
							  7: "m" },	//	// 10 - m7
							{ 7: "M",
								  8: "d" },	/* 11 - M7 */ ];
var extendedIntervalNames = [
	{ 7: "A",
		  8: "P",
			  9: "d" },	//	//	//	//	//	//	// 12,  0 - P1,    P8
		{ 8: "A",
			  9: "m" },	//	//	//	//	//	//	// 13,  1 - m2,    m9
			{ 9: "M",
				  10: "d" },	//	//	//	//	//	// 14,  2 - M2,    M9
			{ 9: "A",
				  10: "m" },	//	//	//	//	//	// 15,  3 - m3,    m10
				{ 10: "M",
					  11: "d" },	//	//	//	//	// 16,  4 - M3,    M10
				{ 10: "A",
					  11: "P" },	//	//	//	//	// 17,  5 - P4,    P11
					{ 11: "A",
						  12: "d" },	//	//	//	// 18,  6 - A4/d5, A11/d12
						{ 12: "P",
							  13: "d" },	//	//	// 19,  7 - P5,    P12
						{ 12: "A",
							  13: "m" },	//	//	// 20,  8 - m6,    m13
							{ 13: "M",
								  14: "d" },	//	// 21,  9 - M6,    M13
							{ 13: "A",
								  14: "m" },	//	// 22, 10 - m7,    m14
								{ 14: "M",
									  15: "d" },	/* 23, 11 - M7,    M14 */ ];
		
function nameIntervals(scale, mode) {
	for (var k = 0, absInterval = 0; k < scale.length; k++) {
		var index           = (k + mode) % scale.length;
		var relInterval     = scale[index];
		absInterval        += relInterval;
		var intervalNameTmp = intervalNames[absInterval];
		var indexName       = index + 1; // TODO
		var intervalName    = intervalNameTmp[indexName];
	}
}



var key  = 0;
var mode = 0; // TODO polytonality
var scale = scale7["ionian"]; // collection of intervals

var noteFunctions = scale.map(degree => (getNote(mode, degree), getPitchAxis(mode, degree)));



// TODO get all chords in key
var chords = {
	
};

// TODO display chord diagrams
// TODO allow to play chords


// TODO neo-reimannian voice leading

// TODO chord progression






// TODO
// phrase - ~4 sentences
// - antecedant
// - consequent

// motif - some collection of chromatic notes?
// repetition, variation, contrast

// song structure

// pop
// intro   - 1 phrase  (catchy hook or motif or leitmotif)
// verse 1 - 2 phrases (exposition)
// verse 2 - 2 phrases (end quietly, rising action)
// pre     - 1 phrase  (end quietly)
// chorus  - 2 phrases (loud, summary)
// verse 3 - 2 phrases (end quietly, climax)
// pre     - 1 phrase  (end quietly)
// chorus  - 2 phrases (loud, summary)
// bridge  - 2 phrases (end quietly, re-presenting material from verse or chorus possibly in a "different light")
// chorus  - 2 phrases (loud, summary)
// outro   - 1 phrase

// 32-bar
// verse 1 - 2 phrases
// verse 2 - 2 phrases
// bridge  - 2 phrases
// verse 3 - 2 phrases

// var song_structure = // one of 32-bar, pop, 12-bar



var feet = {
	"spondee"     : [true,  true],
	"trochee"     : [true,  false],
	"iamb"        : [false, true],
	"pyrrhus"     : [false, false],
	"molossus"    : [true,  true,  true],
	"antibaccius" : [true,  true,  false],
	"cretic"      : [true,  false, true],
	"dactyl"      : [true,  false, false],
	"baccius"     : [false, true,  true],
	"amphibrach"  : [false, true,  false],
	"anapaest"    : [false, false, true],
	"tribrach"    : [false, false, false], };
var feet_variations = {
	"spondee"     : ["trochee", "iamb",        "molossus",    "antibaccius", "cretic",     "baccius"],
	"trochee"     : ["spondee", "pyrrhus",     "antibaccius", "cretic",      "dactyl",     "amphibrach"],
	"iamb"        : ["spondee", "pyrrhus",     "cretic",      "baccius",     "amphibrach", "anapaest"],
	"pyrrhus"     : ["trochee", "iamb",        "dactyl",      "amphibrach",  "anapaest",   "tribrach"],
	"molossus"    : ["spondee", "antibaccius", "cretic",      "baccius"],
	"antibaccius" : ["spondee", "trochee",     "molossus",    "dactyl",      "amphibrach"],
	"cretic"      : ["trochee", "iamb",        "molossus",    "dactyl",      "anapaest"],
	"dactyl"      : ["iamb",    "pyrrhus",     "antibaccius", "cretic",      "tribrach"],
	"baccius"     : ["spondee", "iamb",        "molossus",    "amphibrach",  "anapaest"],
	"amphibrach"  : ["trochee", "iamb",        "antibaccius", "baccius",     "tribrach"],
	"anapaest"    : ["iamb",    "pyrrhus",     "cretic",      "baccius",     "tribrach"],
	"tribrach"    : ["pyrrhus", "dactyl",      "amphibrach",  "anapaest"],
};
var feet_contrasts = {
	"spondee"     : ["pyrrhus", "dactyl",   "amphibrach",  "anapaest",    "tribrach"],
	"trochee"     : ["iamb",    "molossus", "baccius",     "anapaest",    "tribrach"],
	"iamb"        : ["trochee", "molossus", "antibaccius", "dactyl",      "tribrach"],
	"pyrrhus"     : ["spondee", "molossus", "antibaccius", "cretic",      "baccius"],
	"molossus"    : ["trochee", "iamb",     "pyrrhus",     "dactyl",      "amphibrach",  "anapaest",   "tribrach"],
	"antibaccius" : ["iamb",    "pyrrhus",  "cretic",      "baccius",     "anapaest",    "tribrach"],
	"cretic"      : ["spondee", "pyrrhus",  "antibaccius", "cretic",      "baccius",     "amphibrach", "tribrach"],
	"dactyl"      : ["spondee", "iamb",     "molossus",    "baccius",     "amphibrach",  "anapaest"],
	"baccius"     : ["trochee", "pyrrhus",  "antibaccius", "cretic",      "dactyl",      "tribrach"],
	"amphibrach"  : ["spondee", "pyrrhus",  "molossus",    "cretic",      "dactyl",      "amphibrach", "anapaest"],
	"anapaest"    : ["spondee", "trochee",  "molossus",    "antibaccius", "dactyl",      "amphibrach"],
	"tribrach"    : ["spondee", "trochee",  "iamb",        "molossus",    "antibaccius", "cretic",     "baccius"],
}
// meter - some collection of rhythms? to approximate polymeter, 2-8 feet
// rhythm - accent pattern should match poetic meter

// parts that are in vocal ranges should have rhythms that match poetic meter

var emotions = { // ranges in BPM
	"simple_task"  : [ 60,  80],
	"anger"        : [ 75, 150],
	"relaxation"   : [ 50,  70],
	"appreciation" : [ 60,  80],
	"funny"        : [100, 110],
	"scared"       : [120, 120],
	"sad"          : [ 70,  80],
	"normal"       : [ 75, 100], };
var brainwaves = { // ranges in Hz
	"epsilon" : [             100, Number.MAX_VALUE],
	"gamma"   : [              30,               90],
	"beta"    : [              12,               38],
	"alpha"   : [               8,               12],
	"theta"   : [               4,                8],
	"delta"   : [              .5,                4],
	"lambda"  : [Number.MIN_VALUE,               .5], };

// TODO gradual ebb&flow of tempo is most relaxing
// TODO use heart-like drum for emotional BPM

// TODO binaural
// - carrier frequency:     20hz  - 1500hz
// - entrainment frequency:  ?    -   40hz
// - carrier rhythm:        60bpm -  120bpm
// TODO play brainwave infrasound drone
// TODO play brainwave isochronic using solfeggio/bf(?) carrier






var data = []

function setBaseFrequency() {
	var bf = document.getElementById("bf_input").value;
	data.base_frequency = bf;
	drawBaseFrequency(bf);
}
function drawBaseFrequency(bf) {
	var c  = document.getElementById("bf");
	//var w = c.scrollWidth;
	//var h = c.scroolHeight;
	var w = c.width;
	var h = c.height;
	var ctx = c.getContext("2d");
	drawBaseFrequencyAxes(bf, ctx, w, h);
	// TODO oscillate from -1, 1
}
function drawBaseFrequencyAxes(bf, ctx, w, h) {
	// TODO change color
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.lineCap = "round";
	ctx.moveTo(0,0);
	ctx.lineTo(0,h);
	ctx.stroke();
	ctx.moveTo(0,h/2);
	ctx.lineTo(w,h/2);
	ctx.stroke();
	// TODO label axes
}
function drawBaseFrequencyFunction(bf, ctx, w, h) {
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.lineCap = "round";
	ctx.moveTo(0,0);
	ctx.bezierCurveTo(120,-100,200,250,250,50);
	ctx.bezierCurveTo(300,-100,350,250,430,50);
	ctx.stroke();
}
setBaseFrequency();





	var context = new AudioContext;
	console.log(context.sampleRate);
	console.log(context.destination.channelCount);
	
	
function Kick(context) {
	this.context = context;
};

Kick.prototype.setup = function() {
	this.osc = this.context.createOscillator();
	this.gain = this.context.createGain();
	this.osc.connect(this.gain);
	this.gain.connect(this.context.destination)
};

Kick.prototype.trigger = function(time) {
	this.setup();

	this.osc.frequency.setValueAtTime(150, time);
	this.gain.gain.setValueAtTime(1, time);

	this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
	this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

	this.osc.start(time);

	this.osc.stop(time + 0.5);
};

var kick = new Kick(context);
var now = context.currentTime;
//kick.trigger(now);
//kick.trigger(now + 0.5);
//kick.trigger(now + 1);

function divideMeasure (time, measure, measureLength, note) {
	var d = measureLength / note;
	var t = time + measure * measureLength;
	for (var n = 0; n < note; n++)
		kick.trigger (t + n * d);
}

var measureLength = 60 / 40 * 4;
var measure = 0;
//divideMeasure (now, measure++, measureLength, 2);
//divideMeasure (now, measure++, measureLength, 3);
measure++;

function polyRhythm (time, measure, measureLength, notes) {
	for (var i = 0; i < notes.length; i++)
		divideMeasure (time, measure, measureLength, notes[i]);
}


/*for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [5, 4, 3]);
measure++;
for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [6, 5]);
measure++;*/



for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [1]);
measure++;

// TODO slow down measure
for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [16, 15]);
measure++;

for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [9, 8]);
measure++;
	
for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [6, 5]);
measure++;

for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [5, 4]);
measure++;
	
for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [4, 3]);
measure++;

for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [3, 2]);
measure++;

for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [8, 5]);
measure++;

for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [5, 3]);
measure++;

for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [16, 9]);
measure++;	

for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [15, 8]);
measure++;	

for (var c = 1; c <= 4; c++)
	polyRhythm (now, measure++, measureLength, [2, 1]);
measure++;

/*
var intervals = {
	"perfect unison" : 1/1,
	"minor second"   : 16 / 15,
	"major second"   : 9 / 8,
	"minor third"    : 6 / 5;
	"major third"    : 5 / 4;
	"perfect fourth" : 4 / 3;
	"perfect fifth"  : 3 / 2;
	"minor sixth"    : 8 / 5;
	"major sixth"    : 5 / 3;
	"minor seventh"  : 16 / 9;
	"major seventh"  : 15 / 8;
	"octave"         : 2 / 1;
};
	*/

































<!--
<script>
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var context = new AudioContext();

    function playSound(arr) {
        var buf = new Float32Array(arr.length)
        for (var i = 0; i < arr.length; i++) buf[i] = arr[i]
        var buffer = context.createBuffer(1, buf.length, context.sampleRate)
        buffer.copyToChannel(buf, 0)
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
    }

    function sineWaveAt(sampleNumber, tone) {
        var sampleFreq = context.sampleRate / tone
        return Math.sin(sampleNumber / (sampleFreq / (Math.PI*2)))
    }

    var arr = [], volume = 0.2, seconds = 0.5, tone = 441

    for (var i = 0; i < context.sampleRate * seconds; i++) {
        arr[i] = sineWaveAt(i, tone) * volume
    }

    playSound(arr)
</script>
-->




<!--
	<script>
		window.onload = init;

var context;
var bufferLoader;

function init() {
    try {
        context = new AudioContext();
    }
    catch(e) {
        alert("Web Audio API is not supported in this browser");
    }
    
    // Start loading the drum kit.
    bufferLoader = new BufferLoader(
        context,
        [
        "sounds/kick.wav",
        "sounds/snare.wav",
        "sounds/hihat.wav"
        ],
        bufferLoadCompleted  
    );

    bufferLoader.load();
}

function playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
}

// Plays Rhythm 1
function startPlayingRhythm1(bufferList) {
    var kick = bufferList[0];
    var snare = bufferList[1];
    var hihat = bufferList[2];
    
    // We'll start playing the rhythm 100 milliseconds from "now"
    var startTime = context.currentTime + 0.100;
    
    var tempo = 120; // BPM (beats per minute)
    var quarterNoteTime = 60 / tempo;

    // Play the kick drum on beats 1, 2, 3, 4
    playSound(kick, startTime);
    playSound(kick, startTime + quarterNoteTime);
    playSound(kick, startTime + 2*quarterNoteTime);
    playSound(kick, startTime + 3*quarterNoteTime);

    // Play the snare drum on beats 2, 4
    playSound(snare, startTime + quarterNoteTime);
    playSound(snare, startTime + 3*quarterNoteTime);
    
    // Play the hi-hat every 16th note.
    for (var i = 0; i < 16; ++i) {
        playSound(hihat, startTime + i*0.25*quarterNoteTime);
    }
}

// Plays Rhythm 2
function startPlayingRhythm2(bufferList) {
    var kick = bufferList[0];
    var snare = bufferList[1];
    var hihat = bufferList[2];
    
    // We'll start playing the rhythm 100 milliseconds from "now"
    var startTime = context.currentTime + 0.100;
    
    var tempo = 80; // BPM (beats per minute)
    var quarterNoteTime = 60 / tempo;

    // Play the kick drum on beats 1, 2, 3, 4
    playSound(kick, startTime);
    playSound(kick, startTime + 0.5*quarterNoteTime);	
    playSound(kick, startTime + 1.75*quarterNoteTime);
    playSound(kick, startTime + 2*quarterNoteTime);
    playSound(kick, startTime + 2.5*quarterNoteTime);
	
    // Play the snare drum on beats 2, 4
    playSound(snare, startTime + quarterNoteTime);
    playSound(snare, startTime + 3*quarterNoteTime);
    playSound(snare, startTime + 3.75*quarterNoteTime);	
    
    // Play the hi-hat every 16th note.
    for (var i = 0; i < 16; ++i) {
        playSound(hihat, startTime + i*0.25*quarterNoteTime);
    }
    playSound(hihat, startTime + 3.125*quarterNoteTime);
	
}

function bufferLoadCompleted() {
	
}
</script>
-->





	<!--
	<script>
	var context = new (window.AudioContext || window.webkitAudioContext)();
	var osc = context.createOscillator(); // instantiate an oscillator
	gainNode1 = context.createGain();
	osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
	osc.frequency.value = 432; // Hz
	osc.connect(gainNode1);
	osc.connect(context.destination); // connect it to the destination
	gainNode1.gain.value = 0.7; // 70%
	
	// We'll start playing the rhythm 100 milliseconds from "now"
	var startTime = context.currentTime + 0.100;

	var tempo = 120; // BPM (beats per minute)
	var quarterNoteTime = 60 / tempo;
	
	for (var i = 0; i < 4; ++i) {
		osc.start(startTime + i*quarterNoteTime); // start the oscillator
		osc.stop(startTime  + i*quarterNoteTime + .100);
	}
	</script>
	-->
	
	<!--
	<script>
	for (var bar = 0; bar < 2; bar++) {
		var time = startTime + bar * 8 * eighthNoteTime;
		// Play the bass (kick) drum on beats 1, 5
		playSound(kick, time);
		playSound(kick, time + 4 * eighthNoteTime);

		// Play the snare drum on beats 3, 7
		playSound(snare, time + 2 * eighthNoteTime);
		playSound(snare, time + 6 * eighthNoteTime);

		// Play the hi-hat every eighth note.
		for (var i = 0; i < 8; ++i) {
			playSound(hihat, time + i * eighthNoteTime);
		}
	}
	
	function playSound(buffer, time) {
		var source = context.createBufferSource();
		source.buffer = buffer;
		source.connect(context.destination);
		source.start(time);
	}
	</script>
	-->
	
	
	<!--
	<script>
	// TODO add cymatic image selector
	var baseFrequency = 432;
	
	// TODO select algorithm to generate scale
	var scale1 = {
		1/1, 25/24, 10/9, 9/8, 32/27, 6/5, 5/4, 4/3, 25/18, 45/32, 3/2,
		25/16, 5/3, 16/9, 9/5, 15/8, 2/1
	};
	
	// TODO select algorithm to select notes from scale1
	var scale2 = {
		0, 2, 4, 5, 7, 9, 11
	};
	
	// TODO allow multiple rhythms
	var rhythm {
		
	};
	
	// selected from scale2
	// (0, MAJOR)
	var chord {
		// 1, 3, 5
		0, 2, 4
	};
	
	var chordProgression {
		// 1, 4, 5 maj 7
		(0, MAJOR),
		(3, MAJOR),
		(4, MAJOR_SEVENTH)
	};
	
	// selected from chord
	var arppeggio {
		// 1, 2, 3, 2
		// 0, 1, 2, 1
	};
	
	// like an arppeggio, but less structured
	var melody {
		
	};
	</script>
	-->
	
	
	
	
	
	<!--<canvas id="myCanvas"
			 width="100%" height="100" style="border:1px solid #ffffff; background-color: black; z-index: 2; position: relative;">
	</canvas>-->


	<!--
	<script>
		// one context per document
		var context = new (window.AudioContext || window.webkitAudioContext)();
		var osc = context.createOscillator(); // instantiate an oscillator
		osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
		osc.frequency.value = 432; // Hz
		osc.connect(context.destination); // connect it to the destination
		osc.start(); // start the oscillator
		//osc.stop(context.currentTime + 4); // stop 2 seconds after the current time
		
		var src2 = context.createOscillator();
		src2.type = 'sine';
		src2.frequency.value = osc.frequency.value * 3.0/2.0;
		src2.connect(context.destination);
		src2.start(context.currentTime + 2);
		src2.stop(context.currentTime + 8);
		
		//C     C#      D     Eb    E     F     F# 	G	Ab	A	Bb	B	C
		//1/1   16/15   9/8   6/5   5/4   4/3   45/32	3/2	8/5	5/3 	9/5	15/8	2/1
		
		var src3 = context.createOscillator();
		src3.type = 'sine';
		src3.frequency.value = osc.frequency.value * 6.0/5.0;
		src3.connect(context.destination);
		src3.start(context.currentTime + 2);
		src3.stop(context.currentTime + 4);
		
		var src4 = context.createOscillator();
		src4.type = 'sine';
		src4.frequency.value = osc.frequency.value * 5.0/4.0;
		src4.connect(context.destination);
		src4.start(context.currentTime + 4);
		src4.stop(context.currentTime + 6);
		
		var src5 = context.createOscillator();
		src5.type = 'sine';
		src5.frequency.value = osc.frequency.value * 2;
		src5.gain.value = 100.0/2.0;
		src5.connect(context.destination);
		src5.start(context.currentTime + 6);
		src5.stop(context.currentTime + 8);
		
		var src6 = context.createOscillator();
		src6.type = 'sine';
		src6.frequency.value = osc.frequency.value * 3;
		src6.gain.value = 100.0/3.0;
		src6.connect(context.destination);
		src6.start(context.currentTime + 6);
		src6.stop(context.currentTime + 8);
		
		var src7 = context.createOscillator();
		src7.type = 'sine';
		src7.frequency.value = osc.frequency.value * 4;
		src7.gain.value = 100.0/4.0;
		src7.connect(context.destination);
		src7.start(context.currentTime + 6);
		src7.stop(context.currentTime + 8);
		
		var src8 = context.createOscillator();
		src8.type = 'sine';
		src8.frequency.value = osc.frequency.value * 5;
		src8.gain.value = 100.0/5.0;
		src8.connect(context.destination);
		src8.start(context.currentTime + 6);
		src8.stop(context.currentTime + 8);
		
		var src9 = context.createOscillator();
		src9.type = 'sine';
		src9.frequency.value = osc.frequency.value * 6;
		src9.gain.value = 100.0/6.0;
		src9.connect(context.destination);
		src9.start(context.currentTime + 6);
		src9.stop(context.currentTime + 8);
		
		var src10 = context.createOscillator();
		src10.type = 'sine';
		src10.frequency.value = osc.frequency.value + 7.83;
		src10.gain.value = 50.0;
		src10.connect(context.destination);
		src10.start(context.currentTime + 8);
		src10.stop(context.currentTime + 8 + 1 * 1.0/7.83);
		src10.start(context.currentTime + 8 + 2 * 1.0/7.83);
		src10.stop(context.currentTime + 8 + 3 * 1.0/7.83);
		src10.start(context.currentTime + 8 + 4 * 1.0/7.83);
		src10.stop(context.currentTime + 8 + 5 * 1.0/7.83);
		src10.start(context.currentTime + 8 + 6 * 1.0/7.83);
	</script>-->

