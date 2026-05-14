import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import {
  listTradingPlans,
  saveTradingPlan,
  type NormalizedTradingPlan,
} from '@/lib/trading-plans-store'
import { isClerkFullyConfigured } from '@/lib/clerk-config'

export const dynamic = 'force-dynamic'

const clerkConfigured = isClerkFullyConfigured()

type TradingPlanPayload = {
  status?: unknown
  planDate?: unknown
  market?: unknown
  symbols?: unknown
  accountSizeUsdt?: unknown
  riskPercent?: unknown
  riskBudgetUsdt?: unknown
  opportunity?: unknown
  risk?: unknown
  invalidation?: unknown
  action?: unknown
  reviewNote?: unknown
  completedSteps?: unknown
}

const statusValues = ['draft', 'planned', 'executed', 'cancelled'] as const
type TradingPlanStatus = (typeof statusValues)[number]

function asStatus(value: unknown): TradingPlanStatus {
  const text = asText(value)
  return statusValues.includes(text as TradingPlanStatus)
    ? (text as TradingPlanStatus)
    : 'planned'
}

function asText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function asOptionalPositiveNumber(value: unknown) {
  const parsed =
    typeof value === 'number' ? value : typeof value === 'string' ? Number(value.trim()) : 0

  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

function normalizeDate(value: unknown) {
  const text = asText(value)

  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return text
  }

  return new Date().toISOString().slice(0, 10)
}

function normalizeSymbols(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map(item => asText(item).toUpperCase())
      .filter(Boolean)
      .slice(0, 3)
  }

  return asText(value)
    .split(/[\s,\uFF0C\u3001\/|+]+/)
    .map(item => item.trim().toUpperCase())
    .filter(Boolean)
    .slice(0, 3)
}

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return []
  }

  return value.map(item => asText(item)).filter(Boolean)
}

function normalizePlan(body: TradingPlanPayload): NormalizedTradingPlan {
  const status = asStatus(body.status)
  const accountSizeUsdt = asOptionalPositiveNumber(body.accountSizeUsdt)
  const riskPercent = asOptionalPositiveNumber(body.riskPercent)
  const riskBudgetUsdt =
    asOptionalPositiveNumber(body.riskBudgetUsdt) ||
    (accountSizeUsdt && riskPercent ? (accountSizeUsdt * riskPercent) / 100 : null)

  return {
    status,
    planDate: normalizeDate(body.planDate),
    market: asText(body.market) || 'Crypto',
    symbols: normalizeSymbols(body.symbols),
    accountSizeUsdt,
    riskPercent,
    riskBudgetUsdt,
    opportunity: asText(body.opportunity),
    risk: asText(body.risk),
    invalidation: asText(body.invalidation),
    action: asText(body.action) || 'observe',
    reviewNote: asText(body.reviewNote),
    completedSteps: normalizeStringArray(body.completedSteps),
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!clerkConfigured) {
      return NextResponse.json({
        ok: true,
        storage: 'local',
        message: 'Auth is not configured; the browser local draft is the source of truth.',
      })
    }

    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const plan = normalizePlan((await req.json()) as TradingPlanPayload)

    if (!plan.symbols.length) {
      return NextResponse.json({ error: 'At least one symbol is required.' }, { status: 400 })
    }

    if (!plan.opportunity || !plan.risk || !plan.invalidation) {
      return NextResponse.json(
        { error: 'Opportunity, risk, and invalidation are required.' },
        { status: 400 },
      )
    }

    if (plan.accountSizeUsdt === null) {
      return NextResponse.json({ error: 'Account size must be greater than 0.' }, { status: 400 })
    }

    if (plan.riskPercent === null) {
      return NextResponse.json(
        { error: 'Risk percent must be greater than 0 and can be saved after confirmation if >2.' },
        { status: 400 },
      )
    }

    const result = await saveTradingPlan(userId, plan)

    return NextResponse.json({
      ok: true,
      ...result,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unexpected error' },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    if (!clerkConfigured) {
      return NextResponse.json({
        ok: true,
        storage: 'local',
        plans: [],
      })
    }

    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await listTradingPlans(userId)

    return NextResponse.json({
      ok: true,
      ...result,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unexpected error' },
      { status: 500 },
    )
  }
}
