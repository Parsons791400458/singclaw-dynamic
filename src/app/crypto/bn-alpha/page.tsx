'use client';

import { useState } from 'react';

// ─── Data ───────────────────────────────────────────────────────────────────

const stats = [
  { num: '562', label: '合约总数', color: 'text-amber-400' },
  { num: '171', label: 'Alpha币 (无现货)', color: 'text-emerald-400' },
  { num: '391', label: 'Normal (有现货)', color: 'text-blue-400' },
  { num: '2.30x', label: '超额命中倍数', color: 'text-purple-400' },
];

const freqList = [
  { rank: 1, name: 'ZEREBRO', chg: 32.4, pct: 100 },
  { rank: 2, name: 'SKYAI', chg: 30.1, pct: 93 },
  { rank: 3, name: 'TAC', chg: 23.1, pct: 71 },
  { rank: 4, name: 'NAORIS', chg: 19.8, pct: 61 },
  { rank: 5, name: 'UB', chg: 17.2, pct: 53 },
  { rank: 6, name: 'ARC', chg: 15.3, pct: 47 },
  { rank: 7, name: 'INTC', chg: 11.3, pct: 35 },
  { rank: 8, name: 'B', chg: 10.6, pct: 33 },
  { rank: 9, name: '1000LUNC', chg: 10.0, pct: 31 },
  { rank: 10, name: 'AGT', chg: 8.9, pct: 28 },
  { rank: 11, name: 'MAGMA', chg: 8.8, pct: 27 },
  { rank: 12, name: 'CL', chg: 8.5, pct: 26 },
  { rank: 13, name: 'SWARMS', chg: 7.8, pct: 24 },
  { rank: 14, name: 'BZ', chg: 7.2, pct: 22 },
  { rank: 15, name: 'GWEI', chg: 6.9, pct: 21 },
  { rank: 16, name: 'GOOGL', chg: 6.5, pct: 20 },
];

const alphaTop10 = [
  { rank: 1, coin: 'ZEREBRO', chg: '+32.38%', pos: true },
  { rank: 2, coin: 'SKYAI', chg: '+30.14%', pos: true },
  { rank: 3, coin: 'TAC', chg: '+23.12%', pos: true },
  { rank: 4, coin: 'NAORIS', chg: '+19.78%', pos: true },
  { rank: 5, coin: 'UB', chg: '+17.19%', pos: true },
  { rank: 6, coin: 'ARC', chg: '+15.29%', pos: true },
  { rank: 7, coin: 'INTC', chg: '+11.29%', pos: true },
  { rank: 8, coin: 'B', chg: '+10.59%', pos: true },
  { rank: 9, coin: '1000LUNC', chg: '+9.95%', pos: true },
  { rank: 10, coin: 'AGT', chg: '+8.92%', pos: true },
];

const normalTop10 = [
  { rank: 1, coin: 'SOLV', chg: '+19.20%', pos: true },
  { rank: 2, coin: 'NOM', chg: '+13.64%', pos: true },
  { rank: 3, coin: 'AIGENSYN', chg: '+11.97%', pos: true },
  { rank: 4, coin: 'AEVO', chg: '+10.22%', pos: true },
  { rank: 5, coin: 'EPIC', chg: '+8.43%', pos: true },
  { rank: 6, coin: 'OPEN', chg: '+7.54%', pos: true },
  { rank: 7, coin: 'AKT', chg: '+7.01%', pos: true },
  { rank: 8, coin: 'CATI', chg: '+6.69%', pos: true },
  { rank: 9, coin: 'MOVR', chg: '+6.20%', pos: true },
  { rank: 10, coin: 'MANTA', chg: '+5.18%', pos: true },
];

interface DailyEntry {
  rank: number;
  type: 'alpha' | 'normal';
  coin: string;
  chg: string;
}

const dailyData: Record<string, { alphaRatio: string; entries: DailyEntry[] }> = {
];

const strategies = [
  { icon: '1️⃣', title: '首日暴涨次日追', desc: 'Alpha币首次进入Top10且涨幅>50%，次日回调5-10%时追入，持有1-2天。' },
  { icon: '2️⃣', title: '龙头见顶换轮动', desc: '龙头连续上榜3天后回落，关注同组其他高频币是否接力启动。' },
  { icon: '3️⃣', title: '成交量>$2000万', desc: '暴涨必须配合足够成交量，低成交量的暴涨高反噬风险。' },
  { icon: '4️⃣', title: '硬止损 -8% / 止盈 +25%', desc: '无现货=深度差+插针多。小仓高赔率，止损必须硬。' },
];

