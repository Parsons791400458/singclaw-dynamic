export const KNOWLEDGE_STATUSES = [
  'Captured',
  'Structured',
  'Understood',
  'Applied',
  'Reviewed',
  'Mastered',
] as const

export const DIKIW_LEVELS = ['Data', 'Information', 'Knowledge', 'Insight', 'Wisdom'] as const

export const BLOOM_TYPES = ['事实性知识', '概念性知识', '程序性知识', '元认知知识'] as const

export const KNOWLEDGE_THEMES = [
  '00_通用知识体系',
  '01_交易信号系统',
  '02_信息差猎手',
  '03_SingClaw基建',
  '04_职业变现库',
  '05_生活与兴趣',
] as const

export const QUEST_TYPES = ['intake', 'understand', 'craft', 'output', 'practice', 'boss'] as const

export const REVIEW_TYPES = ['daily', 'weekly', 'monthly'] as const

export type KnowledgeStatus = (typeof KNOWLEDGE_STATUSES)[number]
export type DikiwLevel = (typeof DIKIW_LEVELS)[number]
export type BloomType = (typeof BLOOM_TYPES)[number]
export type KnowledgeTheme = (typeof KNOWLEDGE_THEMES)[number]
export type QuestType = (typeof QUEST_TYPES)[number]
export type ReviewType = (typeof REVIEW_TYPES)[number]

export type KnowledgeSource = {
  id: string
  title: string
  sourceType: string
  sourceUri?: string | null
  rawExcerpt?: string | null
  summary?: string | null
  theme: KnowledgeTheme
  status: KnowledgeStatus
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export type WikiCard = {
  id: string
  sourceId?: string | null
  slug: string
  title: string
  summary: string
  theme: KnowledgeTheme
  status: KnowledgeStatus
  dikiwLevel: DikiwLevel
  bloomType: BloomType
  role: string
  tags: string[]
  keyTakeaways: string[]
  actionSuggestion?: string | null
  feishuUrl?: string | null
  reviewDueAt?: string | null
  masteryScore: number
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export type KnowledgeLink = {
  id: string
  fromCardId: string
  toCardId: string
  linkType: string
  rationale?: string | null
  createdAt: string
}

export type Quest = {
  id: string
  questType: QuestType
  title: string
  description: string
  theme: KnowledgeTheme
  requiredStatus?: KnowledgeStatus | null
  rewardXp: number
  sortOrder: number
  active: boolean
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export type QuestRun = {
  id: string
  questId: string
  cardId?: string | null
  result: string
  xpEarned: number
  notes?: string | null
  createdAt: string
}

export type ReviewSession = {
  id: string
  reviewType: ReviewType
  theme?: KnowledgeTheme | null
  focus: string
  output: string
  upgradedCardIds: string[]
  status: string
  createdAt: string
}

export type GameProgress = {
  id: string
  profileKey: string
  xp: number
  level: number
  currentPhase: number
  reviewedCards: number
  masteredCards: number
  lastReviewAt?: string | null
  metadata?: Record<string, unknown>
  updatedAt: string
}

export type KnowledgeGameSnapshot = {
  storage: 'supabase' | 'filesystem'
  sources: KnowledgeSource[]
  cards: WikiCard[]
  links: KnowledgeLink[]
  quests: Quest[]
  questRuns: QuestRun[]
  reviews: ReviewSession[]
  progress: GameProgress
}

export type IntakeInput = {
  title?: string
  content: string
  sourceType?: string
  sourceUri?: string
  role?: string
  tags?: string[]
}

export type ReviewInput = {
  reviewType: ReviewType
  theme?: KnowledgeTheme
  focus: string
  output: string
  cardIds?: string[]
}

export type QuestRunInput = {
  questId: string
  cardId?: string
  result?: string
  notes?: string
}

export type FeishuPublishInput = {
  cardIds?: string[]
  title?: string
  notes?: string
}

export type AutomationCandidate = {
  id: string
  title: string
  sourceType: string
  sourceUri: string
  excerpt: string
  size: number
  modifiedAt: string
  suggestedTheme: KnowledgeTheme
  suggestedDikiwLevel: DikiwLevel
  suggestedBloomType: BloomType
  tags: string[]
  alreadyImported: boolean
}

export type AutomationImportInput = {
  sourceUris?: string[]
  limit?: number
}

export const dikiwArtifactLabel: Record<DikiwLevel, string> = {
  Data: '原石',
  Information: '罗盘',
  Knowledge: '工具',
  Insight: '宝石',
  Wisdom: '神器',
}

export const statusOrder: Record<KnowledgeStatus, number> = {
  Captured: 1,
  Structured: 2,
  Understood: 3,
  Applied: 4,
  Reviewed: 5,
  Mastered: 6,
}
