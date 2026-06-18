import fs from 'fs'

function loadEnvFile(path) {
  if (!fs.existsSync(path)) return {}

  return Object.fromEntries(
    fs
      .readFileSync(path, 'utf8')
      .split(/\r?\n/)
      .filter(line => line && !line.trimStart().startsWith('#') && line.includes('='))
      .map(line => {
        const index = line.indexOf('=')
        return [line.slice(0, index), line.slice(index + 1).replace(/^"|"$/g, '')]
      }),
  )
}

const env = {
  ...loadEnvFile('.env.local'),
  ...process.env,
}

const publishableKey = env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  console.error('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY')
  process.exitCode = 1
  await new Promise(resolve => setTimeout(resolve, 50))
  throw new Error('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY')
}

const encodedFrontendApi = publishableKey.replace(/^pk_(test|live)_/, '')
const frontendApi = Buffer.from(encodedFrontendApi, 'base64').toString('utf8').replace(/\$/g, '')

if (!frontendApi.endsWith('.clerk.accounts.dev') && !frontendApi.includes('.clerk.')) {
  console.error('Could not derive Clerk frontend API from publishable key.')
  process.exitCode = 1
  await new Promise(resolve => setTimeout(resolve, 50))
  throw new Error('Could not derive Clerk frontend API from publishable key.')
}

const response = await fetch(`https://${frontendApi}/v1/environment`)

if (!response.ok) {
  console.error(`Failed to read Clerk frontend environment: HTTP ${response.status}`)
  process.exitCode = 1
  await new Promise(resolve => setTimeout(resolve, 50))
  throw new Error(`Failed to read Clerk frontend environment: HTTP ${response.status}`)
}

const payload = await response.json()
const attributes = payload?.response?.user_settings?.attributes || payload?.user_settings?.attributes || {}
const email = attributes.email_address || {}
const phone = attributes.phone_number || {}
const password = attributes.password || {}

console.log('Clerk auth configuration check')
console.log(`- frontend_api: ${frontendApi}`)
console.log(`- email_address: enabled=${Boolean(email.enabled)} required=${Boolean(email.required)} verify_at_sign_up=${Boolean(email.verify_at_sign_up)}`)
console.log(`- phone_number: enabled=${Boolean(phone.enabled)} required=${Boolean(phone.required)} verify_at_sign_up=${Boolean(phone.verify_at_sign_up)}`)
console.log(`- password: enabled=${Boolean(password.enabled)} required=${Boolean(password.required)}`)

let failed = false

if (!email.enabled || !email.required) {
  console.log('FAIL: Email registration is not required/enabled. Enable email address in Clerk Dashboard.')
  failed = true
}

if (phone.required) {
  console.log('FAIL: Phone number is still required. Disable phone-number required signup in Clerk Dashboard for China-friendly email registration.')
  failed = true
}

if (failed) {
  process.exitCode = 1
  await new Promise(resolve => setTimeout(resolve, 50))
} else {
  console.log('PASS: Email-first registration is configured; phone number is not required.')
}
