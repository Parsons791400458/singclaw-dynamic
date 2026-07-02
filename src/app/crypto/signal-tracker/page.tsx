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
    "label": "今天 · 2026-07-02",
    "data": [
      {
        "coin": "BSV",
        "score": 100,
        "price": "13.96",
        "change_24h": "+7.1%",
        "change_4h": "+0.8%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "FIDA",
        "score": 100,
        "price": "0.02219",
        "change_24h": "+10.6%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "BCH",
        "score": 100,
        "price": "214.67",
        "change_24h": "+8.3%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "COIN",
        "score": 100,
        "price": "160.39",
        "change_24h": "+10.8%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "CRV",
        "score": 100,
        "price": "0.2062",
        "change_24h": "+12.2%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "ICNT",
        "score": 100,
        "price": "0.197",
        "change_24h": "+8.8%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "VVV",
        "score": 100,
        "price": "12.896",
        "change_24h": "+6.4%",
        "change_4h": "-2.6%",
        "change_8h": "-5.3%"
      },
      {
        "coin": "SAGA",
        "score": 100,
        "price": "0.01314",
        "change_24h": "+6.8%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "RESOLV",
        "score": 100,
        "price": "0.02125",
        "change_24h": "+13.2%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "SHELL",
        "score": 100,
        "price": "0.02317",
        "change_24h": "+12.2%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "ONDO",
        "score": 100,
        "price": "0.3303",
        "change_24h": "+7.7%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "SYRUP",
        "score": 100,
        "price": "0.15275",
        "change_24h": "+11.4%",
        "change_4h": "+2.7%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "NEAR",
        "score": 100,
        "price": "1.879",
        "change_24h": "+6.8%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "HBAR",
        "score": 100,
        "price": "0.07282",
        "change_24h": "+5.5%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "SUI",
        "score": 100,
        "price": "0.7227",
        "change_24h": "+5.2%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "PYTH",
        "score": 100,
        "price": "0.03941",
        "change_24h": "+5.4%",
        "change_4h": "+0.8%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "ADA",
        "score": 100,
        "price": "0.1541",
        "change_24h": "+7.4%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "LIT",
        "score": 100,
        "price": "2.0377",
        "change_24h": "+9.7%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "MORPHO",
        "score": 100,
        "price": "2.1349",
        "change_24h": "+12.4%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "FET",
        "score": 100,
        "price": "0.1806",
        "change_24h": "+5.9%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "BTW",
        "score": 100,
        "price": "0.06662",
        "change_24h": "+10.1%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "PLTR",
        "score": 100,
        "price": "125.5",
        "change_24h": "+7.0%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "HOOD",
        "score": 100,
        "price": "108.62",
        "change_24h": "+8.7%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "MON",
        "score": 100,
        "price": "0.02023",
        "change_24h": "+10.2%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "IOTA",
        "score": 100,
        "price": "0.03825",
        "change_24h": "+10.3%",
        "change_4h": "+2.1%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "PENDLE",
        "score": 100,
        "price": "1.4588",
        "change_24h": "+12.0%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "MET",
        "score": 100,
        "price": "0.182",
        "change_24h": "+12.3%",
        "change_4h": "+1.9%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "PIXEL",
        "score": 100,
        "price": "0.005148",
        "change_24h": "+14.7%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "APT",
        "score": 100,
        "price": "0.5978",
        "change_24h": "+5.5%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "JTO",
        "score": 100,
        "price": "0.7806",
        "change_24h": "+8.6%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "MSTR",
        "score": 100,
        "price": "95.58",
        "change_24h": "+11.6%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "TURBO",
        "score": 100,
        "price": "0.0008474",
        "change_24h": "+7.6%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "TA",
        "score": 100,
        "price": "0.08103",
        "change_24h": "+11.5%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "META",
        "score": 100,
        "price": "607.37",
        "change_24h": "+7.9%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "ALICE",
        "score": 100,
        "price": "0.1228",
        "change_24h": "+8.6%",
        "change_4h": "+2.1%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "JUP",
        "score": 100,
        "price": "0.2351",
        "change_24h": "+13.0%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "SOL",
        "score": 100,
        "price": "78.05",
        "change_24h": "+6.6%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "KAITO",
        "score": 100,
        "price": "0.6336",
        "change_24h": "+11.8%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "EVAA",
        "score": 100,
        "price": "0.9211",
        "change_24h": "+8.1%",
        "change_4h": "+4.5%",
        "change_8h": "+9.1%"
      },
      {
        "coin": "US",
        "score": 100,
        "price": "0.012761",
        "change_24h": "+11.2%",
        "change_4h": "+3.9%",
        "change_8h": "+7.8%"
      },
      {
        "coin": "VIRTUAL",
        "score": 100,
        "price": "0.5482",
        "change_24h": "+5.4%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "ZEC",
        "score": 100,
        "price": "415.35",
        "change_24h": "+5.5%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "EPIC",
        "score": 100,
        "price": "0.4588",
        "change_24h": "+7.6%",
        "change_4h": "-1.3%",
        "change_8h": "-2.5%"
      },
      {
        "coin": "BULLA",
        "score": 95,
        "price": "0.006365",
        "change_24h": "+7.8%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "CTR",
        "score": 95,
        "price": "0.01168",
        "change_24h": "+5.3%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "RECALL",
        "score": 95,
        "price": "0.03221",
        "change_24h": "+9.7%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "SANTOS",
        "score": 95,
        "price": "0.5709",
        "change_24h": "+7.5%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "ZKC",
        "score": 95,
        "price": "0.04388",
        "change_24h": "+5.7%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "YFI",
        "score": 95,
        "price": "1759.0",
        "change_24h": "+9.9%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "CTSI",
        "score": 95,
        "price": "0.02296",
        "change_24h": "+7.5%",
        "change_4h": "+0.1%",
        "change_8h": "+0.3%"
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
