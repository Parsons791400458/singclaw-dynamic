"use client"

import { useEffect, useMemo, useState } from 'react'
import type { TradingDesk } from '@/lib/trading-desk'

type ProfileSyncStatus = {
  ok: boolean
  storage: 'supabase' | 'disabled'
  message: string
}

type PlanExecutionStatus = 'draft' | 'planned' | 'executed' | 'cancelled'
type RecentPlanStatusFilter = 'all' | PlanExecutionStatus
type RiskAssessment = 'error' | 'warning' | 'ok'

type TradingMissionDeskProps = {
  displayName: string
  profileSync: ProfileSyncStatus
  desk: TradingDesk
}

type PlanState = {
  market: string
  symbols: string
  accountSizeUsdt: string
  riskPercent: string
  opportunity: string
  risk: string
  invalidation: string
  action: 'observe' | 'paper' | 'small-test' | 'no-trade'
  reviewNote: string
  status: PlanExecutionStatus
  aggressiveRiskAcknowledged: boolean
}

type SaveState = {
  status: 'idle' | 'saving' | 'saved' | 'error'
  message: string
}

type RecentPlan = {
  id: string
  status: PlanExecutionStatus
  createdAt: string
  planDate: string
  market: string
  symbols: string[]
  accountSizeUsdt: number | null
  riskPercent: number | null
  riskBudgetUsdt: number | null
  opportunity: string
  risk: string
  invalidation: string
  action: 'observe' | 'paper' | 'small-test' | 'no-trade' | string
  reviewNote: string
}

type RecentState = 'loading' | 'ready' | 'empty' | 'error'

const confidenceLabels: Record<'observe' | 'practice' | 'preflight', string> = {
  observe: '观察',
  practice: '练习',
  preflight: '建议执行',
}

const confidenceClass: Record<'observe' | 'practice' | 'preflight', string> = {
  observe: 'bg-slate-400/15 text-slate-100',
  practice: 'bg-sky-400/15 text-sky-100',
  preflight: 'bg-emerald-400/15 text-emerald-100',
}

const severityLabels: Record<'low' | 'medium' | 'high', string> = {
  low: '低',
  medium: '中',
  high: '高',
}

const severityClass: Record<'low' | 'medium' | 'high', string> = {
  low: 'border-emerald-300/40 bg-emerald-500/10 text-emerald-100',
  medium: 'border-amber-300/40 bg-amber-500/10 text-amber-100',
  high: 'border-rose-400/40 bg-rose-500/10 text-rose-100',
}

const dataSourceLabels: Record<'manual' | 'simulated' | 'reference-only', string> = {
  manual: '手工填充',
  simulated: '模拟预演',
  'reference-only': '参考素材',
}

const dataSourceClass: Record<'manual' | 'simulated' | 'reference-only', string> = {
  manual: 'bg-slate-400/15 text-slate-100',
  simulated: 'bg-sky-400/15 text-sky-100',
  'reference-only': 'bg-amber-400/15 text-amber-100',
}

const actionLabels: Record<'observe' | 'paper' | 'small-test' | 'no-trade', string> = {
  observe: '观察',
  paper: '纸面演练',
  'small-test': '小仓验证',
  'no-trade': '暂不交易',
}

const actionHint: Record<'observe' | 'paper' | 'small-test' | 'no-trade', string> = {
  observe: '先确认方向和证据，再考虑执行。',
  paper: '先写计划，不下真实订单。',
  'small-test': '先减仓位做验证，专注触发条件。',
  'no-trade': '市场不满足条件先暂停，不做冲动交易。',
}

const planStatusLabels: Record<PlanExecutionStatus, string> = {
  draft: '草稿',
  planned: '已计划',
  executed: '已执行',
  cancelled: '已取消',
}

const planStatusClass: Record<PlanExecutionStatus, string> = {
  draft: 'bg-slate-400/15 text-slate-100',
  planned: 'bg-sky-400/15 text-sky-100',
  executed: 'bg-emerald-400/15 text-emerald-100',
  cancelled: 'bg-rose-400/15 text-rose-100',
}

const planStatusOptions: Array<{ value: PlanExecutionStatus; label: string }> = [
  { value: 'draft', label: '草稿' },
  { value: 'planned', label: '已计划' },
  { value: 'executed', label: '已执行' },
  { value: 'cancelled', label: '已取消' },
]

