create table if not exists public.daily_briefs (
  id uuid primary key default gen_random_uuid(),
  brief_date date not null,
  market text not null,
  title text not null,
  opportunities jsonb not null default '[]'::jsonb,
  risks jsonb not null default '[]'::jsonb,
  review_tasks jsonb not null default '[]'::jsonb,
  calendar_items jsonb not null default '[]'::jsonb,
  data_sources text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (brief_date, market)
);

create table if not exists public.market_signals (
  id uuid primary key default gen_random_uuid(),
  signal_date date not null,
  market text not null,
  instrument text not null,
  signal_type text not null,
  title text not null,
  thesis text,
  risk_note text,
  evidence jsonb not null default '{}'::jsonb,
  source_system text,
  score numeric,
  created_at timestamptz not null default now()
);

create table if not exists public.instrument_events (
  id uuid primary key default gen_random_uuid(),
  event_date date not null,
  market text not null,
  instrument text,
  event_type text not null,
  title text not null,
  expected_impact text,
  source text,
  created_at timestamptz not null default now()
);

create table if not exists public.trade_plans (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null,
  plan_date date not null default current_date,
  market text not null,
  symbols text[] not null default '{}',
  opportunity text not null,
  risk text not null,
  invalidation text not null,
  action text not null default 'observe',
  review_note text,
  completed_steps text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_reviews (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null,
  review_date date not null default current_date,
  market text not null,
  symbols text[] not null default '{}',
  lesson text not null,
  mistake text,
  discipline_score integer check (discipline_score between 1 and 5),
  created_at timestamptz not null default now()
);

create index if not exists daily_briefs_date_market_idx
  on public.daily_briefs (brief_date desc, market);

create index if not exists market_signals_date_market_idx
  on public.market_signals (signal_date desc, market);

create index if not exists market_signals_instrument_idx
  on public.market_signals (instrument);

create index if not exists instrument_events_date_market_idx
  on public.instrument_events (event_date desc, market);

create index if not exists trade_plans_user_date_idx
  on public.trade_plans (clerk_user_id, plan_date desc);

create index if not exists user_reviews_user_date_idx
  on public.user_reviews (clerk_user_id, review_date desc);

alter table public.daily_briefs enable row level security;
alter table public.market_signals enable row level security;
alter table public.instrument_events enable row level security;
alter table public.trade_plans enable row level security;
alter table public.user_reviews enable row level security;

comment on table public.daily_briefs is
  'SingClaw daily market opportunity, risk, review-task, and calendar brief data. Server writes with service role.';

comment on table public.market_signals is
  'Normalized signals from crypto-first sources such as Binance, Bitget, OKX, Aster, Hyperliquid, Coinglass, and CoinMarketCap.';

comment on table public.trade_plans is
  'User-authored daily trading plans. Clerk user id is stored server-side; direct client policies should be added before exposing Supabase writes.';
