import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const REPORTS_DIR = path.join(process.cwd(), 'public/data/reports')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { agent, report, date } = body
    
    if (!agent || !report) {
      return NextResponse.json({ error: 'Missing agent or report' }, { status: 400 })
    }
    
    const reportDate = date || new Date().toISOString().slice(0, 10)
    const fileName = `${agent}-${reportDate}.json`
    const filePath = path.join(REPORTS_DIR, fileName)
    
    // 确保目录存在
    fs.mkdirSync(REPORTS_DIR, { recursive: true })
    
    // 写入报告
    fs.writeFileSync(filePath, JSON.stringify({
      agent,
      report,
      timestamp: new Date().toISOString(),
      date: reportDate
    }, null, 2))
    
    // 同时维护一个 all.json 汇总
    const allPath = path.join(REPORTS_DIR, 'all.json')
    let all: any[] = []
    if (fs.existsSync(allPath)) {
      try { all = JSON.parse(fs.readFileSync(allPath, 'utf8')) } catch {}
    }
    // 更新同 agent 的记录（去重）
    const existingIdx = all.findIndex((a: any) => a.agent === agent && a.date === reportDate)
    const entry = { agent, report, timestamp: new Date().toISOString(), date: reportDate }
    if (existingIdx >= 0) {
      all[existingIdx] = entry
    } else {
      all.push(entry)
    }
    // 只保留最近 30 条
    all = all.slice(-30)
    fs.writeFileSync(allPath, JSON.stringify(all, null, 2))
    
    return NextResponse.json({ ok: true, file: fileName })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const allPath = path.join(REPORTS_DIR, 'all.json')
    if (!fs.existsSync(allPath)) {
      return NextResponse.json({ reports: [] })
    }
    const all = JSON.parse(fs.readFileSync(allPath, 'utf8'))
    return NextResponse.json({ reports: all })
  } catch {
    return NextResponse.json({ reports: [] })
  }
}
