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
    "label": "今天 · 2026-08-04",
    "data": [
      {
        "coin": "MINIMAX",
        "score": 100,
        "price": "32.18",
        "change_24h": "+8.9%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "SHAZ",
        "score": 100,
        "price": "51.97",
        "change_24h": "+8.1%",
        "change_4h": "+3.6%",
        "change_8h": "+7.3%"
      },
      {
        "coin": "NBIS",
        "score": 100,
        "price": "214.89",
        "change_24h": "+9.3%",
        "change_4h": "+4.0%",
        "change_8h": "+8.0%"
      },
      {
        "coin": "TOWNS",
        "score": 100,
        "price": "0.002176",
        "change_24h": "+9.6%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "RKLB",
        "score": 100,
        "price": "70.64",
        "change_24h": "+7.3%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "CBRS",
        "score": 100,
        "price": "219.36",
        "change_24h": "+9.1%",
        "change_4h": "+3.8%",
        "change_8h": "+7.6%"
      },
      {
        "coin": "COHR",
        "score": 100,
        "price": "289.15",
        "change_24h": "+7.3%",
        "change_4h": "+3.3%",
        "change_8h": "+6.5%"
      },
      {
        "coin": "WAXP",
        "score": 100,
        "price": "0.00394",
        "change_24h": "+6.2%",
        "change_4h": "-2.2%",
        "change_8h": "-4.4%"
      },
      {
        "coin": "IREN",
        "score": 100,
        "price": "39.75",
        "change_24h": "+5.4%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "SNXX",
        "score": 100,
        "price": "10.54",
        "change_24h": "+7.0%",
        "change_4h": "+5.2%",
        "change_8h": "+10.4%"
      },
      {
        "coin": "LITE",
        "score": 100,
        "price": "780.52",
        "change_24h": "+7.4%",
        "change_4h": "+3.2%",
        "change_8h": "+6.4%"
      },
      {
        "coin": "SPCX",
        "score": 100,
        "price": "114.7",
        "change_24h": "+5.3%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "ORCL",
        "score": 100,
        "price": "142.17",
        "change_24h": "+7.9%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "ALGO",
        "score": 100,
        "price": "0.09052",
        "change_24h": "+6.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "ATOM",
        "score": 100,
        "price": "1.355",
        "change_24h": "+7.6%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "ROBO",
        "score": 100,
        "price": "0.01278",
        "change_24h": "+12.4%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "VELVET",
        "score": 100,
        "price": "0.4297",
        "change_24h": "+8.2%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "PLTR",
        "score": 100,
        "price": "143.13",
        "change_24h": "+14.7%",
        "change_4h": "+3.3%",
        "change_8h": "+6.5%"
      },
      {
        "coin": "OPN",
        "score": 100,
        "price": "0.05314",
        "change_24h": "+10.1%",
        "change_4h": "+3.4%",
        "change_8h": "+6.8%"
      },
      {
        "coin": "ZEREBRO",
        "score": 100,
        "price": "0.040592",
        "change_24h": "+14.7%",
        "change_4h": "+4.4%",
        "change_8h": "+8.7%"
      },
      {
        "coin": "ZHIPU",
        "score": 100,
        "price": "122.42",
        "change_24h": "+6.9%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "AXTI",
        "score": 100,
        "price": "68.71",
        "change_24h": "+10.4%",
        "change_4h": "+4.7%",
        "change_8h": "+9.4%"
      },
      {
        "coin": "ALLO",
        "score": 100,
        "price": "0.25924",
        "change_24h": "+5.8%",
        "change_4h": "-3.3%",
        "change_8h": "-6.5%"
      },
      {
        "coin": "NIL",
        "score": 100,
        "price": "0.03467",
        "change_24h": "+13.6%",
        "change_4h": "+3.9%",
        "change_8h": "+7.9%"
      },
      {
        "coin": "PTB",
        "score": 100,
        "price": "0.0009602",
        "change_24h": "+8.3%",
        "change_4h": "+0.0%",
        "change_8h": "+0.0%"
      },
      {
        "coin": "UB",
        "score": 100,
        "price": "0.18904",
        "change_24h": "+9.8%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "OPEN",
        "score": 100,
        "price": "0.1883",
        "change_24h": "+5.0%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "GRVT",
        "score": 100,
        "price": "0.2742",
        "change_24h": "+5.4%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "RLC",
        "score": 95,
        "price": "0.2727",
        "change_24h": "+7.2%",
        "change_4h": "+2.3%",
        "change_8h": "+4.6%"
      },
      {
        "coin": "ASTS",
        "score": 95,
        "price": "63.62",
        "change_24h": "+6.4%",
        "change_4h": "+2.8%",
        "change_8h": "+5.6%"
      },
      {
        "coin": "BOT",
        "score": 95,
        "price": "27.83",
        "change_24h": "+5.5%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "HPE",
        "score": 95,
        "price": "51.87",
        "change_24h": "+7.1%",
        "change_4h": "+2.5%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "GENIUS",
        "score": 95,
        "price": "0.3442",
        "change_24h": "+6.2%",
        "change_4h": "-0.2%",
        "change_8h": "-0.3%"
      },
      {
        "coin": "AGT",
        "score": 95,
        "price": "0.014907",
        "change_24h": "+8.0%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "FIGHT",
        "score": 95,
        "price": "0.003495",
        "change_24h": "+7.6%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "HIMS",
        "score": 95,
        "price": "30.96",
        "change_24h": "+10.2%",
        "change_4h": "+2.6%",
        "change_8h": "+5.2%"
      },
      {
        "coin": "FLUID",
        "score": 95,
        "price": "1.3",
        "change_24h": "+11.0%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "C",
        "score": 95,
        "price": "0.05568",
        "change_24h": "+6.8%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "FLNC",
        "score": 95,
        "price": "15.09",
        "change_24h": "+6.3%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "MYX",
        "score": 95,
        "price": "0.08038",
        "change_24h": "+6.7%",
        "change_4h": "+2.0%",
        "change_8h": "+4.0%"
      },
      {
        "coin": "C98",
        "score": 95,
        "price": "0.01244",
        "change_24h": "+5.9%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "QNTX",
        "score": 95,
        "price": "55.9",
        "change_24h": "+7.8%",
        "change_4h": "+2.4%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "SCRT",
        "score": 90,
        "price": "0.03271",
        "change_24h": "+5.8%",
        "change_4h": "-0.3%",
        "change_8h": "-0.5%"
      },
      {
        "coin": "AVAAI",
        "score": 90,
        "price": "0.008495",
        "change_24h": "+6.1%",
        "change_4h": "+2.2%",
        "change_8h": "+4.5%"
      },
      {
        "coin": "SXT",
        "score": 90,
        "price": "0.007192",
        "change_24h": "+5.3%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "HEI",
        "score": 90,
        "price": "0.08667",
        "change_24h": "+5.5%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "HUMA",
        "score": 90,
        "price": "0.019965",
        "change_24h": "+7.4%",
        "change_4h": "+1.9%",
        "change_8h": "+3.9%"
      },
      {
        "coin": "CATI",
        "score": 90,
        "price": "0.03791",
        "change_24h": "+5.2%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "FRAX",
        "score": 90,
        "price": "0.2709",
        "change_24h": "+5.7%",
        "change_4h": "+0.8%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "PUMPBTC",
        "score": 90,
        "price": "0.0103",
        "change_24h": "+5.2%",
        "change_4h": "-0.5%",
        "change_8h": "-1.0%"
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