const alphaCoins = [
  '1000000MOG',
  '1000BONK',
  '1000FLOKI',
  '1000LUNC',
  '1000PEPE',
  '1000RATS',
  '1000SHIB',
  '4',
  'AAPL',
  'AERGO',
  'AERO',
  'AGT',
  'AIA',
  'AIN',
  'AIO',
  'AIOT',
  'ALCH',
  'AMZN',
  'APR',
  'ARC',
  'ARIA',
  'ATH',
  'AVAAI',
  'AVGO',
  'B',
  'B2',
  'B3',
  'BABA',
  'BAN',
  'BAS',
  'BASED',
  'BEAT',
  'BIRB',
  'BLESS',
  'BLUAI',
  'BOB',
  'BR',
  'BRETT',
  'BSB',
  'BSV',
  'BTCDOM',
  'BTR',
  'BULLA',
  'BZ',
  'CC',
  'CHILLGUY',
  'CL',
  'CLO',
  'COAI',
  'COIN',
  'COLLECT',
  'COPPER',
  'CRCL',
  'CROSS',
  'CYS',
  'DAM',
  'DEGEN',
  'DOOD',
  'DRIFT',
  'EDGE',
  'ESPORTS',
  'ETHW',
  'EVAA',
  'EWY',
  'FARTCOIN',
  'FHE',
  'FIGHT',
  'FLUID',
  'FOLKS',
  'GENIUS',
  'GOAT',
  'GOOGL',
  'GRASS',
  'GRIFFAIN',
  'GUA',
  'GWEI',
  'H',
  'HANA',
  'HOOD',
  'HYPE',
  'ICNT',
  'IN',
  'INTC',
  'INX',
  'IP',
  'IR',
  'IRYS',
  'JCT',
  'JELLYJELLY',
  'KAS',
  'KGEN',
  'LAB',
  'LIGHT',
  'LIT',
  'LUNA2',
  'LYN',
  'M',
  'MAGMA',
  'MAVIA',
  'MEGA',
  'MELANIA',
  'MERL',
  'META',
  'MEW',
  'MON',
  'MOODENG',
  'MSFT',
  'MSTR',
  'MU',
  'MYX',
  'NAORIS',
  'NATGAS',
  'NVDA',
  'ON',
  'OPG',
  'PIEVERSE',
  'PIPPIN',
  'PLAY',
  'PLTR',
  'POPCAT',
  'POWER',
  'PRL',
  'PTB',
  'PUMPBTC',
  'Q',
  'QQQ',
  'RAVE',
  'RAYSOL',
  'RECALL',
  'RIVER',
  'SAFE',
  'SIREN',
  'SKR',
  'SKYAI',
  'SNDK',
  'SONIC',
  'SOON',
  'SPACE',
  'SPORTFUN',
  'SPX',
  'SPY',
  'STABLE',
  'STBL',
  'SWARMS',
  'TA',
  'TAC',
  'TAG',
  'TAKE',
  'TOSHI',
  'TRADOOR',
  'TRIA',
  'TRUST',
  'TRUTH',
  'TSLA',
  'TSM',
  'UAI',
  'UB',
  'US',
  'USELESS',
  'VELVET',
  'VINE',
  'VVV',
  'WET',
  'XAG',
  'XAN',
  'XAU',
  'XMR',
  'XNY',
  'XPD',
  'XPIN',
  'XPT',
  'ZEREBRO',
  'ZETA',
  'ZKJ',
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
            Binance 562个USDT永续合约中，171个只有合约没有现货的"Alpha币"，占池子30%却拿走了每日Top10涨幅榜70%的席位。超额命中率{' '}
            <strong className="text-white">2.30倍</strong>。
          </p>
          <p className="text-xs text-gray-500">
            📅 更新时间: 2026-04-29 20:48 (UTC) · 数据来源: Binance Futures API · 自动更新
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
                <strong className="text-gray-200">Alpha超额（2.30x）</strong>：Alpha币在Top10中的占比7/10，高于其池子比例30%，Alpha溢出效应显著。
              </p>
              <p>
                📈 Alpha组均涨-2.00% (60涨/111跌)，Normal组均涨-2.46% (50涨/341跌)。
              </p>
              <p>
                🏆 FNG=26 (Fear) 六周最低，BTC $75.7K 持续下行，大盘普跌Alpha相对抗跌。
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
            <p className="text-sm text-gray-500">2026-04-29 20:48 UTC · Alpha组 vs Normal组 Top 10 对比</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5">
              <div className="mb-1 text-lg font-extrabold">🔶 Alpha Top 10</div>
              <div className="mb-3 text-xs text-gray-500">
                均涨 <span className="font-bold text-amber-400">-2.00%</span> · 60涨 / 111跌
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
                均涨 <span className="font-bold text-blue-400">-2.46%</span> · 50涨 / 341跌
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
            <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl">📋 完整 Alpha 币列表 (171个)</h2>
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
