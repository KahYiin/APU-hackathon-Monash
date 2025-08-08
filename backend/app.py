from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
import stripe
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-this')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-this')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Configure Stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY', 'sk_test_your_stripe_key')

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

# User routes
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
    
    # Generate token
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'message': 'User registered successfully',
        'access_token': access_token,
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
    
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'message': 'Login successful',
        'access_token': access_token,
        'user': {
            'id': user.id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name
        }
    })

@app.route('/api/auth/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
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

# Wallet routes
@app.route('/api/wallet', methods=['GET'])
@jwt_required()
def get_wallet():
    user_id = get_jwt_identity()
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

@app.route('/api/wallet/deposit', methods=['POST'])
@jwt_required()
def deposit():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or 'amount' not in data:
        return jsonify({'error': 'Amount is required'}), 400
    
    amount = float(data['amount'])
    if amount <= 0:
        return jsonify({'error': 'Amount must be positive'}), 400
    
    wallet = Wallet.query.filter_by(user_id=user_id).first()
    if not wallet:
        return jsonify({'error': 'Wallet not found'}), 404
    
    # Create Stripe payment intent
    try:
        payment_intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),  # Convert to cents
            currency=wallet.currency.lower(),
            customer=wallet.stripe_customer_id,
            metadata={'wallet_id': wallet.id, 'user_id': user_id}
        )
        
        # Create transaction record
        transaction = Transaction(
            user_id=user_id,
            wallet_id=wallet.id,
            amount=amount,
            transaction_type='deposit',
            status='pending',
            stripe_payment_intent_id=payment_intent.id,
            description=data.get('description', 'Wallet deposit')
        )
        
        db.session.add(transaction)
        db.session.commit()
        
        return jsonify({
            'message': 'Payment intent created',
            'client_secret': payment_intent.client_secret,
            'transaction_id': transaction.id
        })
        
    except Exception as e:
        return jsonify({'error': f'Payment creation failed: {str(e)}'}), 500

@app.route('/api/wallet/confirm-payment', methods=['POST'])
@jwt_required()
def confirm_payment():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or 'payment_intent_id' not in data:
        return jsonify({'error': 'Payment intent ID is required'}), 400
    
    payment_intent_id = data['payment_intent_id']
    
    try:
        # Retrieve payment intent from Stripe
        payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        if payment_intent.status == 'succeeded':
            # Find the transaction
            transaction = Transaction.query.filter_by(
                stripe_payment_intent_id=payment_intent_id
            ).first()
            
            if not transaction:
                return jsonify({'error': 'Transaction not found'}), 404
            
            if transaction.user_id != user_id:
                return jsonify({'error': 'Unauthorized'}), 403
            
            # Update transaction status
            transaction.status = 'completed'
            
            # Update wallet balance
            wallet = Wallet.query.get(transaction.wallet_id)
            wallet.balance += transaction.amount
            
            db.session.commit()
            
            return jsonify({
                'message': 'Payment confirmed successfully',
                'new_balance': wallet.balance,
                'transaction_id': transaction.id
            })
        else:
            return jsonify({'error': 'Payment not completed'}), 400
            
    except Exception as e:
        return jsonify({'error': f'Payment confirmation failed: {str(e)}'}), 500

@app.route('/api/wallet/withdraw', methods=['POST'])
@jwt_required()
def withdraw():
    user_id = get_jwt_identity()
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
@jwt_required()
def get_transactions():
    user_id = get_jwt_identity()
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

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
