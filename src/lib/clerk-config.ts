function hasRealValue(value: string | undefined, placeholder: string) {
  return Boolean(value && value.trim() && !value.includes(placeholder))
}

export function isClerkPublishableConfigured() {
  return hasRealValue(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, 'your-clerk-publishable-key')
}

export function isClerkFullyConfigured() {
  return (
    isClerkPublishableConfigured() &&
    hasRealValue(process.env.CLERK_SECRET_KEY, 'your-clerk-secret-key')
  )
}
