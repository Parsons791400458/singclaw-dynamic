'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) { setError(error.message); return }
    setSuccess('注册成功！请检查邮箱确认。')
    setTimeout(() => router.push('/login'), 2000)
  }

  return (
    <div className="max-w-md mx-auto pt-20 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">注册 SingClaw</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <div>
          <label className="block text-sm text-gray-400 mb-1">邮箱</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" required />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">密码（至少6位）</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={6}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 outline-none" required />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">{success}</p>}
        <button type="submit" disabled={loading}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition disabled:opacity-50">
          {loading ? '注册中...' : '注册'}
        </button>
        <p className="text-center text-sm text-gray-400">
          已有账号？<Link href="/login" className="text-blue-400 hover:underline">登录</Link>
        </p>
      </form>
    </div>
  )
}
