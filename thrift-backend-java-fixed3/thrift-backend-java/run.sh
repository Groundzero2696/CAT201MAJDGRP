#!/usr/bin/env bash
set -e
mkdir -p out
echo "Compiling Java..."
find src/main/java -name "*.java" > sources.txt
javac -encoding UTF-8 -d out @sources.txt
echo "Starting server on http://localhost:8080 ..."
java -cp out app.ServerMain
