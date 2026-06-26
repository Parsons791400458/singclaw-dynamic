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
        "coin": "RESOLV",
        "score": 100,
        "price": "0.02299",
        "change_24h": "+9.5%",
        "change_4h": "-0.4%",
        "change_8h": "-0.8%"
      },
      {
        "coin": "LUMIA",
        "score": 100,
        "price": "0.13506",
        "change_24h": "+7.1%",
        "change_4h": "-0.5%",
        "change_8h": "-1.0%"
      },
      {
        "coin": "CARV",
        "score": 100,
        "price": "0.03533",
        "change_24h": "+8.0%",
        "change_4h": "-2.4%",
        "change_8h": "-4.8%"
      },
      {
        "coin": "ETHFI",
        "score": 100,
        "price": "0.3799",
        "change_24h": "+11.0%",
        "change_4h": "+3.2%",
        "change_8h": "+6.4%"
      },
      {
        "coin": "SKYAI",
        "score": 100,
        "price": "0.29043",
        "change_24h": "+13.0%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "1000RATS",
        "score": 100,
        "price": "0.03074",
        "change_24h": "+7.1%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "TAG",
        "score": 100,
        "price": "0.000994",
        "change_24h": "+9.8%",
        "change_4h": "+4.2%",
        "change_8h": "+8.3%"
      },
      {
        "coin": "GLW",
        "score": 100,
        "price": "227.0",
        "change_24h": "+6.3%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "PARTI",
        "score": 100,
        "price": "0.05228",
        "change_24h": "+7.3%",
        "change_4h": "+1.3%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "HMSTR",
        "score": 100,
        "price": "0.0001603",
        "change_24h": "+7.0%",
        "change_4h": "+3.4%",
        "change_8h": "+6.8%"
      },
      {
        "coin": "XPL",
        "score": 100,
        "price": "0.10148",
        "change_24h": "+8.6%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "SYN",
        "score": 100,
        "price": "0.33892",
        "change_24h": "+7.1%",
        "change_4h": "-14.8%",
        "change_8h": "-29.6%"
      },
      {
        "coin": "BABY",
        "score": 100,
        "price": "0.0133",
        "change_24h": "+8.1%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "SNDK",
        "score": 100,
        "price": "2265.75",
        "change_24h": "+7.3%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
      },
      {
        "coin": "LAB",
        "score": 100,
        "price": "17.879",
        "change_24h": "+7.4%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "VELVET",
        "score": 100,
        "price": "0.5126",
        "change_24h": "+6.3%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "APE",
        "score": 100,
        "price": "0.1457",
        "change_24h": "+13.9%",
        "change_4h": "+3.2%",
        "change_8h": "+6.3%"
      },
      {
        "coin": "BIO",
        "score": 100,
        "price": "0.02996",
        "change_24h": "+5.8%",
        "change_4h": "+2.6%",
        "change_8h": "+5.2%"
      },
      {
        "coin": "TNSR",
        "score": 100,
        "price": "0.03888",
        "change_24h": "+9.1%",
        "change_4h": "-1.4%",
        "change_8h": "-2.7%"
      },
      {
        "coin": "FOLKS",
        "score": 100,
        "price": "2.555",
        "change_24h": "+13.6%",
        "change_4h": "+4.4%",
        "change_8h": "+8.7%"
      },
      {
        "coin": "EVAA",
        "score": 100,
        "price": "0.9191",
        "change_24h": "+6.3%",
        "change_4h": "-0.1%",
        "change_8h": "-0.3%"
      },
      {
        "coin": "BEL",
        "score": 100,
        "price": "0.15321",
        "change_24h": "+12.0%",
        "change_4h": "-1.4%",
        "change_8h": "-2.8%"
      },
      {
        "coin": "BULLA",
        "score": 100,
        "price": "0.005789",
        "change_24h": "+9.4%",
        "change_4h": "+3.3%",
        "change_8h": "+6.5%"
      },
      {
        "coin": "1000LUNC",
        "score": 100,
        "price": "0.06569",
        "change_24h": "+9.3%",
        "change_4h": "+2.4%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "AMAT",
        "score": 100,
        "price": "662.87",
        "change_24h": "+6.1%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "SAFE",
        "score": 100,
        "price": "0.0866",
        "change_24h": "+11.3%",
        "change_4h": "-0.7%",
        "change_8h": "-1.4%"
      },
      {
        "coin": "BLUAI",
        "score": 95,
        "price": "0.014729",
        "change_24h": "+5.9%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "CGPT",
        "score": 95,
        "price": "0.01902",
        "change_24h": "+5.4%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "STABLE",
        "score": 95,
        "price": "0.03684",
        "change_24h": "+5.9%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "KAITO",
        "score": 95,
        "price": "0.461",
        "change_24h": "+6.3%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "PRL",
        "score": 95,
        "price": "0.1516",
        "change_24h": "+9.4%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "ESP",
        "score": 95,
        "price": "0.06382",
        "change_24h": "+9.7%",
        "change_4h": "+2.7%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "ACU",
        "score": 95,
        "price": "0.08766",
        "change_24h": "+6.8%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "ALCH",
        "score": 95,
        "price": "0.07486",
        "change_24h": "+11.1%",
        "change_4h": "+2.1%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "1000000BOB",
        "score": 90,
        "price": "0.01461",
        "change_24h": "+8.2%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "BNT",
        "score": 90,
        "price": "0.2698",
        "change_24h": "+5.6%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "BEAT",
        "score": 85,
        "price": "2.153",
        "change_24h": "+21.0%",
        "change_4h": "+6.2%",
        "change_8h": "+12.5%"
      },
      {
        "coin": "SLX",
        "score": 85,
        "price": "0.39665",
        "change_24h": "+23.6%",
        "change_4h": "+4.0%",
        "change_8h": "+7.9%"
      },
      {
        "coin": "BAS",
        "score": 85,
        "price": "0.047684",
        "change_24h": "+17.7%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "IP",
        "score": 80,
        "price": "0.411",
        "change_24h": "+26.7%",
        "change_4h": "+7.4%",
        "change_8h": "+14.9%"
      },
      {
        "coin": "BBX",
        "score": 70,
        "price": "10.35",
        "change_24h": "+16.8%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "AWE",
        "score": 70,
        "price": "0.06932",
        "change_24h": "+15.2%",
        "change_4h": "+4.2%",
        "change_8h": "+8.4%"
      },
      {
        "coin": "TA",
        "score": 70,
        "price": "0.0834",
        "change_24h": "+19.0%",
        "change_4h": "+3.4%",
        "change_8h": "+6.9%"
      },
      {
        "coin": "IDOL",
        "score": 65,
        "price": "0.02602",
        "change_24h": "+30.1%",
        "change_4h": "+6.1%",
        "change_8h": "+12.2%"
      },
      {
        "coin": "HUMA",
        "score": 65,
        "price": "0.025174",
        "change_24h": "+17.0%",
        "change_4h": "+3.4%",
        "change_8h": "+6.7%"
      },
      {
        "coin": "RPL",
        "score": 65,
        "price": "1.634",
        "change_24h": "+29.5%",
        "change_4h": "+6.6%",
        "change_8h": "+13.2%"
      },
      {
        "coin": "ICNT",
        "score": 65,
        "price": "0.1939",
        "change_24h": "+15.4%",
        "change_4h": "+4.4%",
        "change_8h": "+8.7%"
      },
      {
        "coin": "G",
        "score": 60,
        "price": "0.004121",
        "change_24h": "+33.4%",
        "change_4h": "+5.9%",
        "change_8h": "+11.9%"
      },
      {
        "coin": "VVV",
        "score": 60,
        "price": "13.57",
        "change_24h": "+4.9%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "TAC",
        "score": 60,
        "price": "0.023495",
        "change_24h": "+15.2%",
        "change_4h": "+3.7%",
        "change_8h": "+7.3%"
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
