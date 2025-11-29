#!/bin/bash

echo "🚀 Starting PostgreSQL Database..."
service postgresql start

echo "⏳ Waiting 10s for Database to warm up..."
sleep 10

echo "🛠️ Creating Student User..."
# Create user 'student' with no password
su - postgres -c "psql -c \"CREATE USER student;\""
su - postgres -c "psql -c \"CREATE DATABASE college OWNER student;\""

echo "📥 Importing Data..."
# Read the SQL file
su - postgres -c "psql -d college -f /tmp/init.sql"

echo "✅ Database Ready! Starting GUI..."
# Start the Web Interface
/opt/pgweb_linux_amd64 --bind=0.0.0.0 --listen=8080 --url postgres://student@localhost:5432/college?sslmode=disable