const planStatusGuidance: Record<PlanExecutionStatus, string> = {
  draft: '草稿：仍在思考，还不适合执行。',
  planned: '已计划：策略准备完成，等待合适时机。',
  executed: '已执行：请记录结果，确认是否符合预期。',
  cancelled: '已取消：记录为未执行做出决定的原因与判断。',
}

const planStatusGuidanceClass: Record<PlanExecutionStatus, string> = {
  draft: 'border-slate-500/30 bg-slate-700/25 text-slate-200',
  planned: 'border-sky-300/25 bg-sky-400/10 text-sky-100',
  executed: 'border-emerald-300/25 bg-emerald-400/10 text-emerald-100',
  cancelled: 'border-rose-300/25 bg-rose-400/10 text-rose-100',
}

const riskAssessmentLabel: Record<RiskAssessment, string> = {
  ok: '风险输入通过',
  warning: '激进计划，需确认',
  error: '缺少必要项',
}

const riskAssessmentClass: Record<RiskAssessment, string> = {
  ok: 'border-emerald-300/30 bg-emerald-400/10 text-emerald-100',
  warning: 'border-amber-300/30 bg-amber-400/10 text-amber-100',
  error: 'border-rose-300/30 bg-rose-400/10 text-rose-100',
}

const riskAssessmentStatus: Record<RiskAssessment, string> = {
  ok: '可执行',
  warning: '可执行（已确认）',
  error: '不可执行',
}

const recentPlanFilterOptions: Array<{ value: RecentPlanStatusFilter; label: string }> = [
  { value: 'all', label: '全部' },
  { value: 'draft', label: planStatusLabels.draft },
  { value: 'planned', label: planStatusLabels.planned },
  { value: 'executed', label: planStatusLabels.executed },
  { value: 'cancelled', label: planStatusLabels.cancelled },
]

const defaultPlan: PlanState = {
  market: 'Crypto',
  symbols: '',
  accountSizeUsdt: '3000',
  riskPercent: '1',
  opportunity: '',
  risk: '',
  invalidation: '',
  action: 'observe',
  reviewNote: '',
  status: 'draft',
  aggressiveRiskAcknowledged: false,
}

function asPlanStatus(value: unknown): PlanExecutionStatus {
  if (value === 'draft' || value === 'planned' || value === 'executed' || value === 'cancelled') {
    return value
  }

  return 'planned'
}


function splitSymbols(value: string) {
  return value
    .split(/[\s,，、\/|+]+/)
    .map(item => item.trim().toUpperCase())
    .filter(Boolean)
    .slice(0, 3)
}

function parsePositiveNumber(value: string) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

function normalizeRecentPlan(raw: unknown): RecentPlan | null {
  if (!raw || typeof raw !== 'object') {
    return null
  }

  const plan = raw as Record<string, unknown>
  const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
  const asNumber = (value: unknown) => {
    const parsed =
      typeof value === 'number' ? value : typeof value === 'string' ? Number.parseFloat(value) : Number.NaN

    return Number.isFinite(parsed) ? parsed : null
  }

  const symbolsValue = plan.symbols
  const symbols = Array.isArray(symbolsValue)
    ? symbolsValue.map(symbol => asText(symbol)).filter(Boolean).slice(0, 3)
    : asText(symbolsValue).length > 0
      ? splitSymbols(asText(symbolsValue))
      : []

  const id = asText(plan.id)
  if (!id) {
    return null
  }

  const action = asText(plan.action)
  const actionType = ['observe', 'paper', 'small-test', 'no-trade'].includes(action)
    ? (action as 'observe' | 'paper' | 'small-test' | 'no-trade')
    : 'observe'

  return {
    id,
    status: asPlanStatus(plan.status),
    createdAt: asText(plan.created_at || plan.createdAt),
    planDate: asText(plan.plan_date || plan.planDate),
    market: asText(plan.market) || 'Crypto',
    symbols,
    accountSizeUsdt: asNumber(plan.account_size_usdt || plan.accountSizeUsdt),
    riskPercent: asNumber(plan.risk_percent || plan.riskPercent),
    riskBudgetUsdt: asNumber(plan.risk_budget_usdt || plan.riskBudgetUsdt),
    opportunity: asText(plan.opportunity),
    risk: asText(plan.risk),
    invalidation: asText(plan.invalidation),
    action: actionType,
    reviewNote: asText(plan.reviewNote || plan.review_note),
  }
}

