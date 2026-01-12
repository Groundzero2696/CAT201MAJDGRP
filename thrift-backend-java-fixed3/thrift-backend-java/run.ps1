$ErrorActionPreference="Stop"
if (!(Test-Path -Path "out")) { New-Item -ItemType Directory -Path "out" | Out-Null }

Write-Host "Compiling Java..."
$files = Get-ChildItem -Recurse -Filter *.java -Path "src\main\java" | ForEach-Object { $_.FullName }
javac -encoding UTF-8 -d out $files

Write-Host "Starting server on http://localhost:8080 ..."
java -cp out app.ServerMain
