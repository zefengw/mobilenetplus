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
- 2.1: After the user registers, they should be automatically logged in
- 2.2: After the user is logged in, the button that takes the user to the login page should be changed to a dropdown menu that displays the options of Admin Dashboard (depending on if the user is an admin or not) and Logout. The styles should be consistent with the rest of the app.

## 3. Admin Dashboard Implementation
- Create new admin dashboard (Can be done through Firebase if possible)
- Implement role-based access control for selected users
- Enable CRUD operations for all products (Mobile, Internet, TV, Security, Accessories) via admin dashboard

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
├── README.md
├── app
│   ├── accessories
│   │   └── page.tsx
│   ├── admin
│   │   ├── accessories
│   │   │   └── page.tsx
│   │   ├── internet
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── mobile
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── security
│   │   │   └── page.tsx
│   │   ├── tv
│   │   │   └── page.tsx
│   │   └── users
│   │       └── page.tsx
│   ├── api
│   │   └── admin
│   │       ├── stats
│   │       │   └── route.ts
│   │       └── users
│   │           ├── route.ts
│   │           └── toggle-admin
│   │               └── route.ts
│   ├── components
│   │   ├── ClientLayout.tsx
│   │   ├── Header.tsx
│   │   ├── ProductTable.tsx
│   │   └── ui
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── dropdown-menu.tsx
│   │       └── switch.tsx
│   ├── config
│   │   ├── firebase-admin.ts
│   │   ├── firebase-client.ts
│   │   └── firebase.ts
│   ├── contact
│   │   └── page.tsx
│   ├── contexts
│   │   └── AuthContext.tsx
│   ├── data
│   │   ├── accessories.ts
│   │   └── plans.ts
│   ├── favicon.ico
│   ├── fonts
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── globals.css
│   ├── internet
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── lib
│   │   ├── firebase-admin.ts
│   │   ├── firebase-utils.ts
│   │   ├── seed-data.ts
│   │   └── utils.ts
│   ├── login
│   │   └── page.tsx
│   ├── mobile
│   │   └── page.tsx
│   ├── page.tsx
│   ├── security
│   │   └── page.tsx
│   ├── spin-the-wheel
│   │   └── page.tsx
│   ├── tv
│   │   └── page.tsx
│   ├── types
│   │   ├── plans.ts
│   │   └── product.ts
│   └── utils
│       ├── scroll-to-top.ts
│       ├── scroll-utils.ts
│       └── translations.ts
├── components
│   ├── Breadcrumb.tsx
│   ├── FeaturedOffers.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── LimitedTimeOffers.tsx
│   ├── LoadingScreen.tsx
│   ├── ScrollProgressBar.tsx
│   ├── TranslationContext.tsx
│   └── ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       └── textarea.tsx
├── components.json
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── instructions
│   └── instructions.md
├── lib
│   └── utils.ts
├── next-env.d.ts
├── next.config.js
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── postcss.config.mjs
├── scripts
│   ├── seed-db.ts
│   └── set-admin.ts
├── tailwind.config.js
├── tailwind.config.ts
└── tsconfig.json

# Rules

- All new components should be added to the components folder and named like example-component.tsx unless otherwise specified
- All new pages should be added to src/app/folder-name and named like example-page.tsx unless otherwise specified
- Reference the file structure and rules above throughout the process.
