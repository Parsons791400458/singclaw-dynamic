export default function SprintPage() {
  const milestones = [
    { id: 'M0', title: '基础设施迁移', status: 'done', date: '04-27', desc: 'Vercel → 自有服务器 (43.156.239.53) / Nginx + PM2 / Clerk 认证' },
    { id: 'M1', title: '用户系统上线', status: 'in-progress', date: '04-28', desc: 'Next.js App Router / Clerk 登录注册 / 首页重构' },
    { id: 'M2', title: '内容迁移 + 支付', status: 'pending', date: '05-03', desc: '静态页面迁移 / Supabase 集成 / 支付模块' },
    { id: 'M3', title: '优化 + 推广准备', status: 'pending', date: '05-08', desc: 'GEO 优化 / 性能优化 / 推广素材准备' },
  ]

  const tasks = [
    { name: 'SC-001 Phase 1: Next.js 动态平台搭建', status: 'done', assignee: '小链', date: '04-27' },
    { name: 'Clerk 用户认证系统迁移', status: 'done', assignee: '小链', date: '04-27' },
    { name: 'Nginx 反向代理 + HTTPS 配置', status: 'done', assignee: '小链', date: '04-27' },
    { name: '静态 HTML → TSX 页面迁移', status: 'in-progress', assignee: '小链', date: '04-27' },
    { name: '冒烟测试 + 三级质量门', status: 'in-progress', assignee: '小测', date: '04-27' },
    { name: 'SEO 标签补全', status: 'pending', assignee: '小SEO', date: '04-28' },
    { name: 'Supabase 数据库集成', status: 'pending', assignee: '小链', date: '05-01' },
    { name: '支付模块开发', status: 'pending', assignee: '小链', date: '05-03' },
  ]

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      done: 'bg-green-500/12 text-green-400',
      'in-progress': 'bg-amber-500/12 text-amber-400',
      pending: 'bg-gray-500/12 text-gray-400',
    }
    const label: Record<string, string> = { done: '✅ 完成', 'in-progress': '🔄 进行中', pending: '⏳ 待开始' }
    return { cls: map[s] || '', label: label[s] || s }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Sprint Board</div>
          <h1 className="text-5xl font-black mb-4">🏃 Sprint 看板</h1>
          <p className="text-gray-400 text-lg">SC-001 Phase 1: SingClaw 动态平台升级</p>
        </div>

        {/* Milestones */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">📍 里程碑</h2>
          <div className="space-y-3">
            {milestones.map(m => {
              const badge = statusBadge(m.status)
              return (
                <div key={m.id} className={`p-4 rounded-xl border transition ${m.status === 'done' ? 'bg-green-500/5 border-green-500/20' : m.status === 'in-progress' ? 'bg-amber-500/5 border-amber-500/20' : 'bg-gray-900/40 border-gray-800'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-xs font-bold">{m.id}</span>
                      <span className="font-bold">{m.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">{m.date}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${badge.cls}`}>{badge.label}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 ml-10">{m.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Tasks */}
        <section className="border-t border-gray-800 pt-12">
          <h2 className="text-2xl font-bold mb-6">📋 任务列表</h2>
          <div className="space-y-2">
            {tasks.map((t, i) => {
              const badge = statusBadge(t.status)
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/40 border border-gray-800 hover:border-gray-700 transition">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold flex-shrink-0 ${badge.cls}`}>{badge.label}</span>
                  <span className="flex-1 text-sm">{t.name}</span>
                  <span className="text-xs text-gray-500 flex-shrink-0">{t.assignee}</span>
                  <span className="text-xs text-gray-500 flex-shrink-0 w-12 text-right">{t.date}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Progress */}
        <section className="border-t border-gray-800 pt-12 mt-12">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-5 rounded-xl bg-green-500/5 border border-green-500/20">
              <div className="text-3xl font-black text-green-400">{tasks.filter(t => t.status === 'done').length}</div>
              <div className="text-xs text-gray-500 mt-1">已完成</div>
            </div>
            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="text-3xl font-black text-amber-400">{tasks.filter(t => t.status === 'in-progress').length}</div>
              <div className="text-xs text-gray-500 mt-1">进行中</div>
            </div>
            <div className="p-5 rounded-xl bg-gray-500/5 border border-gray-800">
              <div className="text-3xl font-black text-gray-400">{tasks.filter(t => t.status === 'pending').length}</div>
              <div className="text-xs text-gray-500 mt-1">待开始</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
