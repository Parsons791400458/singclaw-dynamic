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
    "label": "今天 · 2026-07-07",
    "data": [
      {
        "coin": "TAC",
        "score": 100,
        "price": "0.033077",
        "change_24h": "+5.7%",
        "change_4h": "+2.8%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "JTO",
        "score": 100,
        "price": "0.783",
        "change_24h": "+7.6%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "USELESS",
        "score": 100,
        "price": "0.09788",
        "change_24h": "+6.3%",
        "change_4h": "+1.7%",
        "change_8h": "+3.4%"
      },
      {
        "coin": "QNTX",
        "score": 100,
        "price": "83.25",
        "change_24h": "+9.4%",
        "change_4h": "+2.1%",
        "change_8h": "+4.3%"
      },
      {
        "coin": "G",
        "score": 100,
        "price": "0.003591",
        "change_24h": "+6.3%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "ZRO",
        "score": 100,
        "price": "1.0118",
        "change_24h": "+8.1%",
        "change_4h": "+0.9%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "MOVR",
        "score": 100,
        "price": "1.525",
        "change_24h": "+6.5%",
        "change_4h": "+2.7%",
        "change_8h": "+5.4%"
      },
      {
        "coin": "PYTH",
        "score": 100,
        "price": "0.04483",
        "change_24h": "+11.0%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "ORDI",
        "score": 100,
        "price": "3.481",
        "change_24h": "+6.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "EPIC",
        "score": 100,
        "price": "0.4537",
        "change_24h": "+12.8%",
        "change_4h": "+8.6%",
        "change_8h": "+17.1%"
      },
      {
        "coin": "FOLKS",
        "score": 100,
        "price": "2.057",
        "change_24h": "+9.5%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "BEL",
        "score": 100,
        "price": "0.1227",
        "change_24h": "+14.5%",
        "change_4h": "-1.1%",
        "change_8h": "-2.1%"
      },
      {
        "coin": "SOMI",
        "score": 100,
        "price": "0.1137",
        "change_24h": "+7.7%",
        "change_4h": "+1.5%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "STG",
        "score": 100,
        "price": "0.1741",
        "change_24h": "+14.1%",
        "change_4h": "+1.5%",
        "change_8h": "+3.0%"
      },
      {
        "coin": "US",
        "score": 100,
        "price": "0.01904",
        "change_24h": "+12.3%",
        "change_4h": "-3.8%",
        "change_8h": "-7.5%"
      },
      {
        "coin": "DEXE",
        "score": 100,
        "price": "27.63",
        "change_24h": "+13.1%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "ID",
        "score": 100,
        "price": "0.04034",
        "change_24h": "+7.7%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "ACU",
        "score": 95,
        "price": "0.08206",
        "change_24h": "+6.6%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "NMR",
        "score": 95,
        "price": "10.08",
        "change_24h": "+5.3%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "SYRUP",
        "score": 95,
        "price": "0.17581",
        "change_24h": "+5.5%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "CVX",
        "score": 95,
        "price": "1.296",
        "change_24h": "+7.0%",
        "change_4h": "+1.8%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "DEEP",
        "score": 95,
        "price": "0.01925",
        "change_24h": "+7.8%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "PRL",
        "score": 95,
        "price": "0.1887",
        "change_24h": "+11.4%",
        "change_4h": "+2.6%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "CELO",
        "score": 95,
        "price": "0.07146",
        "change_24h": "+5.9%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "BLUAI",
        "score": 95,
        "price": "0.015025",
        "change_24h": "+5.3%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "ZEREBRO",
        "score": 95,
        "price": "0.039441",
        "change_24h": "+5.0%",
        "change_4h": "-0.1%",
        "change_8h": "-0.2%"
      },
      {
        "coin": "IREN",
        "score": 95,
        "price": "43.64",
        "change_24h": "+8.1%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "COLLECT",
        "score": 95,
        "price": "0.04288",
        "change_24h": "+9.5%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "SKR",
        "score": 95,
        "price": "0.009661",
        "change_24h": "+7.0%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "ENSO",
        "score": 90,
        "price": "0.6976",
        "change_24h": "+5.8%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "HMSTR",
        "score": 85,
        "price": "0.000364",
        "change_24h": "+16.3%",
        "change_4h": "+4.7%",
        "change_8h": "+9.4%"
      },
      {
        "coin": "ALLO",
        "score": 80,
        "price": "0.42338",
        "change_24h": "+17.4%",
        "change_4h": "+5.3%",
        "change_8h": "+10.7%"
      },
      {
        "coin": "RIF",
        "score": 75,
        "price": "0.13074",
        "change_24h": "+24.4%",
        "change_4h": "+5.7%",
        "change_8h": "+11.3%"
      },
      {
        "coin": "EVAA",
        "score": 70,
        "price": "1.0376",
        "change_24h": "+22.5%",
        "change_4h": "+5.2%",
        "change_8h": "+10.4%"
      },
      {
        "coin": "YFI",
        "score": 70,
        "price": "2591.0",
        "change_24h": "+31.3%",
        "change_4h": "+4.9%",
        "change_8h": "+9.8%"
      },
      {
        "coin": "BLUR",
        "score": 70,
        "price": "0.01988",
        "change_24h": "+31.7%",
        "change_4h": "+4.2%",
        "change_8h": "+8.4%"
      },
      {
        "coin": "VANRY",
        "score": 70,
        "price": "0.007992",
        "change_24h": "+47.4%",
        "change_4h": "+4.2%",
        "change_8h": "+8.4%"
      },
      {
        "coin": "MON",
        "score": 70,
        "price": "0.02481",
        "change_24h": "+15.3%",
        "change_4h": "+3.1%",
        "change_8h": "+6.3%"
      },
      {
        "coin": "TRIA",
        "score": 65,
        "price": "0.03275",
        "change_24h": "+32.7%",
        "change_4h": "+8.6%",
        "change_8h": "+17.2%"
      },
      {
        "coin": "EDGE",
        "score": 60,
        "price": "0.3139",
        "change_24h": "+30.7%",
        "change_4h": "+4.3%",
        "change_8h": "+8.5%"
      },
      {
        "coin": "CRCL",
        "score": 60,
        "price": "67.92",
        "change_24h": "+0.7%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "LIT",
        "score": 60,
        "price": "2.5921",
        "change_24h": "+0.9%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "AAVE",
        "score": 60,
        "price": "92.79",
        "change_24h": "+4.4%",
        "change_4h": "+0.1%",
        "change_8h": "+0.2%"
      },
      {
        "coin": "NEAR",
        "score": 55,
        "price": "2.049",
        "change_24h": "+1.7%",
        "change_4h": "+0.5%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "SOL",
        "score": 55,
        "price": "81.89",
        "change_24h": "+0.1%",
        "change_4h": "+0.3%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "XPL",
        "score": 55,
        "price": "0.10944",
        "change_24h": "+3.4%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "BTC",
        "score": 55,
        "price": "63922.4",
        "change_24h": "+0.4%",
        "change_4h": "+0.7%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "ETH",
        "score": 55,
        "price": "1790.57",
        "change_24h": "+0.1%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "1000BONK",
        "score": 50,
        "price": "0.004445",
        "change_24h": "-9.1%",
        "change_4h": "-0.5%",
        "change_8h": "-1.0%"
      },
      {
        "coin": "RE",
        "score": 50,
        "price": "0.6465",
        "change_24h": "+2.4%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
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
