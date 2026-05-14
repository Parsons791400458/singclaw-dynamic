import fs from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { classifyKnowledgeInput } from './classify'
import { phaseOneSource, seedCards, seedProgress, seedQuests } from './seed'
import type {
  FeishuPublishInput,
  GameProgress,
  IntakeInput,
  KnowledgeGameSnapshot,
  KnowledgeLink,
  KnowledgeSource,
  Quest,
  QuestRun,
  QuestRunInput,
  ReviewInput,
  ReviewSession,
  WikiCard,
} from './types'

type FallbackState = Omit<KnowledgeGameSnapshot, 'storage'>

const FALLBACK_DIR = path.join(process.cwd(), '.data', 'knowledge-game')
const FALLBACK_FILE = path.join(FALLBACK_DIR, 'state.json')
const HERMES_FEISHU_SCRIPT = 'C:\\hermes\\scripts\\feishu_publish_knowledge_system_v2.py'

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function initialState(): FallbackState {
  return {
    sources: [clone(phaseOneSource)],
    cards: clone(seedCards),
    links: [],
    quests: clone(seedQuests),
    questRuns: [],
    reviews: [],
    progress: clone(seedProgress),
  }
}

function ensureSeedState(state: FallbackState): FallbackState {
  const next = clone(state)

  if (!next.sources.some(source => source.id === phaseOneSource.id)) {
    next.sources.push(clone(phaseOneSource))
  }

  for (const card of seedCards) {
    if (!next.cards.some(item => item.id === card.id)) {
      next.cards.push(clone(card))
    }
  }

  for (const quest of seedQuests) {
    if (!next.quests.some(item => item.id === quest.id)) {
      next.quests.push(clone(quest))
    }
  }

  if (!next.progress) {
    next.progress = clone(seedProgress)
  }

  return next
}

async function readFallbackState() {
  try {
    const raw = await fs.readFile(FALLBACK_FILE, 'utf8')
    return ensureSeedState(JSON.parse(raw) as FallbackState)
  } catch {
    const state = initialState()
    await writeFallbackState(state)
    return state
  }
}

async function writeFallbackState(state: FallbackState) {
  await fs.mkdir(FALLBACK_DIR, { recursive: true })
  await fs.writeFile(FALLBACK_FILE, `${JSON.stringify(ensureSeedState(state), null, 2)}\n`, 'utf8')
}

function nowIso() {
  return new Date().toISOString()
}

function reviewDueIso(days = 7) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

function slugify(title: string) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || `card-${Date.now()}`
}

function normalizeProgress(progress: GameProgress, cards: WikiCard[], extraXp = 0): GameProgress {
  const reviewedCards = cards.filter(card => card.status === 'Reviewed' || card.status === 'Mastered').length
  const masteredCards = cards.filter(card => card.status === 'Mastered').length
  const xp = progress.xp + extraXp

  return {
    ...progress,
    xp,
    level: Math.max(1, Math.floor(xp / 100) + 1),
    currentPhase: masteredCards > 0 ? 3 : cards.length > seedCards.length ? 2 : 1,
    reviewedCards,
    masteredCards,
    updatedAt: nowIso(),
  }
}

