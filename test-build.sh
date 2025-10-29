#!/bin/bash

echo "🔧 Testing build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🏗️ Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build output in 'dist' directory"
    
    # List build output
    echo "📋 Build contents:"
    ls -la dist/
    
    echo ""
    echo "🚀 Ready for deployment!"
    echo "💡 To test locally, run: npm run preview"
else
    echo "❌ Build failed!"
    echo "🔍 Check the error messages above"
    exit 1
fi