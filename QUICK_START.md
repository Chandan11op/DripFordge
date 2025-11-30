# Quick Start Guide

Get your multi-vendor e-commerce platform up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great)
- Basic knowledge of React and TypeScript

## Step-by-Step Setup

### 1. Install Dependencies

\`\`\`bash
cd project
npm install
\`\`\`

### 2. Set Up Supabase

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in project details
   - Wait for project to be ready

2. **Get Your Credentials**
   - Go to Project Settings > API
   - Copy the "Project URL"
   - Copy the "anon public" key

3. **Update Environment Variables**
   - Open \`.env\` file
   - Replace \`your_supabase_project_url\` with your Project URL
   - Replace \`your_supabase_anon_key\` with your anon key

### 3. Set Up Database

1. **Run Database Schema**
   - Open Supabase Dashboard
   - Go to SQL Editor
   - Click "New Query"
   - Copy entire contents of \`database-schema.sql\`
   - Paste and click "Run"
   - Wait for success message

2. **Configure Storage**
   - Go to Storage in Supabase Dashboard
   - Click "Create a new bucket"
   - Name it \`products\`
   - Make it public
   - Click "Create bucket"

### 4. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Your app should now be running at \`http://localhost:5173\`

## First Steps

### Create Your First Admin User

1. Sign up through the app UI
2. Go to Supabase Dashboard > Authentication > Users
3. Find your user
4. Go to SQL Editor and run:

\`\`\`sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
\`\`\`

### Create Test Data

Run this in SQL Editor to create sample products:

\`\`\`sql
-- First, create a seller account through the UI, then get their ID
-- Replace 'seller-id-here' with actual seller ID

INSERT INTO products (seller_id, title, description, price, discount_price, category, stock, sku, images)
VALUES 
  ('seller-id-here', 'Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 199.99, 149.99, 'Electronics', 50, 'SKU-WH-001', ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e']),
  ('seller-id-here', 'Smart Watch', 'Feature-rich smartwatch with health tracking', 299.99, 249.99, 'Electronics', 30, 'SKU-SW-001', ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30']),
  ('seller-id-here', 'Running Shoes', 'Comfortable running shoes for all terrains', 89.99, NULL, 'Fashion', 100, 'SKU-RS-001', ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff']);
\`\`\`

## Testing Different Roles

### As Customer
1. Sign up with a new email
2. Browse products
3. Add items to cart
4. Add items to wishlist
5. Proceed to checkout

### As Seller
1. Sign up with role "Seller"
2. Go to Seller Dashboard
3. Add new products
4. View orders
5. Track sales

### As Admin
1. Update your user role to 'admin' (see above)
2. Access Admin Dashboard
3. View platform statistics
4. Manage users and orders

## Common Issues

### "Invalid API key" error
- Double-check your \`.env\` file
- Make sure there are no extra spaces
- Restart the dev server after changing .env

### Database connection errors
- Verify your Supabase project is active
- Check if you ran the database schema
- Ensure RLS policies are set up correctly

### Products not showing
- Make sure you have products in the database
- Check if the seller_id matches an existing user
- Verify the products table has data

## Next Steps

1. **Customize Branding**
   - Update colors in \`tailwind.config.js\`
   - Change logo and name in \`Navbar.tsx\`
   - Update footer information

2. **Add Real Images**
   - Upload product images to Supabase Storage
   - Update product image URLs

3. **Configure Commission**
   - Edit \`src/utils/constants.ts\`
   - Change \`COMMISSION_RATE\` value

4. **Deploy**
   - See \`IMPLEMENTATION_GUIDE.md\` for deployment instructions

## Need Help?

- Check \`README.md\` for detailed documentation
- Review \`FEATURES.md\` for feature status
- See \`IMPLEMENTATION_GUIDE.md\` for advanced setup
- Check Supabase documentation for database issues

## Development Commands

\`\`\`bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run typecheck  # Check TypeScript types
\`\`\`

Happy coding! 🚀
