#!/bin/sh
# Parse Render's DATABASE_URL and convert to Spring Boot JDBC format
# Render internal format: postgres://hostname/dbname (no user/pass in URL)
# We use DATABASE_USER and DATABASE_PASS env vars separately

if [ -n "$DATABASE_URL" ]; then
  # Extract host and database from DATABASE_URL
  # Format could be: postgres://host:port/dbname or just postgres://host
  HOST=$(echo "$DATABASE_URL" | sed 's|^postgres://||' | sed 's|/.*||')
  DBNAME=$(echo "$DATABASE_URL" | sed 's|^postgres://[^/]*/*||')
  PORT="5432"
  
  # If host contains @, extract user:pass@host
  if echo "$HOST" | grep -q '@'; then
    USERPASS=$(echo "$HOST" | sed 's|@.*||')
    HOST=$(echo "$HOST" | sed 's|.*@||')
    DBUSER=$(echo "$USERPASS" | sed 's|:.*||')
    DBPASS=$(echo "$USERPASS" | sed 's|[^:]*:||')
  else
    DBUSER="${DATABASE_USER:-postgres}"
    DBPASS="${DATABASE_PASS:-postgres}"
  fi
  
  # If host contains port, extract it
  if echo "$HOST" | grep -q ':'; then
    PORT=$(echo "$HOST" | sed 's|.*:||')
    HOST=$(echo "$HOST" | sed 's|:.*||')
  fi
  
  # If no database name specified, use default
  if [ -z "$DBNAME" ]; then
    DBNAME="electiondb"
  fi
  
  export SPRING_DATASOURCE_URL="jdbc:postgresql://${HOST}:${PORT}/${DBNAME}"
  export SPRING_DATASOURCE_USERNAME="${DBUSER}"
  export SPRING_DATASOURCE_PASSWORD="${DBPASS}"
  echo "Converted DATABASE_URL to JDBC format: ${SPRING_DATASOURCE_URL}"
fi

exec java -jar app.jar --spring.profiles.active=prod
