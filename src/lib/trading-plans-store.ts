import { randomUUID } from 'crypto'
import fs from 'fs/promises'
import path from 'path'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export type TradingPlanStatus = 'draft' | 'planned' | 'executed' | 'cancelled'

function isMissingStatusColumn(error: { message?: string; code?: string | null } | null) {
  return (
    (error?.code === '42703' && /status/i.test(error.message ?? '')) ||
    /column .*status.*exist/i.test(error?.message ?? '')
  )
}

function normalizePlanStatus(value: unknown): TradingPlanStatus {
  if (value === 'draft' || value === 'planned' || value === 'executed' || value === 'cancelled') {
    return value
  }

  return 'planned'
}

function normalizePlanForLegacy(payload: Record<string, unknown>) {
  return {
    ...payload,
    status: normalizePlanStatus(payload.status),
  }
}

export type NormalizedTradingPlan = {
  status: TradingPlanStatus
  planDate: string
  market: string
  symbols: string[]
  accountSizeUsdt: number | null
  riskPercent: number | null
  riskBudgetUsdt: number | null
  opportunity: string
  risk: string
  invalidation: string
  action: string
  reviewNote: string
  completedSteps: string[]
}

type FilesystemTradingPlan = NormalizedTradingPlan & {
  id: string
  clerkUserId: string
  createdAt: string
}

const FALLBACK_DIR = path.join(process.cwd(), '.data', 'trading-plans')

function userFilePath(userId: string) {
  const safeUserId = Buffer.from(userId).toString('base64url')
  return path.join(FALLBACK_DIR, `${safeUserId}.json`)
}

async function readFilesystemPlans(userId: string): Promise<FilesystemTradingPlan[]> {
  try {
    const raw = await fs.readFile(userFilePath(userId), 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function writeFilesystemPlans(userId: string, plans: FilesystemTradingPlan[]) {
  await fs.mkdir(FALLBACK_DIR, { recursive: true })
  await fs.writeFile(userFilePath(userId), `${JSON.stringify(plans, null, 2)}\n`, 'utf8')
}

export async function saveTradingPlan(userId: string, plan: NormalizedTradingPlan) {
  const supabase = getSupabaseAdmin()

  if (supabase) {
    const { data, error } = await supabase
      .from('trade_plans')
      .insert({
        status: plan.status,
        clerk_user_id: userId,
        plan_date: plan.planDate,
        market: plan.market,
        symbols: plan.symbols,
        account_size_usdt: plan.accountSizeUsdt,
        risk_percent: plan.riskPercent,
        risk_budget_usdt: plan.riskBudgetUsdt,
        opportunity: plan.opportunity,
        risk: plan.risk,
        invalidation: plan.invalidation,
        action: plan.action,
        review_note: plan.reviewNote,
        completed_steps: plan.completedSteps,
      })
      .select(
        'id, plan_date, market, symbols, status, account_size_usdt, risk_percent, risk_budget_usdt, opportunity, risk, invalidation, action, review_note, completed_steps, created_at',
      )
      .single()

    if (error) {
      if (isMissingStatusColumn(error)) {
        const { data: legacyData, error: legacyError } = await supabase
          .from('trade_plans')
          .insert({
            clerk_user_id: userId,
            plan_date: plan.planDate,
            market: plan.market,
            symbols: plan.symbols,
            account_size_usdt: plan.accountSizeUsdt,
            risk_percent: plan.riskPercent,
            risk_budget_usdt: plan.riskBudgetUsdt,
            opportunity: plan.opportunity,
            risk: plan.risk,
            invalidation: plan.invalidation,
            action: plan.action,
            review_note: plan.reviewNote,
            completed_steps: plan.completedSteps,
          })
          .select(
            'id, plan_date, market, symbols, account_size_usdt, risk_percent, risk_budget_usdt, opportunity, risk, invalidation, action, review_note, completed_steps, created_at',
          )
          .single()

        if (legacyError) {
          throw legacyError
        }

        return {
          storage: 'supabase' as const,
          plan: normalizePlanForLegacy({ ...legacyData, status: plan.status }),
        }
      }

      throw error
    }

    return {
      storage: 'supabase' as const,
      plan: data,
    }
  }

  const record: FilesystemTradingPlan = {
    id: randomUUID(),
    clerkUserId: userId,
    ...plan,
    createdAt: new Date().toISOString(),
  }
  const plans = await readFilesystemPlans(userId)
  await writeFilesystemPlans(userId, [record, ...plans].slice(0, 200))

  return {
    storage: 'filesystem' as const,
    plan: record,
  }
}

export async function listTradingPlans(userId: string) {
  const supabase = getSupabaseAdmin()

  if (supabase) {
    const { data, error } = await supabase
      .from('trade_plans')
      .select(
        'id, plan_date, market, symbols, status, account_size_usdt, risk_percent, risk_budget_usdt, opportunity, risk, invalidation, action, review_note, completed_steps, created_at',
      )
      .eq('clerk_user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      if (isMissingStatusColumn(error)) {
        const { data: legacyData, error: legacyError } = await supabase
          .from('trade_plans')
          .select(
            'id, plan_date, market, symbols, account_size_usdt, risk_percent, risk_budget_usdt, opportunity, risk, invalidation, action, review_note, completed_steps, created_at',
          )
          .eq('clerk_user_id', userId)
          .order('created_at', { ascending: false })
          .limit(20)

        if (legacyError) {
          throw legacyError
        }

        return {
          storage: 'supabase' as const,
          plans: legacyData.map(item => normalizePlanForLegacy(item)),
        }
      }

      throw error
    }

    return {
      storage: 'supabase' as const,
      plans: data.map(item => normalizePlanForLegacy(item)),
    }
  }

  const plans = await readFilesystemPlans(userId)

  return {
    storage: 'filesystem' as const,
    plans: plans.slice(0, 20),
  }
}