function formatDateTime(value: string) {
  if (!value) {
    return ''
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return parsed.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function shortText(value: string, length = 72) {
  const normalized = value.trim()
  return normalized.length > length ? `${normalized.slice(0, length)}...` : normalized
}

export default function TradingMissionDesk({
  displayName,
  profileSync,
  desk,
}: TradingMissionDeskProps) {
  const completedStorageKey = `singclaw:mission:${desk.marketDate}:completed`
  const planStorageKey = `singclaw:plan:${desk.marketDate}`

  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [plan, setPlan] = useState<PlanState>(defaultPlan)
  const [saveState, setSaveState] = useState<SaveState>({
    status: 'idle',
    message: '填写后点击保存，系统会保留草稿。',
  })
  const [recentPlans, setRecentPlans] = useState<RecentPlan[]>([])
  const [recentPlanState, setRecentPlanState] = useState<RecentState>('loading')
  const [recentPlanError, setRecentPlanError] = useState('')
  const [recentPlanFilter, setRecentPlanFilter] = useState<RecentPlanStatusFilter>('all')
  useEffect(() => {
    const loadDraftAndHistory = async () => {
      try {
        const completed = window.localStorage.getItem(completedStorageKey)
        const storedPlan = window.localStorage.getItem(planStorageKey)

        if (completed) {
          const parsed = JSON.parse(completed)
          if (Array.isArray(parsed)) {
            setCompletedSteps(parsed.filter(item => typeof item === 'string'))
          }
        }

        if (storedPlan) {
          const parsed = JSON.parse(storedPlan)
          setPlan({
            market: typeof parsed.market === 'string' ? parsed.market : defaultPlan.market,
            symbols: Array.isArray(parsed.symbols)
              ? parsed.symbols.join(', ')
              : typeof parsed.symbols === 'string'
                ? parsed.symbols
                : defaultPlan.symbols,
            accountSizeUsdt:
              typeof parsed.accountSizeUsdt === 'number'
                ? String(parsed.accountSizeUsdt)
                : typeof parsed.accountSizeUsdt === 'string'
                  ? parsed.accountSizeUsdt
                  : defaultPlan.accountSizeUsdt,
            riskPercent:
              typeof parsed.riskPercent === 'number'
                ? String(parsed.riskPercent)
                : typeof parsed.riskPercent === 'string'
                  ? parsed.riskPercent
                  : defaultPlan.riskPercent,
            opportunity: typeof parsed.opportunity === 'string' ? parsed.opportunity : defaultPlan.opportunity,
            risk: typeof parsed.risk === 'string' ? parsed.risk : defaultPlan.risk,
            invalidation:
              typeof parsed.invalidation === 'string' ? parsed.invalidation : defaultPlan.invalidation,
            action: parsed.action || defaultPlan.action,
            reviewNote: typeof parsed.reviewNote === 'string' ? parsed.reviewNote : defaultPlan.reviewNote,
            status: asPlanStatus(parsed.status),
            aggressiveRiskAcknowledged:
              typeof parsed.aggressiveRiskAcknowledged === 'boolean'
                ? parsed.aggressiveRiskAcknowledged
                : false,
          })
          setSaveState({
            status: 'saved',
            message: '已恢复本地草稿，保存后可同步到后端。',
          })
        }
      } catch {
        setSaveState({
          status: 'error',
          message: '本地草稿读取失败，请刷新页面重试。',
        })
      }

      try {
        const response = await fetch('/api/trading-plans', { cache: 'no-store' })
        const payload = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(payload.error || '获取最近计划失败')
        }

        const list = Array.isArray(payload.plans)
          ? payload.plans.map(normalizeRecentPlan).filter(Boolean)
          : []
        setRecentPlans(list as RecentPlan[])
        setRecentPlanState(list.length ? 'ready' : 'empty')
      } catch (error) {
        setRecentPlanState('error')
        setRecentPlanError(
          error instanceof Error ? error.message : '获取最近计划失败，请检查网络与服务状态。',
        )
      }
    }

    void loadDraftAndHistory()
  }, [completedStorageKey, planStorageKey])

  const progress = useMemo(() => {
    if (!desk.primaryMission.steps.length) {
      return 0
    }

    return Math.round((completedSteps.length / desk.primaryMission.steps.length) * 100)
  }, [completedSteps.length, desk.primaryMission.steps.length])

  const selectedSymbols = splitSymbols(plan.symbols)
  const accountSize = parsePositiveNumber(plan.accountSizeUsdt)
  const riskPercent = parsePositiveNumber(plan.riskPercent)
  const riskBudget = accountSize && riskPercent ? (accountSize * riskPercent) / 100 : 0

  const riskIsAggressive = riskPercent > 2
  const riskHasError = selectedSymbols.length === 0 || accountSize <= 0 || riskPercent <= 0 || !plan.opportunity.trim() || !plan.risk.trim() || !plan.invalidation.trim()
  const shouldPromptReview = plan.status === 'executed' || plan.status === 'cancelled'
  const reviewNoteMissing = shouldPromptReview && !plan.reviewNote.trim()

  const riskAssessment: RiskAssessment = riskHasError
    ? 'error'
    : riskIsAggressive && !plan.aggressiveRiskAcknowledged
      ? 'warning'
      : 'ok'

  const riskAssessmentMessage =
    riskAssessment === 'error'
      ? '请补齐必填项（标的、账户、风险、机会、核心风险、失效条件）。'
      : riskIsAggressive && !plan.aggressiveRiskAcknowledged
        ? '风险比例高于 2%，请勾选确认后保存。'
        : '风险预算可执行，建议控制在 0.5%-2% 区间。'

  const canSavePlan =
    selectedSymbols.length > 0 &&
    accountSize > 0 &&
    riskPercent > 0 &&
    plan.opportunity.trim().length > 0 &&
    plan.risk.trim().length > 0 &&
    plan.invalidation.trim().length > 0 &&
    !(riskIsAggressive && !plan.aggressiveRiskAcknowledged)

  const filteredRecentPlans = useMemo(() => {
    const list =
      recentPlanFilter === 'all'
        ? recentPlans
        : recentPlans.filter(plan => plan.status === recentPlanFilter)

    return list.slice(0, 5)
  }, [recentPlans, recentPlanFilter])

  function updatePlan<K extends keyof PlanState>(key: K, value: PlanState[K]) {
    setPlan(current => {
      const next = { ...current, [key]: value } as PlanState

      if (key === 'riskPercent') {
        next.aggressiveRiskAcknowledged = false
      }

      return next
    })
    setSaveState(current =>
      current.status === 'idle'
        ? current
        : {
            status: 'idle',
            message: '内容已更新，请重新保存。',
          },
    )
  }

  function toggleStep(stepId: string) {
    setCompletedSteps(current => {
      const next = current.includes(stepId)
        ? current.filter(item => item !== stepId)
        : [...current, stepId]

      window.localStorage.setItem(completedStorageKey, JSON.stringify(next))
      return next
    })
  }

  async function refreshRecentPlans() {
    const response = await fetch('/api/trading-plans', { cache: 'no-store' })
    const payload = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(payload.error || '获取最近计划失败')
    }

    const list = Array.isArray(payload.plans) ? payload.plans.map(normalizeRecentPlan).filter(Boolean) : []
    setRecentPlans(list as RecentPlan[])
    setRecentPlanState(list.length ? 'ready' : 'empty')
    setRecentPlanError('')
  }

  async function savePlan() {
    if (!canSavePlan) {
      setSaveState({
        status: 'error',
        message: riskAssessmentMessage || '请先完成必填项后再保存。',
      })
      return
    }

    const payload = {
      status: plan.status,
      planDate: desk.marketDate,
      market: plan.market,
      symbols: selectedSymbols,
      accountSizeUsdt: accountSize || null,
      riskPercent: riskPercent || null,
      riskBudgetUsdt: riskBudget || null,
      opportunity: plan.opportunity.trim(),
      risk: plan.risk.trim(),
      invalidation: plan.invalidation.trim(),
      action: plan.action,
      reviewNote: plan.reviewNote.trim(),
      completedSteps,
      aggressiveRiskAcknowledged: plan.aggressiveRiskAcknowledged,
    }

    setSaveState({ status: 'saving', message: '正在保存计划...' })
    window.localStorage.setItem(planStorageKey, JSON.stringify({ ...payload, savedAt: new Date().toISOString() }))

    try {
      const response = await fetch('/api/trading-plans', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || '保存失败，请稍后重试。')
      }

      setSaveState({
        status: 'saved',
        message:
          data.storage === 'supabase'
            ? '已保存到云端计划。'
            : data.storage === 'filesystem'
              ? '已保存到本地文件。'
              : '已保存为本地草稿。',
      })
      await refreshRecentPlans()
    } catch (error) {
      setSaveState({
        status: 'error',
        message: error instanceof Error ? error.message : '保存失败，请稍后再试。',
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#07110f] text-slate-50">
      <section className="border-b border-emerald-300/10 bg-[linear-gradient(135deg,#07110f_0%,#101827_58%,#160b1c_100%)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase text-emerald-200">
                <span>{desk.version}</span>
                <span className="text-slate-500">/</span>
                <span>Daily Trading Desk</span>
                <span className="text-slate-500">/</span>
                <span>{desk.marketDate}</span>
              </div>
              <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">每日交易执行任务台</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                {displayName}，先看今日机会和风险，再写明执行计划。
                目标是先确认可承受损失，避免冲动决策。
              </p>
            </div>
            <div className="w-full rounded-lg border border-white/10 bg-white/[0.06] p-4 lg:w-[360px]">
              <div className="text-sm font-semibold text-slate-200">数据状态</div>
              <div className="mt-2 text-sm leading-6 text-slate-400">{profileSync.message}</div>
              <div className="mt-2 text-xs text-slate-500">
                当前演示口径：手工记录 + 模拟推演 + 参考素材，不包含实盘连接或下单。
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-xs uppercase text-slate-500">
                <span>存储来源</span>
                <span className={profileSync.ok ? 'text-emerald-200' : 'text-amber-200'}>{profileSync.storage}</span>
              </div>
              <div className="mt-4 space-y-2">
                {desk.dataSources.length ? (
                  desk.dataSources.map(source => (
                    <div
                      key={source.name}
                      className="flex items-center justify-between rounded-md border border-white/10 bg-black/20 px-3 py-2 text-xs"
                    >
                      <span className="text-slate-200">{source.name}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${dataSourceClass[source.status]}`}>
                        {dataSourceLabels[source.status]}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-xs text-slate-400">
                    暂无数据来源信息
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {desk.marketLanes.length > 0 ? desk.marketLanes.map(lane => (
              <article key={lane.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-base font-bold text-white">{lane.label}</h2>
                  <span className="rounded-md bg-white/10 px-2 py-1 text-xs text-slate-200">{lane.status}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{lane.focus}</p>
              </article>
            )) : (
              <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm text-slate-400">今日暂无市场焦点。</div>
            )}
          </div>
        </div>
      </section>
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(360px,0.82fr)] lg:px-8">
        <section className="space-y-6">
          <div className="rounded-lg border border-emerald-300/20 bg-[#0d1917] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase text-emerald-200">今日主任务</div>
                <h2 className="mt-2 text-2xl font-black text-white">{desk.primaryMission.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{desk.primaryMission.objective}</p>
              </div>
              <div className="min-w-[140px] rounded-lg border border-emerald-200/20 bg-emerald-300/10 p-3 text-center">
                <div className="text-3xl font-black text-emerald-100">{progress}%</div>
                <div className="mt-1 text-xs uppercase text-emerald-200">完成率</div>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {desk.primaryMission.steps.length > 0 ? desk.primaryMission.steps.map((step, index) => {
                const completed = completedSteps.includes(step.id)
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => toggleStep(step.id)}
                    className={`grid grid-cols-[44px_minmax(0,1fr)_88px] items-start gap-3 rounded-lg border p-4 text-left transition ${
                      completed
                        ? 'border-emerald-300/40 bg-emerald-400/10'
                        : 'border-white/10 bg-white/[0.04] hover:border-emerald-300/30'
                    }`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-black/25 text-sm font-black text-slate-100">{index + 1}</span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-white">{step.label}</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-400">{step.detail}</span>
                    </span>
                    <span
                      className={`rounded-md px-2 py-1 text-center text-xs font-semibold ${
                        completed ? 'bg-emerald-300/20 text-emerald-100' : 'bg-slate-300/10 text-slate-300'
                      }`}
                    >
                      {completed ? '已完成' : '未完成'}
                    </span>
                  </button>
                )
              }) : (
                <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm text-slate-400">当前暂无任务步骤。</div>
              )}
            </div>

            <div className="mt-4 rounded-lg border border-sky-300/20 bg-sky-300/10 p-4 text-sm leading-6 text-sky-100">{desk.primaryMission.reward}</div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#0d1320] p-5">
            <div className="text-sm font-semibold uppercase text-emerald-200">机会</div>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {desk.opportunities.length > 0 ? desk.opportunities.map(item => (
                <article key={item.id} className="rounded-lg border border-white/10 bg-[#111827] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase text-slate-500">{item.market}</div>
                      <h3 className="mt-2 text-lg font-black leading-6 text-white">{item.title}</h3>
                    </div>
                    <span className={`rounded-md px-2 py-1 text-xs font-semibold ${confidenceClass[item.confidence]}`}>{confidenceLabels[item.confidence]}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.thesis}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.evidence.map(evidence => (
                      <span key={evidence} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300">{evidence}</span>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-white/10 pt-3 text-sm font-semibold leading-6 text-emerald-100">{item.mission}</div>
                </article>
              )) : (
                <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm text-slate-400">暂无今日机会。</div>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#15141b] p-5">
            <div className="text-sm font-semibold uppercase text-rose-200">风险提示</div>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {desk.risks.length > 0 ? desk.risks.map(item => (
                <article key={item.id} className="rounded-lg border border-white/10 bg-[#15141b] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-black leading-6 text-white">{item.title}</h3>
                    <span className={`rounded-md border px-2 py-1 text-xs font-semibold ${severityClass[item.severity]}`}>{severityLabels[item.severity]}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400"><span className="font-semibold text-slate-200">触发：</span>{item.trigger}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300"><span className="font-semibold text-slate-100">处理：</span>{item.response}</p>
                </article>
              )) : (
                <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm text-slate-400">当前无高优先级风险。</div>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#0d1320] p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase text-sky-200">事件日历</div>
                <h2 className="mt-2 text-2xl font-black text-white">今日影响时段</h2>
              </div>
              <div className="text-sm text-slate-400">先关注事件，再决定执行窗口。</div>
            </div>

            <div className="mt-5 grid gap-3">
              {desk.calendar.length > 0 ? desk.calendar.map(item => (
                <div
                  key={item.id}
                  className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 md:grid-cols-[120px_120px_minmax(0,1fr)]"
                >
                  <div>
                    <div className="text-xs uppercase text-slate-500">时间</div>
                    <div className="mt-1 text-sm font-bold text-white">{item.time}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-slate-500">市场</div>
                    <div className="mt-1 text-sm font-bold text-white">{item.market}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-black text-white">{item.title}</div>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{item.expectedImpact}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">受影响：{item.affected} / 来源：{item.source}</p>
                  </div>
                </div>
              )) : (
                <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm text-slate-400">今日暂无事件提醒。</div>
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-white/10 bg-[#121826] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase text-fuchsia-200">交易计划</div>
                <h2 className="mt-2 text-2xl font-black text-white">今日计划</h2>
              </div>
              <span className={`rounded-md px-2 py-1 text-xs font-semibold ${canSavePlan ? 'bg-emerald-300/20 text-emerald-100' : 'bg-amber-300/20 text-amber-100'}`}>{canSavePlan ? '可保存' : '字段不完整'}</span>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-slate-200">市场</span>
                <select
                  value={plan.market}
                  onChange={event => updatePlan('market', event.target.value)}
                  className="mt-2 h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                >
                  <option>Crypto</option>
                  <option>CN Equity</option>
                  <option>US Equity</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-200">标的（最多3个）</span>
                <input
                  value={plan.symbols}
                  onChange={event => updatePlan('symbols', event.target.value)}
                  placeholder="BTC, ETH, SOL"
                  className="mt-2 h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                />
                <span className="mt-2 block min-h-5 text-xs text-slate-500">识别标的：{selectedSymbols.length ? selectedSymbols.join(' / ') : '请先填写'}</span>
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase text-emerald-100/70">账户规模（USDT）</span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={plan.accountSizeUsdt}
                    onChange={event => updatePlan('accountSizeUsdt', event.target.value)}
                    className="mt-2 h-11 w-full rounded-lg border border-emerald-300/20 bg-slate-950 px-3 text-sm text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase text-emerald-100/70">风险比例（%）</span>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={plan.riskPercent}
                    onChange={event => updatePlan('riskPercent', event.target.value)}
                    className="mt-2 h-11 w-full rounded-lg border border-emerald-300/20 bg-slate-950 px-3 text-sm text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                  />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <div className="text-xs uppercase text-slate-500">风险预算</div>
                  <div className="mt-1 text-xl font-black text-white">{riskBudget ? `${riskBudget.toFixed(2)} USDT` : '--'}</div>
                  <div className="mt-1 text-xs text-slate-500">公式：账户规模 × 风险比例</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <div className="text-xs uppercase text-slate-500">风险校验</div>
                  <div className="mt-1 text-sm font-bold text-white">{riskAssessmentLabel[riskAssessment]}</div>
                  <div className={`mt-2 rounded-md border px-2 py-2 text-xs ${riskAssessmentClass[riskAssessment]}`}>
                    {riskAssessmentMessage}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">建议 0.5%-2%，超过 2% 需显式确认。</div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm leading-5 text-slate-300">
                风险预算状态：
                <span className={`ml-2 rounded-md px-2 py-1 text-xs font-semibold ${riskAssessmentClass[riskAssessment]}`}>
                  {riskAssessmentStatus[riskAssessment]}
                </span>
              </div>

              {riskIsAggressive ? (
                <label className="flex items-start gap-3 rounded-lg border border-amber-300/25 bg-amber-400/10 p-3 text-sm text-amber-100">
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    checked={plan.aggressiveRiskAcknowledged}
                    onChange={event => updatePlan('aggressiveRiskAcknowledged', event.target.checked)}
                  />
                  <span>
                    我确认当前计划为高风险（风险比例超过 2%），并愿意在可承受范围内承受较大回撤后继续执行。
                  </span>
                </label>
              ) : null}

              <label className="block">
                <span className="text-sm font-semibold text-slate-200">机会说明（必填）</span>
                <textarea
                  value={plan.opportunity}
                  onChange={event => updatePlan('opportunity', event.target.value)}
                  rows={3}
                  placeholder="例如 BTC 现货回补，ETH 上涨动能增强，SOL 出现量能变化。"
                  className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-200">核心风险（必填）</span>
                <textarea
                  value={plan.risk}
                  onChange={event => updatePlan('risk', event.target.value)}
                  rows={3}
                  placeholder="例如 资金费率上升、杠杆拥挤、链上异常波动。"
                  className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-200">失效条件（必填）</span>
                <textarea
                  value={plan.invalidation}
                  onChange={event => updatePlan('invalidation', event.target.value)}
                  rows={2}
                  placeholder="例如 价格跌破关键支撑，OI 失速，出现关键新闻突变。"
                  className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-200">执行动作</span>
                <select
                  value={plan.action}
                  onChange={event => updatePlan('action', event.target.value as PlanState['action'])}
                  className="mt-2 h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                >
                  <option value="observe">观察</option>
                  <option value="paper">纸面演练</option>
                  <option value="small-test">小仓验证</option>
                  <option value="no-trade">暂不交易</option>
                </select>
                <div className="mt-2 text-xs text-slate-400">{actionHint[plan.action]}</div>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-200">执行状态</span>
                <select
                  value={plan.status}
                  onChange={event => updatePlan('status', event.target.value as PlanExecutionStatus)}
                  className="mt-2 h-11 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                >
                  {planStatusOptions.map(option => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className={`mt-2 rounded-md border px-2 py-2 text-xs ${planStatusGuidanceClass[plan.status]}`}>
                  {planStatusGuidance[plan.status]}
                </div>
              </label>

              <label className="block">
                <span className={`text-sm font-semibold ${shouldPromptReview ? 'text-amber-100' : 'text-slate-200'}`}>
                  复盘备注{shouldPromptReview ? '（建议填写）' : '（可选）'}
                </span>
                {shouldPromptReview ? (
                  <div className="mt-2 rounded-md border border-amber-300/35 bg-amber-400/10 p-2 text-xs text-amber-100">
                    <p className="font-semibold">请按三点记录：结果 / 偏差 / 下一步。</p>
                    <p className="mt-1 text-amber-100/90">示例：结果=是否达标；偏差=执行中遗漏；下一步=下次要改进。</p>
                  </div>
                ) : null}
                <textarea
                  value={plan.reviewNote}
                  onChange={event => updatePlan('reviewNote', event.target.value)}
                  rows={3}
                  placeholder={
                    shouldPromptReview
                      ? '示例：结果=计划收益；偏差=入场晚；下一步=提高监控频率。'
                      : '记录执行过程中的情绪波动与偏差，复盘时更快回看。'
                  }
                  className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                />
              </label>

              <button
                type="button"
                onClick={savePlan}
                disabled={saveState.status === 'saving' || !canSavePlan}
                className="h-11 w-full rounded-lg bg-emerald-400 px-4 text-sm font-black text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
              >
                {saveState.status === 'saving' ? '保存中...' : canSavePlan ? '保存交易计划' : '先补齐后再保存'}
              </button>

              <div
                className={`rounded-lg border p-3 text-sm leading-6 ${
                  saveState.status === 'error'
                    ? 'border-amber-300/30 bg-amber-400/10 text-amber-100'
                    : 'border-slate-700 bg-slate-950 text-slate-300'
                }`}
              >
                {saveState.message}
              </div>
              {reviewNoteMissing ? (
                <div className="rounded-lg border border-amber-300/35 bg-amber-400/10 p-3 text-xs leading-6 text-amber-100">
                  当前为“已执行/已取消”，请补充复盘要点：结果、偏差、下一步。不填写不会阻止保存。
                </div>
              ) : null}

              {!canSavePlan ? (
                <div className="rounded-lg border border-amber-300/30 bg-amber-400/10 p-3 text-xs leading-6 text-amber-100">
                  <p>未完成必填项或未确认：</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4">
                    {!selectedSymbols.length ? <li>标的（最多3个）</li> : null}
                    {!accountSize ? <li>账户规模（大于0）</li> : null}
                    {!riskPercent ? <li>风险比例（大于0）</li> : null}
                    {!plan.opportunity.trim() ? <li>机会说明</li> : null}
                    {!plan.risk.trim() ? <li>核心风险</li> : null}
                    {!plan.invalidation.trim() ? <li>失效条件</li> : null}
                    {riskIsAggressive && !plan.aggressiveRiskAcknowledged ? <li>激进计划确认（风险比例&gt;2%）</li> : null}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#181525] p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase text-emerald-200">最近计划</div>
                <h2 className="mt-1 text-xl font-black text-white">最近保存版本</h2>
              </div>
              <label className="text-xs text-slate-400">
                <span className="mr-2">状态筛选</span>
                <select
                  value={recentPlanFilter}
                  onChange={event => setRecentPlanFilter(event.target.value as RecentPlanStatusFilter)}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                >
                  {recentPlanFilterOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {recentPlanState === 'loading' ? <div className="mt-4 rounded-lg border border-slate-700 bg-black/20 p-3 text-sm text-slate-400">正在加载历史计划...</div> : null}
            {recentPlanState === 'error' ? <div className="mt-4 rounded-lg border border-amber-300/30 bg-amber-400/10 p-3 text-sm text-amber-100">{recentPlanError}</div> : null}
            {recentPlanState === 'empty' ? <div className="mt-4 rounded-lg border border-slate-700 bg-black/20 p-3 text-sm text-slate-400">尚未保存历史计划。</div> : null}

            {recentPlanState === 'ready' && filteredRecentPlans.length === 0 ? (
              <div className="mt-4 rounded-lg border border-slate-700 bg-black/20 p-3 text-sm text-slate-400">
                当前筛选下暂无计划，可尝试切换筛选条件。
              </div>
            ) : null}

            {recentPlanState === 'ready' ? (
              <div className="mt-4 space-y-3">
                {filteredRecentPlans.map(item => (
                  <article key={item.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${planStatusClass[item.status]}`}>
                        {planStatusLabels[item.status]}
                      </span>
                      <span>{item.market}</span>
                      <span className="text-slate-500">{formatDateTime(item.createdAt || item.planDate)}</span>
                    </div>
                    <div className="mt-2 text-sm font-bold text-white">{item.symbols.join(', ') || '未填写标的'}</div>
                    <p className="mt-1 text-xs text-slate-400">预算：{item.riskBudgetUsdt ? `${item.riskBudgetUsdt.toFixed(2)} USDT` : '未计算'} / 风险：{item.riskPercent ? `${item.riskPercent}%` : '未设置'}</p>
                    <p className="mt-1 text-xs text-slate-300">机会：{shortText(item.opportunity)}</p>
                    <p className="mt-1 text-xs text-slate-500">动作：{actionLabels[item.action as keyof typeof actionLabels] || '未设置'}</p>
                    {item.reviewNote ? <p className="mt-1 text-xs text-slate-300">复盘：{shortText(item.reviewNote)}</p> : null}
                  </article>
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-lg border border-amber-300/30 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
            <p>本页面用于复盘与训练，不构成投资建议。请先确认最坏损失再决策。</p>
          </div>
        </aside>
      </main>
    </div>
  )
}
