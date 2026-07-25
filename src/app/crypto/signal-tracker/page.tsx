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
    "label": "今天 · 2026-07-25",
    "data": [
      {
        "coin": "LAB",
        "score": 100,
        "price": "0.1614",
        "change_24h": "+6.7%",
        "change_4h": "+2.2%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "ZHIPU",
        "score": 100,
        "price": "158.01",
        "change_24h": "+9.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "SYN",
        "score": 100,
        "price": "0.1544",
        "change_24h": "+8.0%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "BEAT",
        "score": 100,
        "price": "3.236",
        "change_24h": "+5.6%",
        "change_4h": "-0.7%",
        "change_8h": "-1.5%"
      },
      {
        "coin": "CHILLGUY",
        "score": 100,
        "price": "0.011051",
        "change_24h": "+9.6%",
        "change_4h": "-1.7%",
        "change_8h": "-3.5%"
      },
      {
        "coin": "AIA",
        "score": 100,
        "price": "0.06964",
        "change_24h": "+11.3%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "TAIKO",
        "score": 100,
        "price": "0.08226",
        "change_24h": "+6.3%",
        "change_4h": "-1.4%",
        "change_8h": "-2.8%"
      },
      {
        "coin": "TLM",
        "score": 100,
        "price": "0.001838",
        "change_24h": "+8.9%",
        "change_4h": "+0.5%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "TOWNS",
        "score": 100,
        "price": "0.002179",
        "change_24h": "+12.3%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "BASED",
        "score": 100,
        "price": "0.08399",
        "change_24h": "+9.5%",
        "change_4h": "+2.4%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "PLAY",
        "score": 100,
        "price": "0.03937",
        "change_24h": "+9.1%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "BEAMX",
        "score": 100,
        "price": "0.001649",
        "change_24h": "+11.5%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "CLO",
        "score": 100,
        "price": "0.12934",
        "change_24h": "+7.1%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "TNSR",
        "score": 100,
        "price": "0.03407",
        "change_24h": "+9.1%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "SAGA",
        "score": 100,
        "price": "0.01417",
        "change_24h": "+10.5%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "HEMI",
        "score": 100,
        "price": "0.005391",
        "change_24h": "+14.2%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "EVAA",
        "score": 100,
        "price": "0.9299",
        "change_24h": "+8.3%",
        "change_4h": "+2.2%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "EPIC",
        "score": 100,
        "price": "0.7049",
        "change_24h": "+7.7%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "CAP",
        "score": 100,
        "price": "0.02734",
        "change_24h": "+12.7%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "SOXS",
        "score": 100,
        "price": "51.18",
        "change_24h": "+12.9%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "ONE",
        "score": 100,
        "price": "0.001319",
        "change_24h": "+5.7%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "AVAAI",
        "score": 95,
        "price": "0.008679",
        "change_24h": "+7.2%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "AGT",
        "score": 95,
        "price": "0.014229",
        "change_24h": "+10.8%",
        "change_4h": "+0.8%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "TRADOOR",
        "score": 95,
        "price": "0.5267",
        "change_24h": "+7.8%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "BROCCOLIF3B",
        "score": 95,
        "price": "0.006218",
        "change_24h": "+10.2%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "CVX",
        "score": 95,
        "price": "1.266",
        "change_24h": "+7.1%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "EUL",
        "score": 95,
        "price": "1.1281",
        "change_24h": "+13.5%",
        "change_4h": "+3.4%",
        "change_8h": "+6.7%"
      },
      {
        "coin": "ALCH",
        "score": 95,
        "price": "0.02878",
        "change_24h": "+5.0%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "ZRO",
        "score": 95,
        "price": "0.8584",
        "change_24h": "+7.7%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "GENIUS",
        "score": 95,
        "price": "0.367",
        "change_24h": "+7.1%",
        "change_4h": "+1.0%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "VVV",
        "score": 95,
        "price": "12.438",
        "change_24h": "+6.3%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "TUT",
        "score": 90,
        "price": "0.0149",
        "change_24h": "+6.7%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "BAN",
        "score": 90,
        "price": "0.07584",
        "change_24h": "+6.1%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "PRL",
        "score": 90,
        "price": "0.1822",
        "change_24h": "+5.9%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "G",
        "score": 90,
        "price": "0.00334",
        "change_24h": "+5.2%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "NOW",
        "score": 90,
        "price": "98.0",
        "change_24h": "+6.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "M",
        "score": 90,
        "price": "1.2053",
        "change_24h": "+5.3%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "PIXEL",
        "score": 90,
        "price": "0.004719",
        "change_24h": "+6.0%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "MYX",
        "score": 90,
        "price": "0.08002",
        "change_24h": "+5.4%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "NOM",
        "score": 90,
        "price": "0.001564",
        "change_24h": "+5.7%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "TAC",
        "score": 90,
        "price": "0.00363",
        "change_24h": "+7.3%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "PTB",
        "score": 90,
        "price": "0.0006197",
        "change_24h": "+6.2%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "PHAROS",
        "score": 90,
        "price": "0.3816",
        "change_24h": "+5.2%",
        "change_4h": "+0.6%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "AKE",
        "score": 85,
        "price": "0.0027625",
        "change_24h": "+23.8%",
        "change_4h": "+4.7%",
        "change_8h": "+9.4%"
      },
      {
        "coin": "ESPORTS",
        "score": 85,
        "price": "0.04811",
        "change_24h": "+15.3%",
        "change_4h": "+5.3%",
        "change_8h": "+10.6%"
      },
      {
        "coin": "B2",
        "score": 75,
        "price": "0.4387",
        "change_24h": "+27.0%",
        "change_4h": "+8.0%",
        "change_8h": "+15.9%"
      },
      {
        "coin": "SLX",
        "score": 75,
        "price": "0.12943",
        "change_24h": "+19.9%",
        "change_4h": "+4.2%",
        "change_8h": "+8.5%"
      },
      {
        "coin": "XNY",
        "score": 65,
        "price": "0.007688",
        "change_24h": "+15.7%",
        "change_4h": "+3.2%",
        "change_8h": "+6.3%"
      },
      {
        "coin": "ACE",
        "score": 65,
        "price": "0.11079",
        "change_24h": "+31.7%",
        "change_4h": "+8.9%",
        "change_8h": "+17.8%"
      },
      {
        "coin": "VELVET",
        "score": 65,
        "price": "0.4742",
        "change_24h": "+41.0%",
        "change_4h": "+13.6%",
        "change_8h": "+27.2%"
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
