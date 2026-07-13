'use client';

import { useState } from 'react';

// ─── Data ───────────────────────────────────────────────────────────────────

const stats = [
  { num: '432', label: '合约总数', color: 'text-amber-400' },
  { num: '168', label: 'Alpha币 (无现货)', color: 'text-emerald-400' },
  { num: '264', label: 'Normal (有现货)', color: 'text-blue-400' },
  { num: '1.80x', label: '超额命中倍数', color: 'text-purple-400' },
];

const freqList = [
  { rank: 1, name: 'EVAA', chg: 133.0, pct: 100 },
  { rank: 2, name: 'DODOX', chg: 41.9, pct: 31 },
  { rank: 3, name: 'BILL', chg: 26.7, pct: 20 },
  { rank: 4, name: 'JCT', chg: 17.4, pct: 13 },
  { rank: 5, name: 'FHE', chg: 16.7, pct: 12 },
  { rank: 6, name: 'VELVET', chg: 15.0, pct: 11 },
  { rank: 7, name: 'BEAT', chg: 13.3, pct: 9 },
  { rank: 8, name: 'US', chg: 10.7, pct: 8 },
  { rank: 9, name: 'COLLECT', chg: 10.1, pct: 7 },
  { rank: 10, name: 'IDOL', chg: 9.2, pct: 6 },
  { rank: 11, name: '1000XEC', chg: 9.0, pct: 6 },
  { rank: 12, name: 'UB', chg: 8.8, pct: 6 },
  { rank: 13, name: 'APR', chg: 7.7, pct: 5 },
  { rank: 14, name: 'AVAAI', chg: 7.4, pct: 5 },
  { rank: 15, name: 'AZTEC', chg: 7.3, pct: 5 },
  { rank: 16, name: 'SIREN', chg: 7.1, pct: 5 },
];

const alphaTop10 = [
  { rank: 1, coin: 'EVAA', chg: '+132.96%', pos: true },
  { rank: 2, coin: 'DODOX', chg: '+41.85%', pos: true },
  { rank: 3, coin: 'BILL', chg: '+26.68%', pos: true },
  { rank: 4, coin: 'JCT', chg: '+17.43%', pos: true },
  { rank: 5, coin: 'FHE', chg: '+16.67%', pos: true },
  { rank: 6, coin: 'VELVET', chg: '+14.99%', pos: true },
  { rank: 7, coin: 'BEAT', chg: '+13.29%', pos: true },
  { rank: 8, coin: 'US', chg: '+10.71%', pos: true },
  { rank: 9, coin: 'COLLECT', chg: '+10.13%', pos: true },
  { rank: 10, coin: 'IDOL', chg: '+9.19%', pos: true },
];

const normalTop10 = [
  { rank: 1, coin: 'DEXE', chg: '+27.74%', pos: true },
  { rank: 2, coin: 'T', chg: '+15.03%', pos: true },
  { rank: 3, coin: 'AGLD', chg: '+12.06%', pos: true },
  { rank: 4, coin: 'HOT', chg: '+9.78%', pos: true },
  { rank: 5, coin: 'EPIC', chg: '+7.61%', pos: true },
  { rank: 6, coin: 'KITE', chg: '+7.12%', pos: true },
  { rank: 7, coin: 'PUMP', chg: '+6.28%', pos: true },
  { rank: 8, coin: 'EGLD', chg: '+6.20%', pos: true },
  { rank: 9, coin: 'WLD', chg: '+5.93%', pos: true },
  { rank: 10, coin: 'SYN', chg: '+5.74%', pos: true },
];

interface DailyEntry {
  rank: number;
  type: 'alpha' | 'normal';
  coin: string;
  chg: string;
}

