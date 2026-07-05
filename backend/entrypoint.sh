#!/bin/sh
# BoothFlow entrypoint for Render deployment
# Uses H2 in-memory database (no external PostgreSQL needed)
# Render injects PORT env var - we pass it to Spring Boot

echo "=== BoothFlow Starting ==="
echo "PORT from Render: ${PORT:-not set (will use 8081)}"

# If Render provided a PORT, export it for Spring Boot's server.port
if [ -n "$PORT" ]; then
  export SERVER_PORT="$PORT"
  echo "Using SERVER_PORT=$SERVER_PORT"
fi

# Run with default profile (H2 in-memory database)
exec java -jar app.jar