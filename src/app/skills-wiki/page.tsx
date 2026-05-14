'use client'
import { useState } from 'react'

const skills = [
  { name: 'brave-search', desc: 'Brave Search API 集成，用于网页搜索', status: 'active', category: '搜索' },
  { name: 'tavily', desc: 'Tavily Search API，高质量网页内容提取', status: 'active', category: '搜索' },
  { name: 'web-fetch', desc: '网页内容抓取，HTML → Markdown 转换', status: 'active', category: '抓取' },
  { name: 'weather', desc: '天气查询 API，支持全球城市', status: 'active', category: '数据' },
  { name: 'okx-cex-portfolio', desc: 'OKX CEX 投资组合查询', status: 'active', category: '交易' },
  { name: 'okx-cex-market', desc: 'OKX CEX 市场数据查询', status: 'active', category: '交易' },
  { name: 'okx-cex-trade', desc: 'OKX CEX 交易执行', status: 'active', category: '交易' },
  { name: 'okx-cex-earn', desc: 'OKX CEX 理财功能', status: 'active', category: '交易' },
  { name: 'okx-cex-bot', desc: 'OKX CEX 量化交易机器人', status: 'active', category: '交易' },
  { name: 'tradingview-mcp', desc: 'TradingView 图表和技术分析', status: 'active', category: '分析' },
  { name: 'content-hunter', desc: '内容猎手，自动发现和筛选热门内容', status: 'active', category: '内容' },
  { name: 'content-writer', desc: '内容写作，AI 生成文章和帖子', status: 'active', category: '内容' },
  { name: 'xhs-cover', desc: '小红书封面生成工具', status: 'active', category: '视觉' },
  { name: 'photo-enhance', desc: '照片增强和美化工具', status: 'active', category: '视觉' },
  { name: 'video-frames', desc: '视频帧提取工具', status: 'active', category: '视觉' },
  { name: 'ppt-generator', desc: 'PPT 演示文稿生成器', status: 'active', category: '文档' },
  { name: 'pdf', desc: 'PDF 文档解析和处理', status: 'active', category: '文档' },
  { name: 'docx', desc: 'Word 文档生成和编辑', status: 'active', category: '文档' },
  { name: 'xlsx', desc: 'Excel 表格生成和处理', status: 'active', category: '文档' },
  { name: 'supabase', desc: 'Supabase 数据库管理 Agent', status: 'active', category: '基建' },
  { name: 'supabase-postgres-best-practices', desc: 'PostgreSQL 最佳实践指南', status: 'active', category: '基建' },
  { name: 'feishu-doc-manager', desc: '飞书文档管理集成', status: 'active', category: '协作' },
  { name: 'humanizer-zh', desc: '中文文本去 AI 味工具', status: 'active', category: '内容' },
  { name: 'growth-agent', desc: '增长黑客 Agent，用户增长策略', status: 'active', category: '增长' },
  { name: 'social-media-agent', desc: '社交媒体多平台分发 Agent', status: 'active', category: '增长' },
  { name: 'douyin-hot-trend', desc: '抖音热搜和热门趋势监控', status: 'active', category: '数据' },
  { name: 'bilibili-hot-monitor', desc: 'B站热门视频和趋势监控', status: 'active', category: '数据' },
  { name: 'zhihu-post', desc: '知乎内容发布工具', status: 'active', category: '内容' },
  { name: 'agent-browser', desc: 'Agent 浏览器自动化操作', status: 'active', category: '自动化' },
  { name: 'multi-agent-cn', desc: '中文多 Agent 协作框架', status: 'active', category: '架构' },
]

const categories = ['全部', '搜索', '交易', '内容', '视觉', '文档', '数据', '基建', '协作', '增长', '自动化', '架构', '抓取']

export default function SkillsWikiPage() {
  const [activeCat, setActiveCat] = useState('全部')

  const filtered = activeCat === '全部' ? skills : skills.filter(s => s.category === activeCat)

  return (
    <div className="min-h-screen bg-gray-950 text-white py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Skills Directory</div>
          <h1 className="text-5xl font-black mb-4">🧠 Skills Wiki</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">OpenClaw 技能百科 — 所有可用 Agent 技能的分类目录和使用指南</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-black text-emerald-400">{skills.length}</div>
            <div className="text-xs text-gray-500">技能总数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-blue-400">{new Set(skills.map(s => s.category)).size}</div>
            <div className="text-xs text-gray-500">分类</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-purple-400">{skills.filter(s => s.status === 'active').length}</div>
            <div className="text-xs text-gray-500">已激活</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${activeCat === cat ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'text-gray-400 border border-gray-800 hover:border-gray-600'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map(s => (
            <div key={s.name} className="p-4 rounded-xl bg-gray-900/40 border border-gray-800 hover:border-gray-700 transition group flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm group-hover:text-blue-400 transition">{s.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-400">{s.category}</span>
                <span className="w-2 h-2 rounded-full bg-green-400" title="Active" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
