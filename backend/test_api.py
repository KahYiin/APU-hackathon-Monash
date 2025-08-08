#!/usr/bin/env python3
"""
Simple test script for the Flask API
Run this after starting the Flask server to test all endpoints
"""

import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_health():
    """Test health check endpoint"""
    print("Testing health check...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_register():
    """Test user registration"""
    print("Testing user registration...")
    data = {
        "email": "test@example.com",
        "password": "password123",
        "first_name": "Test",
        "last_name": "User"
    }
    response = requests.post(f"{BASE_URL}/auth/register", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 201:
        return response.json().get('access_token')
    return None

def test_login():
    """Test user login"""
    print("Testing user login...")
    data = {
        "email": "test@example.com",
        "password": "password123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 200:
        return response.json().get('access_token')
    return None

def test_profile(token):
    """Test getting user profile"""
    print("Testing get profile...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/auth/profile", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_wallet(token):
    """Test wallet operations"""
    print("Testing wallet operations...")
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get wallet balance
    print("Getting wallet balance...")
    response = requests.get(f"{BASE_URL}/wallet", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()
    
    # Test deposit (this will create a payment intent)
    print("Testing deposit...")
    deposit_data = {
        "amount": 100.00,
        "description": "Test deposit"
    }
    response = requests.post(f"{BASE_URL}/wallet/deposit", json=deposit_data, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()
    
    # Test withdrawal (this should fail if balance is 0)
    print("Testing withdrawal...")
    withdraw_data = {
        "amount": 50.00,
        "description": "Test withdrawal"
    }
    response = requests.post(f"{BASE_URL}/wallet/withdraw", json=withdraw_data, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()
    
    # Get transaction history
    print("Getting transaction history...")
    response = requests.get(f"{BASE_URL}/wallet/transactions", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def main():
    """Run all tests"""
    print("=== Flask API Test Suite ===\n")
    
    # Test health check
    test_health()
    
    # Test registration
    token = test_register()
    if not token:
        print("Registration failed, trying login...")
        token = test_login()
    
    if token:
        print(f"Token obtained: {token[:20]}...\n")
        
        # Test authenticated endpoints
        test_profile(token)
        test_wallet(token)
    else:
        print("Failed to obtain authentication token")
    
    print("=== Test Complete ===")

if __name__ == "__main__":
    main()
