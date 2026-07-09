import socket
import sys

host = "cluster0.weqppum.mongodb.net"
port = 27017

try:
    print(f"Resolving host {host}...")
    # MongoDB SRV host names need SRV DNS resolution. Let's also resolve the default cluster DNS or standard socket check.
    # Note: cluster0.weqppum.mongodb.net is a DNS SRV record, so the actual mongo hosts are cluster0-shard-00-00.weqppum.mongodb.net etc.
    # Let's try to resolve both.
    for h in [host, "cluster0-shard-00-00.weqppum.mongodb.net"]:
        try:
            print(f"Testing {h}...")
            ip = socket.gethostbyname(h)
            print(f"Resolved {h} to {ip}. Attempting TCP connection to port {port}...")
            s = socket.create_connection((h, port), timeout=5)
            print(f"TCP connection to {h}:{port} established successfully! Host is reachable.")
            s.close()
            sys.exit(0)
        except Exception as e:
            print(f"Failed for {h}: {e}")
    sys.exit(1)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
