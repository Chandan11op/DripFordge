# System Architecture

## High-Level Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Customer   │  │    Seller    │  │    Admin     │      │
│  │      UI      │  │      UI      │  │      UI      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │  React Router   │                        │
│                   └────────┬────────┘                        │
│                            │                                 │
│         ┌──────────────────┼──────────────────┐             │
│         │                  │                  │             │
│    ┌────▼────┐      ┌─────▼─────┐     ┌─────▼─────┐       │
│    │  Auth   │      │   Cart    │     │ Wishlist  │       │
│    │  Store  │      │   Store   │     │   Store   │       │
│    └────┬────┘      └─────┬─────┘     └─────┬─────┘       │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │ Supabase Client │
                    └────────┬────────┘
                             │
┌────────────────────────────┼─────────────────────────────────┐
│                     Supabase Backend                          │
│                            │                                  │
│         ┌──────────────────┼──────────────────┐              │
│         │                  │                  │              │
│    ┌────▼────┐      ┌─────▼─────┐     ┌─────▼─────┐        │
│    │  Auth   │      │ PostgreSQL│     │  Storage  │        │
│    │ Service │      │  Database │     │  (Images) │        │
│    └─────────┘      └───────────┘     └───────────┘        │
│                                                               │
└───────────────────────────────────────────────────────────────┘
\`\`\`

## Data Flow

### Authentication Flow
\`\`\`
User Input → LoginForm → authStore.signIn()
                              ↓
                    Supabase Auth API
                              ↓
                    Verify Credentials
                              ↓
                    Query users table
                              ↓
                    Return user + role
                              ↓
                    Update authStore
                              ↓
                    Redirect based on role
\`\`\`

### Product Browsing Flow
\`\`\`
User visits /products → ProductList component
                              ↓
                    Apply filters/sort
                              ↓
                    Query products table
                              ↓
                    Render ProductCard for each
                              ↓
                    User clicks "Add to Cart"
                              ↓
                    cartStore.addToCart()
                              ↓
                    Insert into cart_items
                              ↓
                    Update UI
\`\`\`

### Order Creation Flow
\`\`\`
User in Cart → Click "Checkout"
                    ↓
            Enter shipping info
                    ↓
            Select payment method
                    ↓
            Create order record
                    ↓
        Calculate commission (10%)
                    ↓
        Create order_items records
                    ↓
        Update product stock
                    ↓
        Clear cart
                    ↓
        Update seller wallet
                    ↓
        Send notifications
                    ↓
        Redirect to order confirmation
\`\`\`

## Database Schema Relationships

\`\`\`
users (id)
  ├─→ products (seller_id)
  │     ├─→ product_variants (product_id)
  │     ├─→ reviews (product_id)
  │     └─→ cart_items (product_id)
  │
  ├─→ cart_items (user_id)
  ├─→ wishlist (user_id)
  ├─→ addresses (user_id)
  ├─→ orders (customer_id, seller_id)
  │     └─→ order_items (order_id)
  │
  ├─→ reviews (user_id)
  ├─→ conversations (customer_id, seller_id)
  │     └─→ chat_messages (conversation_id)
  │
  ├─→ seller_wallets (seller_id)
  ├─→ withdrawal_requests (seller_id)
  └─→ notifications (user_id)
\`\`\`

## Component Hierarchy

\`\`\`
App
├── BrowserRouter
│   ├── Navbar
│   │   ├── Logo
│   │   ├── SearchBar
│   │   ├── CartIcon (with badge)
│   │   ├── WishlistIcon
│   │   └── UserMenu
│   │
│   ├── Routes
│   │   ├── HomePage
│   │   │   ├── HeroSection
│   │   │   ├── FeaturesSection
│   │   │   └── ProductList
│   │   │
│   │   ├── ProductList
│   │   │   ├── FilterSidebar
│   │   │   └── ProductGrid
│   │   │       └── ProductCard (multiple)
│   │   │
│   │   ├── CartPage
│   │   │   ├── CartItems
│   │   │   └── OrderSummary
│   │   │
│   │   ├── SellerDashboard
│   │   │   ├── StatsCards
│   │   │   ├── RecentProducts
│   │   │   └── RecentOrders
│   │   │
│   │   └── AdminDashboard
│   │       ├── PlatformStats
│   │       ├── QuickActions
│   │       └── RecentActivity
│   │
│   └── Footer
│       ├── CompanyInfo
│       ├── QuickLinks
│       └── SocialLinks
\`\`\`

## State Management Architecture

\`\`\`
┌─────────────────────────────────────────┐
│           Zustand Stores                │
├─────────────────────────────────────────┤
│                                         │
│  authStore                              │
│  ├── user: User | null                  │
│  ├── loading: boolean                   │
│  ├── signIn()                           │
│  ├── signUp()                           │
│  ├── signOut()                          │
│  └── checkAuth()                        │
│                                         │
│  cartStore                              │
│  ├── items: CartItem[]                  │
│  ├── loading: boolean                   │
│  ├── fetchCart()                        │
│  ├── addToCart()                        │
│  ├── updateQuantity()                   │
│  ├── removeItem()                       │
│  ├── clearCart()                        │
│  └── getTotal()                         │
│                                         │
│  wishlistStore                          │
│  ├── items: WishlistItem[]              │
│  ├── loading: boolean                   │
│  ├── fetchWishlist()                    │
│  ├── addToWishlist()                    │
│  ├── removeFromWishlist()               │
│  └── isInWishlist()                     │
│                                         │
└─────────────────────────────────────────┘
\`\`\`

## Security Architecture

\`\`\`
┌─────────────────────────────────────────┐
│         Security Layers                 │
├─────────────────────────────────────────┤
│                                         │
│  1. Frontend Route Protection           │
│     - Role-based route guards           │
│     - Redirect unauthorized users       │
│                                         │
│  2. Supabase Authentication             │
│     - JWT tokens                        │
│     - Session management                │
│     - Secure password hashing           │
│                                         │
│  3. Row Level Security (RLS)            │
│     - Database-level access control     │
│     - User can only see their data      │
│     - Sellers see only their products   │
│                                         │
│  4. API Security                        │
│     - Environment variables             │
│     - HTTPS in production               │
│     - CORS configuration                │
│                                         │
└─────────────────────────────────────────┘
\`\`\`

## Commission Calculation Flow

\`\`\`
Order Created
    ↓
Calculate Order Total
    ↓
Commission = Total × 0.10 (10%)
    ↓
Seller Earnings = Total - Commission
    ↓
┌─────────────────────────────┐
│  Order Record               │
│  - total_amount: $100       │
│  - commission_amount: $10   │
│  - seller_receives: $90     │
└─────────────────────────────┘
    ↓
Update seller_wallets
    ↓
pending_balance += $90
\`\`\`

## Deployment Architecture

\`\`\`
┌─────────────────────────────────────────┐
│         Production Setup                │
├─────────────────────────────────────────┤
│                                         │
│  Frontend (Vercel/Netlify)              │
│  ├── Static files (HTML, CSS, JS)      │
│  ├── CDN distribution                   │
│  └── Automatic HTTPS                    │
│                                         │
│  Backend (Supabase)                     │
│  ├── PostgreSQL (managed)               │
│  ├── Authentication service             │
│  ├── Storage (images)                   │
│  ├── Real-time subscriptions            │
│  └── Edge Functions (future)            │
│                                         │
│  Domain & DNS                           │
│  ├── Custom domain                      │
│  ├── SSL certificate                    │
│  └── CDN caching                        │
│                                         │
└─────────────────────────────────────────┘
\`\`\`

## Performance Optimization Strategy

\`\`\`
┌─────────────────────────────────────────┐
│      Performance Layers                 │
├─────────────────────────────────────────┤
│                                         │
│  1. Frontend                            │
│     - Code splitting                    │
│     - Lazy loading                      │
│     - Image optimization                │
│     - Memoization                       │
│                                         │
│  2. Database                            │
│     - Indexed queries                   │
│     - Efficient joins                   │
│     - Query optimization                │
│     - Connection pooling                │
│                                         │
│  3. Caching                             │
│     - Browser caching                   │
│     - CDN caching                       │
│     - API response caching              │
│                                         │
│  4. Network                             │
│     - Compression (gzip)                │
│     - HTTP/2                            │
│     - CDN distribution                  │
│                                         │
└─────────────────────────────────────────┘
\`\`\`

## Scalability Considerations

### Horizontal Scaling
- Supabase handles database scaling
- Frontend can be deployed to multiple regions
- CDN for global distribution

### Vertical Scaling
- Database can be upgraded (more CPU/RAM)
- Storage can be increased
- Connection limits can be raised

### Future Enhancements
- Redis for caching
- Message queue for async tasks
- Microservices for specific features
- Load balancing
- Database read replicas

## Monitoring & Analytics

\`\`\`
Application Metrics
├── User Analytics
│   ├── Active users
│   ├── New registrations
│   └── User retention
│
├── Business Metrics
│   ├── Total orders
│   ├── Revenue
│   ├── Commission earned
│   └── Average order value
│
├── Performance Metrics
│   ├── Page load time
│   ├── API response time
│   ├── Error rates
│   └── Database query time
│
└── System Health
    ├── Uptime
    ├── Error logs
    ├── Database connections
    └── Storage usage
\`\`\`

## Technology Decisions

### Why React?
- Component-based architecture
- Large ecosystem
- Excellent performance
- Strong community support

### Why TypeScript?
- Type safety
- Better IDE support
- Fewer runtime errors
- Self-documenting code

### Why Supabase?
- PostgreSQL (powerful, reliable)
- Built-in authentication
- Real-time capabilities
- Row Level Security
- Easy to use
- Cost-effective

### Why Zustand?
- Simple API
- No boilerplate
- TypeScript support
- Small bundle size
- Easy to test

### Why Tailwind CSS?
- Utility-first approach
- Rapid development
- Consistent design
- Small production bundle
- Easy customization
