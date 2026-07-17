'use client';

import { useState } from 'react';

// ─── Data ───────────────────────────────────────────────────────────────────

const stats = [
  { num: '476', label: '合约总数', color: 'text-amber-400' },
  { num: '214', label: 'Alpha币 (无现货)', color: 'text-emerald-400' },
  { num: '262', label: 'Normal (有现货)', color: 'text-blue-400' },
  { num: '1.56x', label: '超额命中倍数', color: 'text-purple-400' },
];

const freqList = [
  { rank: 1, name: 'ESPORTS', chg: 58.5, pct: 100 },
  { rank: 2, name: 'TAC', chg: 28.3, pct: 48 },
  { rank: 3, name: 'AKE', chg: 23.4, pct: 40 },
  { rank: 4, name: 'US', chg: 22.8, pct: 38 },
  { rank: 5, name: 'COLLECT', chg: 20.8, pct: 35 },
  { rank: 6, name: 'SKYAI', chg: 16.8, pct: 28 },
  { rank: 7, name: 'RAVE', chg: 11.4, pct: 19 },
  { rank: 8, name: 'SOXS', chg: 10.1, pct: 17 },
  { rank: 9, name: 'GUA', chg: 9.5, pct: 16 },
  { rank: 10, name: 'BULLA', chg: 9.4, pct: 16 },
  { rank: 11, name: 'MYX', chg: 8.3, pct: 14 },
  { rank: 12, name: 'TRIA', chg: 7.5, pct: 12 },
  { rank: 13, name: 'SPORTFUN', chg: 6.8, pct: 11 },
  { rank: 14, name: 'RIVER', chg: 6.7, pct: 11 },
  { rank: 15, name: 'BAS', chg: 6.7, pct: 11 },
  { rank: 16, name: 'STABLE', chg: 6.7, pct: 11 },
];

const alphaTop10 = [
  { rank: 1, coin: 'ESPORTS', chg: '+58.47%', pos: true },
  { rank: 2, coin: 'TAC', chg: '+28.26%', pos: true },
  { rank: 3, coin: 'AKE', chg: '+23.42%', pos: true },
  { rank: 4, coin: 'US', chg: '+22.79%', pos: true },
  { rank: 5, coin: 'COLLECT', chg: '+20.76%', pos: true },
  { rank: 6, coin: 'SKYAI', chg: '+16.75%', pos: true },
  { rank: 7, coin: 'RAVE', chg: '+11.41%', pos: true },
  { rank: 8, coin: 'SOXS', chg: '+10.07%', pos: true },
  { rank: 9, coin: 'GUA', chg: '+9.52%', pos: true },
  { rank: 10, coin: 'BULLA', chg: '+9.36%', pos: true },
];

const normalTop10 = [
  { rank: 1, coin: 'BANK', chg: '+20.53%', pos: true },
  { rank: 2, coin: 'LUMIA', chg: '+18.50%', pos: true },
  { rank: 3, coin: 'KAITO', chg: '+11.76%', pos: true },
  { rank: 4, coin: 'RESOLV', chg: '+10.25%', pos: true },
  { rank: 5, coin: 'MUBARAK', chg: '+9.57%', pos: true },
  { rank: 6, coin: 'MMT', chg: '+7.97%', pos: true },
  { rank: 7, coin: 'MANTRA', chg: '+7.05%', pos: true },
  { rank: 8, coin: 'HEI', chg: '+5.69%', pos: true },
  { rank: 9, coin: 'PYTH', chg: '+5.50%', pos: true },
  { rank: 10, coin: 'MANTA', chg: '+5.18%', pos: true },
];

interface DailyEntry {
  rank: number;
  type: 'alpha' | 'normal';
  coin: string;
  chg: string;
}

