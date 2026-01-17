# Complete File Listing - Church Website

## 📂 Directory Structure

```
church-website/
│
├── 📁 public/
│   ├── 📁 images/
│   │   ├── logo.png (add your logo)
│   │   ├── hero-bg.jpg (add hero background)
│   │   └── placeholder.jpg (add placeholder)
│   └── favicon.ico
│
├── 📁 src/
│   │
│   ├── 📁 app/
│   │   ├── layout.js ✅
│   │   ├── page.js ✅
│   │   ├── globals.css ✅
│   │   │
│   │   ├── 📁 about/
│   │   │   └── page.js ✅
│   │   │
│   │   ├── 📁 sermons/
│   │   │   └── page.js ✅
│   │   │
│   │   ├── 📁 events/
│   │   │   └── page.js ✅
│   │   │
│   │   ├── 📁 giving/
│   │   │   └── page.js ✅
│   │   │
│   │   ├── 📁 ministries/
│   │   │   └── page.js ✅
│   │   │
│   │   ├── 📁 membership/ ⭐ NEW
│   │   │   └── page.js ✅
│   │   │
│   │   ├── 📁 contact/
│   │   │   └── page.js ✅
│   │   │
│   │   └── 📁 admin/
│   │       └── 📁 memberships/ ⭐ NEW
│   │           └── page.js ✅
│   │
│   ├── 📁 components/
│   │   ├── Header.js ✅
│   │   ├── Footer.js ✅
│   │   ├── Hero.js ✅
│   │   ├── ServiceTimes.js ✅
│   │   ├── UpcomingEvents.js ✅
│   │   ├── BibleVerse.js ⭐ NEW ✅
│   │   ├── LivestreamCounter.js ✅
│   │   └── NewsletterSignup.js ✅
│   │
│   └── 📁 lib/
│       └── firebase.js ✅
│
├── .env.local (create this - see guide)
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
└── README.md
```

---

## ✅ Files You've Received

### Core Configuration Files

1. **src/lib/firebase.js** - Firebase configuration
2. **src/styles/globals.css** - Global styles and Tailwind

### Layout & Components

3. **src/app/layout.js** - Root layout with Header/Footer
4. **src/components/Header.js** - Navigation header with mobile menu
5. **src/components/Footer.js** - Footer with links and social media
6. **src/components/Hero.js** - Homepage hero section
7. **src/components/ServiceTimes.js** - Service times display
8. **src/components/UpcomingEvents.js** - Events preview
9. **src/components/BibleVerse.js** ⭐ - Dynamic Bible verses
10. **src/components/LivestreamCounter.js** - Countdown to next service
11. **src/components/NewsletterSignup.js** - Newsletter subscription

### Page Components

12. **src/app/page.js** - Homepage with Bible verse
13. **src/app/about/page.js** - About Us page
14. **src/app/sermons/page.js** - Sermons archive
15. **src/app/events/page.js** - Events calendar
16. **src/app/giving/page.js** - Online giving
17. **src/app/ministries/page.js** - All ministries
18. **src/app/membership/page.js** ⭐ - Membership registration
19. **src/app/contact/page.js** - Contact form
20. **src/app/admin/memberships/page.js** ⭐ - Admin dashboard

---

## 📝 Files You Need to Create

### 1. Environment Variables

**File:** `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### 2. Next.js Configuration

**File:** `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
```

### 3. Tailwind Configuration

**File:** `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. PostCSS Configuration

**File:** `postcss.config.js`

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 5. JavaScript Configuration

**File:** `jsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 6. Git Ignore

**File:** `.gitignore`

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Misc
.DS_Store
*.pem

# Vercel
.vercel
```

---

## 🎯 New Features Summary

### 1. Dynamic Bible Verses ⭐
- **File:** `src/components/BibleVerse.js`
- **Features:**
  - 25 pre-loaded Bible verses
  - Auto-rotates every 30 seconds
  - Manual refresh button
  - Beautiful gradient design
  - Smooth transitions
- **Usage:** Added to homepage (`src/app/page.js`)

