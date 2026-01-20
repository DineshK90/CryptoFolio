# 💰 CryptoFolio

> A modern, clean cryptocurrency portfolio tracker built with clarity and simplicity in mind.

![CryptoFolio Banner](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12.7.0-FFCA28?style=flat&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## 🌟 Features

### 📊 Portfolio Management

- **Real-time Asset Tracking** - Monitor your cryptocurrency holdings with live price updates
- **Buy/Sell Transactions** - Record purchases and sales with automatic portfolio calculations
- **Total Value Overview** - See your complete portfolio value at a glance with 24-hour change percentages
- **Multi-Asset Support** - Track multiple cryptocurrencies from a vast selection of coins

### 📈 Market Data & Analytics

- **Live Market Charts** - Interactive price charts powered by Recharts with customizable timeframes (7D, 30D, 90D)
- **CoinGecko Integration** - Real-time market data from one of the most reliable crypto APIs
- **Price Sparklines** - Quick visual indicators for each asset's recent performance
- **Historical Data** - View price trends with full date information and tooltips

### 👤 User Experience

- **Firebase Authentication** - Secure login and registration with email/password
- **Profile Customization** - Upload custom avatars or generate random ones
- **Responsive Design** - Fully mobile-optimized with hamburger menu navigation
- **Dark Theme** - Modern slate-950 dark UI that's easy on the eyes
- **Smooth Animations** - Powered by Framer Motion for delightful interactions

### 🎨 Landing Page

- **Hero Section** - Engaging introduction with live Bitcoin price preview
- **Feature Highlights** - Visual showcase of key platform capabilities
- **Comparison Section** - Color-coded benefits vs. typical trackers (green/red contrast)
- **How It Works** - Step-by-step guide for new users
- **Responsive Navigation** - Clean desktop and mobile navigation experiences

## 🚀 Tech Stack

### Frontend

- **React 19.2.0** - Latest React with modern hooks and concurrent features
- **Vite 7.2.4** - Lightning-fast build tool and dev server
- **React Router 7.12.0** - Client-side routing with protected routes
- **TailwindCSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 12.26.2** - Production-ready animation library
- **Recharts 3.6.0** - Composable charting library for data visualization
- **PropTypes 15.8.1** - Runtime type checking for React components

### Backend & Services

- **Firebase 12.7.0** - Authentication and cloud storage
- **Firebase Admin 13.6.0** - Server-side Firebase SDK
- **PostgreSQL (pg 8.16.3)** - Relational database for storing user portfolios
- **Axios 1.13.2** - Promise-based HTTP client
- **CoinGecko API** - Cryptocurrency market data

### Development Tools

- **ESLint 9.39.1** - Code linting with React-specific rules
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixing
- **Vercel** - Serverless deployment platform

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Firebase project
- Vercel account (for deployment)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/cryptofolio.git
cd cryptofolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Client Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Database Configuration (for Vercel Serverless Functions)
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# Firebase Admin SDK (for server-side)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}
```

### 4. Database Setup

Run the following SQL to create the necessary tables:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firebase_uid VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  coin_id VARCHAR(50) NOT NULL,
  quantity DECIMAL(20, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assets_user_id ON assets(user_id);
CREATE INDEX idx_assets_coin_id ON assets(coin_id);
```

### 5. Run the development server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app.

## 🏗️ Project Structure

```
cryptofolio/
├── api/                          # Vercel Serverless Functions
│   ├── assets.js                 # GET/POST user assets
│   ├── users.js                  # POST create user
│   ├── assets/
│   │   └── [id].js              # PATCH/DELETE specific asset
│   └── market/
│       └── prices.js            # GET crypto prices
├── src/
│   ├── components/
│   │   ├── auth/                # Authentication forms
│   │   ├── dashboard/           # Portfolio & chart components
│   │   ├── landing/             # Landing page sections
│   │   └── ui/                  # Reusable UI components
│   ├── context/                 # React Context (Auth)
│   ├── hooks/                   # Custom React hooks
│   ├── layouts/                 # App and public layouts
│   ├── pages/                   # Route pages
│   ├── routes/                  # Protected route wrapper
│   ├── services/                # API service functions
│   ├── utils/                   # Helper utilities
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── firebase.js              # Firebase configuration
├── public/                      # Static assets
├── index.html                   # HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── vercel.json                 # Vercel deployment config
```

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## 🔐 Authentication Flow

1. User registers/logs in via Firebase Authentication
2. Backend creates a user record in PostgreSQL (linked by Firebase UID)
3. Protected routes verify Firebase ID tokens
4. API endpoints validate tokens before database operations

## 📊 API Endpoints

### Client → Server (Vercel Functions)

- `GET /api/assets` - Fetch user's portfolio assets
- `POST /api/assets` - Add new transaction (buy/sell)
- `PATCH /api/assets/[id]` - Update specific asset
- `DELETE /api/assets/[id]` - Delete asset transaction
- `POST /api/users` - Create user record
- `GET /api/market/prices` - Fetch current crypto prices

### External APIs

- **CoinGecko API** - `https://api.coingecko.com/api/v3`
  - `/coins/markets` - Top coins by market cap
  - `/coins/{id}/market_chart` - Historical price data

## 🎨 Key Features Implementation

### Responsive Mobile Navigation

- Desktop: Horizontal nav with all options visible
- Mobile: Hamburger menu with vertical dropdown
- Smooth transitions and proper touch targets

### Date Formatting in Charts

- X-axis: Short format (e.g., "Jan 15") to prevent crowding
- Angled labels at -45° for better readability
- Tooltips: Full date with year (e.g., "Jan 15, 2026")

### Comparison Section

- Red X icons for competitor weaknesses
- Green ✓ icons for CryptoFolio strengths
- Color-coded borders and backgrounds

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in Vercel project settings
4. Deploy automatically on every push to main branch

```bash
# Or deploy via Vercel CLI
npm i -g vercel
vercel --prod
```

### Build Output

- Build command: `npm run build`
- Output directory: `dist`
- Serverless functions: `api/` folder

## 🔒 Security Best Practices

- ✅ Firebase ID tokens verified on every API request
- ✅ Environment variables never exposed to client
- ✅ SQL queries use parameterized statements (prevents injection)
- ✅ CORS configured appropriately
- ✅ HTTPS enforced in production
- ✅ User data isolated by Firebase UID

## 🐛 Troubleshooting

### Build Errors

- Ensure all environment variables are set in Vercel
- Check that Firebase service account JSON is properly formatted
- Verify PostgreSQL connection string is correct

### Database Connection Issues

- Confirm PostgreSQL allows SSL connections
- Check that `rejectUnauthorized: false` is set for SSL
- Verify firewall rules allow Vercel IPs

### API Rate Limits

- CoinGecko free tier: 10-30 calls/minute
- Implement caching if hitting rate limits

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using modern web technologies

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com/) - Cryptocurrency market data
- [Firebase](https://firebase.google.com/) - Authentication & storage
- [Vercel](https://vercel.com/) - Serverless hosting platform
- [Tailwind CSS](https://tailwindcss.com/) - UI styling
- [Recharts](https://recharts.org/) - Data visualization
