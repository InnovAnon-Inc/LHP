function Stats () {
	// need to represent the distro
	// and make it scale properly between universes
	this.str = null;
	// ...
}

function Meters () {
	this.hp = null;
	this.mp = null;
	//this.xp = null;
	this.rest   = null;
	this.hunger = null;
}

function Elements () {
	// tolerance range?
	// need to represent the distro
	this.air = null;
	// ...
}

function Map () {
	this.matrix = null;
	//new Array [x][y][z];
	int dimension;
}

function Body () {
	this.stats = new Stats ();
	this.elements = new Elements ();
	// TODO represent position in 4-space
	this.position = null;
	this.name = null;
}

function Player () {
	this.body = new Body ();
	this.ghost = null;
	this.gateway = 0.01;
}

function createGhost (body) {
	var ghost = new Body (body);
	decreaseMP (body.mp);
	return ghost;
}

// TODO account for other species' mono-parent, etc
function breed (body, body) {
	// TODO combine stats from bodies
	var baby = new Body ();
	return baby;
}






function mergeBodies (body, ghost) {
	// TODO make body and ghost stats, etc, approach each other slowly
}

// xp to mp
// stats to mp
// hp to mp

