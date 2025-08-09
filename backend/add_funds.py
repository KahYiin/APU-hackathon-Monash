#!/usr/bin/env python3
"""
Simple script to add funds to any user's wallet
No authentication required - just specify user_id
"""

import sqlite3
import sys

def add_funds_to_user(user_id, amount):
    """Add funds to a specific user's wallet"""
    
    try:
        # Connect to database
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # Check if user exists
        cursor.execute("SELECT email FROM user WHERE id = ?", (user_id,))
        user = cursor.fetchone()
        
        if not user:
            print(f"User with ID {user_id} not found")
            return False
        
        print(f"Found user: {user[0]}")
        
        # Get current balance
        cursor.execute("SELECT balance FROM wallet WHERE user_id = ?", (user_id,))
        wallet = cursor.fetchone()
        
        if not wallet:
            print(f"Wallet not found for user {user_id}")
            return False
        
        current_balance = wallet[0]
        new_balance = current_balance + amount
        
        # Update balance
        cursor.execute("UPDATE wallet SET balance = ?, updated_at = datetime('now') WHERE user_id = ?", 
                      (new_balance, user_id))
        
        # Add transaction record
        cursor.execute("""
            INSERT INTO transaction (user_id, wallet_id, amount, transaction_type, status, description, created_at)
            VALUES (?, ?, ?, 'deposit', 'completed', ?, datetime('now'))
        """, (user_id, user_id, amount, f"Manual test deposit: ${amount}"))
        
        conn.commit()
        
        print(f"Added ${amount} to user {user_id}'s wallet")
        print(f"Previous balance: ${current_balance}")
        print(f"New balance: ${new_balance}")
        
        return True
        
    except Exception as e:
        print(f"Error: {e}")
        return False
    finally:
        conn.close()

def show_user_balance(user_id):
    """Show wallet balance for a specific user"""
    
    try:
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT w.balance, w.currency, u.email 
            FROM wallet w 
            JOIN user u ON w.user_id = u.id 
            WHERE u.id = ?
        """, (user_id,))
        
        result = cursor.fetchone()
        
        if result:
            balance, currency, email = result
            print(f"User {user_id} ({email}): ${balance} {currency}")
        else:
            print(f"No wallet found for user {user_id}")
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        conn.close()

def list_all_users():
    """List all users in the database"""
    
    try:
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        cursor.execute("SELECT id, email, first_name, last_name FROM user")
        users = cursor.fetchall()
        
        print("Available users:")
        for user in users:
            user_id, email, first_name, last_name = user
            print(f"  ID: {user_id}, Email: {email}, Name: {first_name} {last_name}")
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    print("=== WALLET FUND ADDER (NO AUTH) ===")
    
    if len(sys.argv) < 3:
        print("Usage:")
        print("  python add_funds_simple.py <user_id> <amount>")
        print("  python add_funds_simple.py balance <user_id>")
        print("  python add_funds_simple.py list-users")
        print("\nExamples:")
        print("  python add_funds_simple.py 1 100.00")
        print("  python add_funds_simple.py balance 1")
        print("  python add_funds_simple.py list-users")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "list-users":
        list_all_users()
    elif command == "balance":
        if len(sys.argv) < 3:
            print("Please provide user_id for balance check")
            sys.exit(1)
        user_id = int(sys.argv[2])
        show_user_balance(user_id)
    else:
        # Add funds
        try:
            user_id = int(sys.argv[1])
            amount = float(sys.argv[2])
        except ValueError:
            print("User ID must be a number and amount must be a number")
            sys.exit(1)
        
        if amount <= 0:
            print("Amount must be positive")
            sys.exit(1)
        
        success = add_funds_to_user(user_id, amount)
        if success:
            print("\nFunds added successfully!")
            print("You can now test withdrawals and other wallet features.")
        else:
            print("\nFailed to add funds")
            sys.exit(1)
