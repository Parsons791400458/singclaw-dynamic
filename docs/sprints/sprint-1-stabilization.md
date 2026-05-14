# Sprint 1 Stabilization Log

Date: 2026-06-18
Task: Stabilize local build/auth/data foundation for `app.singclaw.xyz`
Scope lock: no push, no deploy, no PM2 restart, no production touches, no secrets printed.

## 1) Situation

Sprint 0 audit context was valid and showed visible copy issues and incomplete auth-demo consistency risk.

This pass focused on core local-facing stabilization surfaces only:

- navbar + auth pages/auth shell copy pathing
- auth/demo routing behavior
- API/dashboard auth gating consistency
- README/env setup clarity

## 2) Action and files changed

- Added `src/lib/clerk-config.ts`
  - Centralized Clerk env validation helpers:
    - `isClerkPublishableConfigured()`
    - `isClerkFullyConfigured()`
  - Treats example placeholder keys as not-configured.
- Updated `src/components/Navbar.tsx`
  - Switched Clerk gating to shared publishable-key helper.
- Updated `src/app/layout.tsx`
  - Wrapped app in ClerkProvider only when publishable Clerk config is valid.
- Updated `src/app/api/trading-plans/route.ts`
  - Replaced inline env checks with shared Clerk full-config helper.
- Updated `src/app/dashboard/page.tsx`
  - Replaced inline env checks with shared Clerk full-config helper.
- Updated `src/middleware.ts`
  - Replaced inline env checks with shared Clerk full-config helper.
- Updated `src/app/login/[[...sign-in]]/page.tsx`
  - Uses shared publishable-key config helper for `AuthConfigNotice`.
- Updated `src/app/register/[[...sign-up]]/page.tsx`
  - Uses shared publishable-key config helper for `AuthConfigNotice`.
- Updated `src/components/AuthConfigNotice.tsx`
  - Added explicit local demo-mode note in the notice copy.
- Updated `README.md`
  - Added local demo-mode behavior section for auth/sync/fallback.
- Updated `.env.local.example`
  - Removed placeholder Clerk keys so local demo-mode is not masked as configured.
- Added/updated `.env.production.example`
  - Removed placeholder Clerk keys so local/production examples don鈥檛 accidentally appear configured.

## 3) Verification results

- `cmd /c npm run lint`
  - Result: `鉁?No ESLint warnings or errors`
- `cmd /c npm run build`
  - Result: `Compiled successfully` and all routes generated successfully (`Generating static pages (34/34)`).

## 4) Manual smoke checklist

1. Start app with Clerk env vars unset/empty:
   - `/dashboard` should load in demo mode with local mission desk fallback.
   - `/login` and `/register` should show the auth configuration notice.
   - No secrets are required to run basic local navigation.
2. Start app with valid Clerk env vars (publishable + secret):
   - `/dashboard` as anonymous user should redirect to `/login`.
   - Authenticated session should enter dashboard and attempt profile sync instead of forced demo mode.
3. Validate route behavior under auth:
   - `/api/trading-plans` GET/POST should no longer claim unconfigured auth when Clerk is fully configured.
   - `/api/trading-plans` remains local-fallback when Clerk is not configured.

## 5) Remaining risks

- User-facing Chinese copy in dashboard/trading desk content still needs a separate copy pass; no automatic runtime encoding smoke check was executed in this step.
- `src/app/login/page.tsx` and `src/app/register/page.tsx` were replaced earlier by dynamic Clerk routes; not changed in this sprint.
- No PM2/server restart was performed (as required).

## 6) Next sprint recommendation (exact)

Execute **Sprint 2**: Daily Trading Desk MVP, with the explicit goal to finalize and harden the C-end daily mission workflow on `/dashboard` (opportunity/risk/mission flow, plan persistence UI, and risk budget UX) while keeping auth/data foundations from Sprint 1 unchanged.
