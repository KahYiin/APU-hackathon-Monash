♻️ RecyChain – Earn-to-Recycle Platform
RecyChain is a blockchain-powered reward system that incentivizes recycling by rewarding users with RecyCoin (RC) for verified recycling actions.
Our goal: make recycling transparent, rewarding, and sustainable by combining Web2 prototypes with Web3 transparency.

🚀 Features
· Earn-to-Recycle: Users bring recyclables to verified centers or smart bins.
· Verification: IoT sensors, QR codes, or manual uploads.
· Blockchain Transparency: All recycling events are stored on-chain.
· RecyCoin Rewards: Points based on type, weight, and recyclability score.

🛠️ Tech Stack
Frontend (Prototype)
· React + Tailwind CSS
· Cafe Noir, Kombu Green, Moss Green, Tan, Bone theme

Backend (Prototype)
· Firebase (Authentication, Database)
· Flask (API Layer)

Backend (Web3)
· Solidity – Smart contracts for reward logic
· Hardhat – Contract compilation & deployment
· ethers.js – Blockchain interaction
· Alchemy RPC – Ethereum Sepolia testnet connection
· IPFS (Pinata) – Decentralized media storage
· wagmi – Wallet connection & UI hooks

📦 Setup Instructions
1️⃣ Clone the Repo
git clone https://github.com/KahYiin/APU-hackathon-Monash.git

2️⃣ Install Dependencies
npm install
cd backend

# Create venv
python -m venv venv

# Activate venv (Mac/Linux)
source venv/bin/activate

# Activate venv (Windows PowerShell)
venv\Scripts\activate

pip install -r requirements.txt
pip install flask flask_sqlalchemy flask_migrate flask_cors flask_bcrypt python-dotenv stripe

3️⃣ Environment Configuration
cp env.example .env

env
DATABASE_URL=sqlite:///app.db

4️⃣ Run the Project
python app.py
npm run dev

📜 Explaination
## API Endpoints

### Authentication

#### Register User

POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe"
}


#### Login

POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}


#### Get Profile

GET /api/auth/profile?user_id=1


### Wallet Management

#### Get Wallet Balance

GET /api/wallet?user_id=1


#### Deposit Funds

POST /api/wallet/deposit?user_id=1
Content-Type: application/json

{
  "amount": 100.00,
  "description": "Initial deposit"
}


#### Withdraw Funds

POST /api/wallet/withdraw?user_id=1
Content-Type: application/json

{
  "amount": 50.00,
  "description": "Withdrawal"
}


#### Upload image file

POST /api/upload?user_id=1


#### Get Transaction History

GET /api/wallet/transactions?user_id=1&page=1&per_page=10


### Health Check

#### Check API Status

GET /api/health


## Database Models

### User
- id: Primary key
- email: Unique email address
- password_hash: Hashed password
- first_name: User's first name
- last_name: User's last name
- created_at: Account creation timestamp

### Wallet
- id: Primary key
- user_id: Foreign key to User
- balance: Current wallet balance
- currency: Currency code (default: USD)
- stripe_customer_id: Stripe customer ID
- created_at: Wallet creation timestamp
- updated_at: Last update timestamp

### Transaction
- id: Primary key
- user_id: Foreign key to User
- wallet_id: Foreign key to Wallet
- amount: Transaction amount
- transaction_type: Type (deposit, withdrawal, transfer)
- status: Status (pending, completed, failed)
- stripe_payment_intent_id: Stripe payment intent ID
- description: Transaction description
- created_at: Transaction timestamp

### Receipt 
- id: Primary key
- filename: Name of the image file
- filepath: Path of image save in local machine's directory
- upload_date: Upload date of the file

💡 Why Web3?
Existing recycling apps track points but lack trust & transparency.
Blockchain ensures:
· Proof of Recycling (immutable records)
· No fraud in reward claims
· Interoperable rewards that can be exchanged or transferred

👥 Team Roles
· Frontend – React/Tailwind development & UI
· Backend (Web2) – Firebase & Flask APIs
· Backend (Web3) – Smart contracts, blockchain integration
· Presenter - Create presentation slides and present during demo