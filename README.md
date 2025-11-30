# eCommerce Shop

A modern, production-ready eCommerce application built with Next.js 16.0.5, React 19.2.0, TypeScript 5.7.2, Tailwind CSS 3.4.17, and Redux Toolkit 2.11.0. This project demonstrates senior-level frontend development practices with clean code architecture, reusable components, comprehensive state management, and professional UI/UX design.

## 🚀 Features

### Core Features

#### Product Listing Page (`/`)

- **Infinite Scroll Pagination**: Automatic loading of more products as user scrolls
- **Advanced Search**: Real-time product search with category filtering
- **Product Filtering**:
  - Price range filter with min/max inputs
  - Minimum rating filter (1-4+ stars)
  - Brand filtering with checkbox selection
  - Stock availability filter (In Stock/Out of Stock)
- **Product Sorting**: Sort by newest, oldest, price (low to high/high to low), rating
- **Responsive Grid Layout**: 3-4 columns on desktop, 2 on tablet, 1 on mobile
- **Product Cards**: Display with images, ratings, prices, discount badges, favorite icons
- **Add to Cart**: Quick add to cart functionality from product cards
- **Category Navigation**: Filter products by category
- **Active Filter Display**: Visual chips showing active filters with remove options

#### Product Details Page (`/product/[id]`)

- **Comprehensive Product Information**:
  - Product images with thumbnail gallery
  - SKU, brand, category, rating, reviews
  - Stock availability status
  - Price with discount calculations
  - Minimum order quantity
  - Product tags
- **Image Gallery**: Main image with clickable thumbnails
- **Action Buttons**:
  - Add to Cart (primary action)
  - Add/Remove from Favorites
  - Edit Product (authenticated users)
  - Delete Product (authenticated users with confirmation)
- **Tabbed Information**:
  - Details tab: Description, product specifications, shipping & policies
  - Reviews tab: Customer reviews with ratings and dates
- **Discount Badge**: Visual discount percentage display
- **Responsive Layout**: Image and details side-by-side on desktop, stacked on mobile

#### Shopping Cart (`/cart`)

- **Cart Management**:
  - View all cart items with product details
  - Quantity controls (increase/decrease)
  - Remove individual items
  - Clear entire cart
- **Order Summary**:
  - Subtotal calculation
  - Discount calculation
  - Total price
  - Item count display
- **Product Display**:
  - Product images
  - Product titles (clickable to detail page)
  - Price per item and total
  - Discount savings display
- **Empty State**: Friendly message with "Continue Shopping" button
- **Checkout Button**: Ready for checkout integration
- **Persistent Storage**: Cart saved to localStorage

#### Favorites Page (`/favorites`)

- **Favorite Products Display**: Grid layout of favorited products
- **Remove from Favorites**: Quick removal functionality
- **Empty State**: Message when no favorites exist
- **Product Cards**: Same card component as main listing
- **Badge Counter**: Shows number of favorites in header

#### Authentication (`/login`)

- **DummyJSON API Integration**: Real authentication with DummyJSON API
- **Token-Based Auth**: JWT token storage in localStorage
- **Session Persistence**: User session persists across page refreshes
- **Protected Routes**: Create, edit, delete operations require authentication
- **Error Handling**: User-friendly error messages for invalid credentials
- **Auto-redirect**: Redirects authenticated users away from login page

#### Product Management

- **Create Product** (`/products/create`):
  - Full product creation form
  - Category selection from API
  - Form validation
  - Success/error feedback
- **Edit Product** (`/product/[id]/edit`):
  - Pre-filled form with existing product data
  - Update product information
  - PATCH method for partial updates
- **Delete Product**:
  - Confirmation dialog
  - Safe deletion with user feedback
  - Redirect to home after deletion

### Advanced Features

#### Search & Navigation

- **Header Search Bar**:
  - Prominent search with category dropdown
  - Clear button for easy reset
  - Mobile-optimized compact variant
  - Real-time search with API integration
- **Category Navigation**:
  - Dynamic category list from API
  - Category-based filtering
  - Breadcrumb-style navigation
- **Mobile Search**: Accessible via mobile menu

#### Filtering & Sorting

- **Client-Side Filtering**: Fast filtering without API calls
- **URL Synchronization**: Filter and sort state in URL params
- **Filter Persistence**: Filters maintained during navigation
- **Sort Options**:
  - Newest First
  - Oldest First
  - Price: Low to High
  - Price: High to Low
  - Rating: High to Low
