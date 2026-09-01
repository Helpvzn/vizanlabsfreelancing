# VizanLabs — Free Freelance Marketplace

100% free platform connecting clients and freelancers. No payments on platform — users share contact details when they agree on a deal.

**Stack:** Next.js + Supabase + Cloudflare Pages

## Prerequisites

- Node.js 20+
- Free [Supabase](https://supabase.com) project
- npm

## Setup

### 1. Supabase project

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/migrations/0001_initial_schema.sql`
3. Go to **Project Settings → API** and copy URL + anon key

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Supabase Auth settings

In Supabase Dashboard → **Authentication → URL Configuration**:

- Site URL: `http://localhost:3000`
- Redirect URLs: `http://localhost:3000/**`

Disable email confirmation for local testing (optional):

**Authentication → Providers → Email → Confirm email** → OFF

### 4. Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## User roles

- **Client** — post projects, receive proposals, chat
- **Freelancer** — browse projects, submit proposals, chat
- Role is **fixed at signup** and cannot be changed

## Deployment (later — Cloudflare Pages)

Frontend deploys to Cloudflare Pages. Backend stays on Supabase free tier.

## Development phases

| Phase | Status |
|-------|--------|
| 1 — Setup, Auth, Layout | ✅ Current |
| 2 — Profiles, Skills, Categories | Pending |
| 3 — Projects CRUD + listing | Pending |
| 4 — Proposals | Pending |
| 5 — Chat (Supabase Realtime) | Pending |
| 6 — Reviews, Admin | Pending |
| 7 — SEO, Deploy | Pending |
