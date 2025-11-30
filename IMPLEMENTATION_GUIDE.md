# Implementation Guide

This guide will help you set up and customize the multi-vendor e-commerce platform.

## Setup Steps

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Update the \`.env\` file with your credentials
4. Run the database schema:
   - Go to SQL Editor in Supabase Dashboard
   - Copy and paste the contents of \`database-schema.sql\`
   - Execute the SQL

### 3. Configure Storage (for product images)

In Supabase Dashboard:
1. Go to Storage
2. Create a new bucket called \`products\`
3. Set it to public
4. Add policy to allow authenticated users to upload

### 4. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

## Customization

### Changing Commission Rate

Edit \`src/utils/constants.ts\`:
\`\`\`typescript
export const COMMISSION_RATE = 0.15; // Change to 15%
\`\`\`

### Adding New Categories

Edit \`src/utils/constants.ts\`:
\`\`\`typescript
export const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Your New Category',
  // ...
] as const;
\`\`\`

### Customizing Theme Colors

Edit \`tailwind.config.js\` to change the color scheme:
\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
\`\`\`

## Phase 2 Implementation

### Adding Payment Integration (Stripe)

1. Install Stripe:
\`\`\`bash
npm install @stripe/stripe-js @stripe/react-stripe-js
\`\`\`

2. Create checkout component
3. Add webhook handler for payment confirmation
4. Update order status on successful payment

### Adding Real-time Chat

1. Use Supabase Realtime subscriptions
2. Create chat UI components
3. Subscribe to new messages
4. Add notification system

### Adding Email Notifications

1. Use Supabase Edge Functions
2. Integrate with email service (SendGrid, Resend)
3. Create email templates
4. Trigger on order events

## Testing

### Create Test Users

Run in Supabase SQL Editor:
\`\`\`sql
-- Create admin user
INSERT INTO users (id, email, role, full_name)
VALUES ('admin-uuid', 'admin@test.com', 'admin', 'Admin User');

-- Create seller user
INSERT INTO users (id, email, role, full_name)
VALUES ('seller-uuid', 'seller@test.com', 'seller', 'Test Seller');

-- Create customer user
INSERT INTO users (id, email, role, full_name)
VALUES ('customer-uuid', 'customer@test.com', 'customer', 'Test Customer');
\`\`\`

### Add Sample Products

\`\`\`sql
INSERT INTO products (seller_id, title, description, price, category, stock, sku)
VALUES 
  ('seller-uuid', 'Sample Product 1', 'Description here', 99.99, 'Electronics', 50, 'SKU-001'),
  ('seller-uuid', 'Sample Product 2', 'Description here', 149.99, 'Fashion', 30, 'SKU-002');
\`\`\`

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy to Netlify

1. Push code to GitHub
2. Import project in Netlify
3. Build command: \`npm run build\`
4. Publish directory: \`dist\`
5. Add environment variables

## Security Checklist

- [ ] Enable Row Level Security on all tables
- [ ] Configure proper RLS policies
- [ ] Validate user inputs on frontend and backend
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS in production
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Sanitize user-generated content
- [ ] Regular security audits

## Performance Optimization

- [ ] Enable image optimization
- [ ] Implement lazy loading
- [ ] Add caching strategy
- [ ] Optimize database queries
- [ ] Use CDN for static assets
- [ ] Implement pagination
- [ ] Add search indexing
- [ ] Monitor performance metrics

## Support

For issues and questions:
- Check the README.md
- Review Supabase documentation
- Check React Router documentation
- Review Zustand documentation