- **Filter Reset**: One-click clear all filters

#### UI/UX Enhancements

- **Dark Mode**:
  - System preference detection
  - Manual toggle in header
  - Persistent theme selection
  - Smooth transitions
- **Loading States**:
  - Skeleton loaders for products
  - Loading spinners for actions
  - Progressive loading indicators
- **Error Handling**:
  - Toast notifications (Sonner)
  - Error boundaries
  - User-friendly error messages
  - Retry mechanisms
- **Responsive Design**:
  - Mobile-first approach
  - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
  - Touch-friendly interactions
  - Optimized layouts for all screen sizes

#### Header & Navigation

- **Professional Header**:
  - Amazon-inspired design
  - Sticky header with backdrop blur
  - Logo with hover effects
  - Search bar (desktop)
  - User menu with dropdown
  - Cart icon with item count badge
  - Favorites icon with count badge
  - Theme toggle button
  - Mobile hamburger menu
- **Mobile Menu**:
  - Slide-out navigation
  - Search bar integration
  - User profile display
  - Quick navigation links
  - Sign out option

#### Footer

- **Professional Footer**:
  - Company information
  - Quick links
  - Social media links (placeholder)
  - Copyright information
  - Responsive layout

## 🛠️ Tech Stack

### Core Technologies

- **Framework**: Next.js 16.0.5 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.7.2
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Shadcn UI (Radix UI primitives)
- **State Management**: Redux Toolkit 2.11.0
- **API Client**: Axios 1.7.9
- **Notifications**: Sonner 1.7.1
- **Icons**: Lucide React 0.468.0

### UI Component Libraries

- **Radix UI**:
  - Checkbox, Dialog, Dropdown Menu, Label, Select, Slider, Tabs, Toast
- **Shadcn UI**: Customizable component system
- **Tailwind CSS**: Utility-first CSS framework
- **Tailwind Animate**: Animation utilities

### Development Tools

- **TypeScript**: Type safety and IntelliSense
- **ESLint**: Code linting with Next.js config (v9.17.0)
- **PostCSS**: CSS processing (v8.4.49)
- **Autoprefixer**: CSS vendor prefixing (v10.4.20)
- **Baseline Browser Mapping**: Browser compatibility data (v2.8.32)

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Product listing page
│   ├── globals.css              # Global styles
│   ├── not-found.tsx            # 404 page
│   ├── icon.svg                # Favicon (shopping cart icon)
│   ├── apple-icon.svg          # Apple touch icon
│   ├── cart/                    # Shopping cart page
│   │   └── page.tsx
│   ├── favorites/               # Favorites page
│   │   └── page.tsx
│   ├── login/                   # Authentication page
│   │   └── page.tsx
│   ├── product/                 # Product detail pages
│   │   └── [id]/
│   │       ├── page.tsx         # Product detail page
│   │       └── edit/
│   │           └── page.tsx    # Edit product page
│   └── products/                # Product management
│       └── create/
│           └── page.tsx         # Create product page
│
├── components/                   # React components
│   ├── ui/                      # Reusable UI components (Shadcn)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── tabs.tsx
│   │   └── textarea.tsx
│   ├── layout/                  # Layout components
│   │   ├── header/              # Header components
│   │   │   ├── index.tsx        # Main header
│   │   │   ├── logo.tsx         # Logo component
│   │   │   ├── search-bar.tsx  # Search functionality
│   │   │   ├── user-menu.tsx   # User account menu
│   │   │   ├── mobile-menu.tsx # Mobile navigation
│   │   │   ├── category-selector.tsx
│   │   │   ├── navigation.tsx
│   │   │   └── secondary-nav.tsx
│   │   ├── footer/              # Footer component
│   │   │   └── index.tsx
│   │   └── main-layout.tsx     # Main layout wrapper
│   ├── product/                 # Product-specific components
│   │   ├── product-card.tsx    # Product card component
│   │   ├── product-card-skeleton.tsx
│   │   ├── product-filters.tsx # Filter sidebar
│   │   ├── product-header.tsx  # Product listing header
│   │   ├── product-sort.tsx    # Sort dropdown
│   │   └── product-filter-toolbar.tsx
│   ├── providers.tsx            # Redux provider
│   └── error-boundary.tsx       # Error boundary component
│
├── store/                        # Redux store
│   ├── index.ts                 # Store configuration
│   ├── hooks.ts                 # Typed Redux hooks
│   └── slices/                  # Redux slices
│       ├── authSlice.ts         # Authentication state
│       ├── cartSlice.ts         # Shopping cart state
│       ├── favoritesSlice.ts   # Favorites state
│       ├── productsSlice.ts    # Products state
│       └── themeSlice.ts       # Theme state
│
├── hooks/                        # Custom React hooks
│   ├── use-category-name.ts    # Get category name from slug
│   ├── use-favorites.ts        # Favorites management
│   ├── use-filters.ts          # Filter state management
│   ├── use-infinite-scroll.ts  # Infinite scroll logic
│   └── use-products.ts         # Product fetching hook
│
├── services/                     # API services
│   └── api/
│       ├── authService.ts       # Authentication API
│       ├── categoryService.ts   # Category API
│       ├── productService.ts   # Product API
│       └── index.ts            # Service exports
│
├── lib/                          # Utility functions
│   ├── axios.ts                 # Axios instance & interceptors
│   ├── category-utils.ts       # Category helpers
│   ├── constants.ts            # App constants
│   ├── filter-utils.ts         # Filtering & sorting logic
│   ├── tailwind-utils.ts       # Tailwind utility classes
│   └── utils.ts                # General utilities (cn, etc.)
│
└── types/                        # TypeScript definitions
    ├── index.ts                 # Main type definitions
    └── filters.ts              # Filter & sort types