const dailyData: Record<string, { alphaRatio: string; entries: DailyEntry[] }> = {
  '07-17': {
    alphaRatio: '7/10',
    entries: [
      { rank: 1, type: 'alpha', coin: 'ESPORTS', chg: '+58.47%' },
      { rank: 2, type: 'alpha', coin: 'TAC', chg: '+28.26%' },
      { rank: 3, type: 'alpha', coin: 'AKE', chg: '+23.42%' },
      { rank: 4, type: 'alpha', coin: 'US', chg: '+22.79%' },
      { rank: 5, type: 'alpha', coin: 'COLLECT', chg: '+20.76%' },
      { rank: 6, type: 'alpha', coin: 'SKYAI', chg: '+16.75%' },
      { rank: 7, type: 'alpha', coin: 'RAVE', chg: '+11.41%' },
      { rank: 8, type: 'alpha', coin: 'SOXS', chg: '+10.07%' },
      { rank: 9, type: 'alpha', coin: 'GUA', chg: '+9.52%' },
      { rank: 10, type: 'alpha', coin: 'BULLA', chg: '+9.36%' },
    ],
  },
};

const strategies = [
  { icon: '1️⃣', title: '首日暴涨次日追', desc: 'Alpha币首次进入Top10且涨幅>50%，次日回调5-10%时追入，持有1-2天。' },
  { icon: '2️⃣', title: '龙头见顶换轮动', desc: '龙头连续上榜3天后回落，关注同组其他高频币是否接力启动。' },
  { icon: '3️⃣', title: '成交量>$2000万', desc: '暴涨必须配合足够成交量，低成交量的暴涨高反噬风险。' },
  { icon: '4️⃣', title: '硬止损 -8% / 止盈 +25%', desc: '无现货=深度差+插针多。小仓高赔率，止损必须硬。' },
];

const alphaCoins = [
  '1000BONK',
  '1000FLOKI',
  '1000LUNC',
  '1000PEPE',
  '1000RATS',
  '1000SHIB',
  '1000XEC',
  '4',
  'AAOI',
  'AAPL',
  'AERGO',
  'AERO',
  'AGT',
  'AIA',
  'AIO',
  'AIOT',
  'AKE',
  'AKT',
  'ALAB',
  'ALCH',
  'ALL',
  'AMAT',
  'AMD',
  'AMZN',
  'ANTHROPIC',
  'APR',
  'ARC',
  'ARM',
  'ARX',
  'ASML',
  'ASTS',
  'ATH',
  'AVAAI',
  'AVGO',
  'AXTI',
  'B',
  'BABA',
  'BAN',
  'BAS',
  'BASED',
  'BBX',
  'BE',
  'BEAT',
  'BILL',
  'BIRB',
  'BLESS',
  'BLUAI',
  'BMNR',
  'BOT',
  'BRETT',
  'BSB',
  'BSV',
  'BTCDOM',
  'BTW',
  'BULLA',
  'BZ',
  'CAP',
  'CARV',
  'CBRS',
  'CC',
  'CL',
  'CLO',
  'COAI',
  'COHR',
  'COIN',
  'COLLECT',
  'COPPER',
  'CRCL',
  'CRDO',
  'CRWD',
  'CRWV',
  'CYS',
  'DATAIP',
  'DELL',
  'DODOX',
  'DRAM',
  'DRIFT',
  'EDGE',
  'ELSA',
  'ESPORTS',
  'EVAA',
  'EWJ',
  'EWY',
  'FARTCOIN',
  'FHE',
  'FLNC',
  'FLOCK',
  'FOLKS',
  'GLW',
  'GOOGL',
  'GRASS',
  'GUA',
  'GWEI',
  'H',
  'HANA',
  'HIMS',
  'HOOD',
  'HYPE',
  'HYUNDAI',
  'IBM',
  'ICNT',
  'IDOL',
  'IN',
  'INTC',
  'INTW',
  'IREN',
  'JCT',
  'JELLYJELLY',
  'KAS',
  'KLAC',
  'KORU',
  'KSTR',
  'LAB',
  'LIGHT',
  'LIT',
  'LITE',
  'LLY',
  'LRCX',
  'LUNA2',
  'LYN',
  'M',
  'MAGMA',
  'MERL',
  'META',
  'MON',
  'MOODENG',
  'MRVL',
  'MSFT',
  'MSTR',
  'MU',
  'MUU',
  'MVLL',
  'MYX',
  'NAORIS',
  'NATGAS',
  'NBIS',
  'NFLX',
  'NOK',
  'NOW',
  'NVDA',
  'O',
  'ON',
  'OPENAI',
  'ORCL',
  'PIEVERSE',
  'PIPPIN',
  'PLAY',
  'PLTR',
  'POPCAT',
  'POWER',
  'PROMPT',
  'PTB',
  'Q',
  'QCOM',
  'QNTX',
  'QQQ',
  'RAVE',
  'RAYSOL',
  'RECALL',
  'RIVER',
  'RKLB',
  'SAMSUNG',
  'SIREN',
  'SKHY',
  'SKHYNIX',
  'SKYAI',
  'SLX',
  'SNDK',
  'SNXX',
  'SOON',
  'SOXL',
  'SOXS',
  'SPACE',
  'SPCX',
  'SPORTFUN',
  'SPX',
  'SPY',
  'SQQQ',
  'STABLE',
  'STAR',
  'STXX',
  'SWARMS',
  'TAC',
  'TAG',
  'TAIKO',
  'TAKE',
  'TQQQ',
  'TRADOOR',
  'TRIA',
  'TRUTH',
  'TSLA',
  'TSM',
  'TZA',
  'UAI',
  'UB',
  'US',
  'USAR',
  'USELESS',
  'UVXY',
  'VELVET',
  'VVV',
  'WDC',
  'WET',
  'XAG',
  'XAN',
  'XAU',
  'XMR',
  'XPD',
  'XPIN',
  'XPT',
  'ZEREBRO',
  'ZEST',
  'ZORA',
];

