@echo off
setlocal enabledelayedexpansion
if not exist out mkdir out
echo Compiling Java...
for /r src\main\java %%f in (*.java) do (
  set FILES=!FILES! "%%f"
)
javac -encoding UTF-8 -d out %FILES%
if errorlevel 1 (
  echo Compilation failed.
  exit /b 1
)
echo Starting server on http://localhost:8080 ...
java -cp out app.ServerMain