```

## 🏃 Getting Started

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **Package Manager**: npm, yarn, or pnpm

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/habtamu-esubalew/eCommerce-Shop
cd ecommerce-Shop
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## 📚 API Integration

This project uses [DummyJSON](https://dummyjson.com/docs) as the backend API.

### API Base URL

```
https://dummyjson.com
```

### Authentication Endpoints

- `POST /auth/login` - User login
  - Body: `{ username, password, expiresInMins }`
  - Returns: `{ id, username, email, firstName, lastName, gender, image, token }`

### Product Endpoints

- `GET /products` - Get all products
  - Query params: `limit`, `skip`, `select`
  - Returns: `{ products, total, skip, limit }`
- `GET /products/search?q={query}` - Search products
  - Query params: `q` (search term)
- `GET /products/category/{category}` - Get products by category
- `GET /products/{id}` - Get product by ID
- `POST /products/add` - Create new product
  - Body: Product data
- `PATCH /products/{id}` - Update product (partial)
  - Body: Partial product data
- `DELETE /products/{id}` - Delete product

### Category Endpoints

- `GET /products/categories` - Get all categories
  - Returns: Array of category strings
- `GET /products/category/{category}` - Get products in category

### API Configuration

- **Base URL**: Configured in `src/lib/axios.ts`
- **Interceptors**:
  - Request: Adds authentication token
  - Response: Handles errors globally
- **Error Handling**: Centralized error handling with user-friendly messages

## 🎨 Features in Detail

### State Management (Redux Toolkit)

#### Products Slice

- **State**: Products list, current product, loading, error, pagination
- **Actions**:
  - `fetchProducts` (async thunk)
  - `fetchProductById` (async thunk)
  - `createProduct` (async thunk)
  - `updateProduct` (async thunk)
  - `deleteProduct` (async thunk)
  - `clearCurrentProduct`
- **Features**: Infinite scroll support, search integration

#### Cart Slice

- **State**: Cart items array (product + quantity)
- **Actions**:
  - `addToCart` - Add product with quantity
  - `removeFromCart` - Remove product by ID
  - `updateQuantity` - Update item quantity
  - `clearCart` - Empty cart
  - `initializeCart` - Load from localStorage
- **Persistence**: localStorage with automatic sync
- **Features**: Stock validation, quantity management

#### Favorites Slice

- **State**: Favorites array
- **Actions**:
  - `addToFavorites`
  - `removeFromFavorites`
  - `toggleFavorite`
  - `clearFavorites`

#### Auth Slice

- **State**: User data, authentication status, loading, error
- **Actions**:
  - `loginAsync` (async thunk)
  - `checkAuthAsync` (async thunk)
  - `logout`
  - `initializeAuth`
- **Persistence**: localStorage for user data and token

#### Theme Slice

- **State**: Theme mode (light/dark)
- **Actions**:
  - `setTheme`
  - `toggleTheme`
- **Persistence**: localStorage with system preference fallback

### Custom Hooks

#### `useProducts`

- Fetches products with pagination
- Supports search and category filtering
- Handles loading and error states
- Infinite scroll integration

#### `useFavorites`

- Manages favorite products
- Provides toggle functionality
- Checks favorite status

#### `useFilters`

- Manages filter state
- URL synchronization
- Filter persistence
- Active filter tracking

#### `useInfiniteScroll`

- Detects scroll position
- Triggers load more action
- Manages loading states

#### `useCategoryName`

- Converts category slug to display name
- Caches category names

### Component Architecture

#### UI Components (Shadcn)

All components follow Shadcn UI patterns:

- **Accessible**: ARIA labels, keyboard navigation
- **Customizable**: Variant props, className support
- **Type-safe**: Full TypeScript support
- **Consistent**: Unified design system

#### Layout Components

- **Header**: Sticky, responsive, with search and navigation
- **Footer**: Professional footer with links
- **MainLayout**: Consistent page wrapper

#### Product Components

- **ProductCard**: Reusable product display
- **ProductFilters**: Advanced filtering sidebar
- **ProductSort**: Sort dropdown
- **ProductHeader**: Listing page header with stats

### Responsive Design

#### Breakpoints

- **Mobile**: < 640px (sm)
  - Single column layout
  - Mobile menu
  - Compact search
  - Stacked buttons
- **Tablet**: 640px - 1024px (md, lg)
  - 2-3 column grid
  - Adjusted spacing
  - Sidebar filters
- **Desktop**: > 1024px (lg, xl)
  - 3-4 column grid
  - Full navigation
  - Sidebar filters
  - Optimal spacing

#### Mobile Optimizations

- Touch-friendly buttons
- Swipe gestures support
- Optimized images
- Reduced animations
- Simplified navigation

### Dark Mode Implementation

- **System Detection**: Automatically detects user preference
- **Manual Toggle**: Theme toggle button in header (always visible)
- **Persistence**: Saves preference to localStorage
- **Smooth Transitions**: CSS transitions for theme changes
- **Hydration Safe**: Prevents flash of wrong theme with inline script
- **SSR Compatible**: Theme applied before React hydration

### Authentication Flow

1. **Login**: User enters credentials
2. **API Call**: Authenticates with DummyJSON
3. **Token Storage**: Saves token to localStorage
4. **State Update**: Updates Redux auth state
5. **Persistence**: Session persists across refreshes
6. **Protected Routes**: Guards create/edit/delete operations
7. **Logout**: Clears token and user data

### Error Handling

- **API Errors**: Centralized in Axios interceptors
- **User Feedback**: Toast notifications for all errors
- **Error Boundaries**: Catches React errors
- **Retry Logic**: Allows users to retry failed operations
- **Fallback UI**: Graceful degradation

## 📝 Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build optimized production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run type-check` - Run TypeScript compiler check

