export default function AuthConfigNotice() {
  return (
    <div className="min-h-screen bg-gray-950 px-4 py-24 text-white">
      <div className="mx-auto max-w-xl rounded-lg border border-amber-500/20 bg-amber-500/10 p-6">
        <h1 className="text-2xl font-bold text-amber-100">Auth is not configured yet</h1>
        <p className="mt-3 text-sm leading-6 text-amber-50/80">
          Add Clerk values to `.env.local` to enable login and registration:
          `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
          <br />
          Leave both blank for local demo mode (no auth required).
        </p>
      </div>
    </div>
  )
}
