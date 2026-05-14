export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-4">🎯 我的仪表板</h1>
        <p className="text-gray-400 mb-8">用户系统即将上线，敬请期待</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-3">📊 Crypto 历史</h3>
            <p className="text-gray-400 text-sm">历史快照、信号记录、交易历史</p>
            <p className="text-yellow-400 text-sm mt-2">🔧 建设中...</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-3">📝 我的笔记</h3>
            <p className="text-gray-400 text-sm">Get 笔记同步与个人知识库</p>
            <p className="text-yellow-400 text-sm mt-2">🔧 建设中...</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-3">⭐ 明星匹配历史</h3>
            <p className="text-gray-400 text-sm">查看你的品牌需求历史记录</p>
            <p className="text-yellow-400 text-sm mt-2">🔧 建设中...</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-3">⚙️ 设置</h3>
            <p className="text-gray-400 text-sm">通知偏好、推送渠道管理</p>
            <p className="text-yellow-400 text-sm mt-2">🔧 建设中...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