## 🚀 Additional Features

- **Shopping Cart**: Full cart functionality with persistence
- **Advanced Filtering**: Price, rating, brand, stock filters
- **Product Sorting**: Multiple sort options
- **Search Functionality**: Real-time product search
- **Category Navigation**: Dynamic category filtering
- **Image Optimization**: Next.js Image component
- **SEO Ready**: Metadata and semantic HTML
- **Performance**: Code splitting, lazy loading
- **Accessibility**: ARIA labels, keyboard navigation
- **Favicon**: Custom shopping cart icon favicon
- **Hydration Safe**: Proper Suspense boundaries for client-side hooks
- **Type Safety**: Full TypeScript coverage with no build errors
- **Mobile Optimized**: Responsive design with mobile-first approach

## 🔒 Security Features

- **Token-Based Auth**: Secure token storage in localStorage
- **Input Validation**: Form validation on client
- **XSS Protection**: React's built-in protection
- **CSRF Protection**: Token-based requests
- **Error Sanitization**: Safe error messages
- **Hydration Safety**: Prevents SSR/client mismatches

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is created for Zemenay Community by Habtamu Esubalew

---

**Built by Habtamu Esubalew using Next.js 16, React 19, and modern web technologies**

**Version**: 0.1.0  
**Last Updated**: December 2024
