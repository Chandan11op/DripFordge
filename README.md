# Multi-Vendor E-Commerce Platform

A comprehensive e-commerce marketplace built with React, TypeScript, Tailwind CSS, and Supabase.

## 🌐 Live Demo
**[View Live Site](https://your-app-name.vercel.app)** ← Update this after deployment

> **🚀 New here? Start with [START_HERE.md](START_HERE.md) for a quick 5-minute setup guide!**  
> **📖 Looking for something specific? Check [INDEX.md](INDEX.md) for complete documentation index.**

## Features

### Phase 1 (MVP) - Implemented
- ✅ **Authentication System**
  - 3-role system (Admin, Seller, Customer)
  - Email/password authentication
  - Role-based access control

- ✅ **Product Management**
  - Product listings with images
  - Categories and subcategories
  - Stock management
  - Product variants (colors, sizes)
  - SKU tracking

- ✅ **Shopping Features**
  - Shopping cart
  - Wishlist
  - Product search and filters
  - Sort by price, rating, newest

- ✅ **Order Management**
  - Order creation and tracking
  - Multiple order statuses
  - Commission calculation

- ✅ **Seller Dashboard**
  - Product management
  - Order tracking
  - Sales analytics
  - Revenue tracking

- ✅ **Admin Dashboard**
  - User management
  - Platform analytics
  - Commission settings
  - Order oversight

### Phase 2 (Planned)
- Reviews & ratings system
- Advanced filters
- Seller analytics
- Notification system
- Address management
- Multiple payment methods

### Phase 3 (Future)
- Real-time chat system
- Seller wallet & withdrawals
- Return/refund system
- Promotional tools
- Advanced analytics

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)

1. Click the "Deploy" button above or go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click "Deploy"

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a \`.env\` file in the root directory:
   \`\`\`env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

4. Set up the database:
   - Go to your Supabase project
   - Run the SQL from \`database-schema.sql\` in the SQL Editor

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Project Structure

\`\`\`
src/
├── components/
│   ├── Auth/           # Authentication components
│   ├── Layout/         # Layout components (Navbar, Footer)
│   └── Products/       # Product-related components
├── pages/              # Page components
├── store/              # Zustand stores
├── types/              # TypeScript type definitions
├── lib/                # Utility functions and configs
└── App.tsx             # Main app component
\`\`\`

## User Roles

### Customer
- Browse and search products
- Add to cart and wishlist
- Place orders
- Track deliveries
- Write reviews

### Seller
- Add and manage products
- View orders
- Track sales and revenue
- Manage inventory
- Communicate with customers

### Admin
- Manage all users
- Oversee all orders
- Set commission rates
- Platform analytics
- Content moderation

## Database Schema

Key tables:
- \`users\` - User accounts with roles
- \`products\` - Product catalog
- \`product_variants\` - Product variations
- \`cart_items\` - Shopping cart
- \`wishlist\` - User wishlists
- \`orders\` - Order records
- \`order_items\` - Order line items
- \`reviews\` - Product reviews
- \`conversations\` & \`chat_messages\` - Chat system
- \`seller_wallets\` - Seller earnings
- \`notifications\` - User notifications

## Commission System

The platform operates on a commission-based model where:
- Admin sets commission percentage (default: 10%)
- Commission is calculated on each order
- Sellers receive: Order Total - Commission
- Platform earns: Commission Amount

## Contributing

This is a comprehensive e-commerce platform. Contributions are welcome!

## License

MIT License
