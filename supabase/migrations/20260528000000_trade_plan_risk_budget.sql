alter table public.trade_plans
  add column if not exists account_size_usdt numeric,
  add column if not exists risk_percent numeric,
  add column if not exists risk_budget_usdt numeric;

create index if not exists trade_plans_risk_budget_idx
  on public.trade_plans (risk_budget_usdt);

comment on column public.trade_plans.account_size_usdt is
  'User-entered account size in USDT for small-fund risk planning.';

comment on column public.trade_plans.risk_percent is
  'User-entered maximum risk percentage for one plan.';

comment on column public.trade_plans.risk_budget_usdt is
  'Computed maximum loss budget in USDT for the plan.';
