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
    "label": "今天 · 2026-07-03",
    "data": [
      {
        "coin": "S",
        "score": 100,
        "price": "0.02541",
        "change_24h": "+10.0%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "MSTR",
        "score": 100,
        "price": "102.85",
        "change_24h": "+7.9%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "POWR",
        "score": 100,
        "price": "0.04553",
        "change_24h": "+6.7%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "FIL",
        "score": 100,
        "price": "0.784",
        "change_24h": "+5.5%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "USELESS",
        "score": 100,
        "price": "0.08658",
        "change_24h": "+6.8%",
        "change_4h": "+0.8%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "BILL",
        "score": 100,
        "price": "0.04548",
        "change_24h": "+6.4%",
        "change_4h": "+2.3%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "ADA",
        "score": 100,
        "price": "0.1644",
        "change_24h": "+6.9%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "ME",
        "score": 100,
        "price": "0.06606",
        "change_24h": "+8.6%",
        "change_4h": "-0.4%",
        "change_8h": "-0.8%"
      },
      {
        "coin": "O",
        "score": 100,
        "price": "0.5577",
        "change_24h": "+10.6%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "BLESS",
        "score": 100,
        "price": "0.007779",
        "change_24h": "+12.6%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "ETH",
        "score": 100,
        "price": "1707.81",
        "change_24h": "+6.0%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "RPL",
        "score": 100,
        "price": "1.658",
        "change_24h": "+11.5%",
        "change_4h": "-5.8%",
        "change_8h": "-11.7%"
      },
      {
        "coin": "SKY",
        "score": 100,
        "price": "0.05972",
        "change_24h": "+13.2%",
        "change_4h": "+3.2%",
        "change_8h": "+6.4%"
      },
      {
        "coin": "1000PEPE",
        "score": 100,
        "price": "0.0024526",
        "change_24h": "+5.1%",
        "change_4h": "+0.9%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "MINA",
        "score": 100,
        "price": "0.04276",
        "change_24h": "+6.9%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "SAGA",
        "score": 100,
        "price": "0.01391",
        "change_24h": "+6.2%",
        "change_4h": "+1.0%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "VVV",
        "score": 100,
        "price": "13.698",
        "change_24h": "+6.6%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "UNI",
        "score": 100,
        "price": "3.194",
        "change_24h": "+13.8%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "AERO",
        "score": 100,
        "price": "0.5123",
        "change_24h": "+9.3%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "INJ",
        "score": 100,
        "price": "4.743",
        "change_24h": "+5.8%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "LINK",
        "score": 100,
        "price": "7.782",
        "change_24h": "+5.2%",
        "change_4h": "+0.8%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "BEAT",
        "score": 100,
        "price": "3.105",
        "change_24h": "+13.4%",
        "change_4h": "+3.1%",
        "change_8h": "+6.2%"
      },
      {
        "coin": "EIGEN",
        "score": 100,
        "price": "0.2119",
        "change_24h": "+6.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "PUMP",
        "score": 100,
        "price": "0.001543",
        "change_24h": "+9.7%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "RED",
        "score": 100,
        "price": "0.0979",
        "change_24h": "+7.2%",
        "change_4h": "-1.6%",
        "change_8h": "-3.2%"
      },
      {
        "coin": "HYPE",
        "score": 100,
        "price": "66.765",
        "change_24h": "+7.0%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "NFP",
        "score": 100,
        "price": "0.007566",
        "change_24h": "+7.7%",
        "change_4h": "-34.8%",
        "change_8h": "-69.6%"
      },
      {
        "coin": "AIN",
        "score": 100,
        "price": "0.08386",
        "change_24h": "+12.1%",
        "change_4h": "+0.3%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "MEGA",
        "score": 100,
        "price": "0.0499",
        "change_24h": "+9.7%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "EVAA",
        "score": 100,
        "price": "1.012",
        "change_24h": "+8.2%",
        "change_4h": "+2.7%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "ZRO",
        "score": 100,
        "price": "0.8691",
        "change_24h": "+7.9%",
        "change_4h": "+0.5%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "ENA",
        "score": 100,
        "price": "0.07643",
        "change_24h": "+5.4%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "XNY",
        "score": 95,
        "price": "0.005958",
        "change_24h": "+9.0%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "AKE",
        "score": 95,
        "price": "0.0004051",
        "change_24h": "+8.6%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "SPX",
        "score": 95,
        "price": "0.3783",
        "change_24h": "+7.2%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "ZK",
        "score": 95,
        "price": "0.01055",
        "change_24h": "+6.5%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "UAI",
        "score": 95,
        "price": "0.3456",
        "change_24h": "+10.3%",
        "change_4h": "+2.4%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "GRASS",
        "score": 95,
        "price": "0.5067",
        "change_24h": "+6.9%",
        "change_4h": "-0.3%",
        "change_8h": "-0.5%"
      },
      {
        "coin": "ID",
        "score": 95,
        "price": "0.03418",
        "change_24h": "+5.0%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "AZTEC",
        "score": 95,
        "price": "0.01432",
        "change_24h": "+9.0%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "VELODROME",
        "score": 95,
        "price": "0.02176",
        "change_24h": "+11.3%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "RAYSOL",
        "score": 95,
        "price": "0.6949",
        "change_24h": "+7.0%",
        "change_4h": "-0.4%",
        "change_8h": "-0.7%"
      },
      {
        "coin": "LDO",
        "score": 95,
        "price": "0.2603",
        "change_24h": "+5.4%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "BR",
        "score": 95,
        "price": "0.1534",
        "change_24h": "+7.5%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "MOODENG",
        "score": 95,
        "price": "0.04296",
        "change_24h": "+6.5%",
        "change_4h": "+0.9%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "BERA",
        "score": 95,
        "price": "0.2163",
        "change_24h": "+5.7%",
        "change_4h": "-0.3%",
        "change_8h": "-0.6%"
      },
      {
        "coin": "LA",
        "score": 95,
        "price": "0.0655",
        "change_24h": "+7.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "MANTA",
        "score": 95,
        "price": "0.06346",
        "change_24h": "+6.0%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "RENDER",
        "score": 95,
        "price": "1.617",
        "change_24h": "+7.0%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "FLOCK",
        "score": 95,
        "price": "0.03577",
        "change_24h": "+8.5%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
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
