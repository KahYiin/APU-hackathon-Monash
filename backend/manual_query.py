# manual_query.py
from app import app, db  # change to your actual filename (no .py)
from sqlalchemy import text

# Make sure you're in the app context so Flask-SQLAlchemy works
with app.app_context():
    # Example: Select all users
    sql = text("SELECT id, email, first_name, last_name FROM user")
    result = db.session.execute(sql)

    print("=== All Users ===")
    for row in result:
        print(f"ID: {row.id}, Email: {row.email}, Name: {row.first_name} {row.last_name}")

    # Example: Filter by balance
    sql = text("""
        SELECT u.email, w.balance
        FROM wallet w
        JOIN user u ON w.user_id = u.id
        WHERE w.balance > :min_balance
    """)
    result = db.session.execute(sql, {"min_balance": 50})

    print("\n=== Wallets with Balance > 50 ===")
    for row in result:
        print(f"Email: {row.email}, Balance: {row.balance}")
