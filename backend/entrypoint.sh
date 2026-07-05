#!/bin/sh
# Parse Render's DATABASE_URL and convert to Spring Boot JDBC format
# Render DATABASE_URL formats:
#   External: postgres://user:pass@host:port/dbname
#   Internal: postgres://host/dbname (no credentials, use DATABASE_USER/DATABASE_PASS)
# This script handles both formats robustly.

echo "=== DATABASE_URL Parser Debug ==="
echo "DATABASE_URL is set: $([ -n "$DATABASE_URL" ] && echo 'YES' || echo 'NO')"

if [ -n "$DATABASE_URL" ]; then
  # Strip the postgres:// or postgresql:// prefix
  URL_BODY=$(echo "$DATABASE_URL" | sed -E 's|^postgres(ql)?://||')
  echo "URL_BODY after stripping prefix: ${URL_BODY}"

  # Check if URL contains @ (user:pass@host format)
  if echo "$URL_BODY" | grep -q '@'; then
    # Format: user:pass@host:port/dbname
    USERPASS=$(echo "$URL_BODY" | sed 's|@.*||')
    HOSTPORT_DB=$(echo "$URL_BODY" | sed 's|.*@||')
    DBUSER=$(echo "$USERPASS" | sed 's|:.*||')
    DBPASS=$(echo "$USERPASS" | sed 's|[^:]*:||')
    echo "Extracted from URL - USER: ${DBUSER}, PASS: [hidden]"
  else
    # Format: host:port/dbname (no credentials in URL)
    HOSTPORT_DB="$URL_BODY"
    DBUSER="${DATABASE_USER:-${DB_USER:-postgres}}"
    DBPASS="${DATABASE_PASS:-${DB_PASSWORD:-postgres}}"
    echo "No @ in URL, using env vars - USER: ${DBUSER}"
  fi

  # Extract host:port and dbname from HOSTPORT_DB
  # HOSTPORT_DB could be: host:port/dbname, host/dbname, or just host
  DBNAME=$(echo "$HOSTPORT_DB" | sed -E 's|^[^/]+/||')
  HOSTPORT=$(echo "$HOSTPORT_DB" | sed 's|/.*||')

  # If no dbname found, default
  if [ -z "$DBNAME" ]; then
    DBNAME="electiondb"
  fi

  # Extract host and port
  if echo "$HOSTPORT" | grep -q ':'; then
    HOST=$(echo "$HOSTPORT" | sed 's|:.*||')
    PORT=$(echo "$HOSTPORT" | sed 's|.*:||')
  else
    HOST="$HOSTPORT"
    PORT="5432"
  fi

  export SPRING_DATASOURCE_URL="jdbc:postgresql://${HOST}:${PORT}/${DBNAME}"
  export SPRING_DATASOURCE_USERNAME="${DBUSER}"
  export SPRING_DATASOURCE_PASSWORD="${DBPASS}"

  echo "Final JDBC URL: ${SPRING_DATASOURCE_URL}"
  echo "Final DB User: ${SPRING_DATASOURCE_USERNAME}"
  echo "=== End Parser Debug ==="
fi

exec java -jar app.jar --spring.profiles.active=prod
