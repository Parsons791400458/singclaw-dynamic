import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ShrimpFi 游戏',
  description: 'ShrimpFi GameFi 平台 — 将养虾与游戏化结合，让Agent养成更有趣、更互动。在趣味中掌握养策略，在互动中提升Agent能力。',
  openGraph: {
    title: 'ShrimpFi 游戏 | SingClaw',
    description: 'ShrimpFi GameFi平台，将养虾与游戏化结合的趣味Agent养成体验。',
    type: 'website',
    siteName: 'SingClaw',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShrimpFi 游戏 | SingClaw',
    description: '将养虾与游戏化结合的趣味Agent养成体验。',
  },
  alternates: {
    canonical: 'https://singclaw.com/game',
  },
}

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
