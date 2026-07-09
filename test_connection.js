const dns = require('dns');
const net = require('net');

// Set DNS servers to Google and Cloudflare public DNS to bypass local/ISP DNS limitations
dns.setServers(['8.8.8.8', '1.1.1.1']);

const srvRecord = '_mongodb._tcp.cluster0.weqppum.mongodb.net';

console.log(`Performing DNS SRV lookup via public DNS (8.8.8.8) for: ${srvRecord}...`);

dns.resolveSrv(srvRecord, (err, addresses) => {
    if (err) {
        console.error(`DNS SRV Lookup failed: ${err.code} - ${err.message}`);
        console.log('\nPossible reasons:');
        console.log('1. The connection string "cluster0.weqppum.mongodb.net" is typoed or does not exist.');
        console.log('2. Your current network blocks outgoing DNS requests to public DNS servers (common on corporate networks/VPNs).');
        process.exit(1);
    }

    if (!addresses || addresses.length === 0) {
        console.error('No SRV records returned for the cluster.');
        process.exit(1);
    }

    console.log(`Found ${addresses.length} cluster shard(s):`);
    addresses.forEach((addr, index) => {
        console.log(`  Shard ${index + 1}: ${addr.name}:${addr.port}`);
    });

    // Test connection to the first shard found
    const target = addresses[0];
    console.log(`\nAttempting TCP connection to Shard 1 (${target.name}:${target.port})...`);
    
    const socket = net.createConnection(target.port, target.name, () => {
        console.log('TCP connection established successfully! The database cluster is fully reachable.');
        socket.end();
        process.exit(0);
    });

    socket.on('error', (connectErr) => {
        console.error(`Connection to shard failed: ${connectErr.message}`);
        console.log('\nThis means the DNS resolved successfully, but your connection is blocked.');
        console.log('Action needed: Log in to MongoDB Atlas, go to "Network Access", and whitelist your current IP address (or add 0.0.0.0/0).');
        process.exit(1);
    });

    socket.setTimeout(7000, () => {
        console.error('Connection timed out after 7 seconds.');
        socket.destroy();
        process.exit(1);
    });
});
