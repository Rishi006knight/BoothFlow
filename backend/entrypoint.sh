#!/bin/sh
# Convert Render's DATABASE_URL format to Spring JDBC format
# Render gives: postgres://user:pass@host:port/dbname
# Spring needs: jdbc:postgresql://host:port/dbname
if [ -n "$DATABASE_URL" ]; then
  # Extract the part after the protocol
  URL_BODY=$(echo "$DATABASE_URL" | sed 's|^postgres://\||postgresql://\||' | sed 's|^postgresql://||')
  export SPRING_DATASOURCE_URL="jdbc:postgresql://${URL_BODY}"
  echo "Converted DATABASE_URL to JDBC format"
fi

exec java -jar app.jar --spring.profiles.active=prod
