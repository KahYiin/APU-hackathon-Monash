#!/usr/bin/env python3
"""
Run script for the Flask application
"""

import os
from app import app, db

if __name__ == '__main__':
    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()
        print("Database tables created/verified")
    
    # Run the application
    print("Starting Flask application...")
    print("Server will be available at: http://localhost:5000")
    print("API endpoints available at: http://localhost:5000/api")
    print("Press Ctrl+C to stop the server")
    
    app.run(
        debug=True,
        host='0.0.0.0',
        port=5000
    )
