# Flask Backend MVP

A simplified Flask-based backend MVP with user management, wallet functionality, and payment processing using Stripe.

## Features

- **User Management**: Registration and login (no authentication required for MVP)
- **Wallet System**: Balance tracking, deposits, and withdrawals
- **Payment Processing**: Stripe integration for secure payments
- **Transaction History**: Complete transaction tracking
- **No Authentication**: Simple user_id parameter for MVP testing
- **Database**: SQLAlchemy with SQLite (easily configurable for PostgreSQL/MySQL)

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp env.example .env
```

Edit `.env` with your actual values:

```env
DATABASE_URL=sqlite:///app.db
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

### 3. Run the Application

```bash
python app.py
```

This will create the SQLite database and start the server on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Profile
```
GET /api/auth/profile?user_id=1
```

### Wallet Management

#### Get Wallet Balance
```
GET /api/wallet?user_id=1
```

#### Deposit Funds
```
POST /api/wallet/deposit?user_id=1
Content-Type: application/json

{
  "amount": 100.00,
  "description": "Initial deposit"
}
```

#### Withdraw Funds
```
POST /api/wallet/withdraw?user_id=1
Content-Type: application/json

{
  "amount": 50.00,
  "description": "Withdrawal"
}
```

#### Get Transaction History
```
GET /api/wallet/transactions?user_id=1&page=1&per_page=10
```

### Health Check

#### Check API Status
```
GET /api/health
```

## Database Models

### User
- `id`: Primary key
- `email`: Unique email address
- `password_hash`: Hashed password
- `first_name`: User's first name
- `last_name`: User's last name
- `created_at`: Account creation timestamp

### Wallet
- `id`: Primary key
- `user_id`: Foreign key to User
- `balance`: Current wallet balance
- `currency`: Currency code (default: USD)
- `stripe_customer_id`: Stripe customer ID
- `created_at`: Wallet creation timestamp
- `updated_at`: Last update timestamp

### Transaction
- `id`: Primary key
- `user_id`: Foreign key to User
- `wallet_id`: Foreign key to Wallet
- `amount`: Transaction amount
- `transaction_type`: Type (deposit, withdrawal, transfer)
- `status`: Status (pending, completed, failed)
- `stripe_payment_intent_id`: Stripe payment intent ID
- `description`: Transaction description
- `created_at`: Transaction timestamp

## Stripe Integration

The backend integrates with Stripe for payment processing:

1. **Customer Creation**: Each user gets a Stripe customer account
2. **Payment Intents**: Deposits create Stripe payment intents
3. **Payment Confirmation**: Payments are confirmed via webhook or manual confirmation
4. **Security**: All sensitive data is handled securely through Stripe

## Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Tokens**: Secure API authentication
- **CORS**: Cross-origin resource sharing enabled
- **Input Validation**: All inputs are validated
- **Error Handling**: Comprehensive error handling

## Development

### Adding New Features

1. Create new models in `app.py`
2. Add new routes with proper authentication
3. Update database schema if needed
4. Test endpoints thoroughly

### Database Migrations

For production, use Flask-Migrate:

```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

## Production Deployment

1. Use a production database (PostgreSQL/MySQL)
2. Set secure environment variables
3. Use a production WSGI server (Gunicorn)
4. Set up proper logging
5. Configure HTTPS
6. Set up Stripe webhooks for payment confirmation


## License

MIT License
