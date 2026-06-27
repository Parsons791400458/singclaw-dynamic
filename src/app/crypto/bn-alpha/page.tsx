'use client';

import { useState } from 'react';

// ─── Data ───────────────────────────────────────────────────────────────────

const stats = [
  { num: '562', label: '合约总数', color: 'text-amber-400' },
  { num: '235', label: 'Alpha币 (无现货)', color: 'text-emerald-400' },
  { num: '327', label: 'Normal (有现货)', color: 'text-blue-400' },
  { num: '1.43x', label: '超额命中倍数', color: 'text-purple-400' },
];

const freqList = [
  { rank: 1, name: 'VELVET', chg: 44.6, pct: 100 },
  { rank: 2, name: 'SKYAI', chg: 27.6, pct: 61 },
  { rank: 3, name: 'MAGMA', chg: 25.3, pct: 56 },
  { rank: 4, name: 'BROCCOLIF3B', chg: 23.5, pct: 52 },
  { rank: 5, name: 'ICNT', chg: 18.6, pct: 41 },
  { rank: 6, name: 'BEAT', chg: 17.8, pct: 39 },
  { rank: 7, name: 'CARV', chg: 16.0, pct: 35 },
  { rank: 8, name: 'SLX', chg: 15.8, pct: 35 },
  { rank: 9, name: 'MERL', chg: 14.3, pct: 32 },
  { rank: 10, name: 'IN', chg: 14.1, pct: 31 },
  { rank: 11, name: 'UB', chg: 13.9, pct: 31 },
  { rank: 12, name: 'B', chg: 12.9, pct: 28 },
  { rank: 13, name: 'LAB', chg: 12.4, pct: 27 },
  { rank: 14, name: 'LIT', chg: 12.0, pct: 26 },
  { rank: 15, name: 'COLLECT', chg: 11.5, pct: 25 },
  { rank: 16, name: 'ZETA', chg: 11.2, pct: 25 },
];

const alphaTop10 = [
  { rank: 1, coin: 'VELVET', chg: '+44.62%', pos: true },
  { rank: 2, coin: 'SKYAI', chg: '+27.59%', pos: true },
  { rank: 3, coin: 'MAGMA', chg: '+25.25%', pos: true },
  { rank: 4, coin: 'BROCCOLIF3B', chg: '+23.50%', pos: true },
  { rank: 5, coin: 'ICNT', chg: '+18.60%', pos: true },
  { rank: 6, coin: 'BEAT', chg: '+17.84%', pos: true },
  { rank: 7, coin: 'CARV', chg: '+16.00%', pos: true },
  { rank: 8, coin: 'SLX', chg: '+15.82%', pos: true },
  { rank: 9, coin: 'MERL', chg: '+14.29%', pos: true },
  { rank: 10, coin: 'IN', chg: '+14.13%', pos: true },
];

