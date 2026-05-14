'use client'

import { useState, useEffect } from 'react'

interface Report {
  agent: string
  report: string
  timestamp: string
  date: string
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Report | null>(null)

  useEffect(() => {
    fetch('/api/cron-output')
      .then(r => r.json())
      .then(d => {
        setReports((d.reports || []).sort((a: Report, b: Report) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const agentEmoji: Record<string, string> = {
    '小链': '🔗', '小美': '🎨', '小虾编': '✍️', '小SEO': '🔍', '小运': '📢',
    '小维': '🛡️', 'sre-engineer': '🛡️', 'singclaw-chain': '🔗',
    'g-crypto-alpha': '₿', 'g-a-stock-alpha': '📈'
  }

  if (loading) return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">加载中...</div>

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">📋 Cron 巡检报告</h1>
        {reports.length === 0 ? (
          <p className="text-gray-500">暂无报告</p>
        ) : (
          <div className="space-y-3">
            {reports.map((r, i) => (
              <div key={i} 
                className="bg-gray-900 rounded-lg p-4 cursor-pointer hover:bg-gray-800 transition"
                onClick={() => setSelected(selected === r ? null : r)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg">{agentEmoji[r.agent] || '🤖'}</span>
                    <span className="ml-2 font-semibold">{r.agent}</span>
                    <span className="ml-3 text-sm text-gray-400">{r.date}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(r.timestamp).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
                  </span>
                </div>
                {selected === r && (
                  <pre className="mt-3 p-3 bg-gray-950 rounded text-sm text-gray-300 whitespace-pre-wrap overflow-auto max-h-96">
                    {typeof r.report === 'string' ? r.report : JSON.stringify(r.report, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
