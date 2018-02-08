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
}

function compareArrays (a, b) {
  // TODO: optimize
  return JSON.stringify(a) === JSON.stringify(b);
}

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

function Rhythm (nbeat, npulse, mode) {
	//nbeat  = Math.max (1, Math.floor (nbeat));
	//npulse = Math.max (1, Math.floor (npulse));
	//mode  = Math.floor (mode);
	this.euclid = euclideanRhythm (nbeat, npulse).rotate (mode);
	this.i = 0;
}
Rhythm.prototype.next () {
	this.i = (this.i + 1) % this.euclid.length;
};
Rhythm.prototype.isPulse () {
	return this.euclid[this.i];
};
Rhythm.prototype.beat () {
	var ret = this.isPulse ();
	this.next ();
	return ret;
};
