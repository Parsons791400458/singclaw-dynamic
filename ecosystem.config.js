const optionalEnv = (name) => {
  const value = process.env[name]
  return value ? { [name]: value } : {}
}

module.exports = {
  apps: [{
    name: 'singclaw-dynamic',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      PORT: process.env.PORT || 3001,
      NODE_ENV: 'production',
      CLERK_SIGN_IN_URL: '/login',
      CLERK_SIGN_UP_URL: '/register',
      CLERK_SIGN_IN_FORCE_REDIRECT_URL: '/dashboard',
      CLERK_SIGN_UP_FORCE_REDIRECT_URL: '/dashboard',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://app.singclaw.xyz',
      ...optionalEnv('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'),
      ...optionalEnv('CLERK_SECRET_KEY'),
      ...optionalEnv('NEXT_PUBLIC_SUPABASE_URL'),
      ...optionalEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
      ...optionalEnv('SUPABASE_SERVICE_ROLE_KEY'),
      ...optionalEnv('CRON_OUTPUT_TOKEN'),
    },
  }]
}
