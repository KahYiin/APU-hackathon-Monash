#!/usr/bin/env python3
"""
Simple wallet testing script
Shows how to add money to your wallet for testing
"""

import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_wallet_flow():
    """Test the complete wallet flow"""
    
    print("=== WALLET TESTING ===")
    
    # Step 1: Login (or register if needed)
    print("\n1. LOGIN")
    login_data = {
        "email": "test@example.com",
        "password": "password123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        token = response.json().get('access_token')
        print("Login successful!")
    else:
        # Try to register first
        print("Login failed, trying to register...")
        register_data = {
            "email": "test@example.com",
            "password": "password123",
            "first_name": "Test",
            "last_name": "User"
        }
        response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
        if response.status_code == 201:
            token = response.json().get('access_token')
            print("Registration successful!")
        else:
            print("Failed to authenticate")
            return
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Step 2: Check wallet balance
    print("\n2. CHECK WALLET BALANCE")
    response = requests.get(f"{BASE_URL}/wallet", headers=headers)
    wallet_data = response.json()
    print(f"Current balance: ${wallet_data.get('balance', 0)}")
    
    # Step 3: Create a deposit
    print("\n3. CREATE DEPOSIT")
    deposit_data = {
        "amount": 100.00,
        "description": "Test deposit"
    }
    
    response = requests.post(f"{BASE_URL}/wallet/deposit", json=deposit_data, headers=headers)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        deposit_response = response.json()
        print("Payment intent created successfully!")
        print(f"Client Secret: {deposit_response.get('client_secret', '')[:30]}...")
        print(f"Transaction ID: {deposit_response.get('transaction_id')}")
    else:
        print("Failed to create deposit")
        return
    
    # Step 4: Show transaction history
    print("\n4. TRANSACTION HISTORY")
    response = requests.get(f"{BASE_URL}/wallet/transactions", headers=headers)
    transactions = response.json()
    
    print(f"Total transactions: {transactions.get('total', 0)}")
    for tx in transactions.get('transactions', [])[:3]:  # Show last 3
        print(f"  - ${tx.get('amount')} ({tx.get('transaction_type')}) - {tx.get('status')}")
    
    # Step 5: Show how to manually add funds
    print("\n5. HOW TO ADD FUNDS MANUALLY")
    print("For testing purposes, you can manually update the database:")
    print("1. Open the SQLite database: app.db")
    print("2. Run this SQL command:")
    print("   UPDATE wallet SET balance = balance + 100.00 WHERE user_id = 1;")
    print("3. Update transaction status:")
    print("   UPDATE transaction SET status = 'completed' WHERE id = 1;")
    
    print("\n=== TEST COMPLETE ===")
    print("Your wallet is ready for testing!")

if __name__ == "__main__":
    test_wallet_flow()
