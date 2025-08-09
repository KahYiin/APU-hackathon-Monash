# manual_query.py
from app import app, db 
from sqlalchemy import text

with app.app_context():
    sql = text("SELECT id, email, first_name, last_name FROM user")
    result = db.session.execute(sql)

    print("=== All Users ===")
    for row in result:
        print(f"ID: {row.id}, Email: {row.email}, Name: {row.first_name} {row.last_name}")

    
