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
    "label": "今天 · 2026-08-23",
    "data": [
      {
        "coin": "BABY",
        "score": 100,
        "price": "0.01252",
        "change_24h": "+5.2%",
        "change_4h": "+3.1%",
        "change_8h": "+6.1%"
      },
      {
        "coin": "ZEC",
        "score": 100,
        "price": "803.62",
        "change_24h": "+7.8%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "CROSS",
        "score": 100,
        "price": "0.12442",
        "change_24h": "+12.3%",
        "change_4h": "+4.3%",
        "change_8h": "+8.6%"
      },
      {
        "coin": "VVV",
        "score": 100,
        "price": "16.952",
        "change_24h": "+7.3%",
        "change_4h": "+3.1%",
        "change_8h": "+6.3%"
      },
      {
        "coin": "ENA",
        "score": 100,
        "price": "0.15975",
        "change_24h": "+10.8%",
        "change_4h": "+2.8%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "FF",
        "score": 100,
        "price": "0.0829",
        "change_24h": "+9.7%",
        "change_4h": "+3.8%",
        "change_8h": "+7.6%"
      },
      {
        "coin": "MELANIA",
        "score": 100,
        "price": "0.10668",
        "change_24h": "+13.1%",
        "change_4h": "-8.7%",
        "change_8h": "-17.3%"
      },
      {
        "coin": "HYPE",
        "score": 100,
        "price": "80.791",
        "change_24h": "+5.8%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "POL",
        "score": 100,
        "price": "0.10579",
        "change_24h": "+9.7%",
        "change_4h": "-1.2%",
        "change_8h": "-2.4%"
      },
      {
        "coin": "TST",
        "score": 100,
        "price": "0.01711",
        "change_24h": "+6.2%",
        "change_4h": "+6.5%",
        "change_8h": "+13.0%"
      },
      {
        "coin": "XMR",
        "score": 100,
        "price": "435.39",
        "change_24h": "+6.8%",
        "change_4h": "-0.2%",
        "change_8h": "-0.3%"
      },
      {
        "coin": "DASH",
        "score": 100,
        "price": "42.54",
        "change_24h": "+6.4%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "MOVE",
        "score": 100,
        "price": "0.007986",
        "change_24h": "+8.6%",
        "change_4h": "-1.4%",
        "change_8h": "-2.8%"
      },
      {
        "coin": "STX",
        "score": 100,
        "price": "0.2228",
        "change_24h": "+13.7%",
        "change_4h": "+4.8%",
        "change_8h": "+9.6%"
      },
      {
        "coin": "ZAMA",
        "score": 100,
        "price": "0.05318",
        "change_24h": "+5.8%",
        "change_4h": "-1.5%",
        "change_8h": "-3.0%"
      },
      {
        "coin": "PUMP",
        "score": 85,
        "price": "0.00499",
        "change_24h": "+17.6%",
        "change_4h": "+8.1%",
        "change_8h": "+16.2%"
      },
      {
        "coin": "ZRO",
        "score": 80,
        "price": "1.185",
        "change_24h": "+18.0%",
        "change_4h": "+7.6%",
        "change_8h": "+15.3%"
      },
      {
        "coin": "PORTAL",
        "score": 75,
        "price": "0.01371",
        "change_24h": "+20.4%",
        "change_4h": "+8.6%",
        "change_8h": "+17.2%"
      },
      {
        "coin": "TRUMP",
        "score": 75,
        "price": "2.355",
        "change_24h": "+21.1%",
        "change_4h": "-8.0%",
        "change_8h": "-15.9%"
      },
      {
        "coin": "MUBARAK",
        "score": 75,
        "price": "0.02374",
        "change_24h": "+15.0%",
        "change_4h": "-2.8%",
        "change_8h": "-5.7%"
      },
      {
        "coin": "LIT",
        "score": 65,
        "price": "3.2145",
        "change_24h": "+3.0%",
        "change_4h": "+4.8%",
        "change_8h": "+9.6%"
      },
      {
        "coin": "UNI",
        "score": 65,
        "price": "4.3",
        "change_24h": "+1.4%",
        "change_4h": "+2.7%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "DOGE",
        "score": 65,
        "price": "0.09341",
        "change_24h": "+1.4%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "1000PEPE",
        "score": 65,
        "price": "0.0041338",
        "change_24h": "+0.6%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "XRP",
        "score": 60,
        "price": "1.4946",
        "change_24h": "+0.9%",
        "change_4h": "-1.5%",
        "change_8h": "-3.1%"
      },
      {
        "coin": "1000BONK",
        "score": 60,
        "price": "0.00334",
        "change_24h": "+4.7%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "COTI",
        "score": 60,
        "price": "0.011457",
        "change_24h": "+3.6%",
        "change_4h": "+5.3%",
        "change_8h": "+10.5%"
      },
      {
        "coin": "ZEN",
        "score": 60,
        "price": "5.422",
        "change_24h": "+1.9%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "SOL",
        "score": 60,
        "price": "96.09",
        "change_24h": "+2.2%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "AAVE",
        "score": 60,
        "price": "126.28",
        "change_24h": "+2.2%",
        "change_4h": "+2.6%",
        "change_8h": "+5.2%"
      },
      {
        "coin": "TRB",
        "score": 60,
        "price": "18.885",
        "change_24h": "+2.0%",
        "change_4h": "-1.1%",
        "change_8h": "-2.2%"
      },
      {
        "coin": "TRX",
        "score": 55,
        "price": "0.34558",
        "change_24h": "+0.2%",
        "change_4h": "+0.8%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "WLD",
        "score": 55,
        "price": "0.3924",
        "change_24h": "-6.0%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "LINK",
        "score": 55,
        "price": "11.684",
        "change_24h": "-3.0%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "NEAR",
        "score": 55,
        "price": "1.911",
        "change_24h": "-3.4%",
        "change_4h": "+1.2%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "USELESS",
        "score": 55,
        "price": "0.06673",
        "change_24h": "+1.5%",
        "change_4h": "+5.2%",
        "change_8h": "+10.5%"
      },
      {
        "coin": "GIGGLE",
        "score": 55,
        "price": "37.96",
        "change_24h": "+0.8%",
        "change_4h": "+4.4%",
        "change_8h": "+8.9%"
      },
      {
        "coin": "ONDO",
        "score": 55,
        "price": "0.3676",
        "change_24h": "-9.7%",
        "change_4h": "+0.4%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "PYTH",
        "score": 55,
        "price": "0.05274",
        "change_24h": "+2.2%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "PENGU",
        "score": 55,
        "price": "0.008548",
        "change_24h": "-3.9%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "ACE",
        "score": 55,
        "price": "0.23397",
        "change_24h": "-2.0%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "OP",
        "score": 55,
        "price": "0.10909",
        "change_24h": "+0.6%",
        "change_4h": "-1.3%",
        "change_8h": "-2.6%"
      },
      {
        "coin": "AKE",
        "score": 55,
        "price": "0.008662",
        "change_24h": "+4.6%",
        "change_4h": "-1.4%",
        "change_8h": "-2.9%"
      },
      {
        "coin": "ARB",
        "score": 55,
        "price": "0.09919",
        "change_24h": "+0.4%",
        "change_4h": "-0.3%",
        "change_8h": "-0.7%"
      },
      {
        "coin": "HEMI",
        "score": 50,
        "price": "0.00991",
        "change_24h": "-6.5%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "NEIRO",
        "score": 50,
        "price": "9.2e-05",
        "change_24h": "-16.2%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "ADA",
        "score": 50,
        "price": "0.2271",
        "change_24h": "-1.8%",
        "change_4h": "-1.2%",
        "change_8h": "-2.3%"
      },
      {
        "coin": "FET",
        "score": 50,
        "price": "0.1616",
        "change_24h": "-6.5%",
        "change_4h": "+0.3%",
        "change_8h": "+0.7%"
      },
      {
        "coin": "BNB",
        "score": 50,
        "price": "700.39",
        "change_24h": "+1.6%",
        "change_4h": "-0.4%",
        "change_8h": "-0.7%"
      },
      {
        "coin": "CVX",
        "score": 50,
        "price": "2.077",
        "change_24h": "+1.6%",
        "change_4h": "+3.8%",
        "change_8h": "+7.6%"
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
