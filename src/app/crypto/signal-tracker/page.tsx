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
    "label": "今天 · 2026-06-29",
    "data": [
      {
        "coin": "G",
        "score": 100,
        "price": "0.00348",
        "change_24h": "+11.8%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "NFP",
        "score": 100,
        "price": "0.005674",
        "change_24h": "+11.2%",
        "change_4h": "-1.7%",
        "change_8h": "-3.3%"
      },
      {
        "coin": "CELO",
        "score": 100,
        "price": "0.06963",
        "change_24h": "+12.4%",
        "change_4h": "-1.5%",
        "change_8h": "-3.0%"
      },
      {
        "coin": "TURBO",
        "score": 100,
        "price": "0.0008918",
        "change_24h": "+9.9%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "S",
        "score": 100,
        "price": "0.02417",
        "change_24h": "+8.3%",
        "change_4h": "-2.2%",
        "change_8h": "-4.5%"
      },
      {
        "coin": "SLX",
        "score": 100,
        "price": "0.58387",
        "change_24h": "+12.4%",
        "change_4h": "+5.1%",
        "change_8h": "+10.2%"
      },
      {
        "coin": "ZEREBRO",
        "score": 100,
        "price": "0.041967",
        "change_24h": "+14.1%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "BILL",
        "score": 100,
        "price": "0.04281",
        "change_24h": "+6.2%",
        "change_4h": "-1.3%",
        "change_8h": "-2.6%"
      },
      {
        "coin": "BASED",
        "score": 100,
        "price": "0.0813",
        "change_24h": "+7.8%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "MEME",
        "score": 100,
        "price": "0.0005982",
        "change_24h": "+14.0%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "MAGIC",
        "score": 100,
        "price": "0.04602",
        "change_24h": "+11.8%",
        "change_4h": "-1.9%",
        "change_8h": "-3.8%"
      },
      {
        "coin": "AKE",
        "score": 95,
        "price": "0.0003846",
        "change_24h": "+10.1%",
        "change_4h": "+0.5%",
        "change_8h": "+1.0%"
      },
      {
        "coin": "PLAY",
        "score": 95,
        "price": "0.03334",
        "change_24h": "+5.8%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "USUAL",
        "score": 95,
        "price": "0.00921",
        "change_24h": "+5.9%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "AVAAI",
        "score": 95,
        "price": "0.00534",
        "change_24h": "+10.6%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "GAS",
        "score": 95,
        "price": "1.087",
        "change_24h": "+6.2%",
        "change_4h": "-0.7%",
        "change_8h": "-1.5%"
      },
      {
        "coin": "VIC",
        "score": 95,
        "price": "0.03973",
        "change_24h": "+5.3%",
        "change_4h": "-1.1%",
        "change_8h": "-2.2%"
      },
      {
        "coin": "CHILLGUY",
        "score": 95,
        "price": "0.008984",
        "change_24h": "+8.7%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "ZEST",
        "score": 95,
        "price": "0.2485",
        "change_24h": "+5.9%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "PRL",
        "score": 95,
        "price": "0.1583",
        "change_24h": "+5.4%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "SWARMS",
        "score": 95,
        "price": "0.006476",
        "change_24h": "+7.1%",
        "change_4h": "+0.2%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "TOSHI",
        "score": 95,
        "price": "0.0001157",
        "change_24h": "+6.0%",
        "change_4h": "-3.1%",
        "change_8h": "-6.2%"
      },
      {
        "coin": "TAC",
        "score": 90,
        "price": "0.022101",
        "change_24h": "+5.7%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "BTR",
        "score": 90,
        "price": "0.01925",
        "change_24h": "+6.1%",
        "change_4h": "-0.1%",
        "change_8h": "-0.2%"
      },
      {
        "coin": "VELODROME",
        "score": 90,
        "price": "0.01903",
        "change_24h": "+5.4%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "DYM",
        "score": 90,
        "price": "0.01553",
        "change_24h": "+5.4%",
        "change_4h": "-1.2%",
        "change_8h": "-2.3%"
      },
      {
        "coin": "EDU",
        "score": 90,
        "price": "0.03077",
        "change_24h": "+5.1%",
        "change_4h": "+0.9%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "AEVO",
        "score": 90,
        "price": "0.01793",
        "change_24h": "+5.2%",
        "change_4h": "-1.9%",
        "change_8h": "-3.7%"
      },
      {
        "coin": "TA",
        "score": 90,
        "price": "0.0752",
        "change_24h": "+6.3%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "VELVET",
        "score": 85,
        "price": "1.8587",
        "change_24h": "+16.0%",
        "change_4h": "+4.0%",
        "change_8h": "+8.0%"
      },
      {
        "coin": "POWR",
        "score": 85,
        "price": "0.05603",
        "change_24h": "+23.6%",
        "change_4h": "+4.3%",
        "change_8h": "+8.7%"
      },
      {
        "coin": "RAVE",
        "score": 80,
        "price": "0.3205",
        "change_24h": "+25.9%",
        "change_4h": "+4.5%",
        "change_8h": "+9.0%"
      },
      {
        "coin": "O",
        "score": 80,
        "price": "0.5158",
        "change_24h": "+20.6%",
        "change_4h": "+1.0%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "COOKIE",
        "score": 75,
        "price": "0.00948",
        "change_24h": "+19.1%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "GWEI",
        "score": 75,
        "price": "0.1607",
        "change_24h": "+21.8%",
        "change_4h": "+3.8%",
        "change_8h": "+7.7%"
      },
      {
        "coin": "SYN",
        "score": 70,
        "price": "0.42786",
        "change_24h": "+40.3%",
        "change_4h": "+4.0%",
        "change_8h": "+8.0%"
      },
      {
        "coin": "RIF",
        "score": 70,
        "price": "0.0687",
        "change_24h": "+19.0%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "JCT",
        "score": 70,
        "price": "0.005071",
        "change_24h": "+19.8%",
        "change_4h": "+2.0%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "BEAT",
        "score": 65,
        "price": "2.749",
        "change_24h": "+3.6%",
        "change_4h": "+2.2%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "PUMP",
        "score": 55,
        "price": "0.001414",
        "change_24h": "+4.4%",
        "change_4h": "-0.8%",
        "change_8h": "-1.6%"
      },
      {
        "coin": "MANTA",
        "score": 55,
        "price": "0.08474",
        "change_24h": "+1.0%",
        "change_4h": "-15.1%",
        "change_8h": "-30.3%"
      },
      {
        "coin": "JTO",
        "score": 55,
        "price": "0.8148",
        "change_24h": "+0.6%",
        "change_4h": "+0.3%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "SOL",
        "score": 50,
        "price": "71.06",
        "change_24h": "+0.5%",
        "change_4h": "+0.0%",
        "change_8h": "+0.1%"
      },
      {
        "coin": "BAS",
        "score": 50,
        "price": "0.048472",
        "change_24h": "-0.2%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
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
