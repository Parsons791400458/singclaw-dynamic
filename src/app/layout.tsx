import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { isClerkPublishableConfigured } from '@/lib/clerk-config'
import './globals.css'

const clerkPublishableConfigured = isClerkPublishableConfigured()

export const metadata: Metadata = {
  title: 'SingClaw - Daily Trading Mission Desk',
  description:
    'Crypto-first trading review desk for daily opportunities, risk reminders, plans, and review missions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const appShell = (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-950 text-white flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )

  if (!clerkPublishableConfigured) {
    return appShell
  }

  return (
    <ClerkProvider
      signInUrl="/login"
      signUpUrl="/register"
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
    >
      {appShell}
    </ClerkProvider>
  )
}
