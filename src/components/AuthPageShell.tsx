import type { ReactNode } from 'react'

type AuthPageShellProps = {
  eyebrow: string
  title: string
  subtitle: string
  children: ReactNode
}

export default function AuthPageShell({
  eyebrow,
  title,
  subtitle,
  children,
}: AuthPageShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07110f] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-10rem)] w-full max-w-6xl min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
        <section className="min-w-0">
          <div className="mb-3 text-sm font-semibold uppercase text-emerald-200">
            SingClaw Free V1
          </div>
          <h1 className="max-w-3xl text-4xl font-black text-white md:text-6xl">
            先复盘，再交易。
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            每天 10 分钟完成市场机会、风险提醒、学习任务和交易计划。Crypto 先行，A 股和美股随后接入。
          </p>

          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {['机会', '风险', '复盘'].map(item => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3"
              >
                <div className="text-sm font-semibold text-slate-100">{item}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full min-w-0 rounded-lg border border-white bg-white p-4 text-slate-950 shadow-2xl shadow-black/30 sm:p-6">
          <div className="mb-6">
            <div className="text-xs font-semibold uppercase text-emerald-700">{eyebrow}</div>
            <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
          </div>
          {children}
        </section>
      </div>
    </div>
  )
}
