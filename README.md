# CarbonX - MERN Stack ESG Compliance Platform

A comprehensive web application for managing Environmental, Social, and Governance (ESG) compliance and sustainability reporting, built with the MERN stack (MongoDB, Express, React, Node.js).


## 🌍 Overview

CarbonX is an ESG (Environmental, Social, and Governance) compliance platform designed to help organizations track, manage, and report on their sustainability initiatives. The platform supports BRSR (Business Responsibility and Sustainability Reporting) standards and provides tools for entity onboarding, compliance tracking, and analytics.

## ✨ Features

### Authentication & Security
- User registration and login with JWT tokens
- Role-based access control (User/Admin)
- Secure password hashing with bcryptjs
- Token-based authorization via headers

### Admin Dashboard
- **Entity Onboarding**: Register and manage entities with ESG metadata
- **User Management**: View and manage user accounts
- **Special Calculator**: Admin-exclusive calculation tool with custom rules
- **Analytics Dashboard**: Track system performance and engagement metrics
- **System Monitoring**: Real-time uptime, database performance, and API response metrics
- **Activity Tracking**: Monitor recent system activities and compliance status

### User Dashboard
- Profile management
- Access to reports
- Activity tracking
- Quick navigation and statistics

### Entity Management
- Support for multiple industries (Energy, Manufacturing, Transportation, Agriculture, Technology, Finance, Healthcare, Retail)
- ESG/BRSR standard selection (BRSR, GRI, SASB, TCFD, CDP, DJSI)
- Multi-region support
- Entity registration with compliance tracking
- Automatic deadline management (BRSR Annual Report: March 31)

### Special Calculator (Admin Only)
- Custom arithmetic operations with inverted logic
- Add operation performs multiplication
- Multiply operation performs subtraction
- Calculation history tracking
- Real-time result display

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (create `.env` file)
   ```
   MONGODB_URI=mongodb://localhost:27017/carbonx
   JWT_SECRET=your_secret_key_here
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm run dev          # Development with nodemon
   npm start            # Production
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   Application will open on `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## ⚙️ Configuration

### Tailwind CSS Configuration
The project uses Tailwind CSS with custom color extensions:

- **Primary**: `#0f766e` (Teal)
- **Secondary**: `#2dd4bf` (Cyan)
- **Accent**: `#5eead4` (Light Teal)
- **Dark**: `#0f172a` (Navy)
- **Light**: `#f8fafc` (Off-white)

See [client/tailwind.config.js](client/tailwind.config.js) for full configuration.

### Calculator Routes
Base URL: `http://localhost:5000/api/calculator`
**Access**: Admin only

#### 1. **POST /calculate**
Perform calculation with special rules

**Special Rules**
- `add`: Performs multiplication (5 + 3 = 5 × 3 = 15)
- `multiply`: Performs subtraction (5 × 3 = 5 - 3 = 2)

## 🔐 Authentication

### JWT Token
- Generated on successful login/signup
- Stored in localStorage as `token`
- Expires in 24 hours
- Sent via `x-auth-token` header in requests

### Middleware
- [`auth`](server/middleware/auth.js): Verifies JWT token
- [`adminAuth`](server/middleware/auth.js): Verifies JWT and checks admin role

### Request Interceptor
The [axiosConfig.js](client/src/utils/axiosConfig.js) automatically:
- Attaches JWT token to all requests
- Handles 401 responses by clearing auth data and redirecting to login

## 👥 User Roles

### User Role
- Access user dashboard
- View own profile
- Access reports
- View activity

### Admin Role
- Access admin dashboard
- Manage users
- Access special calculator
- Entity onboarding
- System analytics
- Full application access

## 📊 Database Schema