const normalTop10 = [
  { rank: 1, coin: 'AGLD', chg: '+94.70%', pos: true },
  { rank: 2, coin: 'PUNDIX', chg: '+53.59%', pos: true },
  { rank: 3, coin: 'BEL', chg: '+26.02%', pos: true },
  { rank: 4, coin: 'PORTAL', chg: '+19.41%', pos: true },
  { rank: 5, coin: 'JTO', chg: '+15.57%', pos: true },
  { rank: 6, coin: 'AAVE', chg: '+15.41%', pos: true },
  { rank: 7, coin: 'INJ', chg: '+14.84%', pos: true },
  { rank: 8, coin: 'W', chg: '+12.46%', pos: true },
  { rank: 9, coin: 'KAITO', chg: '+12.40%', pos: true },
  { rank: 10, coin: 'MET', chg: '+12.24%', pos: true },
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
  '1000000BOB',
  '1000000MOG',
  '1000BONK',
  '1000FLOKI',
  '1000LUNC',
  '1000PEPE',
  '1000RATS',
  '1000SHIB',
  '4',
  'AAOI',
  'AAPL',
  'ACU',
  'AERGO',
  'AERO',
  'AGT',
  'AIA',
  'AIN',
  'AIO',
  'AIOT',
  'AKE',
  'AKT',
  'ALAB',
  'ALCH',
  'AMAT',
  'AMD',
  'AMZN',
  'ANTHROPIC',
  'APR',
  'ARC',
  'ARIA',
  'ARM',
  'ARX',
  'ASML',
  'ASTS',
  'ATH',
  'AVAAI',
  'AVGO',
  'AXTI',
  'B',
  'B2',
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
  'BR',
  'BRETT',
  'BROCCOLIF3B',
  'BSB',
  'BSV',
  'BTCDOM',
  'BTR',
  'BTW',
  'BULLA',
  'BX',
  'BZ',
  'CARV',
  'CBRS',
  'CC',
  'CL',
  'CLANKER',
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
  'CSCO',
  'CTR',
  'CYS',
  'DEEP',
  'DELL',
  'DODOX',
  'DOOD',
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
  'FIGHT',
  'FLNC',
  'FLOCK',
  'FOLKS',
  'GLW',
  'GOAT',
  'GOOGL',
  'GRASS',
  'GRIFFAIN',
  'GUA',
  'GWEI',
  'H',
  'HIMS',
  'HOOD',
  'HPE',
  'HYPE',
  'HYUNDAI',
  'IBM',
  'ICNT',
  'IDOL',
  'IN',
  'INTC',
  'INX',
  'IP',
  'IREN',
  'IRYS',
  'JCT',
  'JELLYJELLY',
  'KAS',
  'KGEN',
  'KLAC',
  'KORU',
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
  'MAVIA',
  'MELANIA',
  'MERL',
  'META',
  'MEW',
  'MON',
  'MOODENG',
  'MRVL',
  'MSFT',
  'MSTR',
  'MU',
  'MYX',
  'NAORIS',
  'NATGAS',
  'NBIS',
  'NFLX',
  'NOK',
  'NOW',
  'NVDA',
  'O',
  'ONDS',
  'OPENAI',
  'ORCL',
  'ORDER',
  'PAYP',
  'PHAROS',
  'PIEVERSE',
  'PIPPIN',
  'PLAY',
  'PLTR',
  'POPCAT',
  'POWER',
  'PRL',
  'PTB',
  'QCOM',
  'QNTX',
  'QQQ',
  'RAVE',
  'RAYSOL',
  'RECALL',
  'RIVER',
  'RKLB',
  'SAFE',
  'SAMSUNG',
  'SIREN',
  'SKHYNIX',
  'SKR',
  'SKYAI',
  'SLX',
  'SMCI',
  'SNDK',
  'SONIC',
  'SOON',
  'SOXL',
  'SPACE',
  'SPCX',
  'SPORTFUN',
  'SPX',
  'SPY',
  'SQD',
  'STABLE',
  'STAR',
  'STBL',
  'STXX',
  'SWARMS',
  'TA',
  'TAC',
  'TAG',
  'TAIKO',
  'TRADOOR',
  'TRIA',
  'TRUST',
  'TRUTH',
  'TSLA',
  'TSM',
  'UAI',
  'UB',
  'UBER',
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
  'ZETA',
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
            Binance 562个USDT永续合约中，235个只有合约没有现货的"Alpha币"，占池子42%却拿走了每日Top10涨幅榜60%的席位。超额命中率{' '}
            <strong className="text-white">1.43倍</strong>。
          </p>
          <p className="text-xs text-gray-500">
            📅 更新时间: 2026-06-27 01:30 (UTC) · 数据来源: Binance Futures API · 自动更新
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
                <strong className="text-gray-200">Alpha超额（1.43x）</strong>：Alpha币在Top10中的占比6/10，高于其池子比例42%，Alpha溢出效应显著。
              </p>
              <p>
                📈 Alpha组均涨+1.40% (137涨/97跌)，Normal组均涨+2.46% (241涨/85跌)。
              </p>
              <p>
                🏆 FNG=15 (Extreme Fear)，BTC处于回调阶段，Alpha币波动性加剧。
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
            <p className="text-sm text-gray-500">2026-06-27 · Alpha组 vs Normal组 Top 10 对比</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5">
              <div className="mb-1 text-lg font-extrabold">🔶 Alpha Top 10</div>
              <div className="mb-3 text-xs text-gray-500">
                均涨 <span className="font-bold text-amber-400">+1.40%</span> · 137涨 / 97跌
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
                均涨 <span className="font-bold text-blue-400">+2.46%</span> · 241涨 / 85跌
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
            <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl">📋 完整 Alpha 币列表 (235个)</h2>
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
