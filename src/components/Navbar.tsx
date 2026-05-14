'use client'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { isClerkPublishableConfigured } from '@/lib/clerk-config'

const clerkEnabled = isClerkPublishableConfigured()

type NavLink = {
  href: string
  label: string
  children?: Array<{ href: string; label: string }>
}

const navLinks: NavLink[] = [
  { href: '/', label: '首页' },
  { href: '/dashboard', label: '任务桌' },
  { href: '/knowledge-game', label: '知识星图' },
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
    ],
  },
  {
    label: '博客',
    href: '/blog',
    children: [
      { href: '/blog', label: '思享录' },
      { href: '/blog/36', label: '养虾36计' },
      { href: '/blog/24', label: '虾24章经' },
    ],
  },
  {
    label: '明星',
    href: '/stars',
    children: [
      { href: '/stars', label: '明星追踪' },
      { href: '/stars/match', label: 'AI匹配' },
    ],
  },
  { href: '/game', label: 'ShrimpFi' },
  { href: '/wiki', label: '知识库' },
  { href: '/skills-wiki', label: 'Skills Wiki' },
  { href: '/sprint', label: 'Sprint' },
  { href: '/team', label: '团队' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#07110f]/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-400 text-sm font-black text-slate-950">
              S
            </span>
            <span className="text-lg font-black text-white">SingClaw</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map(link => {
              const childActive = link.children?.some(child => isActive(child.href)) ?? false
              const active = childActive || isActive(link.href)

              if (link.children?.length) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(link.label)}
                    onMouseLeave={() => setOpenMenu(current => (current === link.label ? null : current))}
                  >
                    <Link
                      href={link.href}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        active
                          ? 'bg-emerald-400/10 text-emerald-100'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {link.label} ▾
                    </Link>
                    {openMenu === link.label && (
                      <div className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-white/10 bg-slate-950/95 p-2 shadow-xl">
                        {link.children.map(child => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block rounded-lg px-3 py-2 text-sm font-semibold transition ${
                              isActive(child.href)
                                ? 'bg-emerald-400/10 text-emerald-100'
                                : 'text-slate-300 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    active
                      ? 'bg-emerald-400/10 text-emerald-100'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            {clerkEnabled ? (
              <>
                <SignedOut>
                  <Link href="/login" className="hidden text-sm font-semibold text-slate-300 hover:text-white sm:block">
                    登录
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                  >
                    免费开始
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard" className="hidden text-sm font-semibold text-slate-300 hover:text-white sm:block">
                    今日任务
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden text-sm font-semibold text-slate-300 hover:text-white sm:block">
                  登录
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                >
                  免费开始
                </Link>
              </>
            )}

            <button
              type="button"
              aria-label="打开导航"
              className="rounded-lg p-2 text-slate-300 transition hover:bg-white/5 hover:text-white lg:hidden"
              onClick={() => setMobileOpen(current => !current)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-white/10 bg-[#07110f] lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map(link => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    isActive(link.href)
                      ? 'bg-emerald-400/10 text-emerald-100'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
                {link.children?.map(child => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className={`ml-3 block rounded-lg px-3 py-2 text-sm transition ${
                      isActive(child.href)
                        ? 'bg-emerald-400/10 text-emerald-100'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
