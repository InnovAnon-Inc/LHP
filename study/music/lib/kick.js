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
Kick.prototype.trigger = function(time, duration) {
	this.setup();

	this.osc.frequency.setValueAtTime(this.freq, time);
	this.gain.gain.setValueAtTime(this.maxGain, time);
	this.gain.gain.exponentialRampToValueAtTime(this.maxGain / 100, time + duration);

	this.osc.start(time);
	this.osc.stop(time + duration);
};
