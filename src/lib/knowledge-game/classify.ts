import type { BloomType, DikiwLevel, IntakeInput, KnowledgeTheme } from './types'

type Classification = {
  title: string
  summary: string
  theme: KnowledgeTheme
  dikiwLevel: DikiwLevel
  bloomType: BloomType
  role: string
  tags: string[]
  keyTakeaways: string[]
  actionSuggestion: string
}

const themeRules: Array<{ theme: KnowledgeTheme; role: string; keywords: string[] }> = [
  {
    theme: '01_交易信号系统',
    role: '交易者',
    keywords: ['交易', '仓位', '止损', '风控', 'A股', '股票', 'crypto', '信号', '亏损', '追涨'],
  },
  {
    theme: '02_信息差猎手',
    role: '信息差猎手',
    keywords: ['信息差', '机会', '热点', '平台', '流量', '内容', '选题', '渠道', '邮件', 'Gmail'],
  },
  {
    theme: '03_SingClaw基建',
    role: 'SingClaw Builder',
    keywords: ['SingClaw', 'OpenClaw', 'Hermes', 'Agent', 'API', '部署', '自动化', 'Supabase', 'Next.js'],
  },
  {
    theme: '04_职业变现库',
    role: '职业变现者',
    keywords: ['简历', '面试', '岗位', 'Offer', '职业', '求职', '项目包装', '变现', '咨询', '客户'],
  },
  {
    theme: '05_生活与兴趣',
    role: '生活经营者',
    keywords: ['健康', '宠物', '旅行', '生活', '家庭', '兴趣', '运动', '睡眠', '保险'],
  },
]

function includesAny(text: string, keywords: string[]) {
  const lower = text.toLowerCase()
  return keywords.some(keyword => lower.includes(keyword.toLowerCase()))
}

function compactText(value: string, maxLength: number) {
  const normalized = value.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) {
    return normalized
  }

  return `${normalized.slice(0, maxLength - 1)}…`
}

function inferTitle(input: IntakeInput) {
  if (input.title?.trim()) {
    return compactText(input.title, 64)
  }

  const firstLine = input.content
    .split(/\r?\n/)
    .map(line => line.trim())
    .find(Boolean)

  return compactText(firstLine || '未命名知识输入', 64)
}

function inferTheme(content: string) {
  const rule = themeRules.find(item => includesAny(content, item.keywords))

  if (rule) {
    return { theme: rule.theme, role: rule.role }
  }

  return { theme: '00_通用知识体系' as const, role: '终身学习者' }
}

function inferDikiw(content: string): DikiwLevel {
  if (includesAny(content, ['取舍', '不做', '决策', '边界', '原则', '判断', '行动建议'])) {
    return 'Wisdom'
  }

  if (includesAny(content, ['洞察', '风险', '机会', '关键结论', '变化', '意味着'])) {
    return 'Insight'
  }

  if (includesAny(content, ['方法', 'SOP', '流程', '步骤', '模板', '框架', '模型', '学习飞轮', '知识体系', 'DIKIW', '闭环'])) {
    return 'Knowledge'
  }

  if (includesAny(content, ['摘要', '总结', '分类', '上下文', '说明'])) {
    return 'Information'
  }

  return 'Data'
}

function inferBloom(content: string): BloomType {
  if (includesAny(content, ['学习', '思考', '复盘', '反思', '认知', '表达'])) {
    return '元认知知识'
  }

  if (includesAny(content, ['步骤', '流程', 'SOP', '清单', '模板', '怎么做', '操作'])) {
    return '程序性知识'
  }

  if (includesAny(content, ['模型', '理论', '概念', '原则', '底层逻辑', '规律'])) {
    return '概念性知识'
  }

  return '事实性知识'
}

function inferTags(content: string, theme: KnowledgeTheme, extraTags: string[] = []) {
  const tags = new Set<string>(extraTags.filter(Boolean))
  tags.add(theme.replace(/^\d+_/, ''))

  for (const tag of ['DIKIW', '复盘', '学习飞轮', '知识漏洞', '费曼输出', '实战', '飞书']) {
    if (content.includes(tag)) {
      tags.add(tag)
    }
  }

  return Array.from(tags).slice(0, 8)
}

function inferTakeaways(content: string) {
  const sentences = content
    .replace(/[。！？!?]/g, '。')
    .split('。')
    .map(item => compactText(item, 72))
    .filter(item => item.length >= 8)

  if (sentences.length >= 3) {
    return sentences.slice(0, 3)
  }

  return [
    '先保留来源和上下文，再决定是否升级为知识卡',
    '用 DIKIW 判断它目前处于原始材料、结构化信息还是可行动智慧',
    '下一步必须落到复盘、输出或实战中的一个动作',
  ]
}

export function classifyKnowledgeInput(input: IntakeInput): Classification {
  const content = input.content.trim()
  const { theme, role } = inferTheme(content)
  const title = inferTitle(input)
  const dikiwLevel = inferDikiw(content)
  const bloomType = inferBloom(content)
  const tags = inferTags(content, theme, input.tags)
  const keyTakeaways = inferTakeaways(content)

  return {
    title,
    summary: compactText(content, 180),
    theme,
    dikiwLevel,
    bloomType,
    role: input.role?.trim() || role,
    tags,
    keyTakeaways,
    actionSuggestion: '把这条知识推进到下一关：补一个使用场景、一次输出，或一次复盘验证。',
  }
}
