# LetsLive Tours — Backend & Database Plan

## Overview

Express.js REST API server with MongoDB (Mongoose ODM), JWT authentication, and integration with the existing Next.js frontend.

---

## 1. Project Structure

```
letslivetours/
├── src/                    # Next.js frontend (existing)
├── server/                 # Express backend (new)
│   ├── config/
│   │   ├── db.ts           # MongoDB connection
│   │   └── env.ts          # Environment variables
│   ├── models/
│   │   ├── User.ts
│   │   ├── Destination.ts
│   │   ├── Package.ts
│   │   ├── Booking.ts
│   │   ├── Review.ts
│   │   ├── Enquiry.ts
│   │   ├── Career.ts
│   │   └── Newsletter.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── destinations.ts
│   │   ├── packages.ts
│   │   ├── bookings.ts
│   │   ├── reviews.ts
│   │   ├── enquiries.ts
│   │   ├── careers.ts
│   │   └── newsletter.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   ├── destinationController.ts
│   │   ├── packageController.ts
│   │   ├── bookingController.ts
│   │   ├── reviewController.ts
│   │   ├── enquiryController.ts
│   │   ├── careerController.ts
│   │   └── newsletterController.ts
│   ├── middleware/
│   │   ├── auth.ts          # JWT verification
│   │   ├── admin.ts         # Admin role check
│   │   ├── validate.ts      # Request validation
│   │   └── errorHandler.ts  # Global error handler
│   ├── utils/
│   │   ├── generateToken.ts
│   │   ├── sendEmail.ts
│   │   └── cloudinary.ts    # Image uploads
│   ├── seeds/
│   │   ├── destinations.ts
│   │   ├── packages.ts
│   │   └── seed.ts          # Run all seeds
│   └── index.ts             # Express app entry point
├── .env
└── package.json
```

---

## 2. MongoDB Collections & Schemas

