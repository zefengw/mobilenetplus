# Project Overview:
Use this guide to build a web app where users can view Mobile, Internet, TV, Security, and Accessories from a store called MobileNet Plus. You are already given most of frontend code and I need you to make sure the app is working as expected. There should be no errors in the console and the UI should be responsive and functional. Make sure that the routes are working as expected and the pages are loading as expected. 

# Tech Stack:

- Next.js 
- TailwindCSS 
- Lucide Icons 
- Shadcn UI 
- React 
- TypeScript 
- App Router
- Firebase

# Project Requirements

## 1. Frontend Implementation
- Ensure the app is working as expected
- Eliminate all console errors
- Verify UI responsiveness and functionality
- Validate all routes are working correctly
- Ensure proper page loading
- Restructure code into components and pages as needed for optimal functionality

## 2. Firebase Authentication
- Implement Firebase authentication for login/signup
- Store all user data in Firebase
- Utilize existing login and signup pages

## 3. Admin Dashboard Implementation
- Create new admin dashboard
- Implement role-based access control for selected users
- Enable CRUD operations for products via admin dashboard

### 3.1 Admin Dashboard Navigation
The admin dashboard should include a sidebar with the following pages:

| Page | Functionality |
|------|--------------|
| **Dashboard** | Default landing page for admin login |
| **Mobile** | Table view of mobile products with CRUD operations |
| **Internet** | Table view of internet products with CRUD operations |
| **TV** | Table view of TV products with CRUD operations |
| **Security** | Table view of security products with CRUD operations |
| **Accessories** | Table view of accessories with CRUD operations |
| **Users** | Table view of users with CRUD operations |
| **Settings** | - User management (add/edit/delete) <br> - Admin access control (grant/revoke) |
| **Logout** | Log out functionality with redirect to login page |

## 4. Translation Feature Enhancement
- Expand existing navbar translation functionality
- Implement translation across all pages
- Ensure consistent translation throughout the application

## 5. Real-time Database Updates
- Implement immediate database updates for:
  - Service plan creation
  - Service plan updates
  - Service plan deletion
- Ensure automatic translation updates following database changes
- Apply same real-time updates for accessories



# File Structure:
MOBILENETPLUS/
├── .next/
├── app/
│   ├── accessories/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── data/
│   │   └── accessories.ts
│   │   └── plans.ts
│   ├── fonts/
│   ├── internet/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── mobile/
│   │   └── page.tsx
│   ├── security/
│   │   └── page.tsx
│   ├── spin-the-wheel/
│   │   └── page.tsx
│   ├── tv/
│   │   └── page.tsx
│   ├── types/
│   │   └── types.ts
│   ├── utils/
│   │   └── scroll-utils.ts
│   │   └── scroll-to-top.ts
│   │   └── translations.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── FeaturedOffers.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LimitedTimeOffers.tsx
│   ├── LoadingScreen.tsx
│   ├── ScrollProgressBar.tsx
│   └── Breadcrumbs.tsx
│   └── Hero.tsx
│   └── TranslationContext.tsx
├── instructions/
│   └── instructions.md
├── lib/
│   └── utils.ts
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
├── tailwind.config.ts
└── tsconfig.json

# Rules

- All new components should be added to the components folder and named like example-component.tsx unless otherwise specified
- All new pages should be added to src/app/folder-name and named like example-page.tsx unless otherwise specified
- Reference the file structure and rules above throughout the process.