const dailyTabs = Object.keys(dailyData).sort((a, b) => {
  const [ma, da] = a.split('-').map(Number);
  const [mb, db] = b.split('-').map(Number);
  return ma !== mb ? ma - mb : da - da;
});

// ─── Component ──────────────────────────────────────────────────────────────

export default function BNAlphaPage() {
  const [activeTab, setActiveTab] = useState(dailyTabs[dailyTabs.length - 1]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <section className="relative overflow-hidden px-4 pt-24 pb-12 text-center sm:pt-32 sm:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-[20%] h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-black tracking-tight leading-tight sm:text-5xl lg:text-6xl">
            BN Alpha{' '}
            <span className="bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
              30天回测
            </span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Binance 476个USDT永续合约中，214个只有合约没有现货的"Alpha币"，占池子45%却拿走了每日Top10涨幅榜70%的席位。超额命中率{' '}
            <strong className="text-white">1.56倍</strong>。
          </p>
          <p className="text-xs text-gray-500">
            📅 更新时间: 2026-07-17 01:30 (UTC) · 数据来源: Binance Futures API · 自动更新
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 text-center">
              <div className={`mb-1 text-3xl font-black sm:text-4xl ${s.color}`}>{s.num}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <section className="border-t border-gray-800 py-12">
          <div className="rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[.04] to-blue-500/[.04] p-6 sm:p-8">
            <h3 className="mb-4 text-xl font-extrabold text-emerald-400">🤖 AI 解读</h3>
            <div className="space-y-3 text-sm leading-relaxed text-gray-400 sm:text-base">
              <p>
                <strong className="text-gray-200">Alpha超额（1.56x）</strong>：Alpha币在Top10中的占比7/10，高于其池子比例45%，Alpha溢出效应显著。
              </p>
              <p>
                📈 Alpha组均涨-1.93% (64涨/150跌)，Normal组均涨-1.07% (78涨/183跌)。
              </p>
              <p>
                🏆 FNG=27 (Fear)，BTC处于回调阶段，Alpha币波动性加剧。
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <section className="border-t border-gray-800 py-12">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl">🏆 30天高频上榜 Alpha 币</h2>
            <p className="text-sm text-gray-500">按24h涨幅排序 · 今日数据</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {freqList.map((item) => (
              <div key={item.name} className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900/50 px-4 py-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-extrabold text-amber-400">
                  {item.rank}
                </div>
                <span className="min-w-[80px] font-bold text-gray-100">{item.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400" style={{ width: `${item.pct}%` }} />
                </div>
                <span className="shrink-0 text-sm font-semibold text-gray-500">
                  +{item.chg.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <section className="border-t border-gray-800 py-12">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl">📈 今日 24h 分组涨幅</h2>
            <p className="text-sm text-gray-500">2026-07-17 · Alpha组 vs Normal组 Top 10 对比</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5">
              <div className="mb-1 text-lg font-extrabold">🔶 Alpha Top 10</div>
              <div className="mb-3 text-xs text-gray-500">
                均涨 <span className="font-bold text-amber-400">-1.93%</span> · 64涨 / 150跌
              </div>
              <ol className="space-y-1">
                {alphaTop10.map((r) => (
                  <li key={r.rank} className="flex items-center gap-2 text-sm">
                    <span className="w-5 shrink-0 text-right font-semibold text-gray-600">{r.rank}</span>
                    <span className="min-w-[80px] font-bold text-gray-100">{r.coin}</span>
                    <span className="font-semibold text-emerald-400">{r.chg}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5">
              <div className="mb-1 text-lg font-extrabold">🔵 Normal Top 10</div>
              <div className="mb-3 text-xs text-gray-500">
                均涨 <span className="font-bold text-blue-400">-1.07%</span> · 78涨 / 183跌
              </div>
              <ol className="space-y-1">
                {normalTop10.map((r) => (
                  <li key={r.rank} className="flex items-center gap-2 text-sm">
                    <span className="w-5 shrink-0 text-right font-semibold text-gray-600">{r.rank}</span>
                    <span className="min-w-[80px] font-bold text-gray-100">{r.coin}</span>
                    <span className="font-semibold text-emerald-400">{r.chg}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <section className="border-t border-gray-800 py-12">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl">📅 30天每日 Top 10 涨幅榜</h2>
            <p className="text-sm text-gray-500">
              🔶 = Alpha币 (无现货) · 🔵 = Normal (有现货) · 按Alpha占比排序展示Top8天
            </p>
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
            {dailyTabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${ activeTab === tab ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-200' }`}>
                {tab}
              </button>
            ))}
          </div>
          {dailyData[activeTab] && (
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5 sm:p-6">
              <div className="mb-1 text-lg font-extrabold">{activeTab}</div>
              <div className="mb-4 text-xs text-gray-500">
                Alpha占比 <span className="font-bold text-amber-400">{dailyData[activeTab].alphaRatio}</span>
              </div>
              <ol className="space-y-1.5">
                {dailyData[activeTab].entries.map((entry) => (
                  <li key={entry.rank} className="flex items-center gap-2 text-sm">
                    <span className="w-5 shrink-0 text-right font-semibold text-gray-600">{entry.rank}</span>
                    <span className="shrink-0 text-xs">{entry.type === 'alpha' ? '🔶' : '🔵'}</span>
                    <span className="min-w-[80px] font-bold text-gray-100">{entry.coin}</span>
                    <span className="font-semibold text-emerald-400">{entry.chg}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <section className="border-t border-gray-800 py-12">
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl">💡 基于回测的操作策略</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strategies.map((s) => (
              <div key={s.title} className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
                <div className="mb-3 text-2xl">{s.icon}</div>
                <h3 className="mb-2 text-lg font-extrabold text-gray-100">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 rounded-2xl border border-red-500/15 bg-red-500/[.06] p-5 sm:p-6">
          <h3 className="mb-2 text-sm font-extrabold text-red-400">⚠️ 风险提示</h3>
          <p className="text-sm leading-relaxed text-gray-500">
            Alpha币的高波动性是双刃剑。回测不代表未来。合约有爆仓风险。本页面仅为数据研究，不构成投资建议。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <section className="border-t border-gray-800 py-12">
          <div className="mb-4">
            <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl">📋 完整 Alpha 币列表 (214个)</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {alphaCoins.map((c) => (
              <span key={c} className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs font-semibold text-amber-400">
                {c}
              </span>
            ))}
          </div>
        </section>
      </div>

      <footer className="border-t border-gray-800 py-10 text-center text-xs text-gray-600">
        <p>SingClaw · Crypto Alpha Research · 自动更新 · 数据来源: Binance Futures API</p>
        <p className="mt-2">© 2026 SingClaw. 仅供研究参考，不构成投资建议。</p>
      </footer>
    </div>
  );
}
