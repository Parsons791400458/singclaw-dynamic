// /embed — SINGCLAW-MVP 右下角客服弹窗演示页 (S4)
// 用法: 把 <script src="https://app.singclaw.xyz/embed/widget.js" data-session-key="..." async></script>
// 放到任意页面 </body> 前。
'use client'

import { useEffect } from 'react'

export default function EmbedDemoPage() {
  useEffect(() => {
    // 演示：在本站也加载一次 widget（生产不要这样做）
    if (typeof document === 'undefined') return
    const s = document.createElement('script')
    s.src = '/embed/widget.js'
    s.async = true
    s.setAttribute('data-position', 'bottom-right')
    document.body.appendChild(s)
    return () => {
      try { document.body.removeChild(s) } catch { /* ignore */ }
    }
  }, [])

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Embed Demo</h1>
      <p className="text-gray-400 mb-6">
        右下角应该浮出一个 SingClaw 客服按钮。点它开始对话。
      </p>

      <div className="rounded-2xl bg-gray-900/60 border border-gray-800 p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">接入方式</h2>
        <p className="text-sm text-gray-400 mb-3">任意网页的 <code>&lt;/body&gt;</code> 之前插入：</p>
        <pre className="bg-gray-950 border border-gray-800 rounded p-3 text-xs overflow-x-auto">
{`<script
  src="https://app.singclaw.xyz/embed/widget.js"
  data-session-key="<可选>"
  data-position="bottom-right"
  async
></script>`}
        </pre>
      </div>

      <div className="rounded-2xl bg-gray-900/60 border border-gray-800 p-6">
        <h2 className="text-xl font-semibold mb-2">API</h2>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>· POST <code>/api/mvp-chat</code> — 单 turn</li>
          <li>· GET <code>/v1/mvp/health</code> — Adapter 健康</li>
          <li>· session_id 存 <code>localStorage['singclaw-mvp-session-id']</code></li>
        </ul>
      </div>
    </div>
  )
}