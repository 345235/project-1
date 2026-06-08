@echo off
cd /d "%~dp0file_explorer"

where python >nul 2>&1
if %errorlevel% == 0 (
    python app.py
    exit /b
)

where python3 >nul 2>&1
if %errorlevel% == 0 (
    python3 app.py
    exit /b
)

echo Python wurde nicht gefunden.
echo Bitte installiere Python von https://www.python.org/downloads/
pause
