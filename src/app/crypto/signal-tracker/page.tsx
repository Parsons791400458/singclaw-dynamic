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
    "label": "今天 · 2026-04-30",
    "data": [
      {
            "coin": "1000LUNC",
            "score": 100,
            "price": "0.06955",
            "change_24h": "+8.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZBT",
            "score": 100,
            "price": "0.18034",
            "change_24h": "+5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JST",
            "score": 100,
            "price": "0.08682",
            "change_24h": "+4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PLAY",
            "score": 100,
            "price": "0.09933",
            "change_24h": "+4.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STO",
            "score": 100,
            "price": "0.09308",
            "change_24h": "+4.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOGE",
            "score": 100,
            "price": "0.10605",
            "change_24h": "+3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANANAS31",
            "score": 100,
            "price": "0.009719",
            "change_24h": "+3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RIVER",
            "score": 100,
            "price": "6.4390",
            "change_24h": "+3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HYPER",
            "score": 100,
            "price": "0.12284",
            "change_24h": "+3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIGHT",
            "score": 100,
            "price": "0.004390",
            "change_24h": "+2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LIT",
            "score": 100,
            "price": "0.93300",
            "change_24h": "+2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DUSK",
            "score": 100,
            "price": "0.12622",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RIF",
            "score": 100,
            "price": "0.05387",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KITE",
            "score": 100,
            "price": "0.14803",
            "change_24h": "+2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOODENG",
            "score": 100,
            "price": "0.05950",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CATI",
            "score": 100,
            "price": "0.04971",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PARTI",
            "score": 100,
            "price": "0.04096",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GUN",
            "score": 100,
            "price": "0.01471",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANK",
            "score": 100,
            "price": "0.03438",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "D",
            "score": 100,
            "price": "0.01252",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000SHIB",
            "score": 100,
            "price": "0.006235",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POL",
            "score": 100,
            "price": "0.09365",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WIF",
            "score": 100,
            "price": "0.18070",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASTER",
            "score": 100,
            "price": "0.65780",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RARE",
            "score": 100,
            "price": "0.01740",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SIREN",
            "score": 100,
            "price": "0.69400",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TON",
            "score": 100,
            "price": "1.3069",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1MBABYDOGE",
            "score": 100,
            "price": "0.000412",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALT",
            "score": 100,
            "price": "0.007576",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APT",
            "score": 100,
            "price": "0.99910",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIA",
            "score": 100,
            "price": "0.05079",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RAYSOL",
            "score": 100,
            "price": "0.77550",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LTC",
            "score": 100,
            "price": "55.2900",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000FLOKI",
            "score": 100,
            "price": "0.03202",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EPIC",
            "score": 100,
            "price": "0.31550",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANTA",
            "score": 100,
            "price": "0.06672",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000PEPE",
            "score": 100,
            "price": "0.003855",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ADA",
            "score": 100,
            "price": "0.24540",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LAB",
            "score": 100,
            "price": "0.66580",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARB",
            "score": 100,
            "price": "0.12540",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CRV",
            "score": 100,
            "price": "0.22970",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAPIEN",
            "score": 100,
            "price": "0.08859",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AKT",
            "score": 100,
            "price": "0.49870",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FET",
            "score": 100,
            "price": "0.19600",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "0G",
            "score": 100,
            "price": "0.54910",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPK",
            "score": 100,
            "price": "0.03621",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BNB",
            "score": 100,
            "price": "616.1200",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTC",
            "score": 100,
            "price": "75722.70",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XRP",
            "score": 100,
            "price": "1.3686",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHIP",
            "score": 100,
            "price": "0.06674",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETC",
            "score": 100,
            "price": "8.3100",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORCA",
            "score": 100,
            "price": "1.5780",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONDO",
            "score": 100,
            "price": "0.26120",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLUR",
            "score": 100,
            "price": "0.02702",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XLM",
            "score": 100,
            "price": "0.15984",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HBAR",
            "score": 100,
            "price": "0.08801",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BCH",
            "score": 100,
            "price": "443.4700",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENS",
            "score": 100,
            "price": "5.9890",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SNX",
            "score": 100,
            "price": "0.31030",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIL",
            "score": 100,
            "price": "0.91800",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOL",
            "score": 100,
            "price": "82.8500",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRIA",
            "score": 100,
            "price": "0.03536",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000BONK",
            "score": 100,
            "price": "0.006151",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVAX",
            "score": 100,
            "price": "9.0950",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MYX",
            "score": 100,
            "price": "0.26240",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MORPHO",
            "score": 100,
            "price": "1.9462",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "G",
            "score": 100,
            "price": "0.003570",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICP",
            "score": 100,
            "price": "2.3790",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZRO",
            "score": 100,
            "price": "1.4478",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WLD",
            "score": 100,
            "price": "0.24540",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LUNA2",
            "score": 100,
            "price": "0.06261",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HYPE",
            "score": 100,
            "price": "39.5700",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IP",
            "score": 100,
            "price": "0.49160",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BARD",
            "score": 100,
            "price": "0.27700",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORDI",
            "score": 100,
            "price": "4.3500",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AR",
            "score": 100,
            "price": "1.8490",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LINK",
            "score": 100,
            "price": "9.0760",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VET",
            "score": 100,
            "price": "0.006994",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VIRTUAL",
            "score": 100,
            "price": "0.68750",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANA",
            "score": 100,
            "price": "0.08970",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOVR",
            "score": 100,
            "price": "2.3230",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEME",
            "score": 100,
            "price": "0.000565",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRB",
            "score": 100,
            "price": "18.4370",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DYM",
            "score": 100,
            "price": "0.01846",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUI",
            "score": 100,
            "price": "0.90350",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEAR",
            "score": 100,
            "price": "1.3230",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AXL",
            "score": 100,
            "price": "0.05924",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DASH",
            "score": 100,
            "price": "34.1900",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POWER",
            "score": 100,
            "price": "0.08843",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAI",
            "score": 100,
            "price": "0.01054",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STRK",
            "score": 100,
            "price": "0.03861",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TURBO",
            "score": 100,
            "price": "0.001140",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OP",
            "score": 100,
            "price": "0.12000",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAHARA",
            "score": 100,
            "price": "0.02213",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VVV",
            "score": 100,
            "price": "8.6530",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BOME",
            "score": 100,
            "price": "0.000504",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENJ",
            "score": 100,
            "price": "0.05612",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEN",
            "score": 100,
            "price": "5.7290",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LINEA",
            "score": 100,
            "price": "0.003489",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XVS",
            "score": 100,
            "price": "2.5180",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PYTH",
            "score": 100,
            "price": "0.04651",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TIA",
            "score": 100,
            "price": "0.35710",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOT",
            "score": 100,
            "price": "1.2000",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PLUME",
            "score": 100,
            "price": "0.01198",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BERA",
            "score": 100,
            "price": "0.36130",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOON",
            "score": 100,
            "price": "0.16360",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JELLYJELLY",
            "score": 100,
            "price": "0.05171",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CAKE",
            "score": 100,
            "price": "1.4614",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETH",
            "score": 100,
            "price": "2245.08",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MASK",
            "score": 100,
            "price": "0.50190",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEIRO",
            "score": 100,
            "price": "0.000088",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SEI",
            "score": 100,
            "price": "0.05737",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UNI",
            "score": 100,
            "price": "3.1720",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AEVO",
            "score": 100,
            "price": "0.02699",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FARTCOIN",
            "score": 100,
            "price": "0.19950",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PENGU",
            "score": 100,
            "price": "0.009618",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NOT",
            "score": 100,
            "price": "0.000383",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JASMY",
            "score": 100,
            "price": "0.005696",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIEVERSE",
            "score": 100,
            "price": "0.72160",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JUP",
            "score": 100,
            "price": "0.18090",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPX",
            "score": 100,
            "price": "0.36260",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUMP",
            "score": 100,
            "price": "2.3840",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIXEL",
            "score": 100,
            "price": "0.008068",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PNUT",
            "score": 100,
            "price": "0.05284",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVNT",
            "score": 100,
            "price": "0.14790",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "W",
            "score": 100,
            "price": "0.01246",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "我踏马来了",
            "score": 100,
            "price": "0.009697",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CFX",
            "score": 100,
            "price": "0.05819",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GALA",
            "score": 100,
            "price": "0.003217",
            "change_24h": "-4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRT",
            "score": 100,
            "price": "0.02415",
            "change_24h": "-4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EIGEN",
            "score": 100,
            "price": "0.18090",
            "change_24h": "-4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BROCCOLI714",
            "score": 100,
            "price": "0.01764",
            "change_24h": "-4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZK",
            "score": 100,
            "price": "0.01512",
            "change_24h": "-4.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAO",
            "score": 100,
            "price": "250.1700",
            "change_24h": "-4.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETHFI",
            "score": 100,
            "price": "0.40790",
            "change_24h": "-4.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AERO",
            "score": 100,
            "price": "0.45800",
            "change_24h": "-4.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENA",
            "score": 100,
            "price": "0.10316",
            "change_24h": "-4.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AAVE",
            "score": 100,
            "price": "92.2400",
            "change_24h": "-5.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIXBT",
            "score": 97,
            "price": "0.02972",
            "change_24h": "+3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BB",
            "score": 97,
            "price": "0.02945",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RED",
            "score": 97,
            "price": "0.13350",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CGPT",
            "score": 95,
            "price": "0.02866",
            "change_24h": "+12.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEGA",
            "score": 95,
            "price": "0.19122",
            "change_24h": "+10.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIO",
            "score": 95,
            "price": "0.11269",
            "change_24h": "+8.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AKE",
            "score": 95,
            "price": "0.000326",
            "change_24h": "+4.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GPS",
            "score": 95,
            "price": "0.007830",
            "change_24h": "+3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CYS",
            "score": 95,
            "price": "0.51060",
            "change_24h": "+3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUTH",
            "score": 95,
            "price": "0.009732",
            "change_24h": "+3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAN",
            "score": 95,
            "price": "0.07384",
            "change_24h": "+2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "H",
            "score": 95,
            "price": "0.17762",
            "change_24h": "+2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HMSTR",
            "score": 95,
            "price": "0.000157",
            "change_24h": "+1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STG",
            "score": 95,
            "price": "0.22250",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STBL",
            "score": 95,
            "price": "0.03343",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USTC",
            "score": 95,
            "price": "0.005918",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHILLGUY",
            "score": 95,
            "price": "0.01130",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FORM",
            "score": 95,
            "price": "0.24360",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SHELL",
            "score": 95,
            "price": "0.03448",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOLO",
            "score": 95,
            "price": "0.06250",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PHA",
            "score": 95,
            "price": "0.03138",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "REZ",
            "score": 95,
            "price": "0.004228",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TST",
            "score": 95,
            "price": "0.01080",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CELR",
            "score": 95,
            "price": "0.002852",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VANRY",
            "score": 95,
            "price": "0.005166",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ID",
            "score": 95,
            "price": "0.03053",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MTL",
            "score": 95,
            "price": "0.29370",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIPPIN",
            "score": 95,
            "price": "0.02533",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TOWNS",
            "score": 95,
            "price": "0.003181",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000CHEEMS",
            "score": 95,
            "price": "0.000593",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CVX",
            "score": 95,
            "price": "1.7010",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GLM",
            "score": 95,
            "price": "0.13656",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PEOPLE",
            "score": 95,
            "price": "0.007500",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COOKIE",
            "score": 95,
            "price": "0.01612",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KERNEL",
            "score": 95,
            "price": "0.06392",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TUT",
            "score": 95,
            "price": "0.01076",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOPH",
            "score": 95,
            "price": "0.008522",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZORA",
            "score": 95,
            "price": "0.01263",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PORTAL",
            "score": 95,
            "price": "0.01138",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALPINE",
            "score": 95,
            "price": "0.44250",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COW",
            "score": 95,
            "price": "0.18520",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATH",
            "score": 95,
            "price": "0.005800",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VELODROME",
            "score": 95,
            "price": "0.01775",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MITO",
            "score": 95,
            "price": "0.04591",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIGTIME",
            "score": 95,
            "price": "0.01312",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALGO",
            "score": 95,
            "price": "0.11070",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TNSR",
            "score": 95,
            "price": "0.03978",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BRETT",
            "score": 95,
            "price": "0.007105",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HAEDAL",
            "score": 95,
            "price": "0.03098",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAGA",
            "score": 95,
            "price": "0.01723",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALCH",
            "score": 95,
            "price": "0.07689",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CYBER",
            "score": 95,
            "price": "0.52220",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYRUP",
            "score": 95,
            "price": "0.24027",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ME",
            "score": 95,
            "price": "0.10460",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YFI",
            "score": 95,
            "price": "2665.00",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STX",
            "score": 95,
            "price": "0.22040",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACE",
            "score": 95,
            "price": "0.12140",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZRX",
            "score": 95,
            "price": "0.11050",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TREE",
            "score": 95,
            "price": "0.06776",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IO",
            "score": 95,
            "price": "0.11550",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUPER",
            "score": 95,
            "price": "0.12020",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GAS",
            "score": 95,
            "price": "1.6060",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATOM",
            "score": 95,
            "price": "1.9140",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "M",
            "score": 95,
            "price": "3.4115",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LPT",
            "score": 95,
            "price": "2.0780",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YB",
            "score": 95,
            "price": "0.12330",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZIL",
            "score": 95,
            "price": "0.003940",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZKC",
            "score": 95,
            "price": "0.07461",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKR",
            "score": 95,
            "price": "0.01575",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAKE",
            "score": 95,
            "price": "0.02989",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COAI",
            "score": 95,
            "price": "0.33570",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YGG",
            "score": 95,
            "price": "0.04010",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LSK",
            "score": 95,
            "price": "0.12410",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XTZ",
            "score": 95,
            "price": "0.36740",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SLP",
            "score": 95,
            "price": "0.000693",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "T",
            "score": 95,
            "price": "0.005836",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAN",
            "score": 95,
            "price": "0.008417",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEW",
            "score": 95,
            "price": "0.000575",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEO",
            "score": 95,
            "price": "2.7330",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAT",
            "score": 95,
            "price": "0.09710",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TLM",
            "score": 95,
            "price": "0.001816",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CETUS",
            "score": 95,
            "price": "0.02770",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUSHI",
            "score": 95,
            "price": "0.20630",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "C98",
            "score": 95,
            "price": "0.02025",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "THETA",
            "score": 95,
            "price": "0.19840",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AZTEC",
            "score": 95,
            "price": "0.01974",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPELL",
            "score": 95,
            "price": "0.000166",
            "change_24h": "-4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IMX",
            "score": 95,
            "price": "0.16330",
            "change_24h": "-4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACT",
            "score": 95,
            "price": "0.01365",
            "change_24h": "-4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLESS",
            "score": 95,
            "price": "0.005860",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LA",
            "score": 95,
            "price": "0.15720",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INJ",
            "score": 95,
            "price": "3.4360",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOVE",
            "score": 95,
            "price": "0.01709",
            "change_24h": "-4.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UMA",
            "score": 95,
            "price": "0.44850",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RSR",
            "score": 95,
            "price": "0.001687",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RONIN",
            "score": 95,
            "price": "0.09500",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ERA",
            "score": 95,
            "price": "0.13680",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GUA",
            "score": 95,
            "price": "0.80800",
            "change_24h": "-5.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DYDX",
            "score": 95,
            "price": "0.15940",
            "change_24h": "-5.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000SATS",
            "score": 95,
            "price": "0.000014",
            "change_24h": "-5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XPL",
            "score": 95,
            "price": "0.09140",
            "change_24h": "-5.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAND",
            "score": 95,
            "price": "0.07300",
            "change_24h": "-6.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "币安人生",
            "score": 95,
            "price": "0.35325",
            "change_24h": "-6.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UAI",
            "score": 95,
            "price": "0.35160",
            "change_24h": "-7.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDGE",
            "score": 95,
            "price": "1.2098",
            "change_24h": "-7.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "S",
            "score": 95,
            "price": "0.04343",
            "change_24h": "-7.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DEXE",
            "score": 95,
            "price": "11.6750",
            "change_24h": "-7.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ROBO",
            "score": 95,
            "price": "0.01879",
            "change_24h": "-8.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAG",
            "score": 95,
            "price": "0.000543",
            "change_24h": "-8.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARIA",
            "score": 95,
            "price": "0.05830",
            "change_24h": "-9.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "API3",
            "score": 95,
            "price": "0.36580",
            "change_24h": "-9.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MON",
            "score": 95,
            "price": "0.02636",
            "change_24h": "-10.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENSO",
            "score": 92,
            "price": "0.96450",
            "change_24h": "+6.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APE",
            "score": 92,
            "price": "0.16190",
            "change_24h": "+6.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDU",
            "score": 92,
            "price": "0.04740",
            "change_24h": "+2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CC",
            "score": 92,
            "price": "0.15190",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONT",
            "score": 92,
            "price": "0.07170",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEC",
            "score": 92,
            "price": "333.0900",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VANA",
            "score": 92,
            "price": "1.4750",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOLV",
            "score": 90,
            "price": "0.004938",
            "change_24h": "+16.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEREBRO",
            "score": 90,
            "price": "0.02378",
            "change_24h": "+15.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GWEI",
            "score": 90,
            "price": "0.10446",
            "change_24h": "+13.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAC",
            "score": 90,
            "price": "0.01519",
            "change_24h": "+10.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIOT",
            "score": 90,
            "price": "0.11034",
            "change_24h": "+9.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VELVET",
            "score": 90,
            "price": "0.11387",
            "change_24h": "+7.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ESPORTS",
            "score": 90,
            "price": "0.38790",
            "change_24h": "+6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAITO",
            "score": 90,
            "price": "0.45000",
            "change_24h": "+3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IRYS",
            "score": 90,
            "price": "0.03654",
            "change_24h": "+2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAT",
            "score": 90,
            "price": "0.01136",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPORTFUN",
            "score": 90,
            "price": "0.04743",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COMP",
            "score": 90,
            "price": "24.0800",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "B2",
            "score": 90,
            "price": "0.50420",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ELSA",
            "score": 90,
            "price": "0.07162",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FRAX",
            "score": 90,
            "price": "0.46800",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "B",
            "score": 90,
            "price": "0.13070",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEAT",
            "score": 90,
            "price": "0.58130",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZAMA",
            "score": 90,
            "price": "0.02698",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IN",
            "score": 90,
            "price": "0.06678",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WET",
            "score": 90,
            "price": "0.09394",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROM",
            "score": 90,
            "price": "2.0840",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SIGN",
            "score": 90,
            "price": "0.01573",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "QNT",
            "score": 90,
            "price": "69.3900",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SXT",
            "score": 90,
            "price": "0.01656",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XMR",
            "score": 90,
            "price": "378.0300",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIRB",
            "score": 90,
            "price": "0.13111",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GTC",
            "score": 90,
            "price": "0.09422",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NXPC",
            "score": 90,
            "price": "0.29550",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASTR",
            "score": 90,
            "price": "0.008074",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MMT",
            "score": 90,
            "price": "0.13180",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NMR",
            "score": 90,
            "price": "8.7860",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OGN",
            "score": 90,
            "price": "0.02319",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOOD",
            "score": 90,
            "price": "0.003200",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ANIME",
            "score": 90,
            "price": "0.004688",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RVN",
            "score": 90,
            "price": "0.005820",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAS",
            "score": 90,
            "price": "0.03228",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROVE",
            "score": 90,
            "price": "0.24560",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TOSHI",
            "score": 90,
            "price": "0.000183",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALICE",
            "score": 90,
            "price": "0.14530",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CTK",
            "score": 90,
            "price": "0.17690",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALLO",
            "score": 90,
            "price": "0.10750",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000XEC",
            "score": 90,
            "price": "0.006970",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "C",
            "score": 90,
            "price": "0.07394",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PTB",
            "score": 90,
            "price": "0.000779",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARKM",
            "score": 90,
            "price": "0.11010",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STEEM",
            "score": 90,
            "price": "0.05598",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CKB",
            "score": 90,
            "price": "0.001472",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INIT",
            "score": 90,
            "price": "0.09167",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHR",
            "score": 90,
            "price": "0.02208",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALL",
            "score": 90,
            "price": "0.54470",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SENT",
            "score": 90,
            "price": "0.01756",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANANA",
            "score": 90,
            "price": "3.7700",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BABY",
            "score": 90,
            "price": "0.01482",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WCT",
            "score": 90,
            "price": "0.06198",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CLANKER",
            "score": 90,
            "price": "23.3000",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HEMI",
            "score": 90,
            "price": "0.007611",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ROSE",
            "score": 90,
            "price": "0.009750",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XNY",
            "score": 90,
            "price": "0.005613",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BMT",
            "score": 90,
            "price": "0.01515",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAIA",
            "score": 90,
            "price": "0.04535",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASR",
            "score": 90,
            "price": "1.2450",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "F",
            "score": 90,
            "price": "0.005386",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLOCK",
            "score": 90,
            "price": "0.05884",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIDA",
            "score": 90,
            "price": "0.01644",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKL",
            "score": 90,
            "price": "0.006650",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MELANIA",
            "score": 90,
            "price": "0.10530",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONG",
            "score": 90,
            "price": "0.07169",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KSM",
            "score": 90,
            "price": "4.6630",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORDER",
            "score": 90,
            "price": "0.05368",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USUAL",
            "score": 90,
            "price": "0.01355",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "THE",
            "score": 90,
            "price": "0.09820",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POLYX",
            "score": 90,
            "price": "0.04709",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GOAT",
            "score": 90,
            "price": "0.01663",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOTA",
            "score": 90,
            "price": "0.05460",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUST",
            "score": 90,
            "price": "0.06807",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SCRT",
            "score": 90,
            "price": "0.09893",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OG",
            "score": 90,
            "price": "2.8880",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOCA",
            "score": 90,
            "price": "0.01346",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "2Z",
            "score": 90,
            "price": "0.08173",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYN",
            "score": 90,
            "price": "0.05202",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAGIC",
            "score": 90,
            "price": "0.06371",
            "change_24h": "-4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AGLD",
            "score": 90,
            "price": "0.25120",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LAYER",
            "score": 90,
            "price": "0.08144",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MIRA",
            "score": 90,
            "price": "0.08129",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAVA",
            "score": 90,
            "price": "0.05680",
            "change_24h": "-4.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "METIS",
            "score": 90,
            "price": "3.4130",
            "change_24h": "-4.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACX",
            "score": 90,
            "price": "0.04249",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEWT",
            "score": 90,
            "price": "0.07377",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WOO",
            "score": 90,
            "price": "0.01873",
            "change_24h": "-5.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RENDER",
            "score": 90,
            "price": "1.6850",
            "change_24h": "-5.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NIGHT",
            "score": 90,
            "price": "0.03216",
            "change_24h": "-5.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USELESS",
            "score": 90,
            "price": "0.03764",
            "change_24h": "-5.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPEN",
            "score": 90,
            "price": "0.26050",
            "change_24h": "-5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POPCAT",
            "score": 90,
            "price": "0.05714",
            "change_24h": "-5.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RUNE",
            "score": 90,
            "price": "0.49400",
            "change_24h": "-5.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AXS",
            "score": 90,
            "price": "1.3900",
            "change_24h": "-6.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "A",
            "score": 90,
            "price": "0.08963",
            "change_24h": "-6.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANTRA",
            "score": 90,
            "price": "0.01017",
            "change_24h": "-7.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPN",
            "score": 90,
            "price": "0.16230",
            "change_24h": "-7.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GIGGLE",
            "score": 90,
            "price": "31.8800",
            "change_24h": "-8.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUMP",
            "score": 90,
            "price": "0.001743",
            "change_24h": "-8.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PENDLE",
            "score": 90,
            "price": "1.2503",
            "change_24h": "-8.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZKP",
            "score": 90,
            "price": "0.08571",
            "change_24h": "-8.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKY",
            "score": 90,
            "price": "0.07900",
            "change_24h": "-8.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STABLE",
            "score": 90,
            "price": "0.03177",
            "change_24h": "-10.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CTSI",
            "score": 90,
            "price": "0.03040",
            "change_24h": "-12.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PRL",
            "score": 90,
            "price": "0.28540",
            "change_24h": "-14.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WLFI",
            "score": 90,
            "price": "0.06320",
            "change_24h": "-14.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOLO",
            "score": 90,
            "price": "0.03080",
            "change_24h": "-18.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NOM",
            "score": 90,
            "price": "0.002821",
            "change_24h": "-18.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BSB",
            "score": 90,
            "price": "0.59904",
            "change_24h": "-33.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HUMA",
            "score": 87,
            "price": "0.02175",
            "change_24h": "+6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOMI",
            "score": 87,
            "price": "0.18640",
            "change_24h": "+4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CROSS",
            "score": 87,
            "price": "0.10844",
            "change_24h": "+3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZETA",
            "score": 87,
            "price": "0.05714",
            "change_24h": "+3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DRIFT",
            "score": 87,
            "price": "0.03696",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTCDOM",
            "score": 87,
            "price": "5428.40",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIO",
            "score": 85,
            "price": "0.04107",
            "change_24h": "+19.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARC",
            "score": 85,
            "price": "0.07847",
            "change_24h": "+10.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAS",
            "score": 85,
            "price": "0.01492",
            "change_24h": "+8.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIN",
            "score": 85,
            "price": "0.09559",
            "change_24h": "+8.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FF",
            "score": 85,
            "price": "0.06575",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HIGH",
            "score": 85,
            "price": "0.21360",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAUT",
            "score": 85,
            "price": "4572.00",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PAXG",
            "score": 85,
            "price": "4568.00",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EVAA",
            "score": 85,
            "price": "0.60570",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BULLA",
            "score": 85,
            "price": "0.007252",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARPA",
            "score": 85,
            "price": "0.009970",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOME",
            "score": 85,
            "price": "0.01489",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COS",
            "score": 85,
            "price": "0.001144",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SFP",
            "score": 85,
            "price": "0.33180",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GMX",
            "score": 85,
            "price": "7.2420",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HEI",
            "score": 85,
            "price": "0.08109",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STORJ",
            "score": 85,
            "price": "0.09640",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "QTUM",
            "score": 85,
            "price": "0.86800",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COTI",
            "score": 85,
            "price": "0.01342",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1INCH",
            "score": 85,
            "price": "0.09230",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOST",
            "score": 85,
            "price": "0.001049",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MLN",
            "score": 85,
            "price": "3.0390",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INX",
            "score": 85,
            "price": "0.01040",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONE",
            "score": 85,
            "price": "0.002280",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEL",
            "score": 85,
            "price": "0.10560",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KNC",
            "score": 85,
            "price": "0.13720",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SQD",
            "score": 85,
            "price": "0.03040",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETHW",
            "score": 85,
            "price": "0.31380",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CELO",
            "score": 85,
            "price": "0.08621",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BNT",
            "score": 85,
            "price": "0.30480",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VIC",
            "score": 85,
            "price": "0.05433",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EGLD",
            "score": 85,
            "price": "4.0710",
            "change_24h": "-4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MINA",
            "score": 85,
            "price": "0.05840",
            "change_24h": "-4.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAV",
            "score": 85,
            "price": "0.01513",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HFT",
            "score": 85,
            "price": "0.01417",
            "change_24h": "-5.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LIGHT",
            "score": 85,
            "price": "0.15020",
            "change_24h": "-5.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NIL",
            "score": 85,
            "price": "0.03839",
            "change_24h": "-5.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "4",
            "score": 85,
            "price": "0.009908",
            "change_24h": "-5.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATA",
            "score": 85,
            "price": "0.009650",
            "change_24h": "-5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAND",
            "score": 85,
            "price": "0.21480",
            "change_24h": "-5.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KGEN",
            "score": 85,
            "price": "0.17555",
            "change_24h": "-5.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACH",
            "score": 85,
            "price": "0.007039",
            "change_24h": "-6.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LDO",
            "score": 85,
            "price": "0.36960",
            "change_24h": "-6.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CLO",
            "score": 85,
            "price": "0.12639",
            "change_24h": "-6.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RAVE",
            "score": 85,
            "price": "0.76710",
            "change_24h": "-8.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LUMIA",
            "score": 85,
            "price": "0.16074",
            "change_24h": "-10.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVAAI",
            "score": 85,
            "price": "0.007553",
            "change_24h": "-10.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHZ",
            "score": 85,
            "price": "0.04070",
            "change_24h": "-11.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BASED",
            "score": 85,
            "price": "0.11657",
            "change_24h": "-16.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GENIUS",
            "score": 85,
            "price": "0.43000",
            "change_24h": "-20.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPG",
            "score": 85,
            "price": "0.24680",
            "change_24h": "-20.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUMPBTC",
            "score": 85,
            "price": "0.01797",
            "change_24h": "-29.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRIFFAIN",
            "score": 82,
            "price": "0.02145",
            "change_24h": "+13.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BSV",
            "score": 82,
            "price": "15.7800",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AERGO",
            "score": 82,
            "price": "0.05746",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RESOLV",
            "score": 82,
            "price": "0.03035",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AT",
            "score": 82,
            "price": "0.16620",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000RATS",
            "score": 82,
            "price": "0.03891",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICNT",
            "score": 82,
            "price": "0.36830",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SONIC",
            "score": 82,
            "price": "0.03778",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TWT",
            "score": 82,
            "price": "0.43290",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AUCTION",
            "score": 82,
            "price": "4.7460",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAFE",
            "score": 82,
            "price": "0.14500",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAGMA",
            "score": 80,
            "price": "0.21002",
            "change_24h": "+10.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUN",
            "score": 80,
            "price": "0.01883",
            "change_24h": "+2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRX",
            "score": 80,
            "price": "0.32401",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "Q",
            "score": 80,
            "price": "0.01002",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BROCCOLIF3B",
            "score": 80,
            "price": "0.004126",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVA",
            "score": 80,
            "price": "0.25230",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XPIN",
            "score": 80,
            "price": "0.001306",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VTHO",
            "score": 80,
            "price": "0.000563",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CVC",
            "score": 80,
            "price": "0.03042",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APR",
            "score": 80,
            "price": "0.17320",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEAMX",
            "score": 80,
            "price": "0.001889",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WAXP",
            "score": 80,
            "price": "0.006564",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JOE",
            "score": 80,
            "price": "0.04477",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HIVE",
            "score": 80,
            "price": "0.05878",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CARV",
            "score": 80,
            "price": "0.05607",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAIKO",
            "score": 80,
            "price": "0.11420",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICX",
            "score": 80,
            "price": "0.03611",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUNDIX",
            "score": 80,
            "price": "0.14490",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROMPT",
            "score": 80,
            "price": "0.03453",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLUX",
            "score": 80,
            "price": "0.06482",
            "change_24h": "-4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POWR",
            "score": 80,
            "price": "0.06215",
            "change_24h": "-4.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACU",
            "score": 80,
            "price": "0.08731",
            "change_24h": "-4.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IDOL",
            "score": 80,
            "price": "0.02278",
            "change_24h": "-4.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DIA",
            "score": 80,
            "price": "0.18140",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SCR",
            "score": 80,
            "price": "0.04419",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DEEP",
            "score": 80,
            "price": "0.02829",
            "change_24h": "-5.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WAL",
            "score": 80,
            "price": "0.06998",
            "change_24h": "-5.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LISTA",
            "score": 80,
            "price": "0.08420",
            "change_24h": "-5.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000CAT",
            "score": 80,
            "price": "0.001852",
            "change_24h": "-5.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MET",
            "score": 80,
            "price": "0.15110",
            "change_24h": "-5.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RPL",
            "score": 80,
            "price": "1.8200",
            "change_24h": "-5.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FOGO",
            "score": 80,
            "price": "0.01755",
            "change_24h": "-5.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARK",
            "score": 80,
            "price": "0.17360",
            "change_24h": "-5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ILV",
            "score": 80,
            "price": "4.6390",
            "change_24h": "-5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOGS",
            "score": 80,
            "price": "0.000030",
            "change_24h": "-5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MBOX",
            "score": 80,
            "price": "0.01232",
            "change_24h": "-5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EUL",
            "score": 80,
            "price": "1.3099",
            "change_24h": "-5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTR",
            "score": 80,
            "price": "0.02698",
            "change_24h": "-5.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GMT",
            "score": 80,
            "price": "0.01098",
            "change_24h": "-5.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SSV",
            "score": 80,
            "price": "2.7240",
            "change_24h": "-5.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BREV",
            "score": 80,
            "price": "0.11620",
            "change_24h": "-5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ANKR",
            "score": 80,
            "price": "0.004735",
            "change_24h": "-5.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ON",
            "score": 80,
            "price": "0.11661",
            "change_24h": "-5.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KMNO",
            "score": 80,
            "price": "0.01999",
            "change_24h": "-5.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MUBARAK",
            "score": 80,
            "price": "0.01343",
            "change_24h": "-5.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NFP",
            "score": 80,
            "price": "0.01502",
            "change_24h": "-5.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000000MOG",
            "score": 80,
            "price": "0.14900",
            "change_24h": "-6.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FHE",
            "score": 80,
            "price": "0.01829",
            "change_24h": "-6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CFG",
            "score": 80,
            "price": "0.19880",
            "change_24h": "-6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRASS",
            "score": 80,
            "price": "0.32940",
            "change_24h": "-6.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AGT",
            "score": 80,
            "price": "0.01838",
            "change_24h": "-6.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RECALL",
            "score": 80,
            "price": "0.04987",
            "change_24h": "-7.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TURTLE",
            "score": 80,
            "price": "0.04856",
            "change_24h": "-7.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAVIA",
            "score": 80,
            "price": "0.03677",
            "change_24h": "-8.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MERL",
            "score": 80,
            "price": "0.03276",
            "change_24h": "-9.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LYN",
            "score": 80,
            "price": "0.06936",
            "change_24h": "-10.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KOMA",
            "score": 80,
            "price": "0.006869",
            "change_24h": "-10.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AWE",
            "score": 77,
            "price": "0.06016",
            "change_24h": "+5.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TA",
            "score": 77,
            "price": "0.04996",
            "change_24h": "+3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JTO",
            "score": 75,
            "price": "0.34710",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ESP",
            "score": 75,
            "price": "0.06877",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USDC",
            "score": 75,
            "price": "0.99969",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOT",
            "score": 75,
            "price": "0.000431",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOTX",
            "score": 75,
            "price": "0.004500",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RLC",
            "score": 75,
            "price": "0.42770",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XVG",
            "score": 75,
            "price": "0.003115",
            "change_24h": "-5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PHB",
            "score": 75,
            "price": "0.11250",
            "change_24h": "-5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LQTY",
            "score": 75,
            "price": "0.30030",
            "change_24h": "-7.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "龙虾",
            "score": 75,
            "price": "0.007154",
            "change_24h": "-8.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BICO",
            "score": 75,
            "price": "0.02516",
            "change_24h": "-9.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLUID",
            "score": 75,
            "price": "1.5070",
            "change_24h": "-10.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRADOOR",
            "score": 75,
            "price": "0.70280",
            "change_24h": "-11.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SANTOS",
            "score": 75,
            "price": "1.1140",
            "change_24h": "-11.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BR",
            "score": 75,
            "price": "0.08745",
            "change_24h": "-15.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JCT",
            "score": 75,
            "price": "0.003018",
            "change_24h": "-19.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FOLKS",
            "score": 72,
            "price": "1.4420",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SWARMS",
            "score": 70,
            "price": "0.02557",
            "change_24h": "+27.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLOW",
            "score": 70,
            "price": "0.04258",
            "change_24h": "+5.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HANA",
            "score": 70,
            "price": "0.03892",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYS",
            "score": 70,
            "price": "0.008990",
            "change_24h": "-5.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDEN",
            "score": 70,
            "price": "0.03407",
            "change_24h": "-5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DODOX",
            "score": 70,
            "price": "0.01838",
            "change_24h": "-5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "US",
            "score": 70,
            "price": "0.004359",
            "change_24h": "-5.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPACE",
            "score": 70,
            "price": "0.006635",
            "change_24h": "-6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000000BOB",
            "score": 70,
            "price": "0.01293",
            "change_24h": "-6.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COLLECT",
            "score": 67,
            "price": "0.03131",
            "change_24h": "+7.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLUAI",
            "score": 67,
            "price": "0.01217",
            "change_24h": "+7.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UB",
            "score": 62,
            "price": "0.07035",
            "change_24h": "+21.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NAORIS",
            "score": 55,
            "price": "0.12443",
            "change_24h": "+36.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIGENSYN",
            "score": 50,
            "price": "0.05556",
            "change_24h": "+31.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKYAI",
            "score": 50,
            "price": "0.30320",
            "change_24h": "+30.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
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
