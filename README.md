# TravelHub - Travel Experience Platform

A full-stack web application built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Supabase that allows users to discover and list unique travel experiences from creators around the world.

## Features

- **User Authentication**: Secure email/password authentication with Supabase Auth
- **Browse Experiences**: Discover travel experiences from creators worldwide
- **Create Listings**: Users can create and publish their own travel experience listings
- **Manage Listings**: View, edit, and delete your created listings from a personal dashboard
- **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop devices
- **Database Security**: Row-Level Security (RLS) policies ensure data isolation and protection

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes, Supabase PostgreSQL
- **Authentication**: Supabase Auth with email/password
- **Database**: Supabase PostgreSQL with Row-Level Security
- **Deployment**: Vercel (Recommended)

## Project Structure

```
├── app/
│   ├── auth/                    # Authentication pages
│   │   ├── login/
│   │   ├── sign-up/
│   │   ├── error/
│   │   └── sign-up-success/
│   ├── api/
│   │   └── listings/            # API routes for listings CRUD
│   ├── listings/
│   │   └── [id]/               # Listing detail page
│   ├── dashboard/              # User dashboard
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home/feed page
│   └── globals.css             # Global styles
├── components/
│   ├── navbar.tsx              # Navigation component
│   ├── footer.tsx              # Footer component
│   ├── listing-card.tsx        # Listing card component
│   ├── create-listing-form.tsx # Form for creating listings
│   └── ui/                     # shadcn/ui components
├── lib/
│   └── supabase/
│       ├── client.ts           # Client-side Supabase client
│       ├── server.ts           # Server-side Supabase client
│       └── proxy.ts            # Proxy for token refresh
├── scripts/
│   └── init-db.sql            # Database initialization script
└── middleware.ts              # Next.js middleware for auth

```

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Supabase project with PostgreSQL database
- Git

### Setup Instructions

1. **Clone the repository** (or download the code)
   ```bash
   cd travel-hub
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure Supabase Integration**
   - Open the project settings (top-right corner)
   - Go to the "Settings" tab
   - Connect your Supabase project or create a new one
   - Ensure environment variables are configured:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

4. **Initialize the Database**
   - The database migrations are included in `/scripts/init-db.sql`
   - Run the migration through the Supabase dashboard SQL editor or use the provided script
   - This creates the `listings` and `likes` tables with proper RLS policies

5. **Start the Development Server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app

## Database Schema

### Listings Table
```sql
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Likes Table (Optional)
```sql
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, listing_id)
);
```

## Key Pages

- `/` - Home feed showing all listings
- `/auth/login` - User login
- `/auth/sign-up` - User registration
- `/listings/[id]` - Individual listing details
- `/dashboard` - User's personal listing management

## API Endpoints

- `GET /api/listings` - Fetch all listings
- `POST /api/listings` - Create a new listing (requires auth)
- `GET /api/listings/[id]` - Fetch a specific listing
- `DELETE /api/listings/[id]` - Delete a listing (requires ownership)

## Authentication Flow

1. Users register with email/password via `/auth/sign-up`
2. Supabase sends a confirmation email
3. After confirming their email, users can log in
4. JWT token stored securely in HTTP-only cookie via middleware
5. Protected routes require active session

## Demo
<a href="travel-hub-7qw7417qs-kumuthuk2000s-projects.vercel.app"> Live Demo </a>

## Features for Future Enhancement

- User profiles with avatar upload
- Search and filtering by location/price
- Rating and review system
- Booking/payment integration with Stripe
- Real-time notifications
- Message system between users
- Admin dashboard

## License

MIT License - feel free to use this project as a template for your own applications.
