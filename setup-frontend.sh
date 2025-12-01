#!/bin/bash
# Script to copy necessary files to React project
# Run this from the DEBI-API-main directory

# Set your React project path
REACT_PROJECT_PATH="C:/Users/msi/Videos/react 2/projects-react/product/shopping"

echo "🚀 Starting Frontend Integration Setup..."

# Create services directory if it doesn't exist
mkdir -p "$REACT_PROJECT_PATH/src/services"

# Copy API service file
echo "📁 Copying API service file..."
cp frontend-api-service.js "$REACT_PROJECT_PATH/src/services/api.js"

# Copy .env example
echo "📁 Copying environment variables..."
cp frontend.env.example "$REACT_PROJECT_PATH/.env"

# Copy examples for reference
echo "📁 Copying component examples..."
cp react-components-examples.jsx "$REACT_PROJECT_PATH/src/examples.jsx"

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Navigate to your React project: cd '$REACT_PROJECT_PATH'"
echo "2. Install dependencies if needed: npm install"
echo "3. Start your React app: npm run dev"
echo "4. Make sure Backend is running on http://localhost:5000"
echo ""
echo "📖 Read FRONTEND-INTEGRATION-GUIDE.md for detailed instructions"
