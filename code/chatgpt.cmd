@echo off
cd /d %~dp0
if not exist "node_modules" call first.cmd
echo starting...
call npm run start
pause
