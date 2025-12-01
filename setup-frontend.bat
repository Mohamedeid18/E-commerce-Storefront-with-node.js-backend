@echo off
REM Script to copy necessary files to React project
REM Run this from the DEBI-API-main directory

REM Set your React project path
set REACT_PROJECT_PATH=C:\Users\msi\Videos\react 2\projects-react\product\shopping

echo.
echo ========================================
echo   Frontend Integration Setup
echo ========================================
echo.

REM Create services directory if it doesn't exist
echo Creating services directory...
if not exist "%REACT_PROJECT_PATH%\src\services" mkdir "%REACT_PROJECT_PATH%\src\services"

REM Copy API service file
echo Copying API service file...
copy /Y frontend-api-service.js "%REACT_PROJECT_PATH%\src\services\api.js"

REM Copy .env example
echo Copying environment variables...
copy /Y frontend.env.example "%REACT_PROJECT_PATH%\.env"

REM Copy examples for reference
echo Copying component examples...
copy /Y react-components-examples.jsx "%REACT_PROJECT_PATH%\src\examples.jsx"

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Navigate to your React project
echo 2. Install dependencies if needed: npm install
echo 3. Start your React app: npm run dev
echo 4. Make sure Backend is running on http://localhost:5000
echo.
echo Read FRONTEND-INTEGRATION-GUIDE.md for detailed instructions
echo.
pause
