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
    "label": "今天 · 2026-06-26",
    "data": [
      {
        "coin": "AWE",
        "score": 100,
        "price": "0.07101",
        "change_24h": "+12.5%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "SOON",
        "score": 100,
        "price": "0.1757",
        "change_24h": "+7.7%",
        "change_4h": "+3.1%",
        "change_8h": "+6.2%"
      },
      {
        "coin": "ETHFI",
        "score": 100,
        "price": "0.3767",
        "change_24h": "+6.0%",
        "change_4h": "+2.8%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "IN",
        "score": 100,
        "price": "0.09414",
        "change_24h": "+7.0%",
        "change_4h": "+3.5%",
        "change_8h": "+7.1%"
      },
      {
        "coin": "HFT",
        "score": 100,
        "price": "0.00962",
        "change_24h": "+6.4%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "FOLKS",
        "score": 100,
        "price": "2.439",
        "change_24h": "+11.2%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "INJ",
        "score": 100,
        "price": "4.534",
        "change_24h": "+7.2%",
        "change_4h": "+2.7%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "1000RATS",
        "score": 100,
        "price": "0.03219",
        "change_24h": "+12.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "COLLECT",
        "score": 100,
        "price": "0.04545",
        "change_24h": "+7.1%",
        "change_4h": "+4.5%",
        "change_8h": "+9.0%"
      },
      {
        "coin": "ZBT",
        "score": 100,
        "price": "0.11169",
        "change_24h": "+6.0%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "ESP",
        "score": 100,
        "price": "0.06635",
        "change_24h": "+9.2%",
        "change_4h": "+3.6%",
        "change_8h": "+7.1%"
      },
      {
        "coin": "M",
        "score": 100,
        "price": "0.8582",
        "change_24h": "+7.4%",
        "change_4h": "-0.1%",
        "change_8h": "-0.1%"
      },
      {
        "coin": "CARV",
        "score": 100,
        "price": "0.03902",
        "change_24h": "+13.7%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "VELVET",
        "score": 100,
        "price": "0.4962",
        "change_24h": "+5.4%",
        "change_4h": "+0.2%",
        "change_8h": "+0.3%"
      },
      {
        "coin": "ARX",
        "score": 100,
        "price": "0.2781",
        "change_24h": "+12.0%",
        "change_4h": "+3.3%",
        "change_8h": "+6.6%"
      },
      {
        "coin": "BABY",
        "score": 100,
        "price": "0.01378",
        "change_24h": "+8.8%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "UB",
        "score": 100,
        "price": "0.07433",
        "change_24h": "+11.9%",
        "change_4h": "+4.0%",
        "change_8h": "+8.0%"
      },
      {
        "coin": "LAB",
        "score": 100,
        "price": "18.135",
        "change_24h": "+7.0%",
        "change_4h": "-0.2%",
        "change_8h": "-0.4%"
      },
      {
        "coin": "XPL",
        "score": 100,
        "price": "0.10429",
        "change_24h": "+13.2%",
        "change_4h": "+3.4%",
        "change_8h": "+6.9%"
      },
      {
        "coin": "KAITO",
        "score": 100,
        "price": "0.5022",
        "change_24h": "+10.2%",
        "change_4h": "+2.9%",
        "change_8h": "+5.7%"
      },
      {
        "coin": "SKYAI",
        "score": 100,
        "price": "0.33135",
        "change_24h": "+12.0%",
        "change_4h": "+5.1%",
        "change_8h": "+10.1%"
      },
      {
        "coin": "IP",
        "score": 100,
        "price": "0.3382",
        "change_24h": "+5.9%",
        "change_4h": "-2.7%",
        "change_8h": "-5.5%"
      },
      {
        "coin": "APE",
        "score": 100,
        "price": "0.153",
        "change_24h": "+12.7%",
        "change_4h": "+4.4%",
        "change_8h": "+8.9%"
      },
      {
        "coin": "BBX",
        "score": 100,
        "price": "10.2",
        "change_24h": "+11.0%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "EDEN",
        "score": 100,
        "price": "0.0489",
        "change_24h": "+6.7%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "GRIFFAIN",
        "score": 95,
        "price": "0.008694",
        "change_24h": "+6.4%",
        "change_4h": "+3.4%",
        "change_8h": "+6.9%"
      },
      {
        "coin": "AT",
        "score": 95,
        "price": "0.1585",
        "change_24h": "+11.5%",
        "change_4h": "+2.8%",
        "change_8h": "+5.7%"
      },
      {
        "coin": "RPL",
        "score": 95,
        "price": "1.337",
        "change_24h": "+5.3%",
        "change_4h": "-3.8%",
        "change_8h": "-7.6%"
      },
      {
        "coin": "NAORIS",
        "score": 95,
        "price": "0.03679",
        "change_24h": "+7.8%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "ARIA",
        "score": 95,
        "price": "0.02596",
        "change_24h": "+5.7%",
        "change_4h": "+3.5%",
        "change_8h": "+7.0%"
      },
      {
        "coin": "JELLYJELLY",
        "score": 95,
        "price": "0.06002",
        "change_24h": "+5.9%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "1000000BOB",
        "score": 95,
        "price": "0.01505",
        "change_24h": "+6.1%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "UVXY",
        "score": 95,
        "price": "28.14",
        "change_24h": "+7.7%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "C",
        "score": 95,
        "price": "0.0829",
        "change_24h": "+5.6%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "CGPT",
        "score": 95,
        "price": "0.0191",
        "change_24h": "+5.1%",
        "change_4h": "+2.2%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "KGEN",
        "score": 95,
        "price": "0.1819",
        "change_24h": "+5.8%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "BLUAI",
        "score": 95,
        "price": "0.015",
        "change_24h": "+6.4%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "CATI",
        "score": 90,
        "price": "0.06298",
        "change_24h": "+7.2%",
        "change_4h": "+1.9%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "SLX",
        "score": 85,
        "price": "0.42598",
        "change_24h": "+20.6%",
        "change_4h": "+7.6%",
        "change_8h": "+15.1%"
      },
      {
        "coin": "TNSR",
        "score": 85,
        "price": "0.04087",
        "change_24h": "+18.9%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "IDOL",
        "score": 80,
        "price": "0.02597",
        "change_24h": "+18.1%",
        "change_4h": "+4.7%",
        "change_8h": "+9.3%"
      },
      {
        "coin": "H",
        "score": 80,
        "price": "0.06392",
        "change_24h": "+20.6%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "JTO",
        "score": 80,
        "price": "0.7706",
        "change_24h": "+16.0%",
        "change_4h": "+4.5%",
        "change_8h": "+8.9%"
      },
      {
        "coin": "TAC",
        "score": 70,
        "price": "0.025397",
        "change_24h": "+20.8%",
        "change_4h": "+4.1%",
        "change_8h": "+8.2%"
      },
      {
        "coin": "HMSTR",
        "score": 70,
        "price": "0.0001744",
        "change_24h": "+18.3%",
        "change_4h": "+4.9%",
        "change_8h": "+9.9%"
      },
      {
        "coin": "HEI",
        "score": 70,
        "price": "0.16688",
        "change_24h": "+34.8%",
        "change_4h": "+4.2%",
        "change_8h": "+8.3%"
      },
      {
        "coin": "BULLA",
        "score": 70,
        "price": "0.006363",
        "change_24h": "+19.8%",
        "change_4h": "+5.2%",
        "change_8h": "+10.5%"
      },
      {
        "coin": "BEAT",
        "score": 70,
        "price": "2.368",
        "change_24h": "+34.6%",
        "change_4h": "+5.8%",
        "change_8h": "+11.7%"
      },
      {
        "coin": "HUMA",
        "score": 65,
        "price": "0.025579",
        "change_24h": "+15.1%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "G",
        "score": 65,
        "price": "0.004312",
        "change_24h": "+43.5%",
        "change_4h": "+8.4%",
        "change_8h": "+16.8%"
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
