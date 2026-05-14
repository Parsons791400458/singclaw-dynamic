alter table public.trade_plans
  add column if not exists status text not null default 'planned'
  check (status in ('draft', 'planned', 'executed', 'cancelled'));

comment on column public.trade_plans.status is
  'Execution lifecycle label for a saved trading plan.';