### User Model
Located in [server/models/User.js](server/models/User.js)

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, min 6 chars, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (default: now)
}
```

**Methods**
- `comparePassword(candidatePassword)`: Validates password against hash
- Pre-save hook: Automatically hashes password using bcryptjs (10 salt rounds)

## 🎨 Frontend Components

### Authentication Components

#### [Login.jsx](client/src/components/Auth/Login.jsx)
- Email and password input fields
- Form validation
- Error handling
- Redirect to appropriate dashboard based on role
- Demo credentials display

#### [Signup.jsx](client/src/components/Auth/Signup.jsx)
- Full name, email, password inputs
- Role selection (User/Admin)
- Password strength validation (min 6 characters)
- Automatic form clearing on success

### Dashboard Components

#### [AdminDashboard.jsx](client/src/components/Dashboard/AdminDashboard.jsx)
**Features**
- Multi-tab navigation system
- Responsive sidebar navigation
- Real-time statistics cards
- Quick action buttons
- Recent activity tracking
- System health monitoring
- User management table
- Entity onboarding form
- Analytics dashboard
- Settings panel

**Tabs**
1. **Dashboard**: Overview and quick stats
2. **Users**: User account management
3. **Calculator**: Special calculator interface
4. **Entities**: ESG entity registration
5. **Analytics**: Performance metrics
6. **Settings**: Application configuration

**Statistics Tracked**
- Total Users (1,234 demo)
- Entities Registered
- Reports Generated (24 demo)
- Compliance Score (94% demo)

#### [UserDashboard.jsx](client/src/components/Dashboard/UserDashboard.jsx)
- Welcome message
- Profile information
- Quick action cards
- Activity summary
- Responsive layout

#### [Calculator.jsx](client/src/components/Dashboard/Calculator.jsx)
- Number input fields
- Operation selection (Add/Multiply)
- Real-time calculation
- Calculation history (last 5)
- Usage examples
- Result display with operation breakdown
- Clear and calculate buttons

### Utility Components

#### [axiosConfig.js](client/src/utils/axiosConfig.js)
Axios instance with:
- Base URL: `http://localhost:5000/api`
- Request interceptor: Adds JWT token to headers
- Response interceptor: Handles 401 errors and clears auth data

## 🛡️ Protected Routes

Implemented via [`ProtectedRoute`](client/src/App.js) component:

```jsx
<Route path="/user/dashboard" element={
  <ProtectedRoute allowedRoles={['user', 'admin']}>
    <UserDashboard />
  </ProtectedRoute>
} />

<Route path="/admin/dashboard" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminDashboard />
  </ProtectedRoute>
} />
```

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Tailwind CSS breakpoints
- Responsive navigation (hamburger menu on mobile)
- Adaptive grid layouts
- Touch-friendly interfaces

## 🔄 Data Flow

```
User Action
    ↓
React Component
    ↓
axios (axiosConfig.js)
    ↓
Express Server
    ↓
Middleware (auth.js)
    ↓
Routes (auth.js / calculator.js)
    ↓
MongoDB via Mongoose
    ↓
Response → Component → UI Update
```

## 🚨 Error Handling

### Frontend
- Form validation with error messages
- Toast notifications for user feedback
- Automatic redirect on 401 (unauthorized)
- Graceful error display

### Backend
- Input validation via express-validator
- JWT verification
- Role-based authorization checks
- MongoDB error handling
- Proper HTTP status codes

## 🧪 Demo Credentials

For testing, use the following credentials:

**Admin Account**
- Email: `admin@carbonx.com`
- Password: `123456`

**User Account**
- Email: `user@carbonx.com`
- Password: `123456`

> Note: These are demo credentials. Change them for production.

## 📝 Usage Guide

### 1. **User Registration**
- Navigate to signup page
- Fill in name, email, password, and select role
- Click "Create Account"
- Automatically redirected to login

### 2. **User Login**
- Enter email and password
- Admins redirected to admin dashboard
- Users redirected to user dashboard

### 3. **Admin Tasks**

**Entity Onboarding**
1. Go to "Entities" tab
2. Fill in entity details (name, industry, standard, region)
3. Click "Save & Continue"
4. View registered entities in sidebar

**Calculator Usage**
1. Go to "Calculator" tab
2. Enter two numbers
3. Select operation (Add or Multiply)
4. Click "Calculate"
5. View result and calculation history

**User Management**
1. Go to "Users" tab
2. View all registered users
3. Manage permissions and status

### 4. **User Tasks**
- View dashboard overview
- Update profile information
- Access reports
- Track activity

## 🔧 Development

### Available Scripts

**Server**
```bash
npm run dev    # Run with nodemon (auto-restart)
npm start      # Run production build
```

**Client**
```bash
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
```

### Code Standards
- Use ES6+ syntax
- Component-based architecture
- Functional components with hooks
- Proper error handling
- Input validation on both client and server

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or cloud URI is correct
- Check `MONGODB_URI` in `.env`
- Verify network connectivity for cloud MongoDB

### JWT Token Errors
- Clear localStorage and re-login
- Check `JWT_SECRET` matches between client and server
- Verify token expiration (24 hours default)

### CORS Errors
- Ensure server is running on correct port (5000)
- Verify `API_URL` in [axiosConfig.js](client/src/utils/axiosConfig.js)
- Check CORS middleware is enabled in [server.js](server/server.js)

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [BRSR Standards](https://www.bseindia.com/)

## 📄 License

This project is proprietary and intended for ESG compliance management.

## 👨‍💼 Support

For issues or questions, please contact the development team.

---

**Last Updated**: 2024
**Version**: 1.0.0
