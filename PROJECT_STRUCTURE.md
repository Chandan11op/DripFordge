# Project Structure

## Directory Overview

\`\`\`
project/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Auth/           # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── Common/         # Common/shared components
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   ├── Layout/         # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── Products/       # Product-related components
│   │       ├── ProductCard.tsx
│   │       └── ProductList.tsx
│   ├── pages/              # Page components (routes)
│   │   ├── HomePage.tsx
│   │   ├── CartPage.tsx
│   │   ├── SellerDashboard.tsx
│   │   └── AdminDashboard.tsx
│   ├── store/              # State management (Zustand)
│   │   ├── authStore.ts    # Authentication state
│   │   ├── cartStore.ts    # Shopping cart state
│   │   └── wishlistStore.ts # Wishlist state
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # All type definitions
│   ├── utils/              # Utility functions
│   │   ├── constants.ts    # App constants
│   │   └── helpers.ts      # Helper functions
│   ├── lib/                # Third-party configurations
│   │   └── supabase.ts     # Supabase client setup
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   ├── index.css           # Global styles
│   └── vite-env.d.ts       # Vite type definitions
├── public/                 # Static assets
├── .bolt/                  # Bolt configuration
├── database-schema.sql     # Database schema
├── .env                    # Environment variables (not in git)
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.ts          # Vite configuration
├── README.md               # Main documentation
├── QUICK_START.md          # Quick start guide
├── IMPLEMENTATION_GUIDE.md # Detailed implementation guide
├── FEATURES.md             # Feature checklist
└── PROJECT_STRUCTURE.md    # This file
\`\`\`

## Component Architecture

### Authentication Flow
\`\`\`
LoginForm/SignupForm → authStore → Supabase Auth → Database
                                                      ↓
                                                   users table
\`\`\`

### Product Display Flow
\`\`\`
ProductList → Supabase → products table
    ↓
ProductCard → User Actions (Add to Cart/Wishlist)
    ↓
cartStore/wishlistStore → Database
\`\`\`

### Order Flow
\`\`\`
Cart → Checkout → Order Creation → Database
                        ↓
                  Commission Calculation
                        ↓
                  Seller Earnings Update
\`\`\`

## State Management

### Zustand Stores

**authStore** - Manages authentication state
- Current user
- Login/logout functions
- Role-based access

**cartStore** - Manages shopping cart
- Cart items
- Add/remove/update items
- Calculate totals

**wishlistStore** - Manages wishlist
- Wishlist items
- Add/remove items
- Check if product is in wishlist

## Database Schema

### Core Tables

**users**
- User accounts with roles (admin, seller, customer)
- Profile information

**products**
- Product catalog
- Seller association
- Pricing and inventory

**product_variants**
- Product variations (color, size)
- Separate inventory per variant

**cart_items**
- Shopping cart contents
- User association

**wishlist**
- User wishlists
- Product associations

**orders**
- Order records
- Status tracking
- Commission calculation

**order_items**
- Order line items
- Product details at time of order

**reviews**
- Product reviews and ratings
- Verified purchase tracking

**conversations & chat_messages**
- Customer-seller communication
- Message history

**seller_wallets**
- Seller earnings
- Balance tracking

**notifications**
- User notifications
- Read/unread status

## Routing Structure

\`\`\`
/                           → HomePage
/login                      → LoginForm
/signup                     → SignupForm
/products                   → ProductList
/product/:id                → ProductDetail (Phase 2)

Customer Routes:
/cart                       → CartPage
/wishlist                   → WishlistPage (Phase 2)
/orders                     → OrdersPage (Phase 2)
/checkout                   → CheckoutPage (Phase 2)

Seller Routes:
/seller/dashboard           → SellerDashboard
/seller/products            → SellerProducts (Phase 2)
/seller/products/new        → AddProduct (Phase 2)
/seller/orders              → SellerOrders (Phase 2)

Admin Routes:
/admin/dashboard            → AdminDashboard
/admin/users                → UserManagement (Phase 2)
/admin/products             → ProductModeration (Phase 2)
/admin/orders               → OrderManagement (Phase 2)
\`\`\`

## Key Features by File

### Authentication
- \`src/components/Auth/LoginForm.tsx\` - Login UI
- \`src/components/Auth/SignupForm.tsx\` - Registration UI
- \`src/store/authStore.ts\` - Auth state management

### Products
- \`src/components/Products/ProductCard.tsx\` - Product display
- \`src/components/Products/ProductList.tsx\` - Product grid with filters
- \`src/types/index.ts\` - Product type definitions

### Shopping
- \`src/pages/CartPage.tsx\` - Shopping cart
- \`src/store/cartStore.ts\` - Cart state management
- \`src/store/wishlistStore.ts\` - Wishlist state management

### Dashboards
- \`src/pages/SellerDashboard.tsx\` - Seller analytics and management
- \`src/pages/AdminDashboard.tsx\` - Platform administration

### Utilities
- \`src/utils/constants.ts\` - App-wide constants
- \`src/utils/helpers.ts\` - Utility functions
- \`src/lib/supabase.ts\` - Database client

## Styling Approach

- **Tailwind CSS** for utility-first styling
- **Responsive design** with mobile-first approach
- **Consistent color scheme** using Tailwind's color palette
- **Component-level styling** for maintainability

## Type Safety

All components use TypeScript for:
- Type checking
- IntelliSense support
- Better developer experience
- Reduced runtime errors

## Best Practices

1. **Component Organization**
   - One component per file
   - Grouped by feature/domain
   - Reusable components in \`Common/\`

2. **State Management**
   - Zustand for global state
   - Local state for component-specific data
   - Async operations in store actions

3. **Code Style**
   - Functional components with hooks
   - TypeScript for type safety
   - ESLint for code quality

4. **Performance**
   - Lazy loading for routes (Phase 2)
   - Memoization for expensive computations
   - Optimized re-renders

## Adding New Features

### Adding a New Page
1. Create component in \`src/pages/\`
2. Add route in \`src/App.tsx\`
3. Add navigation link in \`Navbar.tsx\`

### Adding a New Store
1. Create store file in \`src/store/\`
2. Define state interface
3. Implement actions
4. Use in components with \`useStore()\`

### Adding a New Component
1. Create component in appropriate \`src/components/\` subfolder
2. Define props interface
3. Implement component logic
4. Export and use in pages

## Environment Variables

\`\`\`env
VITE_SUPABASE_URL          # Supabase project URL
VITE_SUPABASE_ANON_KEY     # Supabase anonymous key
VITE_STRIPE_PUBLIC_KEY     # Stripe public key (Phase 2)
\`\`\`

## Build & Deployment

### Development
\`\`\`bash
npm run dev
\`\`\`

### Production Build
\`\`\`bash
npm run build
\`\`\`

### Preview Production Build
\`\`\`bash
npm run preview
\`\`\`

## Testing Strategy (Future)

- Unit tests for utilities
- Component tests for UI
- Integration tests for flows
- E2E tests for critical paths
