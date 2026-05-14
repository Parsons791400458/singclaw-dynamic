module.exports = {
  apps: [{
    name: 'singclaw-dynamic',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      PORT: 3001,
      NODE_ENV: 'production',
      CLERK_SIGN_IN_URL: '/login',
      CLERK_SIGN_UP_URL: '/register',
      CLERK_AFTER_SIGN_IN_URL: '/dashboard',
      CLERK_AFTER_SIGN_UP_URL: '/dashboard',
      NEXT_PUBLIC_SITE_URL: 'https://app.singclaw.xyz',
    },
  }]
}
