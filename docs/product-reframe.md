# SingClaw App Reframe

## Goal

Move `app.singclaw.xyz` from an enterprise/internal operations console to a consumer daily trading learning product.

## Product Shape

SingClaw should feel like a daily desk for an individual user:

- Learn: explain current market context in plain language.
- Interact: let users inspect watchlists, signals, and reports.
- Practice: turn ideas into paper trades before real trades.
- Remember: store user profiles, preferences, journals, and review history in Supabase.
- Improve: make the daily loop visible: brief, decision, paper trade, review.

## Locked Product Inputs

Updated: 2026-05-28, Asia/Shanghai.

- First target users: people with capital to trade but no mature trading system yet.
- Target capital range: 1,000-10,000 USDT.
- First market rollout: crypto first, then A-shares, then US stocks.
- First product promise: help users spend 10 minutes a day understanding market opportunities, risk reminders, learning/review tasks, instrument calendars, and expected impact.
- Most important loop: daily learning and trading review tasks.
- Tone: gamified missions, not a dry institutional terminal.
- Pricing for v1: free.
- Data boundary: not a blocker for now; use available data and manual/semi-automated review until the product loop is validated.
- Content boundary: no special content restrictions from the product owner yet, but the app must avoid promising certain returns.
- Launch audience: small-fund users who want low risk and high profit; SingClaw should translate that desire into risk-first planning and review behavior.

## Monetization Direction

V1 stays free. Future paid value should come from more detailed summaries and more personal review intelligence, not from hiding the basic daily loop.

Potential paid surfaces:

- More detailed daily summaries: opportunity, risk, invalidation conditions, and review actions broken down with stronger evidence.
- Weekly behavior review: repeated mistakes such as chasing, averaging down, overtrading, or skipping invalidation rules.
- Advanced signal explanation: readable synthesis across funding, OI, liquidation heatmaps, exchange volume, and ranking changes.
- Personal trading-system templates: review frameworks adapted to capital size, trading frequency, and risk preference.

## Market Data Priorities

Crypto sources to evaluate first:

- Binance
- Bitget (user input: "bidget")
- OKX
- Aster
- Hyperliquid (user input: "hyperliquip")
- Coinglass
- CoinMarketCap

A-share direction:

- Focus on leading sectors and leading stocks.
- Use "Chen Xiaoqun style" as a reference for dragon-head sector thinking, but encode it as educational review logic and decision checklists, not direct buy/sell advice.

## V1 Product Loop

For each user day:

1. Show today's opportunity map.
2. Show today's risk reminders.
3. Assign one primary learning/review mission.
4. Show relevant market/instrument calendar items and expected impact.
5. Require a risk-first plan: account size, risk percent, and maximum USDT loss before any execution action.
6. Let the user create or update a trading plan.
7. Let the user come back to record execution, mistakes, and lessons.

## Small-Fund Risk Guardrail

For the 1,000-10,000 USDT launch audience, the product should convert "low risk, high profit" desire into explicit risk budgeting:

- Ask for account size in USDT.
- Ask for maximum risk per plan as a percentage.
- Show computed maximum loss in USDT.
- Treat 0.5%-2% as the training range.
- Mark plans above 2% as aggressive and route them through risk review first.
- Persist account size, risk percent, and risk budget with the trading plan.

## Architecture Direction

- Clerk owns authentication and user identity.
- Supabase owns durable application data.
- Next.js route handlers are the server boundary for writes.
- `public/` is only for static assets. Runtime reports and user records do not belong there.
- Local filesystem storage is allowed only as a development fallback under `.data/`.

## First Stable Milestone

1. A new user can sign up or sign in with Clerk.
2. After sign-in, `/dashboard` is protected and opens a personal daily desk.
3. The Clerk user is upserted into `public.app_users`.
4. Cron reports are stored in `public.cron_reports` when Supabase is configured.
5. Without Supabase env values, development still works using `.data/reports`.

## Next Consumer Features

- Personal watchlist.
- Daily market brief with saved read state.
- Signal-to-paper-trade flow.
- User trading journal.
- Weekly review page with behavior patterns and mistakes.
