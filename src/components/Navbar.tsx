'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/crypto', label: 'Crypto' },
    { href: '/blog', label: '博客' },
    { href: '/stars/match', label: '明星匹配' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            SingClaw
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={`text-sm transition ${pathname === link.href ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm text-gray-300 hover:text-white">我的</Link>
                <button onClick={() => supabase.auth.signOut()} className="text-sm text-gray-400 hover:text-white">退出</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-gray-300 hover:text-white">登录</Link>
                <Link href="/register" className="text-sm px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-full transition">注册</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
