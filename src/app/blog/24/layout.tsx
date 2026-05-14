import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '虾24章经',
  description: '36计是"术"，24章经是"道"。每章围绕一个核心原则展开，包含为什么需要、原则是什么、怎么落地、常见误区。策略×原则=完整养虾成长系统。',
  openGraph: {
    title: '虾24章经 | SingClaw',
    description: '24章养虾心法原则，从立命到终局，建立长期成长的判断框架。',
    type: 'website',
    siteName: 'SingClaw',
  },
  twitter: {
    card: 'summary_large_image',
    title: '虾24章经 | SingClaw',
    description: '24章养虾心法原则，建立长期成长的判断框架。',
  },
  alternates: {
    canonical: 'https://singclaw.com/blog/24',
  },
}

export default function Blog24Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
