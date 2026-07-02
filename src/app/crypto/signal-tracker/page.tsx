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
        "coin": "DEEP",
        "score": 100,
        "price": "0.01775",
        "change_24h": "+10.7%",
        "change_4h": "+0.6%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "SXT",
        "score": 100,
        "price": "0.007197",
        "change_24h": "+9.5%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "RAYSOL",
        "score": 100,
        "price": "0.6986",
        "change_24h": "+7.7%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "NOM",
        "score": 100,
        "price": "0.001758",
        "change_24h": "+7.3%",
        "change_4h": "-4.8%",
        "change_8h": "-9.6%"
      },
      {
        "coin": "PUMPBTC",
        "score": 100,
        "price": "0.00947",
        "change_24h": "+7.0%",
        "change_4h": "-0.2%",
        "change_8h": "-0.3%"
      },
      {
        "coin": "AIN",
        "score": 100,
        "price": "0.0853",
        "change_24h": "+10.8%",
        "change_4h": "+1.6%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "ME",
        "score": 100,
        "price": "0.06481",
        "change_24h": "+8.1%",
        "change_4h": "-0.7%",
        "change_8h": "-1.4%"
      },
      {
        "coin": "ZEC",
        "score": 100,
        "price": "436.72",
        "change_24h": "+5.3%",
        "change_4h": "+0.5%",
        "change_8h": "+0.9%"
      },
      {
        "coin": "H",
        "score": 100,
        "price": "0.0702",
        "change_24h": "+11.9%",
        "change_4h": "+0.6%",
        "change_8h": "+1.1%"
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
        "coin": "PIPPIN",
        "score": 100,
        "price": "0.01831",
        "change_24h": "+5.4%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "SYN",
        "score": 100,
        "price": "0.51872",
        "change_24h": "+8.2%",
        "change_4h": "-0.8%",
        "change_8h": "-1.6%"
      },
      {
        "coin": "ALICE",
        "score": 100,
        "price": "0.1227",
        "change_24h": "+6.1%",
        "change_4h": "+1.2%",
        "change_8h": "+2.5%"
      },
      {
        "coin": "USELESS",
        "score": 100,
        "price": "0.08702",
        "change_24h": "+6.3%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "RE",
        "score": 100,
        "price": "0.6768",
        "change_24h": "+6.0%",
        "change_4h": "+2.7%",
        "change_8h": "+5.5%"
      },
      {
        "coin": "HEMI",
        "score": 100,
        "price": "0.004975",
        "change_24h": "+13.8%",
        "change_4h": "+1.0%",
        "change_8h": "+2.0%"
      },
      {
        "coin": "UNI",
        "score": 100,
        "price": "3.19",
        "change_24h": "+14.1%",
        "change_4h": "+3.2%",
        "change_8h": "+6.3%"
      },
      {
        "coin": "BEAT",
        "score": 100,
        "price": "2.952",
        "change_24h": "+11.4%",
        "change_4h": "+2.4%",
        "change_8h": "+4.8%"
      },
      {
        "coin": "PIXEL",
        "score": 100,
        "price": "0.005069",
        "change_24h": "+8.2%",
        "change_4h": "+0.5%",
        "change_8h": "+1.1%"
      },
      {
        "coin": "DOOD",
        "score": 100,
        "price": "0.001561",
        "change_24h": "+7.9%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "FARTCOIN",
        "score": 100,
        "price": "0.1523",
        "change_24h": "+5.3%",
        "change_4h": "+2.6%",
        "change_8h": "+5.1%"
      },
      {
        "coin": "PENDLE",
        "score": 100,
        "price": "1.5063",
        "change_24h": "+9.1%",
        "change_4h": "+2.2%",
        "change_8h": "+4.4%"
      },
      {
        "coin": "LAB",
        "score": 100,
        "price": "9.499",
        "change_24h": "+6.0%",
        "change_4h": "+1.1%",
        "change_8h": "+2.2%"
      },
      {
        "coin": "SKY",
        "score": 95,
        "price": "0.056",
        "change_24h": "+6.3%",
        "change_4h": "+1.4%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "TRIA",
        "score": 95,
        "price": "0.01983",
        "change_24h": "+5.9%",
        "change_4h": "+1.7%",
        "change_8h": "+3.5%"
      },
      {
        "coin": "VELODROME",
        "score": 95,
        "price": "0.02121",
        "change_24h": "+9.7%",
        "change_4h": "+2.5%",
        "change_8h": "+5.0%"
      },
      {
        "coin": "SONIC",
        "score": 95,
        "price": "0.02629",
        "change_24h": "+6.6%",
        "change_4h": "+0.3%",
        "change_8h": "+0.5%"
      },
      {
        "coin": "RIVN",
        "score": 95,
        "price": "18.77",
        "change_24h": "+6.2%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "KOMA",
        "score": 95,
        "price": "0.007232",
        "change_24h": "+5.2%",
        "change_4h": "+0.3%",
        "change_8h": "+0.6%"
      },
      {
        "coin": "RED",
        "score": 95,
        "price": "0.0963",
        "change_24h": "+5.0%",
        "change_4h": "-2.3%",
        "change_8h": "-4.5%"
      },
      {
        "coin": "RSR",
        "score": 95,
        "price": "0.001148",
        "change_24h": "+5.5%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "GTC",
        "score": 95,
        "price": "0.07626",
        "change_24h": "+10.0%",
        "change_4h": "+0.6%",
        "change_8h": "+1.3%"
      },
      {
        "coin": "AVNT",
        "score": 95,
        "price": "0.0952",
        "change_24h": "+5.3%",
        "change_4h": "+1.0%",
        "change_8h": "+2.1%"
      },
      {
        "coin": "RPL",
        "score": 95,
        "price": "1.627",
        "change_24h": "+12.7%",
        "change_4h": "+3.0%",
        "change_8h": "+6.1%"
      },
      {
        "coin": "LUMIA",
        "score": 95,
        "price": "0.11971",
        "change_24h": "+7.1%",
        "change_4h": "+1.8%",
        "change_8h": "+3.6%"
      },
      {
        "coin": "4",
        "score": 95,
        "price": "0.009696",
        "change_24h": "+9.3%",
        "change_4h": "+1.6%",
        "change_8h": "+3.1%"
      },
      {
        "coin": "ILV",
        "score": 95,
        "price": "3.148",
        "change_24h": "+8.9%",
        "change_4h": "+1.7%",
        "change_8h": "+3.3%"
      },
      {
        "coin": "MINA",
        "score": 90,
        "price": "0.04238",
        "change_24h": "+5.5%",
        "change_4h": "+1.4%",
        "change_8h": "+2.9%"
      },
      {
        "coin": "SQQQ",
        "score": 90,
        "price": "39.88",
        "change_24h": "+7.2%",
        "change_4h": "+1.9%",
        "change_8h": "+3.8%"
      },
      {
        "coin": "RONIN",
        "score": 90,
        "price": "0.0614",
        "change_24h": "+5.4%",
        "change_4h": "+0.4%",
        "change_8h": "+0.8%"
      },
      {
        "coin": "CHR",
        "score": 90,
        "price": "0.01563",
        "change_24h": "+6.0%",
        "change_4h": "+0.8%",
        "change_8h": "+1.6%"
      },
      {
        "coin": "NFLX",
        "score": 90,
        "price": "77.26",
        "change_24h": "+5.5%",
        "change_4h": "+1.3%",
        "change_8h": "+2.7%"
      },
      {
        "coin": "MOCA",
        "score": 90,
        "price": "0.0091",
        "change_24h": "+8.3%",
        "change_4h": "+2.0%",
        "change_8h": "+4.1%"
      },
      {
        "coin": "BNT",
        "score": 90,
        "price": "0.2638",
        "change_24h": "+5.4%",
        "change_4h": "+0.9%",
        "change_8h": "+1.9%"
      },
      {
        "coin": "SLX",
        "score": 85,
        "price": "0.50524",
        "change_24h": "+20.7%",
        "change_4h": "+6.2%",
        "change_8h": "+12.5%"
      },
      {
        "coin": "LIT",
        "score": 85,
        "price": "2.0747",
        "change_24h": "+17.2%",
        "change_4h": "+2.4%",
        "change_8h": "+4.9%"
      },
      {
        "coin": "ALLO",
        "score": 80,
        "price": "0.32654",
        "change_24h": "+27.6%",
        "change_4h": "+8.4%",
        "change_8h": "+16.9%"
      },
      {
        "coin": "BREV",
        "score": 80,
        "price": "0.08958",
        "change_24h": "+25.6%",
        "change_4h": "-0.6%",
        "change_8h": "-1.3%"
      },
      {
        "coin": "AERGO",
        "score": 75,
        "price": "0.02935",
        "change_24h": "+17.3%",
        "change_4h": "-3.9%",
        "change_8h": "-7.9%"
      },
      {
        "coin": "EVAA",
        "score": 75,
        "price": "1.0206",
        "change_24h": "+16.9%",
        "change_4h": "+3.3%",
        "change_8h": "+6.6%"
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
