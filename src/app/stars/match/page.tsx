'use client'
import { useState } from 'react'

interface MatchResult {
  name: string
  category: string
  bio: string
  biz: string
  score: number
  reasons: string[]
}

export default function StarsMatchPage() {
  const [formData, setFormData] = useState({
    brand_name: '',
    brand_category: '',
    budget_range: '',
    cooperation_type: '',
    target_audience: '',
    campaign_goal: '',
    preferences: '',
    contact_info: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setShowResult(false)

    try {
      // Try to fetch celebrity data from Supabase
      const SUPABASE_URL = 'https://wtorgfihulbzqxaosdgb.supabase.co'
      const SUPABASE_ANON_KEY = 'sb_publishable_VShavdqU8IgdrCBGTNas7g_0y61usOd'

      const r = await fetch(SUPABASE_URL + '/rest/v1/celebrities?select=*', {
        headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': 'Bearer ' + SUPABASE_ANON_KEY }
      })
      if (!r.ok) throw new Error('无法获取艺人数据')
      const celebs = await r.json()

      const results = doMatch(celebs, formData)

      // Save request to Supabase (non-blocking)
      try {
        await fetch(SUPABASE_URL + '/rest/v1/brand_requests', {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            brand_name: formData.brand_name,
            brand_category: formData.brand_category,
            target_audience: formData.target_audience || '',
            budget_range: formData.budget_range || '',
            cooperation_type: formData.cooperation_type || '',
            campaign_goal: formData.campaign_goal || '',
            preferences: formData.preferences || '',
            contact_info: formData.contact_info || '',
            status: 'completed',
            matched_celebrities: JSON.stringify(results.slice(0, 5).map(m => ({ name: m.name, score: m.score, reasons: m.reasons })))
          })
        })
      } catch (e) {
        console.warn('保存失败，不影响展示', e)
      }

      setMatches(results)
      setShowResult(true)
    } catch (e: any) {
      setError('❌ ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const doMatch = (celebs: any[], req: typeof formData): MatchResult[] => {
    const { brand_category, budget_range, cooperation_type, campaign_goal } = req
    return celebs
      .filter((c: any) => c.id !== 65)
      .map((c: any) => {
        let s = 0; const r: string[] = []
        const cat = (c.category || '').toLowerCase()
        const biz = (c.recent_business || '').toLowerCase()
        const desc = (c.description || '').toLowerCase()
        const bio = (c.bio || '').toLowerCase()

        if (brand_category === '美妆护肤') {
          if (/女流量|男流量/.test(cat)) { s += 25; r.push('美妆核心受众') }
          if (/美妆|护肤|香水|彩妆|防晒/.test(biz)) { s += 20; r.push('美妆/护肤经验') }
        } else if (brand_category === '3C数码') {
          if (/男流量|品质艺人/.test(cat)) { s += 20; r.push('3C品类匹配') }
          if (/华为|小米|手机|vivo|oppo|redmi/.test(biz)) { s += 25; r.push('3C合作经验') }
        } else if (brand_category === '汽车') {
          if (/品质艺人/.test(cat)) { s += 20; r.push('成熟形象') }
          if (/汽车|鸿蒙|智界|尚界|享界/.test(biz)) { s += 25; r.push('汽车品牌经验') }
        } else if (brand_category === '运动户外') {
          if (/体育明星/.test(cat)) { s += 30; r.push('体育明星直接匹配') }
          if (/运动|体育|安踏|阿迪|李宁|fila|nike|户外/.test(biz)) { s += 20; r.push('运动品牌经验') }
        } else if (brand_category === '食品饮料') {
          if (/食品|饮料|蒙牛|伊利|百事|乐事/.test(biz)) { s += 20; r.push('食品饮料经验') }
        } else if (brand_category === '服饰时尚') {
          if (/dior|chanel|gucci|宝格丽|lv|范思哲|奢/.test(biz)) { s += 25; r.push('奢品合作经验') }
          if (/女流量|男流量/.test(cat)) { s += 15; r.push('时尚度高') }
        } else if (brand_category === '母婴') {
          if (/母婴|亲子/.test(biz)) { s += 25; r.push('母婴经验') }
          if (/品质艺人/.test(cat)) { s += 10; r.push('品质艺人适合母婴') }
        } else if (brand_category === '家居') {
          if (/家居|家电/.test(biz)) { s += 20; r.push('家居家电经验') }
        } else if (brand_category === '游戏') {
          if (/游戏|电竞|手游/.test(biz)) { s += 25; r.push('游戏经验') }
          if (/男流量/.test(cat)) { s += 15; r.push('游戏受众重叠') }
        }

        if (budget_range === '50万以下' && /短剧明星/.test(cat)) { s += 10; r.push('性价比优选') }
        if (budget_range === '500万以上' && (/男流量|女流量/.test(cat))) { s += 10; r.push('顶流匹配') }
        if (cooperation_type === '代言人' && /代言人|全球/.test(biz)) { s += 10; r.push('代言人级别') }
        if (campaign_goal === '品牌曝光' && /顶流|国民|热搜/.test(bio + desc)) { s += 10; r.push('高曝光量') }
        if (campaign_goal === '销量转化' && /售罄|gmv|销售/.test(biz)) { s += 15; r.push('带货能力强') }
        if (campaign_goal === '年轻化' && /男流量|女流量/.test(cat)) { s += 10; r.push('年轻流量') }

        if ((c.hot_news || '').length > 10) { s += 5; r.push('近期热度') }
        if ((c.recent_business || '').split(/[，。、]/).filter(Boolean).length >= 5) { s += 5; r.push('商务活跃') }

        return { name: c.name, category: c.category, bio: (c.bio || '').substring(0, 80), biz: c.recent_business, score: Math.min(s, 100), reasons: r }
      })
      .filter((x: MatchResult) => x.score > 10)
      .sort((a: MatchResult, b: MatchResult) => b.score - a.score)
      .slice(0, 5)
  }

  const categories = ['美妆护肤', '3C数码', '汽车', '食品饮料', '服饰时尚', '运动户外', '母婴', '家居', '游戏', '其他']
  const budgets = ['不限', '50万以下', '50-100万', '100-300万', '300-500万', '500万以上']
  const coopTypes = ['不限', '代言人', '品牌大使', '品牌挚友', '单次推广', '直播带货', '长期合作']
  const goals = ['不限', '品牌曝光', '销量转化', '年轻化', '品类拓展', '事件营销']

  return (
    <div className="min-h-screen bg-gray-950 text-white py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <a href="/stars/" className="text-gray-400 hover:text-white text-sm transition mb-6 inline-block">← 返回明星站</a>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-3">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">🤖 AI艺人匹配</span>
          </h1>
          <p className="text-gray-400">输入品牌需求，AI智能推荐最合适的艺人合作方案</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-950/30 border border-red-900/50 text-red-400 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">品牌名称 <span className="text-red-400">*</span></label>
              <input type="text" required value={formData.brand_name} onChange={e => handleChange('brand_name', e.target.value)}
                placeholder="例如：完美日记"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">行业品类 <span className="text-red-400">*</span></label>
              <select required value={formData.brand_category} onChange={e => handleChange('brand_category', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:outline-none transition">
                <option value="">选择行业</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">预算范围</label>
              <select value={formData.budget_range} onChange={e => handleChange('budget_range', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:outline-none transition">
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">合作类型</label>
              <select value={formData.cooperation_type} onChange={e => handleChange('cooperation_type', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:outline-none transition">
                {coopTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">目标消费者</label>
            <input type="text" value={formData.target_audience} onChange={e => handleChange('target_audience', e.target.value)}
              placeholder="例如：18-25岁女性，一二线城市"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition" />
          </div>

          {/* Row 4 */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">合作目的</label>
            <select value={formData.campaign_goal} onChange={e => handleChange('campaign_goal', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:outline-none transition">
              {goals.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          {/* Row 5 */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">偏好要求</label>
            <textarea value={formData.preferences} onChange={e => handleChange('preferences', e.target.value)}
              placeholder="例如：希望艺人形象阳光健康，有运动背景优先" rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition resize-y" />
          </div>

          {/* Row 6 */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">联系方式（选填）</label>
            <input type="text" value={formData.contact_info} onChange={e => handleChange('contact_info', e.target.value)}
              placeholder="邮箱或微信号"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition text-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? '⏳ AI匹配中...' : '🔮 开始AI匹配'}
          </button>
        </form>

        {/* Results */}
        {showResult && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-6 text-purple-400">✨ 匹配结果</h2>
            {matches.length === 0 ? (
              <div className="text-center py-12 text-gray-500">暂无匹配艺人，请调整筛选条件</div>
            ) : (
              <div className="space-y-4">
                {matches.map((m, i) => (
                  <div key={i} className="p-5 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/20 transition">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold">{i + 1}. {m.name}</span>
                      <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white">{m.score}分</span>
                    </div>
                    {m.category && <div className="text-sm text-gray-400 mb-3">{m.category}</div>}
                    <div className="flex gap-2 flex-wrap mb-3">
                      {m.reasons.map((r, j) => (
                        <span key={j} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-800 text-gray-300">{r}</span>
                      ))}
                    </div>
                    {m.bio && <div className="text-xs text-gray-400">{m.bio}</div>}
                    {m.biz && <div className="text-xs text-gray-500 mt-2">📌 近期商务：{m.biz}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