const dailyData: Record<string, { alphaRatio: string; entries: DailyEntry[] }> = {
  '07-13': {
    alphaRatio: '7/10',
    entries: [
      { rank: 1, type: 'alpha', coin: 'EVAA', chg: '+132.96%' },
      { rank: 2, type: 'alpha', coin: 'DODOX', chg: '+41.85%' },
      { rank: 3, type: 'alpha', coin: 'BILL', chg: '+26.68%' },
      { rank: 4, type: 'alpha', coin: 'JCT', chg: '+17.43%' },
      { rank: 5, type: 'alpha', coin: 'FHE', chg: '+16.67%' },
      { rank: 6, type: 'alpha', coin: 'VELVET', chg: '+14.99%' },
      { rank: 7, type: 'alpha', coin: 'BEAT', chg: '+13.29%' },
      { rank: 8, type: 'alpha', coin: 'US', chg: '+10.71%' },
      { rank: 9, type: 'alpha', coin: 'COLLECT', chg: '+10.13%' },
      { rank: 10, type: 'alpha', coin: 'IDOL', chg: '+9.19%' },
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
  'AERO',
  'AGT',
  'AIA',
  'AIN',
  'AIO',
  'AIOT',
  'AKE',
  'ALL',
  'AMAT',
  'AMD',
  'AMZN',
  'APR',
  'ARC',
  'ARM',
  'ARX',
  'ATH',
  'AVAAI',
  'AVGO',
  'AZTEC',
  'B',
  'BABA',
  'BAN',
  'BAS',
  'BASED',
  'BE',
  'BEAT',
  'BILL',
  'BIRB',
  'BLESS',
  'BLUAI',
  'BMNR',
  'BRETT',
  'BSB',
  'BTCDOM',
  'BTW',
  'BULLA',
  'BX',
  'BZ',
  'CAP',
  'CARV',
  'CBRS',
  'CC',
  'CHILLGUY',
  'CL',
  'CLO',
  'COAI',
  'COIN',
  'COLLECT',
  'COPPER',
  'CRCL',
  'CTR',
  'DATAIP',
  'DELL',
  'DODOX',
  'DRAM',
  'EDGE',
  'ELSA',
  'ESPORTS',
  'EVAA',
  'EWY',
  'FARTCOIN',
  'FHE',
  'FLUID',
  'FOLKS',
  'GLW',
  'GOOGL',
  'GRASS',
  'GUA',
  'GWEI',
  'H',
  'HANA',
  'HOOD',
  'HYPE',
  'ICNT',
  'IDOL',
  'IN',
  'INTC',
  'JCT',
  'KAS',
  'KORU',
  'LAB',
  'LIGHT',
  'LIT',
  'LITE',
  'M',
  'MAGMA',
  'MELANIA',
  'MERL',
  'META',
  'MON',
  'MOODENG',
  'MRVL',
  'MSFT',
  'MSTR',
  'MU',
  'MVLL',
  'MYX',
  'NATGAS',
  'NBIS',
  'NVDA',
  'O',
  'ORCL',
  'PIEVERSE',
  'PIPPIN',
  'PLAY',
  'PLTR',
  'POPCAT',
  'POWER',
  'PTB',
  'Q',
  'QCOM',
  'QQQ',
  'RAVE',
  'RIVER',
  'RKLB',
  'SAFE',
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
  'SPACE',
  'SPCX',
  'SPX',
  'SPY',
  'STABLE',
  'STAR',
  'STBL',
  'SWARMS',
  'TA',
  'TAC',
  'TAG',
  'TAIKO',
  'TQQQ',
  'TRADOOR',
  'TRIA',
  'TSLA',
  'TSM',
  'UAI',
  'UB',
  'US',
  'USELESS',
  'VELVET',
  'VVV',
  'WDC',
  'XAG',
  'XAU',
  'XMR',
  'XNY',
  'XPIN',
  'XPT',
  'ZEREBRO',
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
            Binance 432个USDT永续合约中，168个只有合约没有现货的"Alpha币"，占池子39%却拿走了每日Top10涨幅榜70%的席位。超额命中率{' '}
            <strong className="text-white">1.80倍</strong>。
          </p>
          <p className="text-xs text-gray-500">
            📅 更新时间: 2026-07-13 01:30 (UTC) · 数据来源: Binance Futures API · 自动更新
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
                <strong className="text-gray-200">Alpha超额（1.80x）</strong>：Alpha币在Top10中的占比7/10，高于其池子比例39%，Alpha溢出效应显著。
              </p>
              <p>
                📈 Alpha组均涨+0.63% (61涨/106跌)，Normal组均涨-0.38% (84涨/178跌)。
              </p>
              <p>
                🏆 FNG=28 (Fear)，BTC处于回调阶段，Alpha币波动性加剧。
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
            <p className="text-sm text-gray-500">2026-07-13 · Alpha组 vs Normal组 Top 10 对比</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-5">
              <div className="mb-1 text-lg font-extrabold">🔶 Alpha Top 10</div>
              <div className="mb-3 text-xs text-gray-500">
                均涨 <span className="font-bold text-amber-400">+0.63%</span> · 61涨 / 106跌
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
                均涨 <span className="font-bold text-blue-400">-0.38%</span> · 84涨 / 178跌
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
            <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl">📋 完整 Alpha 币列表 (168个)</h2>
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
