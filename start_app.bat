@echo off
setlocal

REM --- Start Docker Desktop (if not running) ---
echo Checking if Docker Desktop is running...
tasklist /FI "IMAGENAME eq Docker Desktop.exe" | find /I "Docker Desktop.exe" >nul
if %ERRORLEVEL% neq 0 (
    echo Starting Docker Desktop...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo Waiting for Docker to start...
    timeout /t 5 >nul
) else (
    echo Docker Desktop is already running.
)

REM --- Start PostgreSQL container ---
echo Starting PostgreSQL container...
docker-compose up -d db

REM --- Wait for PostgreSQL to be ready ---
echo Waiting for PostgreSQL to be ready...
timeout /t 5 >nul

REM --- Open new Command Prompt for Backend ---
echo Opening backend terminal...
start cmd /k "cd managex && python manage.py runserver"

REM --- Open new Command Prompt for Frontend ---
echo Opening frontend terminal...
start cmd /k "cd managex-ui && npm start"

echo.
echo All services started!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.

endlocal
