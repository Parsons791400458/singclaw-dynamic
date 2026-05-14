create table if not exists public.knowledge_sources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source_type text not null default 'manual',
  source_uri text,
  raw_excerpt text,
  summary text,
  theme text not null,
  status text not null default 'Captured',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wiki_cards (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.knowledge_sources(id) on delete set null,
  slug text unique,
  title text not null,
  summary text not null,
  theme text not null check (
    theme in (
      '00_通用知识体系',
      '01_交易信号系统',
      '02_信息差猎手',
      '03_SingClaw基建',
      '04_职业变现库',
      '05_生活与兴趣'
    )
  ),
  status text not null default 'Captured' check (
    status in ('Captured', 'Structured', 'Understood', 'Applied', 'Reviewed', 'Mastered')
  ),
  dikiw_level text not null default 'Data' check (
    dikiw_level in ('Data', 'Information', 'Knowledge', 'Insight', 'Wisdom')
  ),
  bloom_type text not null default '事实性知识' check (
    bloom_type in ('事实性知识', '概念性知识', '程序性知识', '元认知知识')
  ),
  role text not null default '终身学习者',
  tags text[] not null default '{}',
  key_takeaways text[] not null default '{}',
  action_suggestion text,
  feishu_url text,
  review_due_at timestamptz,
  mastery_score integer not null default 0 check (mastery_score >= 0 and mastery_score <= 100),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.knowledge_links (
  id uuid primary key default gen_random_uuid(),
  from_card_id uuid not null references public.wiki_cards(id) on delete cascade,
  to_card_id uuid not null references public.wiki_cards(id) on delete cascade,
  link_type text not null default 'related',
  rationale text,
  created_at timestamptz not null default now(),
  unique (from_card_id, to_card_id, link_type)
);

create table if not exists public.quests (
  id text primary key,
  quest_type text not null check (
    quest_type in ('intake', 'understand', 'craft', 'output', 'practice', 'boss')
  ),
  title text not null,
  description text not null,
  theme text not null,
  required_status text,
  reward_xp integer not null default 10,
  sort_order integer not null default 0,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quest_runs (
  id uuid primary key default gen_random_uuid(),
  quest_id text not null references public.quests(id) on delete cascade,
  card_id uuid references public.wiki_cards(id) on delete set null,
  result text not null default 'completed',
  xp_earned integer not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.review_sessions (
  id uuid primary key default gen_random_uuid(),
  review_type text not null check (review_type in ('daily', 'weekly', 'monthly')),
  theme text,
  focus text not null,
  output text not null,
  upgraded_card_ids uuid[] not null default '{}',
  status text not null default 'completed',
  created_at timestamptz not null default now()
);

create table if not exists public.game_progress (
  id uuid primary key default gen_random_uuid(),
  profile_key text not null default 'solo' unique,
  xp integer not null default 0,
  level integer not null default 1,
  current_phase integer not null default 1,
  reviewed_cards integer not null default 0,
  mastered_cards integer not null default 0,
  last_review_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists wiki_cards_theme_idx on public.wiki_cards (theme);
create index if not exists wiki_cards_status_idx on public.wiki_cards (status);
create index if not exists wiki_cards_review_due_idx on public.wiki_cards (review_due_at);
create index if not exists knowledge_sources_created_at_idx on public.knowledge_sources (created_at desc);
create index if not exists quest_runs_created_at_idx on public.quest_runs (created_at desc);
create index if not exists review_sessions_created_at_idx on public.review_sessions (created_at desc);

alter table public.knowledge_sources enable row level security;
alter table public.wiki_cards enable row level security;
alter table public.knowledge_links enable row level security;
alter table public.quests enable row level security;
alter table public.quest_runs enable row level security;
alter table public.review_sessions enable row level security;
alter table public.game_progress enable row level security;

-- Server-side routes use SUPABASE_SERVICE_ROLE_KEY and bypass RLS.
-- Add end-user read/write policies only after the product account model is finalized.
