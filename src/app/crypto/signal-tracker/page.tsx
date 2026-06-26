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
        "coin": "ESP",
        "score": 100,
        "price": "0.06636",
        "change_24h": "+9.2%",
        "change_4h": "+3.6%",
        "change_8h": "+7.2%"
      },
      {
        "coin": "BABY",
        "score": 100,
        "price": "0.01379",
        "change_24h": "+8.9%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "COLLECT",
        "score": 100,
        "price": "0.04534",
        "change_24h": "+6.9%",
        "change_4h": "+4.4%",
        "change_8h": "+8.7%"
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
        "coin": "LAB",
        "score": 100,
        "price": "18.137",
        "change_24h": "+7.0%",
        "change_4h": "-0.2%",
        "change_8h": "-0.4%"
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
        "coin": "BBX",
        "score": 100,
        "price": "10.2",
        "change_24h": "+11.0%",
        "change_4h": "+1.6%",
        "change_8h": "+3.2%"
      },
      {
        "coin": "M",
        "score": 100,
        "price": "0.8573",
        "change_24h": "+7.2%",
        "change_4h": "-0.1%",
        "change_8h": "-0.2%"
      },
      {
        "coin": "APE",
        "score": 100,
        "price": "0.1529",
        "change_24h": "+12.6%",
        "change_4h": "+4.4%",
        "change_8h": "+8.8%"
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
        "coin": "XPL",
        "score": 100,
        "price": "0.10423",
        "change_24h": "+13.1%",
        "change_4h": "+3.4%",
        "change_8h": "+6.8%"
      },
      {
        "coin": "INJ",
        "score": 100,
        "price": "4.529",
        "change_24h": "+7.0%",
        "change_4h": "+2.6%",
        "change_8h": "+5.2%"
      },
      {
        "coin": "ZBT",
        "score": 100,
        "price": "0.11168",
        "change_24h": "+6.0%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "SOON",
        "score": 100,
        "price": "0.1759",
        "change_24h": "+7.8%",
        "change_4h": "+3.1%",
        "change_8h": "+6.3%"
      },
      {
        "coin": "KAITO",
        "score": 100,
        "price": "0.5017",
        "change_24h": "+10.1%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "EDEN",
        "score": 100,
        "price": "0.04894",
        "change_24h": "+6.7%",
        "change_4h": "+2.4%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "CARV",
        "score": 100,
        "price": "0.03904",
        "change_24h": "+13.8%",
        "change_4h": "+2.3%",
        "change_8h": "+4.7%"
      },
      {
        "coin": "ARX",
        "score": 100,
        "price": "0.2784",
        "change_24h": "+12.1%",
        "change_4h": "+3.3%",
        "change_8h": "+6.7%"
      },
      {
        "coin": "UB",
        "score": 100,
        "price": "0.0744",
        "change_24h": "+12.0%",
        "change_4h": "+4.1%",
        "change_8h": "+8.1%"
      },
      {
        "coin": "IN",
        "score": 100,
        "price": "0.0941",
        "change_24h": "+6.9%",
        "change_4h": "+3.5%",
        "change_8h": "+7.0%"
      },
      {
        "coin": "IP",
        "score": 100,
        "price": "0.3383",
        "change_24h": "+5.9%",
        "change_4h": "-2.7%",
        "change_8h": "-5.5%"
      },
      {
        "coin": "AWE",
        "score": 100,
        "price": "0.07101",
        "change_24h": "+12.5%",
        "change_4h": "+3.0%",
        "change_8h": "+6.0%"
      },
      {
        "coin": "FOLKS",
        "score": 100,
        "price": "2.436",
        "change_24h": "+11.0%",
        "change_4h": "+1.8%",
        "change_8h": "+3.7%"
      },
      {
        "coin": "SKYAI",
        "score": 100,
        "price": "0.33105",
        "change_24h": "+11.9%",
        "change_4h": "+5.0%",
        "change_8h": "+10.0%"
      },
      {
        "coin": "VELVET",
        "score": 100,
        "price": "0.4967",
        "change_24h": "+5.5%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "BLUAI",
        "score": 95,
        "price": "0.015013",
        "change_24h": "+6.5%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
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
        "coin": "CGPT",
        "score": 95,
        "price": "0.01909",
        "change_24h": "+5.0%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "NAORIS",
        "score": 95,
        "price": "0.0368",
        "change_24h": "+7.8%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "JELLYJELLY",
        "score": 95,
        "price": "0.06003",
        "change_24h": "+5.9%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
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
        "coin": "ARIA",
        "score": 95,
        "price": "0.02593",
        "change_24h": "+5.6%",
        "change_4h": "+3.4%",
        "change_8h": "+6.8%"
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
        "coin": "KGEN",
        "score": 95,
        "price": "0.1821",
        "change_24h": "+5.9%",
        "change_4h": "+0.7%",
        "change_8h": "+1.4%"
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
        "coin": "GRIFFAIN",
        "score": 95,
        "price": "0.008701",
        "change_24h": "+6.5%",
        "change_4h": "+3.5%",
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
        "price": "0.42551",
        "change_24h": "+20.5%",
        "change_4h": "+7.5%",
        "change_8h": "+15.0%"
      },
      {
        "coin": "TNSR",
        "score": 85,
        "price": "0.04085",
        "change_24h": "+18.8%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "H",
        "score": 80,
        "price": "0.06395",
        "change_24h": "+20.7%",
        "change_4h": "+2.2%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "IDOL",
        "score": 80,
        "price": "0.02596",
        "change_24h": "+18.1%",
        "change_4h": "+4.6%",
        "change_8h": "+9.3%"
      },
      {
        "coin": "JTO",
        "score": 80,
        "price": "0.7691",
        "change_24h": "+15.7%",
        "change_4h": "+4.3%",
        "change_8h": "+8.7%"
      },
      {
        "coin": "TAC",
        "score": 70,
        "price": "0.025399",
        "change_24h": "+20.8%",
        "change_4h": "+4.1%",
        "change_8h": "+8.2%"
      },
      {
        "coin": "BULLA",
        "score": 70,
        "price": "0.00636",
        "change_24h": "+19.8%",
        "change_4h": "+5.2%",
        "change_8h": "+10.4%"
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
        "coin": "BEAT",
        "score": 70,
        "price": "2.364",
        "change_24h": "+34.4%",
        "change_4h": "+5.8%",
        "change_8h": "+11.5%"
      },
      {
        "coin": "HEI",
        "score": 70,
        "price": "0.16714",
        "change_24h": "+35.0%",
        "change_4h": "+4.2%",
        "change_8h": "+8.5%"
      },
      {
        "coin": "G",
        "score": 65,
        "price": "0.00431",
        "change_24h": "+43.4%",
        "change_4h": "+8.4%",
        "change_8h": "+16.8%"
      },
      {
        "coin": "AIN",
        "score": 65,
        "price": "0.10584",
        "change_24h": "+41.5%",
        "change_4h": "+5.6%",
        "change_8h": "+11.2%"
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
