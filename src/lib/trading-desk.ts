export type DataSourceStatus = 'manual' | 'simulated' | 'reference-only'
export type ConfidenceLevel = 'observe' | 'practice' | 'preflight'
export type RiskSeverity = 'low' | 'medium' | 'high'

export type TradingDesk = {
  version: string
  marketDate: string
  dataSources: Array<{
    name: string
    status: DataSourceStatus
  }>
  marketLanes: Array<{
    id: string
    label: string
    status: string
    focus: string
  }>
  primaryMission: {
    title: string
    objective: string
    reward: string
    steps: Array<{
      id: string
      label: string
      detail: string
    }>
  }
  opportunities: Array<{
    id: string
    market: string
    title: string
    confidence: ConfidenceLevel
    thesis: string
    evidence: string[]
    mission: string
  }>
  risks: Array<{
    id: string
    title: string
    severity: RiskSeverity
    trigger: string
    response: string
  }>
  calendar: Array<{
    id: string
    time: string
    market: string
    title: string
    expectedImpact: string
    affected: string
    source: string
  }>
}

export function todayInShanghai(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

export const dailyTradingDesk: TradingDesk = {
  version: 'Sprint 4 / stable operating draft',
  marketDate: todayInShanghai(),
  dataSources: [
    { name: '人工盘前判断', status: 'manual' },
    { name: '风险预算与计划表', status: 'manual' },
    { name: '市场事件参考', status: 'reference-only' },
  ],
  marketLanes: [
    {
      id: 'crypto-major',
      label: 'Crypto 主线',
      status: '观察优先',
      focus: '只跟踪 BTC/ETH/SOL 等高流动性标的，避免在无计划状态下追涨。',
    },
    {
      id: 'alpha-watch',
      label: 'Alpha 观察',
      status: '纸面演练',
      focus: '把候选机会先写入计划，确认失效点和风险预算后再决定是否小仓验证。',
    },
    {
      id: 'review-loop',
      label: '复盘闭环',
      status: '必须记录',
      focus: '执行后补充结果和偏差，避免计划只停留在开仓前。',
    },
  ],
  primaryMission: {
    title: '先完成交易计划，再决定是否执行',
    objective: '把机会、风险、失效点和仓位上限写清楚；没有明确计划时默认不交易。',
    reward: '完成后会形成可追踪的交易计划记录，后续可按状态筛选并复盘。',
    steps: [
      {
        id: 'define-opportunity',
        label: '写清楚机会假设',
        detail: '用一句话说明为什么现在值得观察或演练，不用模糊情绪替代证据。',
      },
      {
        id: 'cap-risk',
        label: '确认风险预算',
        detail: '填写账户规模和单笔风险比例，先看最大可承受损失。',
      },
      {
        id: 'set-invalidation',
        label: '设定失效条件',
        detail: '提前写下什么情况说明判断错了，避免临盘找理由。',
      },
      {
        id: 'review-after-action',
        label: '执行后补复盘',
        detail: '如果状态变为已执行或已取消，补充结果、偏差和下次调整。',
      },
    ],
  },
  opportunities: [
    {
      id: 'structured-plan',
      market: 'Crypto',
      title: '结构化计划替代冲动下单',
      confidence: 'preflight',
      thesis: '先把交易变成可记录任务，而不是临时情绪动作。',
      evidence: ['风险预算', '失效点', '状态追踪'],
      mission: '今日至少保存一条完整计划，即使最终选择不交易。',
    },
    {
      id: 'paper-before-real',
      market: 'Crypto',
      title: '纸面演练优先',
      confidence: 'practice',
      thesis: '没有强证据或高波动时，用纸面演练保留学习价值。',
      evidence: ['无实盘连接', '本地计划留痕'],
      mission: '对不确定机会选择纸面演练或观察。',
    },
    {
      id: 'review-discipline',
      market: 'Personal System',
      title: '把复盘变成产品能力',
      confidence: 'observe',
      thesis: '复盘提示和执行状态是 Sprint 4 从 dashboard 走向 operating system 的关键。',
      evidence: ['状态筛选', '复盘字段', '最近计划'],
      mission: '每次状态变化都留下原因。',
    },
  ],
  risks: [
    {
      id: 'over-risk',
      title: '单笔风险过高',
      severity: 'high',
      trigger: '风险比例超过 2% 或没有失效点。',
      response: '降低仓位、改为纸面演练，或直接取消计划。',
    },
    {
      id: 'missing-review',
      title: '执行后不复盘',
      severity: 'medium',
      trigger: '计划状态已执行但没有结果记录。',
      response: '补充复盘说明，至少记录是否符合预期。',
    },
    {
      id: 'data-limits',
      title: '数据仍是演示口径',
      severity: 'medium',
      trigger: '尚未接入真实行情、实盘账户或自动风控。',
      response: '界面明确标注参考性质，不提供下单承诺。',
    },
  ],
  calendar: [
    {
      id: 'asia-session',
      time: '09:00-12:00',
      market: 'Asia',
      title: '亚洲盘流动性观察',
      expectedImpact: '适合更新观察列表，不适合在无计划状态下追单。',
      affected: 'BTC / ETH / SOL',
      source: 'manual desk template',
    },
    {
      id: 'us-session',
      time: '21:30+',
      market: 'US',
      title: '美盘波动窗口',
      expectedImpact: '若计划已完成，可按失效点和风险预算做小仓验证。',
      affected: 'Crypto majors',
      source: 'manual desk template',
    },
  ],
}