### 2.1 Users
```
Collection: users
{
  _id: ObjectId,
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique, indexed),
  phone: String,
  password: String (hashed, bcrypt),
  avatar: String (URL),
  role: "user" | "admin" (default: "user"),
  wishlist: [ObjectId → packages],
  isVerified: Boolean (default: false),
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 2.2 Destinations
```
Collection: destinations
{
  _id: ObjectId,
  name: String (required),
  slug: String (required, unique, indexed),
  country: String,
  region: String,
  description: String,
  shortDescription: String,
  images: [String] (URLs),
  heroImage: String,
  category: "beach" | "city" | "mountain" | "adventure" | "cultural" | "wildlife" | "tropical",
  rating: Number (0-5),
  reviewCount: Number,
  packageCount: Number,
  startingPrice: Number,
  bestSeason: String,
  visaType: "free" | "on-arrival" | "required",
  visaInfo: String,
  highlights: [String],
  travelTips: [{ question: String, answer: String }],
  whyVisit: [{ icon: String, title: String, description: String }],
  partners: [String],
  isActive: Boolean (default: true),
  isFeatured: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### 2.3 Packages
```
Collection: packages
{
  _id: ObjectId,
  name: String (required),
  slug: String (required, unique, indexed),
  destination: ObjectId → destinations (required, indexed),
  description: String,
  shortDescription: String,
  images: [String],
  heroImage: String,
  duration: { nights: Number, days: Number },
  hotelRating: String ("3-Star" | "4-Star" | "5-Star" | "7-Star"),
  category: "luxury" | "honeymoon" | "family" | "adventure" | "group" | "budget",
  originalPrice: Number,
  price: Number (required),
  priceUnit: "person" | "couple" | "family",
  discount: Number (percentage),
  rating: Number (0-5),
  reviewCount: Number,
  highlights: [String],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    activities: [String],
    meals: [String],
    accommodation: String
  }],
  inclusions: [String],
  exclusions: [String],
  stays: [{
    name: String,
    rating: String,
    nights: Number,
    roomType: String,
    amenities: [String]
  }],
  transfers: [{
    title: String,
    description: String,
    details: [String]
  }],
  activities: [{
    title: String,
    description: String,
    duration: String,
    details: [String]
  }],
  knowBeforeYouGo: [String],
  thingsToCarry: [String],
  badge: String ("Bestseller" | "Hot Deal" | "New" | "Popular" | "Top Rated" | "All-Inclusive"),
  isActive: Boolean (default: true),
  isFeatured: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### 2.4 Bookings
```
Collection: bookings
{
  _id: ObjectId,
  bookingId: String (auto-generated, e.g. "LLT-2026-00123"),
  user: ObjectId → users (required, indexed),
  package: ObjectId → packages (required, indexed),
  destination: ObjectId → destinations,
  travelDate: Date (required),
  returnDate: Date,
  travellers: {
    adults: Number,
    children: Number,
    infants: Number
  },
  totalAmount: Number,
  paidAmount: Number,
  paymentStatus: "pending" | "partial" | "paid" | "refunded",
  bookingStatus: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled",
  specialRequests: String,
  contactPhone: String,
  contactEmail: String,
  paymentHistory: [{
    amount: Number,
    method: String,
    transactionId: String,
    date: Date,
    status: String
  }],
  cancellationReason: String,
  cancelledAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 2.5 Reviews
```
Collection: reviews
{
  _id: ObjectId,
  user: ObjectId → users (required, indexed),
  package: ObjectId → packages (required, indexed),
  destination: ObjectId → destinations (indexed),
  booking: ObjectId → bookings,
  rating: Number (1-5, required),
  title: String,
  text: String (required),
  tripType: "honeymoon" | "family" | "solo" | "group" | "business",
  travelDate: Date,
  images: [String],
  isVerified: Boolean (default: false),
  isApproved: Boolean (default: false),
  helpfulCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### 2.6 Enquiries
```
Collection: enquiries
{
  _id: ObjectId,
  type: "general" | "booking" | "support" | "callback" | "group-quote",
  firstName: String (required),
  lastName: String,
  email: String (required),
  phone: String (required),
  destination: String,
  travelDate: Date,
  message: String,
  package: ObjectId → packages,
  status: "new" | "in-progress" | "resolved" | "closed",
  assignedTo: ObjectId → users (admin),
  notes: [{ text: String, by: ObjectId, date: Date }],
  source: String ("website" | "whatsapp" | "phone"),
  createdAt: Date,
  updatedAt: Date
}
```

### 2.7 Careers
```
Collection: careers
{
  _id: ObjectId,
  title: String (required),
  slug: String (unique),
  department: "operations" | "marketing" | "technology" | "hr" | "finance",
  location: String,
  type: "full-time" | "part-time" | "contract" | "internship",
  experience: String,
  description: String,
  requirements: [String],
  responsibilities: [String],
  benefits: [String],
  salary: { min: Number, max: Number, currency: String },
  isActive: Boolean (default: true),
  applications: [{
    name: String,
    email: String,
    phone: String,
    resume: String (URL),
    coverLetter: String,
    status: "new" | "reviewing" | "shortlisted" | "rejected" | "hired",
    appliedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### 2.8 Newsletter
```
Collection: newsletters
{
  _id: ObjectId,
  email: String (required, unique, indexed),
  name: String,
  favouriteDestination: String,
  isSubscribed: Boolean (default: true),
  subscribedAt: Date,
  unsubscribedAt: Date
}
```

---

## 3. API Endpoints

### 3.1 Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | Public |
| POST | /api/auth/login | Login (returns JWT) | Public |
| POST | /api/auth/forgot-password | Send reset email | Public |
| POST | /api/auth/reset-password | Reset with token | Public |
| GET | /api/auth/verify/:token | Verify email | Public |
| GET | /api/auth/me | Get current user | User |
| POST | /api/auth/logout | Logout (clear cookie) | User |

### 3.2 Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/users | List all users | Admin |
| GET | /api/users/:id | Get user by ID | Admin |
| PUT | /api/users/profile | Update own profile | User |
| PUT | /api/users/password | Change password | User |
| POST | /api/users/wishlist/:packageId | Add to wishlist | User |
| DELETE | /api/users/wishlist/:packageId | Remove from wishlist | User |
| GET | /api/users/wishlist | Get wishlist | User |
| DELETE | /api/users/:id | Delete user | Admin |

### 3.3 Destinations
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/destinations | List all (with filters, search, pagination) | Public |
| GET | /api/destinations/featured | Get featured destinations | Public |
| GET | /api/destinations/:slug | Get by slug | Public |
| POST | /api/destinations | Create destination | Admin |
| PUT | /api/destinations/:id | Update destination | Admin |
| DELETE | /api/destinations/:id | Delete destination | Admin |

### 3.4 Packages
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/packages | List all (filters, search, sort, pagination) | Public |
| GET | /api/packages/featured | Get featured packages | Public |
| GET | /api/packages/:slug | Get by slug (full detail) | Public |
| GET | /api/packages/destination/:destSlug | Get packages by destination | Public |
| POST | /api/packages | Create package | Admin |
| PUT | /api/packages/:id | Update package | Admin |
| DELETE | /api/packages/:id | Delete package | Admin |

### 3.5 Bookings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/bookings | Create booking | User |
| GET | /api/bookings | Get user's bookings | User |
| GET | /api/bookings/:id | Get booking detail | User |
| PUT | /api/bookings/:id/cancel | Cancel booking | User |
| GET | /api/bookings/all | List all bookings | Admin |
| PUT | /api/bookings/:id/status | Update booking status | Admin |

### 3.6 Reviews
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/reviews/package/:packageId | Get reviews for package | Public |
| GET | /api/reviews/destination/:destId | Get reviews for destination | Public |
| POST | /api/reviews | Create review | User |
| PUT | /api/reviews/:id | Update own review | User |
| DELETE | /api/reviews/:id | Delete review | User/Admin |
| PUT | /api/reviews/:id/approve | Approve review | Admin |

### 3.7 Enquiries
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/enquiries | Submit enquiry | Public |
| GET | /api/enquiries | List all enquiries | Admin |
| GET | /api/enquiries/:id | Get enquiry detail | Admin |
| PUT | /api/enquiries/:id | Update status/notes | Admin |

### 3.8 Careers
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/careers | List active roles | Public |
| GET | /api/careers/:slug | Get role detail | Public |
| POST | /api/careers/:id/apply | Submit application | Public |
| POST | /api/careers | Create role | Admin |
| PUT | /api/careers/:id | Update role | Admin |
| DELETE | /api/careers/:id | Delete role | Admin |

### 3.9 Newsletter
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/newsletter/subscribe | Subscribe | Public |
| POST | /api/newsletter/unsubscribe | Unsubscribe | Public |
| GET | /api/newsletter/subscribers | List subscribers | Admin |

---

## 4. Authentication Strategy

- **JWT tokens** stored in HTTP-only cookies (secure, sameSite: strict)
- Access token: 15 minutes expiry
- Refresh token: 7 days expiry (stored in DB)
- Password hashing: bcrypt (12 salt rounds)
- Rate limiting on auth endpoints (5 attempts per 15 min)

---

## 5. Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20+ |
| Framework | Express.js 4.x |
| Database | MongoDB Atlas (or local) |
| ODM | Mongoose 8.x |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Validation | Zod |
| Email | Nodemailer (with templates) |
| File Upload | Multer + Cloudinary |
| Rate Limiting | express-rate-limit |
| CORS | cors |
| Logging | morgan |
| Environment | dotenv |
| TypeScript | ts-node + tsx for dev |

---

## 6. Environment Variables (.env)

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/letslivetours
JWT_SECRET=your-jwt-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

---

## 7. Frontend Integration Points

| Frontend Page | API Calls |
|---------------|-----------|
| Homepage | GET /destinations/featured, GET /packages/featured |
| Destinations listing | GET /destinations (with filters) |
| Destination detail | GET /destinations/:slug, GET /packages/destination/:slug |
| Package detail | GET /packages/:slug, GET /reviews/package/:id |
| Booking flow | POST /bookings (after login) |
| User dashboard | GET /bookings, GET /auth/me, PUT /users/profile |
| Contact form | POST /enquiries |
| Newsletter | POST /newsletter/subscribe |
| Careers | GET /careers, POST /careers/:id/apply |
| Auth pages | POST /auth/login, POST /auth/register |
| Wishlist | POST/DELETE /users/wishlist/:id |
| Reviews | POST /reviews (after booking) |

---

## 8. Build Order (Implementation Phases)

### Phase 1: Foundation
1. Initialize Express server with TypeScript
2. Set up MongoDB connection
3. Create all Mongoose models
4. Set up middleware (CORS, error handler, morgan)
5. Environment config

### Phase 2: Auth & Users
6. User registration & login
7. JWT middleware
8. Password reset flow
9. Profile management
10. Admin role setup

### Phase 3: Core Data
11. Destinations CRUD + seed data
12. Packages CRUD + seed data
13. Search, filter, pagination utilities

### Phase 4: Bookings & Reviews
14. Booking creation flow
15. Booking status management
16. Review submission & approval
17. Rating aggregation

### Phase 5: Supporting Features
18. Enquiry system
19. Newsletter subscription
20. Career listings & applications
21. Wishlist functionality

### Phase 6: Frontend Integration
22. Create Next.js API utility (fetch wrapper)
23. Auth context/provider
24. Replace static data with API calls
25. Add login/register pages
26. Add user dashboard page
27. Add booking flow UI

### Phase 7: Polish
28. Email notifications (booking confirmation, enquiry received)
29. Image upload for reviews
30. Rate limiting & security hardening
31. Error handling & loading states on frontend
32. Seed script with production-ready data

---

## 9. Database Indexes

```
users: { email: 1 } (unique)
destinations: { slug: 1 } (unique), { category: 1 }, { isFeatured: 1 }
packages: { slug: 1 } (unique), { destination: 1 }, { category: 1 }, { price: 1 }, { isFeatured: 1 }
bookings: { user: 1 }, { bookingId: 1 } (unique), { bookingStatus: 1 }
reviews: { package: 1 }, { destination: 1 }, { user: 1 }, { isApproved: 1 }
enquiries: { status: 1 }, { createdAt: -1 }
careers: { slug: 1 } (unique), { department: 1 }, { isActive: 1 }
newsletters: { email: 1 } (unique)
```

---

## 10. Frontend Auth & User Pages

### 10.1 New Pages to Create

| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | Email + password form, "Forgot password?" link, social login buttons (optional) |
| `/register` | Register | First name, last name, email, phone, password, confirm password |
| `/forgot-password` | Forgot Password | Email input → sends reset link via Nodemailer |
| `/reset-password/[token]` | Reset Password | New password + confirm, validates token |
| `/verify-email/[token]` | Email Verification | Auto-verifies on load, shows success/error |
| `/dashboard` | User Dashboard | Overview: upcoming trips, recent bookings, wishlist count |
| `/dashboard/bookings` | My Bookings | List of all bookings with status badges, filters |
| `/dashboard/bookings/[id]` | Booking Detail | Full booking info, itinerary, payment history, cancel option |
| `/dashboard/profile` | Profile Settings | Edit name, email, phone, avatar upload, change password |
| `/dashboard/wishlist` | My Wishlist | Saved packages grid with remove option |
| `/dashboard/reviews` | My Reviews | Reviews user has written, edit/delete options |
| `/admin` | Admin Dashboard | Stats overview (bookings, revenue, users, enquiries) |
| `/admin/bookings` | Manage Bookings | All bookings table with status updates |
| `/admin/destinations` | Manage Destinations | CRUD table for destinations |
| `/admin/packages` | Manage Packages | CRUD table for packages |
| `/admin/enquiries` | Manage Enquiries | Enquiry queue with status management |
| `/admin/users` | Manage Users | User list with role management |
| `/admin/careers` | Manage Careers | Job listings CRUD |
| `/admin/reviews` | Moderate Reviews | Approve/reject pending reviews |

### 10.2 Auth Context & Provider

```
src/
├── context/
│   └── AuthContext.tsx       # React context with user state, login/logout/register functions
├── hooks/
│   ├── useAuth.ts            # Hook to access auth context
│   ├── useRequireAuth.ts     # Redirect to login if not authenticated
│   └── useRequireAdmin.ts    # Redirect if not admin
├── lib/
│   ├── api.ts                # Fetch wrapper with auth headers, token refresh
│   ├── auth.ts               # Login, register, logout, refresh token helpers
│   └── cookies.ts            # Client-side cookie utilities
├── components/
│   ├── auth/
│   │   ├── AuthGuard.tsx     # Wrapper component that checks auth before rendering children
│   │   ├── AdminGuard.tsx    # Wrapper for admin-only pages
│   │   ├── LoginForm.tsx     # Reusable login form component
│   │   ├── RegisterForm.tsx  # Reusable register form component
│   │   └── SocialLogin.tsx   # Google/Facebook OAuth buttons (future)
│   └── dashboard/
│       ├── DashboardNav.tsx  # Sidebar navigation for dashboard
│       ├── BookingCard.tsx   # Booking summary card
│       ├── StatsCard.tsx     # Dashboard stat widget
│       └── ProfileForm.tsx   # Profile edit form
```

### 10.3 Auth Flow

```
1. User visits /login → enters email + password
2. Frontend POSTs to /api/auth/login
3. Server validates credentials, returns:
   - Access token (15min) in HTTP-only cookie
   - Refresh token (7d) in HTTP-only cookie
   - User object in response body
4. AuthContext stores user in state
5. On page refresh → GET /api/auth/me (uses cookie) → restores session
6. On 401 response → auto-call /api/auth/refresh → retry original request
7. On refresh failure → redirect to /login
```

### 10.4 Protected Route Pattern

```tsx
// AuthGuard wraps protected pages
<AuthGuard>
  <DashboardPage />
</AuthGuard>

// AdminGuard for admin pages
<AdminGuard>
  <AdminDashboardPage />
</AdminGuard>
```

---

## 11. Nodemailer Email System

### 11.1 Email Templates

| Template | Trigger | Content |
|----------|---------|---------|
| `welcome.html` | User registers | Welcome message, verify email link |
| `verify-email.html` | Registration | Email verification link (expires 24h) |
| `reset-password.html` | Forgot password | Reset link (expires 1h) |
| `booking-confirmation.html` | Booking created | Booking ID, package details, travel dates, amount |
| `booking-cancelled.html` | Booking cancelled | Cancellation confirmation, refund info |
| `enquiry-received.html` | Enquiry submitted | Confirmation to user that we received their message |
| `enquiry-admin.html` | Enquiry submitted | Notification to admin team |
| `application-received.html` | Job application | Confirmation to applicant |
| `newsletter-welcome.html` | Newsletter signup | Welcome + first travel tips |

### 11.2 Email Service Structure

```
server/
├── services/
│   └── emailService.ts       # Nodemailer transporter + send function
├── templates/
│   ├── base.html             # Base layout (header, footer, branding)
│   ├── welcome.html
│   ├── verify-email.html
│   ├── reset-password.html
│   ├── booking-confirmation.html
│   ├── booking-cancelled.html
│   ├── enquiry-received.html
│   ├── enquiry-admin.html
│   ├── application-received.html
│   └── newsletter-welcome.html
```

### 11.3 Nodemailer Config

```ts
// Uses Gmail SMTP or any SMTP provider
// In production: SendGrid, AWS SES, or Mailgun recommended
{
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
}
```

---

## 12. Security Middleware Stack

### 12.1 Middleware Order (applied in Express app)

```ts
// 1. Helmet — sets security HTTP headers
app.use(helmet());

// 2. CORS — restrict to frontend origin
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

// 3. Rate Limiting — prevent brute force
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api/auth', authLimiter);
app.use('/api', apiLimiter);

// 4. Body Parser — with size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 5. Cookie Parser — for reading JWT cookies
app.use(cookieParser());

// 6. Mongo Sanitize — prevent NoSQL injection
app.use(mongoSanitize());

// 7. XSS Clean — sanitize user input
app.use(xss());

// 8. HPP — prevent HTTP parameter pollution
app.use(hpp());

// 9. Morgan — request logging
app.use(morgan('dev'));

// 10. Compression — gzip responses
app.use(compression());
```

### 12.2 Auth Middleware

```ts
// JWT verification middleware
const protect = async (req, res, next) => {
  // 1. Read token from HTTP-only cookie
  // 2. Verify with jsonwebtoken
  // 3. Find user in DB
  // 4. Attach user to req.user
  // 5. Call next() or return 401
};

// Admin check middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  next();
};
```

### 12.3 Encryption & Hashing

| What | Library | Method |
|------|---------|--------|
| Passwords | bcryptjs | Hash with 12 salt rounds |
| JWT tokens | jsonwebtoken | Sign with HS256 algorithm |
| Reset tokens | crypto | randomBytes(32).toString('hex') |
| Verification tokens | crypto | randomBytes(32).toString('hex') |
| Token hashing (stored in DB) | crypto | createHash('sha256').update(token).digest('hex') |

---

## 13. NPM Packages (Backend)

```json
{
  "dependencies": {
    "express": "^4.18.x",
    "mongoose": "^8.x",
    "jsonwebtoken": "^9.x",
    "bcryptjs": "^2.4.x",
    "cookie-parser": "^1.4.x",
    "cors": "^2.8.x",
    "dotenv": "^16.x",
    "helmet": "^7.x",
    "express-rate-limit": "^7.x",
    "express-mongo-sanitize": "^2.x",
    "hpp": "^0.2.x",
    "morgan": "^1.10.x",
    "compression": "^1.7.x",
    "nodemailer": "^6.x",
    "multer": "^1.4.x",
    "cloudinary": "^2.x",
    "zod": "^3.x",
    "slugify": "^1.6.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/express": "^4.x",
    "@types/node": "^20.x",
    "@types/jsonwebtoken": "^9.x",
    "@types/bcryptjs": "^2.x",
    "@types/cookie-parser": "^1.x",
    "@types/cors": "^2.x",
    "@types/morgan": "^1.x",
    "@types/compression": "^1.x",
    "@types/nodemailer": "^6.x",
    "@types/multer": "^1.x",
    "@types/hpp": "^0.2.x",
    "tsx": "^4.x",
    "nodemon": "^3.x"
  }
}
```

---

## 14. Updated Build Order (Revised Phases)

### Phase 1: Server Foundation (Day 1)
1. Initialize Express + TypeScript in `server/`
2. Set up all security middleware (helmet, cors, rate-limit, sanitize, hpp, compression)
3. MongoDB connection with Mongoose
4. Environment config + validation
5. Global error handler + async wrapper
6. Morgan logging

### Phase 2: Models & Auth (Day 2)
7. Create all 8 Mongoose models with validation
8. User registration with bcrypt password hashing
9. Login with JWT (access + refresh tokens in HTTP-only cookies)
10. Auth middleware (protect + adminOnly)
11. Email verification flow (Nodemailer + crypto tokens)
12. Forgot/reset password flow (Nodemailer + hashed tokens)
13. GET /me endpoint for session restoration

### Phase 3: Core CRUD (Day 3)
14. Destinations CRUD + slug generation + filters/search/pagination
15. Packages CRUD + slug generation + filters/sort/pagination
16. Seed script with all existing static data from frontend
17. Reviews CRUD + rating aggregation on package/destination

### Phase 4: Bookings & Enquiries (Day 4)
18. Booking creation (validates package, calculates total)
19. Booking status management + cancellation
20. Booking confirmation email (Nodemailer)
21. Enquiry submission + admin notification email
22. Newsletter subscribe/unsubscribe
23. Career listings + job application with resume upload

### Phase 5: Frontend Auth Pages (Day 5)
24. AuthContext provider + useAuth hook
25. API fetch wrapper with auto token refresh
26. `/login` page (styled to match site design)
27. `/register` page
28. `/forgot-password` + `/reset-password/[token]` pages
29. `/verify-email/[token]` page
30. Update Navbar with auth state (show user avatar/name or Sign In button)

### Phase 6: User Dashboard (Day 6)
31. Dashboard layout with sidebar nav
32. `/dashboard` — overview stats
33. `/dashboard/bookings` — booking list + detail
34. `/dashboard/profile` — edit profile + change password
35. `/dashboard/wishlist` — saved packages
36. `/dashboard/reviews` — user's reviews

### Phase 7: Admin Panel (Day 7)
37. Admin layout with sidebar
38. `/admin` — stats dashboard (total bookings, revenue, users)
39. `/admin/bookings` — manage all bookings
40. `/admin/destinations` — CRUD interface
41. `/admin/packages` — CRUD interface
42. `/admin/enquiries` — enquiry queue
43. `/admin/users` — user management
44. `/admin/careers` — job listings management
45. `/admin/reviews` — moderation queue

### Phase 8: Integration & Polish (Day 8)
46. Replace all static data in frontend with API calls
47. Add loading skeletons + error states
48. Wishlist toggle on package cards (connected to API)
49. Review submission after booking completion
50. Contact form → creates enquiry via API
51. Newsletter form → subscribes via API
52. Career apply button → submits application via API
53. Final testing + bug fixes

---

## 15. Security Considerations

- Input sanitization (express-mongo-sanitize)
- XSS protection (helmet + manual sanitization)
- Rate limiting on all public POST endpoints (stricter on auth)
- File upload size limits (5MB max, images only)
- CORS restricted to frontend origin only
- HTTP-only, Secure, SameSite=Strict cookies for tokens
- Password strength validation (min 8 chars, 1 uppercase, 1 number, 1 special)
- Request body size limit (10KB default, 5MB for file uploads)
- MongoDB injection prevention via Mongoose schema validation + mongo-sanitize
- Token rotation on refresh (old refresh token invalidated)
- Account lockout after 5 failed login attempts (15 min cooldown)
- All sensitive routes behind auth middleware
- Admin routes behind additional role check
- No sensitive data in JWT payload (only userId + role)
- Hashed reset/verification tokens stored in DB (never store raw)
- HTTPS enforced in production (trust proxy for reverse proxy setups)
