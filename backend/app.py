from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
import stripe
import os
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import requests

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration (MVP - No security concerns)
app.config['SECRET_KEY'] = 'mvp-secret-key-123'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB limit
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf'}
app.config['UPLOAD_FOLDER'] = 'uploads'


# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)
bcrypt = Bcrypt(app)

# Configure Stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY', 'sk_test_your_stripe_key')

#Receipt model
class Receipt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    filepath = db.Column(db.String(500), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    wallet = db.relationship('Wallet', backref='user', uselist=False, cascade='all, delete-orphan')
    transactions = db.relationship('Transaction', backref='user', lazy=True)

class Wallet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    balance = db.Column(db.Float, default=0.0)
    currency = db.Column(db.String(3), default='USD')
    stripe_customer_id = db.Column(db.String(255), unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    wallet_id = db.Column(db.Integer, db.ForeignKey('wallet.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    transaction_type = db.Column(db.String(20), nullable=False)  # 'deposit', 'withdrawal', 'transfer'
    status = db.Column(db.String(20), default='pending')  # 'pending', 'completed', 'failed'
    stripe_payment_intent_id = db.Column(db.String(255))
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Backend is running'})

# User routes (simplified - no JWT)
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not all(k in data for k in ['email', 'password', 'first_name', 'last_name']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 409
    
    # Hash password
    password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    
    # Create user
    user = User(
        email=data['email'],
        password_hash=password_hash,
        first_name=data['first_name'],
        last_name=data['last_name']
    )
    
    db.session.add(user)
    db.session.commit()
    
    # Create wallet for user
    wallet = Wallet(user_id=user.id)
    db.session.add(wallet)
    db.session.commit()
    
    # Create Stripe customer
    try:
        customer = stripe.Customer.create(
            email=user.email,
            name=f"{user.first_name} {user.last_name}"
        )
        wallet.stripe_customer_id = customer.id
        db.session.commit()
    except Exception as e:
        print(f"Stripe customer creation failed: {e}")
    
    return jsonify({
        'message': 'User registered successfully',
        'user': {
            'id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name
        }
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not all(k in data for k in ['email', 'password']):
        return jsonify({'error': 'Missing email or password'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not bcrypt.check_password_hash(user.password_hash, data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    return jsonify({
        'message': 'Login successful',
        'user': {
            'id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name
        }
    })

@app.route('/api/auth/profile', methods=['GET'])
def get_profile():
    # For MVP, just return a mock profile
    user_id = request.args.get('user_id', 1)
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'id': user.id,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'created_at': user.created_at.isoformat()
    })

# Wallet routes (simplified - no JWT required)
@app.route('/api/wallet', methods=['GET'])
def get_wallet():
    user_id = request.args.get('user_id', 1)
    wallet = Wallet.query.filter_by(user_id=user_id).first()
    
    if not wallet:
        return jsonify({'error': 'Wallet not found'}), 404
    
    return jsonify({
        'id': wallet.id,
        'balance': wallet.balance,
        'currency': wallet.currency,
        'created_at': wallet.created_at.isoformat(),
        'updated_at': wallet.updated_at.isoformat()
    })

@app.route('/api/wallet/withdraw', methods=['POST'])
def withdraw():
    user_id = request.args.get('user_id', 1)
    data = request.get_json()
    
    if not data or 'amount' not in data:
        return jsonify({'error': 'Amount is required'}), 400
    
    amount = float(data['amount'])
    if amount <= 0:
        return jsonify({'error': 'Amount must be positive'}), 400
    
    wallet = Wallet.query.filter_by(user_id=user_id).first()
    if not wallet:
        return jsonify({'error': 'Wallet not found'}), 404
    
    if wallet.balance < amount:
        return jsonify({'error': 'Insufficient balance'}), 400
    
    # Create transaction record
    transaction = Transaction(
        user_id=user_id,
        wallet_id=wallet.id,
        amount=amount,
        transaction_type='withdrawal',
        status='completed',
        description=data.get('description', 'Wallet withdrawal')
    )
    
    # Update wallet balance
    wallet.balance -= amount
    
    db.session.add(transaction)
    db.session.commit()
    
    return jsonify({
        'message': 'Withdrawal successful',
        'new_balance': wallet.balance,
        'transaction_id': transaction.id
    })

@app.route('/api/wallet/transactions', methods=['GET'])
def get_transactions():
    user_id = request.args.get('user_id', 1)
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    transactions = Transaction.query.filter_by(user_id=user_id)\
        .order_by(Transaction.created_at.desc())\
        .paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        'transactions': [{
            'id': t.id,
            'amount': t.amount,
            'transaction_type': t.transaction_type,
            'status': t.status,
            'description': t.description,
            'created_at': t.created_at.isoformat()
        } for t in transactions.items],
        'total': transactions.total,
        'pages': transactions.pages,
        'current_page': page
    })

from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from datetime import datetime
import os

# Assume db, Wallet, Transaction, Receipt, allowed_file, and app are already defined

# Extract the deposit logic into a helper function
def deposit_funds(user_id, amount, description="Test wallet deposit"):
    if amount <= 0:
        return {"error": "Amount must be positive"}, 400

    wallet = Wallet.query.filter_by(user_id=user_id).first()
    if not wallet:
        return {"error": "Wallet not found"}, 404

    # Create transaction record
    transaction = Transaction(
        user_id=user_id,
        wallet_id=wallet.id,
        amount=amount,
        transaction_type='deposit',
        status='completed',
        description=description
    )

    # Update wallet balance
    wallet.balance += amount
    wallet.updated_at = datetime.utcnow()

    db.session.add(transaction)
    db.session.commit()

    return {
        "message": "Deposit successful",
        "new_balance": wallet.balance,
        "transaction_id": transaction.id
    }, 200


@app.route('/api/wallet/deposit', methods=['POST'])
def deposit_test():
    """Test deposit function that bypasses Stripe - for development only"""
    user_id = int(request.args.get('user_id', 1))
    data = request.get_json()

    if not data or 'amount' not in data:
        return jsonify({"error": "Amount is required"}), 400

    amount = float(data['amount'])
    result, status = deposit_funds(user_id, amount, data.get('description'))
    return jsonify(result), status


@app.route('/api/upload', methods=['POST'])
def upload_receipt():
    user_id = int(request.args.get('user_id', 1))
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Save to DB
        new_receipt = Receipt(filename=filename, filepath=filepath)
        db.session.add(new_receipt)
        db.session.commit()

        # Directly call deposit function without HTTP
        result, status = deposit_funds(
            user_id=user_id,  
            amount=50.00,
            description=f"Deposit for receipt {filename}"
        )

        return jsonify({
            "message": "File uploaded successfully",
            "filename": filename,
            "deposit_result": result
        }), status

    else:
        return jsonify({'error': 'Invalid file type'}), 400


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
