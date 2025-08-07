# IELTS Sigma Boy - Authentication System

A comprehensive IELTS preparation platform with user authentication.

## 🔐 Authentication Features

### ✅ Implemented Features
- **User Registration**: Create account with name, email, and password
- **User Login**: Secure login with email and password
- **Form Validation**: Real-time validation with error messages
- **Toast Notifications**: Success and error feedback
- **Protected Routes**: Authentication-based navigation
- **User Context**: Global state management for user data
- **User Statistics**: Track quizzes taken, completion rate, and scores

### 🚨 Security Notice

**⚠️ IMPORTANT: This is a DEMO implementation only!**

For demonstration purposes, passwords are stored as **PLAIN TEXT** in the database. This is **NOT SECURE** for production use!

**For Production:**
```javascript
// Instead of storing plain text passwords:
password: userData.password // ❌ DEMO ONLY

// Use proper password hashing:
const hashedPassword = await bcrypt.hash(userData.password, 12); // ✅ PRODUCTION
```

**Required for Production:**
1. Install bcrypt: `npm install bcrypt @types/bcrypt`
2. Hash passwords before storing
3. Compare hashed passwords during login
4. Implement proper session management
5. Add rate limiting for login attempts
6. Use HTTPS in production
7. Implement proper error logging

## 🚀 Setup Instructions

### 1. Database Setup
The authentication system requires Supabase. Click the "Connect to Supabase" button in the top right to set up your database.

### 2. Environment Variables
Copy `.env.example` to `.env` and add your Supabase credentials:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Migration
The migration file `supabase/migrations/create_users_and_stats.sql` will automatically create:
- `users` table for user accounts
- `user_stats` table for tracking user progress
- Proper indexes and constraints
- Row Level Security policies

## 📊 Database Schema

### Users Table
```sql
users (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL, -- ⚠️ PLAIN TEXT FOR DEMO ONLY
  created_at timestamptz,
  updated_at timestamptz
)
```

### User Stats Table
```sql
user_stats (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  quizzes_taken integer DEFAULT 0,
  completion_rate decimal(5,2) DEFAULT 0.00,
  average_score decimal(5,2) DEFAULT 0.00,
  last_quiz_date timestamptz,
  created_at timestamptz,
  updated_at timestamptz
)
```

## 🔧 API Endpoints

### Registration
```typescript
POST /api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```typescript
POST /api/users/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

## 🎯 Features

### Form Validation
- Real-time validation for all fields
- Email format validation
- Password strength requirements (min 6 characters)
- Password confirmation matching
- Clear error messages

### User Experience
- Loading states during authentication
- Toast notifications for feedback
- Responsive design for all devices
- Smooth transitions and animations
- Persistent login state with localStorage

### Security Features (Demo Level)
- Input sanitization and validation
- Length limits on all input fields
- Character filtering for names and emails
- SQL injection prevention (via Supabase)
- XSS protection
- Form validation
- Error handling

## 🔄 User Flow

1. **Registration**: User creates account → Validation → Store in database → Auto-login → Redirect to tests
2. **Login**: User enters credentials → Validation → Check database → Set user context → Redirect to tests
3. **Logout**: Clear user context → Remove from localStorage → Redirect to home

## 🛠️ Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Custom implementation with Supabase
- **State Management**: React Context API
- **Notifications**: React Hot Toast
- **Validation**: Custom validation functions
- **Storage**: localStorage for session persistence

## 📝 Development Notes

### Code Organization
- `src/services/authService.ts` - Authentication logic
- `src/contexts/AuthContext.tsx` - Global user state
- `src/components/AuthPage.tsx` - Login/Register UI
- `supabase/migrations/` - Database schema

### Error Handling
- Comprehensive error messages
- Input validation and sanitization
- Network error handling
- Form validation errors
- Database constraint errors

### Performance
- Optimized re-renders with React Context
- Efficient form validation
- Minimal API calls
- Proper loading states

## 🚀 Next Steps for Production

1. **Security Hardening**
   - Implement bcrypt password hashing
   - Add JWT tokens for session management
   - Implement rate limiting
   - Add CSRF protection

2. **Enhanced Features**
   - Email verification
   - Password reset functionality
   - Two-factor authentication
   - Social login options
   - Advanced input sanitization
   - Rate limiting for login attempts

3. **Monitoring**
   - Error logging
   - Analytics tracking
   - Performance monitoring
   - Security audit logging