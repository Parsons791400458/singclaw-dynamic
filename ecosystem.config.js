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
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_test_bWFqb3ItbGFjZXdpbmctNjAuY2xlcmsuYWNjb3VudHMuZGV2JA',
      CLERK_SECRET_KEY: 'sk_test_Bz0ZGTuzNCcjuhxsq7032mPSFwY75eVF9C8YHV3g9y',
      CLERK_SIGN_IN_URL: '/login',
      CLERK_SIGN_UP_URL: '/register',
      CLERK_AFTER_SIGN_IN_URL: '/dashboard',
      CLERK_AFTER_SIGN_UP_URL: '/dashboard',
      NEXT_PUBLIC_SITE_URL: 'https://app.singclaw.xyz',
    },
  }]
}