### 2. Membership Registration System ⭐
- **File:** `src/app/membership/page.js`
- **Features:**
  - 4-step multi-page form
  - Progress indicator
  - Personal information collection
  - Spiritual journey questions
  - Ministry interest selection
  - Emergency contact
  - Membership covenant agreement
  - Firebase integration
  - Success confirmation page

### 3. Admin Membership Dashboard ⭐
- **File:** `src/app/admin/memberships/page.js`
- **Features:**
  - View all applications
  - Filter by status (pending/approved/rejected)
  - Detailed member profiles
  - Approve/reject applications
  - Search and sort functionality
  - Real-time Firebase sync

---

## 🗄️ Firebase Collections

You need to create these in Firebase Console:

### 1. memberships
```javascript
{
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  dateOfBirth: string,
  gender: string,
  maritalStatus: string,
  address: string,
  city: string,
  state: string,
  zipCode: string,
  salvationDate: string,
  baptized: string,
  baptismDate: string,
  previousChurch: string,
  membershipReason: string,
  ministryInterests: array,
  servingExperience: string,
  spiritualGifts: array,
  availability: array,
  emergencyName: string,
  emergencyRelationship: string,
  emergencyPhone: string,
  agreeStatement: boolean,
  agreeCommitment: boolean,
  submittedAt: timestamp,
  status: string, // pending, approved, rejected
  approvedBy: string,
  approvedAt: timestamp
}
```

### 2. sermons
```javascript
{
  title: string,
  speaker: string,
  date: timestamp,
  series: string,
  duration: string,
  videoUrl: string,
  audioUrl: string,
  description: string,
  views: number
}
```

### 3. events
```javascript
{
  title: string,
  date: timestamp,
  endTime: timestamp,
  location: string,
  category: string,
  description: string,
  capacity: number,
  registered: number,
  contactPerson: string,
  contactEmail: string
}
```

### 4. contacts
```javascript
{
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  contactReason: string,
  timestamp: timestamp,
  status: string
}
```

### 5. newsletter
```javascript
{
  email: string,
  subscribedAt: timestamp,
  status: string
}
```

---

## 🚀 Quick Start Commands

```bash
# 1. Create project
npx create-next-app@latest church-website

# 2. Navigate to project
cd church-website

# 3. Install dependencies
npm install firebase react-icons date-fns react-hook-form

# 4. Create environment file
touch .env.local
# Add your Firebase credentials

# 5. Run development server
npm run dev

# 6. Open browser
# Visit http://localhost:3000
```

---

## ✨ Feature Checklist

### Core Pages
- [x] Homepage with hero
- [x] About Us
- [x] Sermons archive
- [x] Events calendar
- [x] Online giving
- [x] Ministries
- [x] Contact form
- [x] Membership registration ⭐
- [x] Admin dashboard ⭐

### Components
- [x] Responsive header/nav
- [x] Footer with links
- [x] Service times
- [x] Upcoming events
- [x] Newsletter signup
- [x] Livestream counter
- [x] Dynamic Bible verses ⭐

### Features
- [x] Mobile responsive
- [x] Firebase integration
- [x] Form validation
- [x] Multi-step forms
- [x] Real-time data
- [x] Auto-rotating content
- [x] Admin approval system

---

## 🎓 Learning Resources

- **Next.js:** https://nextjs.org/learn
- **React:** https://react.dev/learn
- **Firebase:** https://firebase.google.com/docs/web/setup
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Icons:** https://react-icons.github.io

---

## 📞 Need Help?

If you encounter issues:

1. Check all files are in correct locations
2. Verify `.env.local` has correct Firebase credentials
3. Ensure Firebase collections are created
4. Check console for error messages
5. Verify all npm packages are installed

---

## 🎉 You're All Set!

Your complete church website with:
- ✅ 8 full pages
- ✅ 11 reusable components
- ✅ Dynamic Bible verses
- ✅ Membership registration system
- ✅ Admin dashboard
- ✅ Firebase integration
- ✅ Mobile responsive design

**Happy building! 🙏**