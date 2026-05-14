create extension if not exists pgcrypto;

create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  email text,
  name text,
  avatar_url text,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cron_reports (
  id uuid primary key default gen_random_uuid(),
  agent text not null,
  report jsonb not null,
  report_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (agent, report_date)
);

create index if not exists cron_reports_report_date_idx
  on public.cron_reports (report_date desc);

alter table public.app_users enable row level security;
alter table public.cron_reports enable row level security;

-- Server-side code uses SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
-- Add user-facing read/write policies only when personal trading journal tables are introduced.
