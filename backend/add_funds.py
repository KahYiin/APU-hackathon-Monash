#!/usr/bin/env python3
"""
Simple script to add funds to a wallet for testing
"""

import sqlite3
import sys

def add_funds(email, amount):
    """Add funds to a user's wallet"""
    
    try:
        # Connect to database
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # Find user
        cursor.execute("SELECT id FROM user WHERE email = ?", (email,))
        user = cursor.fetchone()
        
        if not user:
            print(f"User {email} not found")
            return False
        
        user_id = user[0]
        
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
        
        print(f"Added ${amount} to {email}'s wallet")
        print(f"Previous balance: ${current_balance}")
        print(f"New balance: ${new_balance}")
        
        return True
        
    except Exception as e:
        print(f"Error: {e}")
        return False
    finally:
        conn.close()

def show_balance(email):
    """Show wallet balance"""
    
    try:
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT w.balance, w.currency 
            FROM wallet w 
            JOIN user u ON w.user_id = u.id 
            WHERE u.email = ?
        """, (email,))
        
        result = cursor.fetchone()
        
        if result:
            balance, currency = result
            print(f"Balance for {email}: ${balance} {currency}")
        else:
            print(f"No wallet found for {email}")
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage:")
        print("  python add_funds.py <email> <amount>")
        print("  python add_funds.py balance <email>")
        print("\nExamples:")
        print("  python add_funds.py test@example.com 100.00")
        print("  python add_funds.py balance test@example.com")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "balance":
        if len(sys.argv) < 3:
            print("Please provide email for balance check")
            sys.exit(1)
        email = sys.argv[2]
        show_balance(email)
    else:
        # Add funds
        email = sys.argv[1]
        try:
            amount = float(sys.argv[2])
        except ValueError:
            print("Amount must be a number")
            sys.exit(1)
        
        if amount <= 0:
            print("Amount must be positive")
            sys.exit(1)
        
        success = add_funds(email, amount)
        if success:
            print("Funds added successfully!")
        else:
            print("Failed to add funds")
            sys.exit(1)
