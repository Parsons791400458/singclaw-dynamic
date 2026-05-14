# SingClaw Dynamic

Next.js app for `app.singclaw.xyz`.

The product direction is a consumer daily trading learning desk: users sign in, read market context, inspect signals, practice paper trades, and keep a personal review loop.

## Local Setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment

Do not paste secrets into chat or commit them to git. Put them in `.env.local` for local development and in server/Vercel environment variables for production.

Required for login:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_SIGN_IN_URL=/login`
- `CLERK_SIGN_UP_URL=/register`
- `CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard`
- `CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard`

Required for durable data:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Recommended for cron writes:

- `CRON_OUTPUT_TOKEN`

If Supabase is not configured, cron reports fall back to `.data/reports` for local development only.

### Local demo mode

If either Clerk key is missing, the app runs in demo mode:

- `/dashboard` shows the local mission desk with profile sync fallback.
- Auth pages show a local setup notice.
- `/api/trading-plans` saves and reads from local storage fallback.

## Supabase

Apply the SQL files in `supabase/migrations` to create:

- `public.app_users`
- `public.cron_reports`
- `public.trade_plans`

The app writes to Supabase from server-side code with `SUPABASE_SERVICE_ROLE_KEY`.
If Supabase service credentials are absent, trading plans fall back to `.data/trading-plans`
on the server so logged-in users do not lose drafts during the first free version.

## PM2 Production

The PM2 config no longer stores secrets. Export env values on the server, build the app, then start:

```bash
npm run build
pm2 start ecosystem.config.js
```
