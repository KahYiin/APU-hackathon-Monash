#!/usr/bin/env python3
"""
Simple startup script for the Flask backend
"""

import subprocess
import sys
import os

def main():
    print("Starting Flask Backend MVP")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not os.path.exists('app.py'):
        print("app.py not found. Please run this from the backend directory.")
        sys.exit(1)
    
    # Check if requirements are installed
    try:
        import flask
        print("Flask dependencies found")
    except ImportError:
        print("Flask not found. Installing dependencies...")
        subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
    
    print(" Starting server on http://localhost:5000")
    print(" API endpoints available at http://localhost:5000/api")
    print(" Test with: python test_wallet.py")
    print(" Add funds with: python add_funds.py 1 100.00")
    print()
    print("Press Ctrl+C to stop the server")
    print("=" * 40)
    
    # Start the Flask app
    try:
        subprocess.run([sys.executable, 'app.py'])
    except KeyboardInterrupt:
        print("\n Server stopped")

if __name__ == "__main__":
    main()
