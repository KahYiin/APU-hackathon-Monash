#!/usr/bin/env python3
"""
Simple wallet testing script - No authentication required
Uses app_simple.py which has no JWT authentication
"""

import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_wallet_without_auth():
    """Test wallet functionality without authentication"""
    
    print("=== WALLET TESTING (NO AUTH) ===")
    
    # Step 1: Register a user first
    print("\n1. REGISTER USER")
    register_data = {
        "email": "test@example.com",
        "password": "password123",
        "first_name": "Test",
        "last_name": "User"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 201:
        user_data = response.json()
        user_id = user_data['user']['id']
        print(f"User registered! ID: {user_id}")
    else:
        print("Registration failed or user exists")
        # Try to get existing user
        user_id = 1
        print(f"Using default user ID: {user_id}")
    
    # Step 2: Check wallet balance
    print(f"\n2. CHECK WALLET BALANCE (User ID: {user_id})")
    response = requests.get(f"{BASE_URL}/wallet?user_id={user_id}")
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        wallet_data = response.json()
        print(f"Wallet balance: ${wallet_data.get('balance', 0)}")
        print(f"Currency: {wallet_data.get('currency', 'USD')}")
    else:
        print("Failed to get wallet")
        return
    
    # Step 3: Create a deposit
    print(f"\n3. CREATE DEPOSIT (User ID: {user_id})")
    deposit_data = {
        "amount": 100.00,
        "description": "Test deposit without auth"
    }
    
    response = requests.post(f"{BASE_URL}/wallet/deposit?user_id={user_id}", json=deposit_data)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        deposit_response = response.json()
        print("Payment intent created successfully!")
        print(f"Client Secret: {deposit_response.get('client_secret', '')[:30]}...")
        print(f"Transaction ID: {deposit_response.get('transaction_id')}")
    else:
        print(f"Failed to create deposit: {response.json()}")
        return
    
    # Step 4: Check transaction history
    print(f"\n4. TRANSACTION HISTORY (User ID: {user_id})")
    response = requests.get(f"{BASE_URL}/wallet/transactions?user_id={user_id}")
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        transactions = response.json()
        print(f"Total transactions: {transactions.get('total', 0)}")
        for tx in transactions.get('transactions', [])[:3]:
            print(f"  - ${tx.get('amount')} ({tx.get('transaction_type')}) - {tx.get('status')}")
    
    # Step 5: Try withdrawal (should fail if balance is 0)
    print(f"\n5. TEST WITHDRAWAL (User ID: {user_id})")
    withdraw_data = {
        "amount": 50.00,
        "description": "Test withdrawal"
    }
    
    response = requests.post(f"{BASE_URL}/wallet/withdraw?user_id={user_id}", json=withdraw_data)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        withdraw_response = response.json()
        print("Withdrawal successful!")
        print(f"New balance: ${withdraw_response.get('new_balance')}")
    else:
        print(f"Withdrawal failed: {response.json().get('error', 'Unknown error')}")
    
    # Step 6: Check final balance
    print(f"\n6. FINAL WALLET BALANCE (User ID: {user_id})")
    response = requests.get(f"{BASE_URL}/wallet?user_id={user_id}")
    
    if response.status_code == 200:
        final_wallet = response.json()
        print(f"Final balance: ${final_wallet.get('balance', 0)}")
    
    print("\n=== TEST COMPLETE ===")
    print("You can now test the wallet without any authentication!")

def test_multiple_users():
    """Test with multiple users"""
    print("\n=== MULTIPLE USERS TEST ===")
    
    # Register second user
    register_data = {
        "email": "user2@example.com",
        "password": "password123",
        "first_name": "User",
        "last_name": "Two"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
    if response.status_code == 201:
        user2_id = response.json()['user']['id']
        print(f"User 2 registered! ID: {user2_id}")
        
        # Check user 2's wallet
        response = requests.get(f"{BASE_URL}/wallet?user_id={user2_id}")
        if response.status_code == 200:
            wallet = response.json()
            print(f"User 2 wallet balance: ${wallet.get('balance', 0)}")
    else:
        print("Failed to register user 2")

if __name__ == "__main__":
    test_wallet_without_auth()
    test_multiple_users()
