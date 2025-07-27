# Gluu v0.5

> A digital inventory management platform that helps you effortlessly create a digital inventory of your valuable possessions with AI-powered identification and approximate value suggestions.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [User Onboarding Flow](#user-onboarding-flow)
- [Main Features](#main-features)
- [Development Guidelines](#development-guidelines)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [Support](#support)

## Overview

Gluu v0.5 is a modern web application that allows users to create and manage a digital inventory of their valuable possessions. The platform leverages AI technology to help identify items and provide approximate value suggestions, making it easy for users to catalog and track their belongings digitally.

## Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.8
- **Routing**: React Router DOM 7.6.1
- **Language**: JavaScript
- **UI Libraries**:
  - React Hot Toast (notifications)
  - React Icons
  - React Spinners (loading states)

### Backend
- **Server**: Express.js 5.1.0
- **Database & Auth**: Supabase
- **Payment Processing**: Stripe 18.3.0
- **Environment**: Node.js
- **Additional**:
  - CORS for cross-origin requests
  - dotenv for environment variables

## Project Structure

```
gluu/
├── public/                 # Static assets
├── server/                 # Express.js backend server
│   ├── node_modules/      # Server dependencies
│   ├── index.js           # Main server file (Stripe integration)
│   ├── webhook.js         # Stripe webhook handler
│   ├── package.json       # Server dependencies
│   └── .env               # Server environment variables
├── src/                   # React frontend
│   ├── components/         # Reusable UI components
│   │   ├── Navbar/        # Navigation component
│   │   ├── Chatbot/       # AI chatbot component
│   │   ├── Hero/          # Landing page hero section
│   │   ├── Footer/        # Footer component
│   │   ├── Modal/         # Modal dialogs
│   │   ├── PricingPlan/   # Pricing display components
│   │   ├── WalletHeader/  # Wallet dashboard header
│   │   ├── Newsletter/    # Newsletter signup
│   │   ├── TopBar/        # Top navigation bar
│   │   ├── Promotion/     # Promotional components
│   │   ├── GreetingRobot/ # Welcome animations
│   │   ├── HowItWorks/    # Feature explanation components
│   │   ├── OurMission/    # About section components
│   │   ├── OurPartners/   # Partner logos/info
│   │   ├── WhatWeOffer/   # Features showcase
│   │   ├── WhoUsesGluu/   # User testimonials
│   │   ├── WhyChooseGluu/ # Benefits section
│   │   ├── FooterPromotion/ # Footer promotional content
│   │   └── OnboardingInstructions/ # Onboarding guidance
│   ├── pages/             # Main application pages
│   │   ├── Home/          # Landing page
│   │   ├── About/         # About page
│   │   ├── HowItWorks/    # How it works explanation
│   │   ├── Pricing/       # Pricing information
│   │   ├── SignUpLanding/ # User registration
│   │   ├── Login/         # User authentication
│   │   ├── Upgrade/       # Premium upgrade page
│   │   ├── Wallet/        # User dashboard/wallet
│   │   ├── Onboarding/    # Multi-step onboarding
│   │   │   ├── Step1.jsx
│   │   │   ├── Step2.jsx
│   │   │   ├── Step3.jsx
│   │   │   ├── Step4.jsx
│   │   │   └── OnboardingAiLoading.jsx
│   │   ├── AddNewItem/    # Add items to inventory
│   │   ├── ItemDetails/   # Individual item details
│   │   ├── AiLoading/     # AI processing loading
│   │   └── AiInsights/    # AI-generated insights
│   ├── context/           # React contexts
│   │   ├── OnboardingContext.jsx
│   │   └── NewItemContext.jsx
│   ├── helper/            # Utility functions
│   │   └── SupabaseClient.js
│   ├── assets/            # Images, icons, etc.
│   ├── App.jsx            # Main application component
│   ├── App.css            # Global styles
│   ├── index.css          # Base styles
│   └── main.jsx           # Application entry point
├── .env                   # Environment variables
├── package.json
├── vite.config.js
├── vercel.json           # Deployment configuration
└── index.html
```

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v16.0 or higher)
- **npm** (v7.0 or higher)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gluudevteam/gluu.git
   cd gluu
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   **Frontend (.env in root directory):**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```
   
   **Server (.env in server directory):**
   ```bash
   cd server
   cp .env.example .env
   # Edit with your Stripe and Supabase credentials
   cd ..
   ```

5. **Start the backend server**
   ```bash
   cd server
   node index.js
   # Server will run on http://localhost:4242
   cd ..
   ```

6. **Start the frontend development server** (in a new terminal)
   ```bash
   npm run dev
   # Frontend will run on http://localhost:5173
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## User Onboarding Flow

### New User Journey

1. **Landing Page** (`/`)
   - Introduction to Gluu's digital inventory features
   - Sign up/Sign in options
   - How it works and pricing information

2. **Registration** (`/signup`)
   - User account creation via Supabase Auth
   - Email verification and authentication

3. **Multi-Step Onboarding** (`/onboarding-step1` through `/onboarding-step4`)
   - **Step 1**: Welcome and initial setup
   - **Step 2**: Preferences and configuration
   - **Step 3**: Tutorial and feature introduction
   - **Step 4**: Final setup completion
   - **AI Loading**: Processing user setup with AI assistance

4. **Wallet Dashboard** (`/wallet`)
   - Main inventory management interface
   - Overview of cataloged items
   - Access to add new items and view insights

### Core User Workflow

1. **Add New Item** (`/add-new-item`)
   - Upload images or input item details
   - AI processing for identification

2. **AI Processing** (`/ai-loading`)
   - AI analyzes item information
   - Generates identification and value estimates

3. **AI Insights** (`/ai-insights`)
   - View AI-generated item details
   - Approximate value suggestions
   - Item categorization and descriptions

4. **Item Management** (`/item-details/:id`)
   - View detailed item information
   - Edit item details
   - Track item history and updates

### Returning User Flow

1. **Login** (`/login`)
   - Supabase authentication
   - Session management

2. **Wallet Dashboard** (`/wallet`)
   - Direct access to inventory
   - Recent items and activity

## Main Features

- **AI-Powered Item Identification**: Automatically identify items from images
- **Value Estimation**: Get approximate value suggestions for your possessions
- **Digital Inventory Management**: Organize and categorize your valuable items
- **Subscription Management**: Premium plans with Stripe payment processing
- **Multi-Step Onboarding**: Guided setup process for new users
- **Interactive Chatbot**: Get help and assistance throughout the platform
- **Responsive Design**: Works seamlessly across devices
- **Real-time Notifications**: Toast notifications for user feedback
- **Secure Authentication**: Powered by Supabase Auth
- **Webhook Integration**: Real-time payment status updates

## Development Guidelines

### Code Style

- Use functional components with hooks
- Follow React 19 best practices
- Use Tailwind CSS utility classes for styling
- Implement responsive design patterns
- Use Context API for global state management
- Handle loading states with React Spinners

### Component Architecture

- **Pages**: Route-level components in `/pages`
- **Components**: Reusable UI components in `/components`
- **Context**: Global state management in `/context`
- **Helper**: Utility functions and configurations in `/helper`

### State Management

- **OnboardingContext**: Manages onboarding flow state
- **NewItemContext**: Handles new item creation workflow
- **Supabase Session**: User authentication and session management

### File Naming Conventions

- Components: PascalCase (`Navbar.jsx`)
- Pages: PascalCase (`Home.jsx`)
- Context: PascalCase with Context suffix (`OnboardingContext.jsx`)
- Utilities: camelCase (`SupabaseClient.js`)

## Available Scripts

### Frontend Scripts
- `npm run dev` - Start frontend development server on port 5173
- `npm run build` - Build frontend for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

### Backend Scripts
- `cd server && node index.js` - Start Express server on port 4242
- `cd server && npm test` - Run backend tests (if configured)

## Environment Variables

### Frontend Environment Variables
Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Add other frontend environment variables as needed
```

### Server Environment Variables
Create a `.env` file in the `server/` directory:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Supabase Configuration (Service Role)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Architecture Notes

### Full-Stack Architecture

**Frontend (React + Vite)**
- Handles user interface and interactions
- Manages authentication state with Supabase
- Communicates with backend for payment processing
- Runs on port 5173 in development

**Backend (Express.js)**
- Processes Stripe payment sessions
- Handles webhook events for subscription updates
- Updates user plans in Supabase database
- Runs on port 4242

### Route Configuration

- **Public Routes**: Home, About, How It Works, Pricing
- **Auth Routes**: Login, Signup (navbar hidden)
- **Protected Routes**: Wallet, Add New Item, Item Details
- **Onboarding Routes**: Step 1-4 (navbar and chatbot hidden)
- **Payment Routes**: Upgrade (integrates with Stripe backend)

### Payment Flow

1. **User clicks upgrade** → `/upgrade` page
2. **Frontend calls backend** → `POST /create-checkout-session`
3. **Stripe session created** → User redirected to Stripe Checkout
4. **Payment completed** → Stripe webhook triggers
5. **Backend processes webhook** → Updates user plan in Supabase
6. **User redirected back** → `/wallet?success=true`

### Context Providers

- **SessionContextProvider**: Wraps entire app for Supabase auth
- **OnboardingProvider**: Manages onboarding flow state
- **NewItemProvider**: Handles item creation workflow

### Database Schema

The backend expects a `users` table in Supabase with:
- `email` (text)
- `plan` (text) - updated to "client_plus" after payment
- `upload_limit` (integer) - updated to 200 for premium users
- `stripe_customer_id` (text) - stores Stripe customer ID

## Contributing

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding guidelines
   - Test with the development server
   - Ensure responsive design works

3. **Submit a pull request**
   - Provide clear description of changes
   - Include screenshots for UI changes
   - Test onboarding and payment flows end-to-end
   - Verify both frontend and backend functionality

### Pull Request Guidelines

- Use descriptive titles
- Reference any related issues
- Include testing instructions for both frontend and backend
- Update documentation if needed
- Ensure Supabase integration works properly
- Test Stripe payment flow in development mode

## Common Issues & Solutions

### Server Connection Issues
```bash
# Ensure both frontend and backend are running
# Frontend: http://localhost:5173
# Backend: http://localhost:4242

# Check if ports are available
npx kill-port 5173
npx kill-port 4242
```

### Stripe Integration Issues
```bash
# Verify Stripe environment variables in server/.env
# Test webhook endpoint: http://localhost:4242/webhook
# Ensure Stripe CLI is configured for local testing
stripe listen --forward-to localhost:4242/webhook
```

### Supabase Connection Issues
```bash
# Check environment variables in both .env files
# Verify Supabase project is active and URLs are correct
# Ensure service role key has proper permissions
```

### Payment Flow Debugging
```bash
# Check server console for webhook events
# Verify success/cancel URLs in Stripe session
# Confirm user table updates in Supabase
```

### Port Already in Use
```bash
# Kill processes using required ports
npx kill-port 5173  # Frontend
npx kill-port 4242  # Backend
# or use different ports
npm run dev -- --port 3000
```

### Context Provider Errors
- Ensure components are wrapped with appropriate providers
- Check OnboardingProvider and NewItemProvider usage
- Verify SessionContextProvider is at the root level

### Tailwind Styles Not Loading
- Restart the dev server after Tailwind config changes
- Check that Tailwind CSS 4.1.8 is properly configured
- Ensure @tailwindcss/vite plugin is working

## Support

For questions, issues, or contributions:

- **GitHub Issues**: [Create an issue](https://github.com/gluudevteam/gluu/issues)
- **Discussions**: [GitHub Discussions](https://github.com/gluudevteam/gluu/discussions)

## Deployment

### Frontend Deployment
The frontend is configured for Vercel deployment with `vercel.json`:

```bash
npm run build
# Deploy to Vercel or your preferred hosting platform
```

### Backend Deployment
The Express server can be deployed to platforms like:
- **Heroku**: Add Procfile with `web: node server/index.js`
- **Railway**: Direct deployment from server folder
- **DigitalOcean App Platform**: Configure build and run commands

### Environment Variables for Production
- Update Stripe success/cancel URLs for production domain
- Configure production Stripe webhook endpoint
- Set production Supabase URLs and keys
- Ensure CORS settings allow your production domain

### Stripe Webhook Configuration
1. Create webhook endpoint in Stripe Dashboard
2. Point to your production server: `https://yourdomain.com/webhook`
3. Subscribe to `checkout.session.completed` events
4. Update `STRIPE_WEBHOOK_SECRET` in production environment

** Ready to digitize your valuable possessions? Start with Gluu! **

*Last updated: July 27, 2025*