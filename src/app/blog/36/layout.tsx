import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '养虾36计',
  description: '沿用真实三十六计原名，解释完全贴合养虾/Agent养成语境。每一计都是一篇按统一框架展开的方法论，覆盖结构、命名、读法三大维度，六大套系共36计全部上线。',
  openGraph: {
    title: '养虾36计 | SingClaw',
    description: '36篇养虾策略方法论，从胜战计到败战计，覆盖Agent养成的所有场景。',
    type: 'website',
    siteName: 'SingClaw',
  },
  twitter: {
    card: 'summary_large_image',
    title: '养虾36计 | SingClaw',
    description: '36篇养虾策略方法论，从胜战计到败战计。',
  },
  alternates: {
    canonical: 'https://singclaw.com/blog/36',
  },
}

export default function Blog36Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
