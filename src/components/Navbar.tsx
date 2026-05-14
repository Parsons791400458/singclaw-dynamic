'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cryptoOpen, setCryptoOpen] = useState(false)

  const navLinks = [
    { href: '/', label: '首页' },
    {
      label: 'Crypto',
      href: '/crypto',
      children: [
        { href: '/crypto', label: '5层分析' },
        { href: '/crypto/bn-alpha', label: 'BN Alpha' },
        { href: '/crypto/watchlist', label: '观察池' },
        { href: '/crypto/signal-tracker', label: '信号追踪' },
        { href: '/strategies', label: '策略中心' },
        { href: '/crypto/backtest', label: '回测中心' },
        { href: '/crypto/paper-trade', label: '模拟交易' },
        { href: '/crypto/review', label: '每日复盘' },
      ]
    },
    {
      label: '博客',
      href: '/blog',
      children: [
        { href: '/blog', label: '思享录' },
        { href: '/blog/36', label: '养虾36计' },
        { href: '/blog/24', label: '虾24章经' },
      ]
    },
    {
      label: '明星',
      href: '/stars',
      children: [
        { href: '/stars', label: '明星追踪' },
        { href: '/stars/match', label: 'AI匹配' },
      ]
    },
    { href: '/game', label: 'ShrimpFi' },
    { href: '/wiki', label: '知识库' },
    { href: '/skills-wiki', label: 'Skills Wiki' },
    { href: '/sprint', label: 'Sprint' },
    { href: '/team', label: '团队' },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            SingClaw
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              if ('children' in link && link.children) {
                const active = link.children.some((c: any) => isActive(c.href))
                return (
                  <div key={link.label} className="relative" onMouseEnter={() => setCryptoOpen(true)} onMouseLeave={() => setCryptoOpen(false)}>
                    <button
                      className={`text-sm px-3 py-2 rounded-lg transition ${active ? 'text-blue-400' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                    >
                      {link.label} ▾
                    </button>
                    {cryptoOpen && (
                      <div className="absolute top-full left-0 mt-1 py-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-xl">
                        {link.children.map((child: any) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2 text-sm transition ${isActive(child.href) ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              const active = isActive(link.href)
              return (
                <Link key={link.href} href={link.href}
                  className={`text-sm px-3 py-2 rounded-lg transition ${active ? 'text-blue-400' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-300 hover:text-white hidden sm:block">登录</Link>
            <Link href="/register" className="text-sm px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-full transition">注册</Link>
            {/* Mobile menu button */}
            <button className="lg:hidden text-gray-400 hover:text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => {
              if ('children' in link && link.children) {
                return (
                  <div key={link.label}>
                    <div className="text-sm font-semibold text-gray-400 px-3 py-2">{link.label}</div>
                    {link.children.map((child: any) => (
                      <Link key={child.href} href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block text-sm px-6 py-2 rounded-lg transition ${isActive(child.href) ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300 hover:text-white'}`}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )
              }
              const active = isActive(link.href)
              return (
                <Link key={link.href} href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm px-3 py-2 rounded-lg transition ${active ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300 hover:text-white'}`}>
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