function sourceFromRow(row: any): KnowledgeSource {
  return {
    id: row.id,
    title: row.title,
    sourceType: row.source_type,
    sourceUri: row.source_uri,
    rawExcerpt: row.raw_excerpt,
    summary: row.summary,
    theme: row.theme,
    status: row.status,
    metadata: row.metadata || {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function cardFromRow(row: any): WikiCard {
  return {
    id: row.id,
    sourceId: row.source_id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    theme: row.theme,
    status: row.status,
    dikiwLevel: row.dikiw_level,
    bloomType: row.bloom_type,
    role: row.role,
    tags: row.tags || [],
    keyTakeaways: row.key_takeaways || [],
    actionSuggestion: row.action_suggestion,
    feishuUrl: row.feishu_url,
    reviewDueAt: row.review_due_at,
    masteryScore: row.mastery_score,
    metadata: row.metadata || {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function linkFromRow(row: any): KnowledgeLink {
  return {
    id: row.id,
    fromCardId: row.from_card_id,
    toCardId: row.to_card_id,
    linkType: row.link_type,
    rationale: row.rationale,
    createdAt: row.created_at,
  }
}

function questFromRow(row: any): Quest {
  return {
    id: row.id,
    questType: row.quest_type,
    title: row.title,
    description: row.description,
    theme: row.theme,
    requiredStatus: row.required_status,
    rewardXp: row.reward_xp,
    sortOrder: row.sort_order,
    active: row.active,
    metadata: row.metadata || {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function questRunFromRow(row: any): QuestRun {
  return {
    id: row.id,
    questId: row.quest_id,
    cardId: row.card_id,
    result: row.result,
    xpEarned: row.xp_earned,
    notes: row.notes,
    createdAt: row.created_at,
  }
}

function reviewFromRow(row: any): ReviewSession {
  return {
    id: row.id,
    reviewType: row.review_type,
    theme: row.theme,
    focus: row.focus,
    output: row.output,
    upgradedCardIds: row.upgraded_card_ids || [],
    status: row.status,
    createdAt: row.created_at,
  }
}

function progressFromRow(row: any): GameProgress {
  return {
    id: row.id,
    profileKey: row.profile_key,
    xp: row.xp,
    level: row.level,
    currentPhase: row.current_phase,
    reviewedCards: row.reviewed_cards,
    masteredCards: row.mastered_cards,
    lastReviewAt: row.last_review_at,
    metadata: row.metadata || {},
    updatedAt: row.updated_at,
  }
}

function sourceToRow(source: KnowledgeSource) {
  return {
    id: source.id,
    title: source.title,
    source_type: source.sourceType,
    source_uri: source.sourceUri,
    raw_excerpt: source.rawExcerpt,
    summary: source.summary,
    theme: source.theme,
    status: source.status,
    metadata: source.metadata || {},
    created_at: source.createdAt,
    updated_at: source.updatedAt,
  }
}

function cardToRow(card: WikiCard) {
  return {
    id: card.id,
    source_id: card.sourceId,
    slug: card.slug,
    title: card.title,
    summary: card.summary,
    theme: card.theme,
    status: card.status,
    dikiw_level: card.dikiwLevel,
    bloom_type: card.bloomType,
    role: card.role,
    tags: card.tags,
    key_takeaways: card.keyTakeaways,
    action_suggestion: card.actionSuggestion,
    feishu_url: card.feishuUrl,
    review_due_at: card.reviewDueAt,
    mastery_score: card.masteryScore,
    metadata: card.metadata || {},
    created_at: card.createdAt,
    updated_at: card.updatedAt,
  }
}

function questToRow(quest: Quest) {
  return {
    id: quest.id,
    quest_type: quest.questType,
    title: quest.title,
    description: quest.description,
    theme: quest.theme,
    required_status: quest.requiredStatus,
    reward_xp: quest.rewardXp,
    sort_order: quest.sortOrder,
    active: quest.active,
    metadata: quest.metadata || {},
    created_at: quest.createdAt,
    updated_at: quest.updatedAt,
  }
}

function progressToRow(progress: GameProgress) {
  return {
    id: progress.id,
    profile_key: progress.profileKey,
    xp: progress.xp,
    level: progress.level,
    current_phase: progress.currentPhase,
    reviewed_cards: progress.reviewedCards,
    mastered_cards: progress.masteredCards,
    last_review_at: progress.lastReviewAt,
    metadata: progress.metadata || {},
    updated_at: progress.updatedAt,
  }
}

async function ensureSupabaseSeed(supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>) {
  const { count, error } = await supabase
    .from('wiki_cards')
    .select('id', { count: 'exact', head: true })

  if (error) {
    throw error
  }

  if (count && count > 0) {
    const { count: questCount } = await supabase
      .from('quests')
      .select('id', { count: 'exact', head: true })

    if (!questCount) {
      await supabase.from('quests').upsert(seedQuests.map(questToRow), { onConflict: 'id' })
    }

    return
  }

  await supabase.from('knowledge_sources').upsert(sourceToRow(phaseOneSource), { onConflict: 'id' })
  await supabase.from('wiki_cards').upsert(seedCards.map(cardToRow), { onConflict: 'id' })
  await supabase.from('quests').upsert(seedQuests.map(questToRow), { onConflict: 'id' })
  await supabase.from('game_progress').upsert(progressToRow(seedProgress), { onConflict: 'profile_key' })
}

export async function getKnowledgeGameSnapshot(): Promise<KnowledgeGameSnapshot> {
  const supabase = getSupabaseAdmin()

  if (supabase) {
    try {
      await ensureSupabaseSeed(supabase)

      const [
        sourcesResult,
        cardsResult,
        linksResult,
        questsResult,
        questRunsResult,
        reviewsResult,
        progressResult,
      ] = await Promise.all([
        supabase.from('knowledge_sources').select('*').order('created_at', { ascending: false }),
        supabase.from('wiki_cards').select('*').order('updated_at', { ascending: false }),
        supabase.from('knowledge_links').select('*').order('created_at', { ascending: false }),
        supabase.from('quests').select('*').eq('active', true).order('sort_order', { ascending: true }),
        supabase.from('quest_runs').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('review_sessions').select('*').order('created_at', { ascending: false }).limit(50),
        supabase.from('game_progress').select('*').eq('profile_key', 'solo').maybeSingle(),
      ])

      const error = sourcesResult.error || cardsResult.error || linksResult.error || questsResult.error ||
        questRunsResult.error || reviewsResult.error || progressResult.error

      if (error) {
        throw error
      }

      return {
        storage: 'supabase',
        sources: (sourcesResult.data || []).map(sourceFromRow),
        cards: (cardsResult.data || []).map(cardFromRow),
        links: (linksResult.data || []).map(linkFromRow),
        quests: (questsResult.data || []).map(questFromRow),
        questRuns: (questRunsResult.data || []).map(questRunFromRow),
        reviews: (reviewsResult.data || []).map(reviewFromRow),
        progress: progressResult.data ? progressFromRow(progressResult.data) : clone(seedProgress),
      }
    } catch (error) {
      console.warn('Knowledge game Supabase read failed; falling back to local JSON.', error)
    }
  }

  const fallback = await readFallbackState()

  return {
    storage: 'filesystem',
    ...fallback,
  }
}

export async function createIntakeCard(input: IntakeInput) {
  if (!input.content?.trim()) {
    throw new Error('content is required')
  }

  const classified = classifyKnowledgeInput(input)
  const timestamp = nowIso()
  const sourceId = randomUUID()
  const cardId = randomUUID()
  const source: KnowledgeSource = {
    id: sourceId,
    title: classified.title,
    sourceType: input.sourceType || 'manual',
    sourceUri: input.sourceUri || null,
    rawExcerpt: input.content.trim().slice(0, 1000),
    summary: classified.summary,
    theme: classified.theme,
    status: 'Captured',
    metadata: { classifier: 'deterministic-v1' },
    createdAt: timestamp,
    updatedAt: timestamp,
  }
  const card: WikiCard = {
    id: cardId,
    sourceId,
    slug: `${slugify(classified.title)}-${cardId.slice(0, 8)}`,
    title: classified.title,
    summary: classified.summary,
    theme: classified.theme,
    status: 'Structured',
    dikiwLevel: classified.dikiwLevel,
    bloomType: classified.bloomType,
    role: classified.role,
    tags: classified.tags,
    keyTakeaways: classified.keyTakeaways,
    actionSuggestion: classified.actionSuggestion,
    feishuUrl: null,
    reviewDueAt: reviewDueIso(),
    masteryScore: 35,
    metadata: {
      classifier: 'deterministic-v1',
      phase: 2,
    },
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  const supabase = getSupabaseAdmin()

  if (supabase) {
    try {
      await ensureSupabaseSeed(supabase)

      const sourceResult = await supabase.from('knowledge_sources').insert(sourceToRow(source)).select('*').single()
      if (sourceResult.error) throw sourceResult.error

      const cardResult = await supabase.from('wiki_cards').insert(cardToRow(card)).select('*').single()
      if (cardResult.error) throw cardResult.error

      return {
        storage: 'supabase' as const,
        source: sourceFromRow(sourceResult.data),
        card: cardFromRow(cardResult.data),
      }
    } catch (error) {
      console.warn('Knowledge game Supabase intake failed; falling back to local JSON.', error)
    }
  }

  const state = await readFallbackState()
  state.sources.unshift(source)
  state.cards.unshift(card)
  state.progress = normalizeProgress(state.progress, state.cards, 10)
  await writeFallbackState(state)

  return {
    storage: 'filesystem' as const,
    source,
    card,
  }
}

function nextStatusForQuest(quest: Quest | undefined) {
  if (!quest) return { status: 'Structured' as const, masteryScore: 45 }

  if (quest.questType === 'understand') return { status: 'Understood' as const, masteryScore: 58 }
  if (quest.questType === 'craft') return { status: 'Understood' as const, masteryScore: 62 }
  if (quest.questType === 'output') return { status: 'Applied' as const, masteryScore: 72 }
  if (quest.questType === 'practice') return { status: 'Mastered' as const, masteryScore: 90 }
  if (quest.questType === 'boss') return { status: 'Mastered' as const, masteryScore: 100 }

  return { status: 'Structured' as const, masteryScore: 45 }
}

export async function recordQuestRun(input: QuestRunInput) {
  if (!input.questId) {
    throw new Error('questId is required')
  }

  const timestamp = nowIso()
  const supabase = getSupabaseAdmin()

  if (supabase) {
    try {
      await ensureSupabaseSeed(supabase)

      const questResult = await supabase.from('quests').select('*').eq('id', input.questId).maybeSingle()
      if (questResult.error) throw questResult.error

      const quest = questResult.data ? questFromRow(questResult.data) : undefined
      const xpEarned = quest?.rewardXp || 10
      const runRow = {
        id: randomUUID(),
        quest_id: input.questId,
        card_id: input.cardId || null,
        result: input.result || 'completed',
        xp_earned: xpEarned,
        notes: input.notes || null,
        created_at: timestamp,
      }

      const runResult = await supabase.from('quest_runs').insert(runRow).select('*').single()
      if (runResult.error) throw runResult.error

      if (input.cardId) {
        const target = nextStatusForQuest(quest)
        await supabase
          .from('wiki_cards')
          .update({
            status: target.status,
            mastery_score: target.masteryScore,
            updated_at: timestamp,
          })
          .eq('id', input.cardId)
      }

      const snapshot = await getKnowledgeGameSnapshot()
      const progress = normalizeProgress(snapshot.progress, snapshot.cards, xpEarned)
      await supabase.from('game_progress').upsert(progressToRow(progress), { onConflict: 'profile_key' })

      return {
        storage: 'supabase' as const,
        run: questRunFromRow(runResult.data),
        progress,
      }
    } catch (error) {
      console.warn('Knowledge game Supabase quest run failed; falling back to local JSON.', error)
    }
  }

  const state = await readFallbackState()
  const quest = state.quests.find(item => item.id === input.questId)
  const xpEarned = quest?.rewardXp || 10
  const run: QuestRun = {
    id: randomUUID(),
    questId: input.questId,
    cardId: input.cardId || null,
    result: input.result || 'completed',
    xpEarned,
    notes: input.notes || null,
    createdAt: timestamp,
  }

  if (input.cardId) {
    const card = state.cards.find(item => item.id === input.cardId)
    if (card) {
      const target = nextStatusForQuest(quest)
      card.status = target.status
      card.masteryScore = Math.max(card.masteryScore, target.masteryScore)
      card.updatedAt = timestamp
    }
  }

  state.questRuns.unshift(run)
  state.progress = normalizeProgress(state.progress, state.cards, xpEarned)
  await writeFallbackState(state)

  return {
    storage: 'filesystem' as const,
    run,
    progress: state.progress,
  }
}

export async function recordReview(input: ReviewInput) {
  if (!input.focus?.trim() || !input.output?.trim()) {
    throw new Error('focus and output are required')
  }

  const timestamp = nowIso()
  const supabase = getSupabaseAdmin()
  const upgradedCardIds = input.cardIds || []

  if (supabase) {
    try {
      await ensureSupabaseSeed(supabase)

      const row = {
        id: randomUUID(),
        review_type: input.reviewType,
        theme: input.theme || null,
        focus: input.focus,
        output: input.output,
        upgraded_card_ids: upgradedCardIds,
        status: 'completed',
        created_at: timestamp,
      }
      const reviewResult = await supabase.from('review_sessions').insert(row).select('*').single()
      if (reviewResult.error) throw reviewResult.error

      let updateQuery = supabase
        .from('wiki_cards')
        .update({
          status: 'Reviewed',
          review_due_at: reviewDueIso(14),
          updated_at: timestamp,
        })

      if (upgradedCardIds.length) {
        updateQuery = updateQuery.in('id', upgradedCardIds)
      } else if (input.theme) {
        updateQuery = updateQuery.eq('theme', input.theme)
      } else {
        updateQuery = updateQuery.neq('status', 'Mastered')
      }

      await updateQuery

      const snapshot = await getKnowledgeGameSnapshot()
      const progress = normalizeProgress(
        { ...snapshot.progress, lastReviewAt: timestamp },
        snapshot.cards,
        input.reviewType === 'monthly' ? 60 : input.reviewType === 'weekly' ? 35 : 15,
      )
      await supabase.from('game_progress').upsert(progressToRow(progress), { onConflict: 'profile_key' })

      return {
        storage: 'supabase' as const,
        review: reviewFromRow(reviewResult.data),
        progress,
      }
    } catch (error) {
      console.warn('Knowledge game Supabase review failed; falling back to local JSON.', error)
    }
  }

  const state = await readFallbackState()
  const review: ReviewSession = {
    id: randomUUID(),
    reviewType: input.reviewType,
    theme: input.theme || null,
    focus: input.focus,
    output: input.output,
    upgradedCardIds,
    status: 'completed',
    createdAt: timestamp,
  }
  const touchedCards = state.cards.filter(card => {
    if (upgradedCardIds.length) return upgradedCardIds.includes(card.id)
    if (input.theme) return card.theme === input.theme
    return card.status !== 'Mastered'
  }).slice(0, upgradedCardIds.length ? upgradedCardIds.length : 3)

  for (const card of touchedCards) {
    if (card.status !== 'Mastered') {
      card.status = 'Reviewed'
      card.masteryScore = Math.max(card.masteryScore, 76)
      card.reviewDueAt = reviewDueIso(14)
      card.updatedAt = timestamp
    }
  }

  state.reviews.unshift(review)
  state.progress = normalizeProgress(
    { ...state.progress, lastReviewAt: timestamp },
    state.cards,
    input.reviewType === 'monthly' ? 60 : input.reviewType === 'weekly' ? 35 : 15,
  )
  await writeFallbackState(state)

  return {
    storage: 'filesystem' as const,
    review,
    progress: state.progress,
  }
}

export async function recordFeishuPublishRequest(input: FeishuPublishInput) {
  const timestamp = nowIso()
  const source: KnowledgeSource = {
    id: randomUUID(),
    title: input.title || '知识星图飞书发布请求',
    sourceType: 'feishu_publish_request',
    sourceUri: HERMES_FEISHU_SCRIPT,
    rawExcerpt: input.notes || null,
    summary: `Requested publish for ${(input.cardIds || []).length || 'all'} card(s).`,
    theme: '03_SingClaw基建',
    status: 'Captured',
    metadata: {
      cardIds: input.cardIds || [],
      hermesScript: HERMES_FEISHU_SCRIPT,
      enabled: process.env.HERMES_FEISHU_PUBLISH_ENABLED === 'true',
    },
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  const supabase = getSupabaseAdmin()

  if (supabase) {
    try {
      await ensureSupabaseSeed(supabase)
      const result = await supabase.from('knowledge_sources').insert(sourceToRow(source)).select('*').single()
      if (result.error) throw result.error

      return {
        storage: 'supabase' as const,
        request: sourceFromRow(result.data),
        hermesScript: HERMES_FEISHU_SCRIPT,
      }
    } catch (error) {
      console.warn('Knowledge game Supabase Feishu request failed; falling back to local JSON.', error)
    }
  }

  const state = await readFallbackState()
  state.sources.unshift(source)
  await writeFallbackState(state)

  return {
    storage: 'filesystem' as const,
    request: source,
    hermesScript: HERMES_FEISHU_SCRIPT,
  }
}
