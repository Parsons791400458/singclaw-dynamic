'use client';

import { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface SignalEntry {
  coin: string;
  score: number;
  price: string;
  change_24h: string;
  change_4h: string;
  change_8h: string;
}

interface DayData {
  label: string;
  data: SignalEntry[];
}

// ─── Signal Data ─────────────────────────────────────────────────────────────
const SIGNAL_DAYS: DayData[] = [
  {
    "label": "今天 · 2026-08-17",
    "data": [
      {
        "coin": "SKYAI",
        "score": 100,
        "price": "0.07085",
        "change_24h": "+8.0%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "BICO",
        "score": 100,
        "price": "0.02294",
        "change_24h": "+13.8%",
        "change_4h": "-0.2%",
        "change_8h": "-0.4%"
      },
      {
        "coin": "CAP",
        "score": 100,
        "price": "0.07068",
        "change_24h": "+14.1%",
        "change_4h": "+3.4%",
        "change_8h": "+6.9%"
      },
      {
        "coin": "WLD",
        "score": 100,
        "price": "0.3669",
        "change_24h": "+5.5%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "TUT",
        "score": 100,
        "price": "0.03485",
        "change_24h": "+9.8%",
        "change_4h": "+3.9%",
        "change_8h": "+7.8%"
      },
      {
        "coin": "DODOX",
        "score": 100,
        "price": "0.022636",
        "change_24h": "+12.6%",
        "change_4h": "+3.8%",
        "change_8h": "+7.6%"
      },
      {
        "coin": "BSB",
        "score": 100,
        "price": "0.12173",
        "change_24h": "+6.5%",
        "change_4h": "-1.3%",
        "change_8h": "-2.7%"
      },
      {
        "coin": "ONT",
        "score": 100,
        "price": "0.03968",
        "change_24h": "+6.1%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "BEAT",
        "score": 100,
        "price": "0.363",
        "change_24h": "+5.3%",
        "change_4h": "-4.4%",
        "change_8h": "-8.8%"
      },
      {
        "coin": "XAI",
        "score": 100,
        "price": "0.007162",
        "change_24h": "+5.9%",
        "change_4h": "+0.2%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "Q",
        "score": 100,
        "price": "0.025117",
        "change_24h": "+6.2%",
        "change_4h": "-1.9%",
        "change_8h": "-3.7%"
      },
      {
        "coin": "US",
        "score": 100,
        "price": "0.020132",
        "change_24h": "+11.2%",
        "change_4h": "+5.4%",
        "change_8h": "+10.8%"
      },
      {
        "coin": "ETHFI",
        "score": 100,
        "price": "0.5075",
        "change_24h": "+6.8%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "JCT",
        "score": 100,
        "price": "0.002508",
        "change_24h": "+7.5%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "RARE",
        "score": 100,
        "price": "0.01245",
        "change_24h": "+8.4%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "ALICE",
        "score": 100,
        "price": "0.1357",
        "change_24h": "+10.9%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "TAG",
        "score": 100,
        "price": "0.001043",
        "change_24h": "+9.0%",
        "change_4h": "+4.6%",
        "change_8h": "+9.3%"
      },
      {
        "coin": "GPS",
        "score": 100,
        "price": "0.011859",
        "change_24h": "+11.9%",
        "change_4h": "+5.8%",
        "change_8h": "+11.5%"
      },
      {
        "coin": "MUBARAK",
        "score": 100,
        "price": "0.01762",
        "change_24h": "+12.9%",
        "change_4h": "+3.8%",
        "change_8h": "+7.7%"
      },
      {
        "coin": "EPIC",
        "score": 100,
        "price": "0.3614",
        "change_24h": "+9.6%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "TOWNS",
        "score": 100,
        "price": "0.002381",
        "change_24h": "+8.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "ONE",
        "score": 100,
        "price": "0.0007249",
        "change_24h": "+7.8%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "STBL",
        "score": 95,
        "price": "0.02584",
        "change_24h": "+6.5%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "HEI",
        "score": 95,
        "price": "0.13261",
        "change_24h": "+5.3%",
        "change_4h": "-0.2%",
        "change_8h": "-0.5%"
      },
      {
        "coin": "RVN",
        "score": 95,
        "price": "0.002987",
        "change_24h": "+7.8%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "DUSK",
        "score": 95,
        "price": "0.06752",
        "change_24h": "+6.3%",
        "change_4h": "-0.9%",
        "change_8h": "-1.7%"
      },
      {
        "coin": "4",
        "score": 95,
        "price": "0.010989",
        "change_24h": "+5.9%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "STAR",
        "score": 95,
        "price": "0.09783",
        "change_24h": "+6.7%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "ARIA",
        "score": 95,
        "price": "0.03599",
        "change_24h": "+5.9%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "BLUAI",
        "score": 95,
        "price": "0.013066",
        "change_24h": "+7.4%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "PTB",
        "score": 95,
        "price": "0.0009154",
        "change_24h": "+5.7%",
        "change_4h": "+0.9%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "DRIFT",
        "score": 95,
        "price": "0.01193",
        "change_24h": "+6.6%",
        "change_4h": "+0.5%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "USELESS",
        "score": 90,
        "price": "0.04057",
        "change_24h": "+5.4%",
        "change_4h": "-0.0%",
        "change_8h": "-0.0%"
      },
      {
        "coin": "LISTA",
        "score": 90,
        "price": "0.05951",
        "change_24h": "+5.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "BTR",
        "score": 90,
        "price": "0.03015",
        "change_24h": "+5.6%",
        "change_4h": "-0.3%",
        "change_8h": "-0.5%"
      },
      {
        "coin": "AIO",
        "score": 85,
        "price": "0.07087",
        "change_24h": "+21.1%",
        "change_4h": "+3.4%",
        "change_8h": "+6.8%"
      },
      {
        "coin": "APR",
        "score": 85,
        "price": "0.1903",
        "change_24h": "+20.9%",
        "change_4h": "+0.0%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "VELVET",
        "score": 85,
        "price": "1.0143",
        "change_24h": "+21.8%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "ONG",
        "score": 75,
        "price": "0.05884",
        "change_24h": "+18.3%",
        "change_4h": "+3.1%",
        "change_8h": "+6.2%"
      },
      {
        "coin": "TAKE",
        "score": 70,
        "price": "0.05357",
        "change_24h": "+20.1%",
        "change_4h": "+3.8%",
        "change_8h": "+7.5%"
      },
      {
        "coin": "ZEREBRO",
        "score": 70,
        "price": "0.044826",
        "change_24h": "+17.6%",
        "change_4h": "+3.3%",
        "change_8h": "+6.6%"
      },
      {
        "coin": "BTW",
        "score": 70,
        "price": "0.40735",
        "change_24h": "+33.1%",
        "change_4h": "+5.6%",
        "change_8h": "+11.2%"
      },
      {
        "coin": "CYS",
        "score": 65,
        "price": "0.7548",
        "change_24h": "+0.7%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "CHIP",
        "score": 55,
        "price": "0.02785",
        "change_24h": "+0.1%",
        "change_4h": "-2.0%",
        "change_8h": "-3.9%"
      },
      {
        "coin": "H",
        "score": 55,
        "price": "0.13956",
        "change_24h": "-10.8%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "PRL",
        "score": 55,
        "price": "0.3934",
        "change_24h": "+4.2%",
        "change_4h": "+0.5%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "SKHYNIX",
        "score": 50,
        "price": "1189.53",
        "change_24h": "+1.1%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "AKE",
        "score": 50,
        "price": "0.009666",
        "change_24h": "-7.9%",
        "change_4h": "-0.6%",
        "change_8h": "-1.2%"
      },
      {
        "coin": "LINK",
        "score": 50,
        "price": "9.513",
        "change_24h": "+0.6%",
        "change_4h": "+0.5%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "XAG",
        "score": 50,
        "price": "65.99",
        "change_24h": "+1.5%",
        "change_4h": "+0.4%",
        "change_8h": "+0.7%"
      }
    ]
  }
];
// ─── Helper ──────────────────────────────────────────────────────────────────
const scoreClass = (score: number) => score >= 70 ? 'text-[var(--sc-accent)]' : 'text-amber-400';
const changeClass = (v: string) => {
  if (v.startsWith('+')) return 'text-green-400';
  if (v.startsWith('-')) return 'text-red-400';
  return 'text-gray-400';
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function SignalTrackerPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const day = SIGNAL_DAYS[selectedDay];

  const perfectCount = day.data.filter(d => d.score === 100).length;
  const focusCount = day.data.filter(d => d.score >= 70 && d.score < 100).length;
  const watchCount = day.data.filter(d => d.score >= 60 && d.score < 70).length;
  const cautiousCount = day.data.filter(d => d.score >= 50 && d.score < 60).length;

  return (
    <div className="min-h-screen bg-[var(--sc-bg)] text-[var(--sc-text)]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--sc-bg)]/80 border-b border-[var(--sc-border)]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">🦞</span>SingClaw
          </a>
          <nav className="flex gap-1 text-sm">
            <a href="/crypto/" className="px-3 py-1.5 rounded-lg text-[var(--sc-dim)] hover:text-white hover:bg-white/5 transition">5层分析</a>
            <a href="/crypto/watchlist" className="px-3 py-1.5 rounded-lg text-[var(--sc-dim)] hover:text-white hover:bg-white/5 transition">Watchlist</a>
            <a href="/crypto/signal-tracker" className="px-3 py-1.5 rounded-lg text-[var(--sc-accent)] bg-[var(--sc-accent)]/10 font-semibold">信号追踪</a>
            <a href="/crypto/paper-trade" className="px-3 py-1.5 rounded-lg text-[var(--sc-dim)] hover:text-white hover:bg-white/5 transition">Paper Trade</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Crypto <span className="bg-gradient-to-r from-[var(--sc-accent)] to-[var(--sc-accent2)] bg-clip-text text-transparent">信号追踪</span>
        </h1>
        <p className="text-[var(--sc-dim)] text-lg max-w-2xl mb-8">
          基于Score v2（追高扣分版）每日扫描Binance USDT永续合约，筛选高分信号并追踪4h/8h表现。
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[var(--sc-card)] border border-[var(--sc-border)] text-center">
            <div className="text-3xl font-black text-[var(--sc-accent)]">{perfectCount}</div>
            <div className="text-xs text-[var(--sc-dim)] uppercase tracking-wider mt-1">💯 满分</div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--sc-card)] border border-[var(--sc-border)] text-center">
            <div className="text-3xl font-black text-[var(--sc-accent)]">{focusCount}</div>
            <div className="text-xs text-[var(--sc-dim)] uppercase tracking-wider mt-1">⭐ 重点</div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--sc-card)] border border-[var(--sc-border)] text-center">
            <div className="text-3xl font-black text-[var(--sc-blue,#4d8ffa)]">{watchCount}</div>
            <div className="text-xs text-[var(--sc-dim)] uppercase tracking-wider mt-1">👁 观察</div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--sc-card)] border border-[var(--sc-border)] text-center">
            <div className="text-3xl font-black text-amber-400">{cautiousCount}</div>
            <div className="text-xs text-[var(--sc-dim)] uppercase tracking-wider mt-1">⚠️ 谨慎</div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--sc-card)] border border-[var(--sc-border)] text-center">
            <div className="text-3xl font-black text-[var(--sc-purple,#a855f7)]">528</div>
            <div className="text-xs text-[var(--sc-dim)] uppercase tracking-wider mt-1">📊 合约</div>
          </div>
        </div>

        {/* Signal Table */}
        <div className="rounded-xl bg-[var(--sc-card)] border border-[var(--sc-border)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--sc-border)]">
            <h2 className="text-lg font-bold text-[var(--sc-accent)]">{day.label}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--sc-border)]">
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">#</th>
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">币种</th>
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">Score</th>
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">价格</th>
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">24h涨跌</th>
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">4h后</th>
                  <th className="text-left px-4 py-3 text-[var(--sc-muted)] text-xs uppercase font-semibold">8h后</th>
                </tr>
              </thead>
              <tbody>
                {day.data.map((entry, i) => (
                  <tr key={entry.coin} className="border-b border-[var(--sc-border)] hover:bg-white/[0.02] transition">
                    <td className="px-4 py-3 text-[var(--sc-muted)]">{i + 1}</td>
                    <td className="px-4 py-3 font-bold">{entry.coin}</td>
                    <td className="px-4 py-3 font-bold {scoreClass(entry.score)}">{entry.score}</td>
                    <td className="px-4 py-3 font-mono">{entry.price}</td>
                    <td className={`px-4 py-3 font-bold ${changeClass(entry.change_24h)}`}>{entry.change_24h}</td>
                    <td className="px-4 py-3 text-[var(--sc-muted)] italic">{entry.change_4h}</td>
                    <td className="px-4 py-3 text-[var(--sc-muted)] italic">{entry.change_8h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="border-t border-[var(--sc-border)] mt-16 py-8 text-center text-[var(--sc-muted)] text-sm">
        <p>SingClaw Crypto Alpha · Score v2 · 数据仅供参考，不构成投资建议</p>
      </footer>
    </div>
  );
}
