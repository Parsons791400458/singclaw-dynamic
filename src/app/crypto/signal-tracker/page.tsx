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
        "coin": "PIPPIN",
        "score": 100,
        "price": "0.01828",
        "change_24h": "+5.1%",
        "change_4h": "+2.1%",
        "change_8h": "+4.2%"
      },
      {
        "coin": "DOOD",
        "score": 100,
        "price": "0.00156",
        "change_24h": "+7.5%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "NOM",
        "score": 100,
        "price": "0.001744",
        "change_24h": "+5.7%",
        "change_4h": "-5.2%",
        "change_8h": "-10.4%"
      },
      {
        "coin": "DEEP",
        "score": 100,
        "price": "0.01782",
        "change_24h": "+11.0%",
        "change_4h": "+0.8%",
        "change_8h": "+1.5%"
      },
      {
        "coin": "SYN",
        "score": 100,
        "price": "0.52701",
        "change_24h": "+10.3%",
        "change_4h": "-0.0%",
        "change_8h": "-0.1%"
      },
      {
        "coin": "HEMI",
        "score": 100,
        "price": "0.004983",
        "change_24h": "+13.7%",
        "change_4h": "+1.1%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "LAB",
        "score": 100,
        "price": "9.86",
        "change_24h": "+9.6%",
        "change_4h": "+3.0%",
        "change_8h": "+6.1%"
      },
      {
        "coin": "USELESS",
        "score": 100,
        "price": "0.08706",
        "change_24h": "+6.0%",
        "change_4h": "+2.1%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "H",
        "score": 100,
        "price": "0.06976",
        "change_24h": "+10.1%",
        "change_4h": "+0.2%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "BEAT",
        "score": 100,
        "price": "2.965",
        "change_24h": "+6.9%",
        "change_4h": "+2.6%",
        "change_8h": "+5.2%"
      },
      {
        "coin": "FARTCOIN",
        "score": 100,
        "price": "0.1526",
        "change_24h": "+5.4%",
        "change_4h": "+2.7%",
        "change_8h": "+5.3%"
      },
      {
        "coin": "RE",
        "score": 100,
        "price": "0.681",
        "change_24h": "+7.5%",
        "change_4h": "+3.1%",
        "change_8h": "+6.1%"
      },
      {
        "coin": "GPS",
        "score": 100,
        "price": "0.010367",
        "change_24h": "+14.9%",
        "change_4h": "+3.3%",
        "change_8h": "+6.6%"
      },
      {
        "coin": "RAYSOL",
        "score": 100,
        "price": "0.698",
        "change_24h": "+7.5%",
        "change_4h": "+0.2%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "PIXEL",
        "score": 100,
        "price": "0.005055",
        "change_24h": "+7.8%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "PUMPBTC",
        "score": 100,
        "price": "0.00949",
        "change_24h": "+7.4%",
        "change_4h": "-0.1%",
        "change_8h": "-0.1%"
      },
      {
        "coin": "UNI",
        "score": 100,
        "price": "3.183",
        "change_24h": "+13.7%",
        "change_4h": "+3.0%",
        "change_8h": "+6.1%"
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
        "coin": "ALICE",
        "score": 100,
        "price": "0.1229",
        "change_24h": "+6.1%",
        "change_4h": "+1.3%",
        "change_8h": "+2.6%"
      },
      {
        "coin": "AIN",
        "score": 100,
        "price": "0.08457",
        "change_24h": "+10.1%",
        "change_4h": "+1.2%",
        "change_8h": "+2.4%"
      },
      {
        "coin": "ME",
        "score": 100,
        "price": "0.06487",
        "change_24h": "+8.2%",
        "change_4h": "-0.7%",
        "change_8h": "-1.3%"
      },
      {
        "coin": "PENDLE",
        "score": 100,
        "price": "1.5071",
        "change_24h": "+9.2%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "RPL",
        "score": 95,
        "price": "1.623",
        "change_24h": "+12.3%",
        "change_4h": "+2.9%",
        "change_8h": "+5.8%"
      },
      {
        "coin": "RSR",
        "score": 95,
        "price": "0.001148",
        "change_24h": "+5.2%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "RIVN",
        "score": 95,
        "price": "18.81",
        "change_24h": "+6.8%",
        "change_4h": "+1.1%",
        "change_8h": "+2.3%"
      },
      {
        "coin": "VELODROME",
        "score": 95,
        "price": "0.02117",
        "change_24h": "+9.3%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "GTC",
        "score": 95,
        "price": "0.07621",
        "change_24h": "+9.8%",
        "change_4h": "+0.6%",
        "change_8h": "+1.2%"
      },
      {
        "coin": "SXT",
        "score": 95,
        "price": "0.007133",
        "change_24h": "+8.3%",
        "change_4h": "-0.0%",
        "change_8h": "-0.1%"
      },
      {
        "coin": "SONIC",
        "score": 95,
        "price": "0.02625",
        "change_24h": "+6.4%",
        "change_4h": "+0.2%",
        "change_8h": "+0.4%"
      },
      {
        "coin": "SKY",
        "score": 95,
        "price": "0.05602",
        "change_24h": "+6.3%",
        "change_4h": "+1.4%",
        "change_8h": "+2.8%"
      },
      {
        "coin": "KOMA",
        "score": 95,
        "price": "0.00725",
        "change_24h": "+5.2%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "AVNT",
        "score": 95,
        "price": "0.0951",
        "change_24h": "+5.2%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "LUMIA",
        "score": 95,
        "price": "0.11996",
        "change_24h": "+7.4%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "4",
        "score": 95,
        "price": "0.00967",
        "change_24h": "+9.0%",
        "change_4h": "+1.5%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "ILV",
        "score": 95,
        "price": "3.13",
        "change_24h": "+8.1%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "MOCA",
        "score": 90,
        "price": "0.00905",
        "change_24h": "+7.7%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "NFLX",
        "score": 90,
        "price": "77.1",
        "change_24h": "+5.2%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "BNT",
        "score": 90,
        "price": "0.2634",
        "change_24h": "+5.2%",
        "change_4h": "+0.8%",
        "change_8h": "+1.7%"
      },
      {
        "coin": "MINA",
        "score": 90,
        "price": "0.04232",
        "change_24h": "+5.2%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "SQQQ",
        "score": 90,
        "price": "39.76",
        "change_24h": "+6.6%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "RONIN",
        "score": 90,
        "price": "0.06166",
        "change_24h": "+6.0%",
        "change_4h": "+0.7%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "CHR",
        "score": 90,
        "price": "0.01564",
        "change_24h": "+6.1%",
        "change_4h": "+0.9%",
        "change_8h": "+1.8%"
      },
      {
        "coin": "SLX",
        "score": 85,
        "price": "0.50587",
        "change_24h": "+21.1%",
        "change_4h": "+6.3%",
        "change_8h": "+12.6%"
      },
      {
        "coin": "LIT",
        "score": 85,
        "price": "2.0796",
        "change_24h": "+16.3%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "ALLO",
        "score": 80,
        "price": "0.32337",
        "change_24h": "+26.1%",
        "change_4h": "+7.9%",
        "change_8h": "+15.7%"
      },
      {
        "coin": "BREV",
        "score": 80,
        "price": "0.08938",
        "change_24h": "+25.6%",
        "change_4h": "-0.8%",
        "change_8h": "-1.5%"
      },
      {
        "coin": "EVAA",
        "score": 75,
        "price": "1.0229",
        "change_24h": "+16.5%",
        "change_4h": "+3.4%",
        "change_8h": "+6.8%"
      },
      {
        "coin": "AERGO",
        "score": 75,
        "price": "0.02913",
        "change_24h": "+17.0%",
        "change_4h": "-4.3%",
        "change_8h": "-8.6%"
      },
      {
        "coin": "B",
        "score": 70,
        "price": "0.2608",
        "change_24h": "+21.8%",
        "change_4h": "+4.5%",
        "change_8h": "+9.0%"
      },
      {
        "coin": "M",
        "score": 70,
        "price": "1.76",
        "change_24h": "+38.1%",
        "change_4h": "+13.3%",
        "change_8h": "+26.5%"
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
