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
            "coin": "USTC",
            "score": 100,
            "price": "0.006699",
            "change_24h": "+12.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RIVER",
            "score": 100,
            "price": "6.5680",
            "change_24h": "+9.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APE",
            "score": 100,
            "price": "0.15730",
            "change_24h": "+7.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHR",
            "score": 100,
            "price": "0.02379",
            "change_24h": "+7.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEREBRO",
            "score": 100,
            "price": "0.02694",
            "change_24h": "+6.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACH",
            "score": 100,
            "price": "0.007466",
            "change_24h": "+5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HYPER",
            "score": 100,
            "price": "0.12375",
            "change_24h": "+5.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDU",
            "score": 100,
            "price": "0.04731",
            "change_24h": "+4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FOLKS",
            "score": 100,
            "price": "1.4660",
            "change_24h": "+4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GUN",
            "score": 100,
            "price": "0.01467",
            "change_24h": "+4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CRV",
            "score": 100,
            "price": "0.23450",
            "change_24h": "+3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAITO",
            "score": 100,
            "price": "0.45220",
            "change_24h": "+3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOODENG",
            "score": 100,
            "price": "0.06011",
            "change_24h": "+3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOMI",
            "score": 100,
            "price": "0.18440",
            "change_24h": "+3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HIGH",
            "score": 100,
            "price": "0.21390",
            "change_24h": "+3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UB",
            "score": 100,
            "price": "0.06856",
            "change_24h": "+3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BB",
            "score": 100,
            "price": "0.02812",
            "change_24h": "+3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRB",
            "score": 100,
            "price": "18.9310",
            "change_24h": "+2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VANA",
            "score": 100,
            "price": "1.5000",
            "change_24h": "+2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000SHIB",
            "score": 100,
            "price": "0.006285",
            "change_24h": "+2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HMSTR",
            "score": 100,
            "price": "0.000154",
            "change_24h": "+2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RED",
            "score": 100,
            "price": "0.13440",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MYX",
            "score": 100,
            "price": "0.25700",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHILLGUY",
            "score": 100,
            "price": "0.01140",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIL",
            "score": 100,
            "price": "0.92200",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOGE",
            "score": 100,
            "price": "0.10565",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DUSK",
            "score": 100,
            "price": "0.12377",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAS",
            "score": 100,
            "price": "0.01455",
            "change_24h": "+2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPORTFUN",
            "score": 100,
            "price": "0.04571",
            "change_24h": "+2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HUMA",
            "score": 100,
            "price": "0.02138",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LINEA",
            "score": 100,
            "price": "0.003581",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JST",
            "score": 100,
            "price": "0.08674",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APT",
            "score": 100,
            "price": "0.98980",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MORPHO",
            "score": 100,
            "price": "1.9871",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CFX",
            "score": 100,
            "price": "0.05893",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BROCCOLI714",
            "score": 100,
            "price": "0.01818",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STO",
            "score": 100,
            "price": "0.09001",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORDI",
            "score": 100,
            "price": "4.3680",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUMP",
            "score": 100,
            "price": "0.001755",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHIP",
            "score": 100,
            "price": "0.06422",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CELR",
            "score": 100,
            "price": "0.002798",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OP",
            "score": 100,
            "price": "0.12030",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "D",
            "score": 100,
            "price": "0.01245",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOVR",
            "score": 100,
            "price": "2.3940",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000FLOKI",
            "score": 100,
            "price": "0.03228",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZRO",
            "score": 100,
            "price": "1.4431",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "API3",
            "score": 100,
            "price": "0.37370",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COMP",
            "score": 100,
            "price": "23.5000",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICP",
            "score": 100,
            "price": "2.3820",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MON",
            "score": 100,
            "price": "0.02746",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UAI",
            "score": 100,
            "price": "0.34640",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONDO",
            "score": 100,
            "price": "0.26210",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUMP",
            "score": 100,
            "price": "2.3770",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VIRTUAL",
            "score": 100,
            "price": "0.68660",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FARTCOIN",
            "score": 100,
            "price": "0.19780",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENA",
            "score": 100,
            "price": "0.10265",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IP",
            "score": 100,
            "price": "0.49000",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JUP",
            "score": 100,
            "price": "0.17950",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XPL",
            "score": 100,
            "price": "0.09030",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FET",
            "score": 100,
            "price": "0.19610",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANANAS31",
            "score": 100,
            "price": "0.009749",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ROBO",
            "score": 100,
            "price": "0.01842",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TIA",
            "score": 100,
            "price": "0.35190",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDGE",
            "score": 100,
            "price": "1.1767",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "G",
            "score": 100,
            "price": "0.003581",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONT",
            "score": 100,
            "price": "0.07000",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAO",
            "score": 100,
            "price": "249.8800",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAHARA",
            "score": 100,
            "price": "0.02204",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "W",
            "score": 100,
            "price": "0.01241",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARB",
            "score": 100,
            "price": "0.12480",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZK",
            "score": 100,
            "price": "0.01526",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASTER",
            "score": 100,
            "price": "0.65210",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEIRO",
            "score": 100,
            "price": "0.000088",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPK",
            "score": 100,
            "price": "0.03594",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RENDER",
            "score": 100,
            "price": "1.6780",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LIT",
            "score": 100,
            "price": "0.89450",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVAX",
            "score": 100,
            "price": "9.0850",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STRK",
            "score": 100,
            "price": "0.03864",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VET",
            "score": 100,
            "price": "0.007002",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVNT",
            "score": 100,
            "price": "0.14670",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HBAR",
            "score": 100,
            "price": "0.08786",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOON",
            "score": 100,
            "price": "0.16530",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HYPE",
            "score": 100,
            "price": "39.2460",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIXEL",
            "score": 100,
            "price": "0.008130",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PLUME",
            "score": 100,
            "price": "0.01183",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AAVE",
            "score": 100,
            "price": "93.1700",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WLD",
            "score": 100,
            "price": "0.24410",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CGPT",
            "score": 100,
            "price": "0.02661",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INJ",
            "score": 100,
            "price": "3.4410",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GALA",
            "score": 100,
            "price": "0.003208",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATA",
            "score": 100,
            "price": "0.009620",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLUR",
            "score": 100,
            "price": "0.02655",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TON",
            "score": 100,
            "price": "1.3112",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FF",
            "score": 100,
            "price": "0.06312",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SEI",
            "score": 100,
            "price": "0.05706",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PNUT",
            "score": 100,
            "price": "0.05280",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TURBO",
            "score": 100,
            "price": "0.001131",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CC",
            "score": 100,
            "price": "0.15095",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPEN",
            "score": 100,
            "price": "0.27680",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOLO",
            "score": 100,
            "price": "0.03050",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CFG",
            "score": 100,
            "price": "0.20230",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BCH",
            "score": 100,
            "price": "440.7900",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NIGHT",
            "score": 100,
            "price": "0.03288",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPX",
            "score": 100,
            "price": "0.36150",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KITE",
            "score": 100,
            "price": "0.14344",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "币安人生",
            "score": 100,
            "price": "0.34232",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BERA",
            "score": 100,
            "price": "0.35990",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SIREN",
            "score": 100,
            "price": "0.66480",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DYDX",
            "score": 100,
            "price": "0.15480",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETHFI",
            "score": 100,
            "price": "0.40970",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAT",
            "score": 100,
            "price": "0.01078",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATOM",
            "score": 100,
            "price": "1.8820",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "0G",
            "score": 100,
            "price": "0.53730",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EPIC",
            "score": 100,
            "price": "0.30540",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LDO",
            "score": 100,
            "price": "0.36820",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CAKE",
            "score": 100,
            "price": "1.4468",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VVV",
            "score": 100,
            "price": "8.3600",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RAYSOL",
            "score": 100,
            "price": "0.75880",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EIGEN",
            "score": 100,
            "price": "0.17660",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIO",
            "score": 100,
            "price": "0.11122",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHZ",
            "score": 100,
            "price": "0.04107",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GIGGLE",
            "score": 100,
            "price": "31.8700",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AXS",
            "score": 100,
            "price": "1.3560",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AXL",
            "score": 100,
            "price": "0.05950",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AEVO",
            "score": 100,
            "price": "0.02678",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANTRA",
            "score": 100,
            "price": "0.01001",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DEXE",
            "score": 100,
            "price": "11.4640",
            "change_24h": "-4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKY",
            "score": 100,
            "price": "0.07888",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANTA",
            "score": 100,
            "price": "0.06586",
            "change_24h": "-4.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZBT",
            "score": 100,
            "price": "0.17555",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AERO",
            "score": 100,
            "price": "0.44010",
            "change_24h": "-5.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENJ",
            "score": 100,
            "price": "0.05459",
            "change_24h": "-5.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BOME",
            "score": 97,
            "price": "0.000528",
            "change_24h": "+4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PLAY",
            "score": 97,
            "price": "0.10193",
            "change_24h": "+2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALGO",
            "score": 97,
            "price": "0.11080",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOT",
            "score": 97,
            "price": "1.2090",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETH",
            "score": 97,
            "price": "2254.95",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000LUNC",
            "score": 95,
            "price": "0.07508",
            "change_24h": "+11.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LUNA2",
            "score": 95,
            "price": "0.06912",
            "change_24h": "+10.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZETA",
            "score": 95,
            "price": "0.05874",
            "change_24h": "+7.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AWE",
            "score": 95,
            "price": "0.06081",
            "change_24h": "+5.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WIF",
            "score": 95,
            "price": "0.18570",
            "change_24h": "+5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PENGU",
            "score": 95,
            "price": "0.009988",
            "change_24h": "+5.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JTO",
            "score": 95,
            "price": "0.34830",
            "change_24h": "+4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALCH",
            "score": 95,
            "price": "0.07946",
            "change_24h": "+3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PARTI",
            "score": 95,
            "price": "0.04113",
            "change_24h": "+3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICNT",
            "score": 95,
            "price": "0.37940",
            "change_24h": "+3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LYN",
            "score": 95,
            "price": "0.06985",
            "change_24h": "+3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SONIC",
            "score": 95,
            "price": "0.03778",
            "change_24h": "+2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIGTIME",
            "score": 95,
            "price": "0.01332",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JOE",
            "score": 95,
            "price": "0.04588",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ELSA",
            "score": 95,
            "price": "0.07174",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RESOLV",
            "score": 95,
            "price": "0.02941",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RIF",
            "score": 95,
            "price": "0.05314",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COOKIE",
            "score": 95,
            "price": "0.01636",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RARE",
            "score": 95,
            "price": "0.01710",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZORA",
            "score": 95,
            "price": "0.01251",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PHA",
            "score": 95,
            "price": "0.03130",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACT",
            "score": 95,
            "price": "0.01383",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAFE",
            "score": 95,
            "price": "0.14320",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ID",
            "score": 95,
            "price": "0.03025",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000PEPE",
            "score": 95,
            "price": "0.003868",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XNY",
            "score": 95,
            "price": "0.005723",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STX",
            "score": 95,
            "price": "0.22070",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENS",
            "score": 95,
            "price": "5.9880",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "2Z",
            "score": 95,
            "price": "0.08200",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OGN",
            "score": 95,
            "price": "0.02308",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STG",
            "score": 95,
            "price": "0.21720",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANA",
            "score": 95,
            "price": "0.08970",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STABLE",
            "score": 95,
            "price": "0.03208",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BULLA",
            "score": 95,
            "price": "0.007010",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZKC",
            "score": 95,
            "price": "0.07380",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DEEP",
            "score": 95,
            "price": "0.02828",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOLO",
            "score": 95,
            "price": "0.06234",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HEMI",
            "score": 95,
            "price": "0.007624",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BRETT",
            "score": 95,
            "price": "0.007034",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZRX",
            "score": 95,
            "price": "0.11000",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AKT",
            "score": 95,
            "price": "0.50610",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1INCH",
            "score": 95,
            "price": "0.09220",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEAT",
            "score": 95,
            "price": "0.56560",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NMR",
            "score": 95,
            "price": "8.7080",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INIT",
            "score": 95,
            "price": "0.09095",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BARD",
            "score": 95,
            "price": "0.27440",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "B",
            "score": 95,
            "price": "0.13220",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEAR",
            "score": 95,
            "price": "1.3060",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CELO",
            "score": 95,
            "price": "0.08586",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YFI",
            "score": 95,
            "price": "2649.00",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CATI",
            "score": 95,
            "price": "0.04983",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAGA",
            "score": 95,
            "price": "0.01706",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POLYX",
            "score": 95,
            "price": "0.04710",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPELL",
            "score": 95,
            "price": "0.000166",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "QTUM",
            "score": 95,
            "price": "0.86000",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SNX",
            "score": 95,
            "price": "0.30510",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XTZ",
            "score": 95,
            "price": "0.36510",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VELODROME",
            "score": 95,
            "price": "0.01752",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANANA",
            "score": 95,
            "price": "3.7780",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAND",
            "score": 95,
            "price": "0.07207",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KERNEL",
            "score": 95,
            "price": "0.06316",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COS",
            "score": 95,
            "price": "0.001125",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLESS",
            "score": 95,
            "price": "0.005831",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ON",
            "score": 95,
            "price": "0.11465",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RAVE",
            "score": 95,
            "price": "0.73130",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SCRT",
            "score": 95,
            "price": "0.09823",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COLLECT",
            "score": 95,
            "price": "0.02917",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TNSR",
            "score": 95,
            "price": "0.03921",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AGLD",
            "score": 95,
            "price": "0.24940",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HFT",
            "score": 95,
            "price": "0.01424",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAPIEN",
            "score": 95,
            "price": "0.08930",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ERA",
            "score": 95,
            "price": "0.13670",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "M",
            "score": 95,
            "price": "3.2270",
            "change_24h": "-4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "H",
            "score": 95,
            "price": "0.17160",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPACE",
            "score": 95,
            "price": "0.006524",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALT",
            "score": 95,
            "price": "0.007454",
            "change_24h": "-5.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOLV",
            "score": 95,
            "price": "0.004569",
            "change_24h": "-5.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WLFI",
            "score": 95,
            "price": "0.05960",
            "change_24h": "-7.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "S",
            "score": 95,
            "price": "0.04234",
            "change_24h": "-7.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PRL",
            "score": 95,
            "price": "0.28630",
            "change_24h": "-8.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORCA",
            "score": 95,
            "price": "1.4890",
            "change_24h": "-9.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PAXG",
            "score": 92,
            "price": "4608.30",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAUT",
            "score": 92,
            "price": "4606.28",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000BONK",
            "score": 92,
            "price": "0.006214",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RUNE",
            "score": 92,
            "price": "0.49950",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AR",
            "score": 92,
            "price": "1.8580",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTC",
            "score": 92,
            "price": "76140.90",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XRP",
            "score": 92,
            "price": "1.3653",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOL",
            "score": 92,
            "price": "82.9100",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUI",
            "score": 92,
            "price": "0.90490",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LINK",
            "score": 92,
            "price": "9.1000",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UNI",
            "score": 92,
            "price": "3.1860",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BNB",
            "score": 92,
            "price": "616.6100",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XLM",
            "score": 92,
            "price": "0.15882",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GWEI",
            "score": 90,
            "price": "0.10746",
            "change_24h": "+15.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIXBT",
            "score": 90,
            "price": "0.03093",
            "change_24h": "+11.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLOW",
            "score": 90,
            "price": "0.04472",
            "change_24h": "+10.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SWARMS",
            "score": 90,
            "price": "0.02614",
            "change_24h": "+8.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "我踏马来了",
            "score": 90,
            "price": "0.009347",
            "change_24h": "+5.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TA",
            "score": 90,
            "price": "0.05101",
            "change_24h": "+3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IRYS",
            "score": 90,
            "price": "0.03594",
            "change_24h": "+2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIN",
            "score": 90,
            "price": "0.09664",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIGHT",
            "score": 90,
            "price": "0.004234",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ESPORTS",
            "score": 90,
            "price": "0.38370",
            "change_24h": "+2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOGS",
            "score": 90,
            "price": "0.000031",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIPPIN",
            "score": 90,
            "price": "0.02557",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATH",
            "score": 90,
            "price": "0.005867",
            "change_24h": "+1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TST",
            "score": 90,
            "price": "0.01069",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GTC",
            "score": 90,
            "price": "0.09463",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AZTEC",
            "score": 90,
            "price": "0.01958",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IN",
            "score": 90,
            "price": "0.06682",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TUT",
            "score": 90,
            "price": "0.01077",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1MBABYDOGE",
            "score": 90,
            "price": "0.000415",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FHE",
            "score": 90,
            "price": "0.01826",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARKM",
            "score": 90,
            "price": "0.11080",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PEOPLE",
            "score": 90,
            "price": "0.007490",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANK",
            "score": 90,
            "price": "0.03419",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ESP",
            "score": 90,
            "price": "0.06811",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALICE",
            "score": 90,
            "price": "0.14630",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EUL",
            "score": 90,
            "price": "1.3153",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LAB",
            "score": 90,
            "price": "0.67030",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZAMA",
            "score": 90,
            "price": "0.02671",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ANIME",
            "score": 90,
            "price": "0.004681",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SIGN",
            "score": 90,
            "price": "0.01559",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYRUP",
            "score": 90,
            "price": "0.23730",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PORTAL",
            "score": 90,
            "price": "0.01134",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TLM",
            "score": 90,
            "price": "0.001824",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KMNO",
            "score": 90,
            "price": "0.02023",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEW",
            "score": 90,
            "price": "0.000581",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUSHI",
            "score": 90,
            "price": "0.20630",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKR",
            "score": 90,
            "price": "0.01574",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PYTH",
            "score": 90,
            "price": "0.04644",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000CAT",
            "score": 90,
            "price": "0.001878",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TURTLE",
            "score": 90,
            "price": "0.04761",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROM",
            "score": 90,
            "price": "2.0670",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USELESS",
            "score": 90,
            "price": "0.03784",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AT",
            "score": 90,
            "price": "0.16506",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAIA",
            "score": 90,
            "price": "0.04533",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SENT",
            "score": 90,
            "price": "0.01719",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TWT",
            "score": 90,
            "price": "0.42670",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MMT",
            "score": 90,
            "price": "0.13160",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARK",
            "score": 90,
            "price": "0.17350",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WET",
            "score": 90,
            "price": "0.09392",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOST",
            "score": 90,
            "price": "0.001057",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEME",
            "score": 90,
            "price": "0.000566",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DYM",
            "score": 90,
            "price": "0.01815",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZIL",
            "score": 90,
            "price": "0.003930",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SSV",
            "score": 90,
            "price": "2.7150",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUN",
            "score": 90,
            "price": "0.01848",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAI",
            "score": 90,
            "price": "0.01045",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPN",
            "score": 90,
            "price": "0.16130",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GAS",
            "score": 90,
            "price": "1.5990",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GMT",
            "score": 90,
            "price": "0.01092",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RSR",
            "score": 90,
            "price": "0.001667",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "C98",
            "score": 90,
            "price": "0.02018",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MUBARAK",
            "score": 90,
            "price": "0.01344",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CVX",
            "score": 90,
            "price": "1.6790",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "F",
            "score": 90,
            "price": "0.005353",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CLO",
            "score": 90,
            "price": "0.12235",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CYBER",
            "score": 90,
            "price": "0.51600",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COAI",
            "score": 90,
            "price": "0.32680",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TOWNS",
            "score": 90,
            "price": "0.003157",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KSM",
            "score": 90,
            "price": "4.6950",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ME",
            "score": 90,
            "price": "0.10400",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOOD",
            "score": 90,
            "price": "0.003181",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000000MOG",
            "score": 90,
            "price": "0.14810",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIDA",
            "score": 90,
            "price": "0.01643",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VANRY",
            "score": 90,
            "price": "0.005120",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONG",
            "score": 90,
            "price": "0.07177",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAGIC",
            "score": 90,
            "price": "0.06345",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LAYER",
            "score": 90,
            "price": "0.08124",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "THE",
            "score": 90,
            "price": "0.09860",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MINA",
            "score": 90,
            "price": "0.05889",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASR",
            "score": 90,
            "price": "1.2360",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRT",
            "score": 90,
            "price": "0.02406",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OG",
            "score": 90,
            "price": "2.9040",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TREE",
            "score": 90,
            "price": "0.06685",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GOAT",
            "score": 90,
            "price": "0.01666",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MIRA",
            "score": 90,
            "price": "0.08126",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TOSHI",
            "score": 90,
            "price": "0.000182",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BICO",
            "score": 90,
            "price": "0.02523",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RONIN",
            "score": 90,
            "price": "0.09430",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MASK",
            "score": 90,
            "price": "0.49780",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MITO",
            "score": 90,
            "price": "0.04579",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WAL",
            "score": 90,
            "price": "0.06963",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MELANIA",
            "score": 90,
            "price": "0.10420",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIRB",
            "score": 90,
            "price": "0.13264",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AERGO",
            "score": 90,
            "price": "0.05612",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAN",
            "score": 90,
            "price": "0.07125",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKL",
            "score": 90,
            "price": "0.006610",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "4",
            "score": 90,
            "price": "0.009699",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FOGO",
            "score": 90,
            "price": "0.01746",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEWT",
            "score": 90,
            "price": "0.07378",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "Q",
            "score": 90,
            "price": "0.009980",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOTA",
            "score": 90,
            "price": "0.05420",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUST",
            "score": 90,
            "price": "0.06692",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "METIS",
            "score": 90,
            "price": "3.3550",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRASS",
            "score": 90,
            "price": "0.32290",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LISTA",
            "score": 90,
            "price": "0.08320",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAND",
            "score": 90,
            "price": "0.21210",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VELVET",
            "score": 90,
            "price": "0.11364",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOVE",
            "score": 90,
            "price": "0.01694",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ANKR",
            "score": 90,
            "price": "0.004713",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAVA",
            "score": 90,
            "price": "0.05670",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIA",
            "score": 90,
            "price": "0.04972",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GPS",
            "score": 90,
            "price": "0.007488",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARC",
            "score": 90,
            "price": "0.07281",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTR",
            "score": 90,
            "price": "0.02644",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WCT",
            "score": 90,
            "price": "0.06071",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POPCAT",
            "score": 90,
            "price": "0.05708",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SHELL",
            "score": 90,
            "price": "0.03419",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RECALL",
            "score": 90,
            "price": "0.04778",
            "change_24h": "-4.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JCT",
            "score": 90,
            "price": "0.002866",
            "change_24h": "-5.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRIFFAIN",
            "score": 90,
            "price": "0.01823",
            "change_24h": "-5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "A",
            "score": 90,
            "price": "0.08911",
            "change_24h": "-6.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NOM",
            "score": 90,
            "price": "0.002613",
            "change_24h": "-13.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPG",
            "score": 90,
            "price": "0.21870",
            "change_24h": "-18.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VIC",
            "score": 90,
            "price": "0.04443",
            "change_24h": "-18.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NFP",
            "score": 90,
            "price": "0.01233",
            "change_24h": "-20.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DRIFT",
            "score": 87,
            "price": "0.03735",
            "change_24h": "+5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POL",
            "score": 87,
            "price": "0.09580",
            "change_24h": "+5.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CYS",
            "score": 87,
            "price": "0.52280",
            "change_24h": "+3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "C",
            "score": 87,
            "price": "0.07717",
            "change_24h": "+3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRADOOR",
            "score": 87,
            "price": "0.73230",
            "change_24h": "+3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MET",
            "score": 87,
            "price": "0.15510",
            "change_24h": "+2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IO",
            "score": 87,
            "price": "0.11780",
            "change_24h": "+2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MERL",
            "score": 87,
            "price": "0.03346",
            "change_24h": "+2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ADA",
            "score": 87,
            "price": "0.24560",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETC",
            "score": 87,
            "price": "8.3470",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CTSI",
            "score": 87,
            "price": "0.03196",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LTC",
            "score": 87,
            "price": "55.4500",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ILV",
            "score": 87,
            "price": "4.6660",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XMR",
            "score": 87,
            "price": "376.8200",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XVS",
            "score": 87,
            "price": "2.5310",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LPT",
            "score": 87,
            "price": "2.0750",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KNC",
            "score": 87,
            "price": "0.13760",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAC",
            "score": 85,
            "price": "0.01902",
            "change_24h": "+14.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NAORIS",
            "score": 85,
            "price": "0.12455",
            "change_24h": "+12.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "REZ",
            "score": 85,
            "price": "0.004448",
            "change_24h": "+7.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JELLYJELLY",
            "score": 85,
            "price": "0.05438",
            "change_24h": "+5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KGEN",
            "score": 85,
            "price": "0.18331",
            "change_24h": "+5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BROCCOLIF3B",
            "score": 85,
            "price": "0.004133",
            "change_24h": "+4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROMPT",
            "score": 85,
            "price": "0.03608",
            "change_24h": "+2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XPIN",
            "score": 85,
            "price": "0.001328",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DASH",
            "score": 85,
            "price": "34.9000",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRX",
            "score": 85,
            "price": "0.32594",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAN",
            "score": 85,
            "price": "0.008344",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JASMY",
            "score": 85,
            "price": "0.005659",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEO",
            "score": 85,
            "price": "2.7150",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EGLD",
            "score": 85,
            "price": "4.0680",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LQTY",
            "score": 85,
            "price": "0.30080",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "龙虾",
            "score": 85,
            "price": "0.007036",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WOO",
            "score": 85,
            "price": "0.01862",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STEEM",
            "score": 85,
            "price": "0.05592",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "THETA",
            "score": 85,
            "price": "0.19670",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PTB",
            "score": 85,
            "price": "0.000762",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EVAA",
            "score": 85,
            "price": "0.60570",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAT",
            "score": 85,
            "price": "0.09650",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONE",
            "score": 85,
            "price": "0.002296",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAV",
            "score": 85,
            "price": "0.01507",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SFP",
            "score": 85,
            "price": "0.31800",
            "change_24h": "-4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BASED",
            "score": 85,
            "price": "0.11314",
            "change_24h": "-12.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIEVERSE",
            "score": 85,
            "price": "0.68820",
            "change_24h": "-12.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZKP",
            "score": 85,
            "price": "0.08064",
            "change_24h": "-13.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVAAI",
            "score": 85,
            "price": "0.007082",
            "change_24h": "-18.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LUMIA",
            "score": 85,
            "price": "0.14939",
            "change_24h": "-23.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUMPBTC",
            "score": 85,
            "price": "0.01609",
            "change_24h": "-33.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEC",
            "score": 82,
            "price": "342.0900",
            "change_24h": "+5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CLANKER",
            "score": 82,
            "price": "23.7800",
            "change_24h": "+2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GLM",
            "score": 82,
            "price": "0.13830",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GENIUS",
            "score": 82,
            "price": "0.45960",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NOT",
            "score": 82,
            "price": "0.000389",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROVE",
            "score": 82,
            "price": "0.24540",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LA",
            "score": 82,
            "price": "0.15660",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000SATS",
            "score": 82,
            "price": "0.000014",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BSV",
            "score": 82,
            "price": "15.7500",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YGG",
            "score": 82,
            "price": "0.04042",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RVN",
            "score": 82,
            "price": "0.005810",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAS",
            "score": 82,
            "price": "0.03232",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SXT",
            "score": 82,
            "price": "0.01677",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AUCTION",
            "score": 82,
            "price": "4.7410",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUPER",
            "score": 82,
            "price": "0.12000",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IMX",
            "score": 82,
            "price": "0.16340",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UMA",
            "score": 82,
            "price": "0.45080",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GUA",
            "score": 80,
            "price": "0.89810",
            "change_24h": "+12.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "B2",
            "score": 80,
            "price": "0.53320",
            "change_24h": "+12.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARIA",
            "score": 80,
            "price": "0.06560",
            "change_24h": "+11.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIOT",
            "score": 80,
            "price": "0.12673",
            "change_24h": "+10.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POWER",
            "score": 80,
            "price": "0.09016",
            "change_24h": "+6.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NIL",
            "score": 80,
            "price": "0.03968",
            "change_24h": "+3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000CHEEMS",
            "score": 80,
            "price": "0.000613",
            "change_24h": "+3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PENDLE",
            "score": 80,
            "price": "1.3483",
            "change_24h": "+2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEN",
            "score": 80,
            "price": "5.7760",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAVIA",
            "score": 80,
            "price": "0.03671",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STBL",
            "score": 80,
            "price": "0.03315",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASTR",
            "score": 80,
            "price": "0.008040",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEAMX",
            "score": 80,
            "price": "0.001900",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SQD",
            "score": 80,
            "price": "0.03036",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HEI",
            "score": 80,
            "price": "0.08085",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALPINE",
            "score": 80,
            "price": "0.44440",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORDER",
            "score": 80,
            "price": "0.05390",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SCR",
            "score": 80,
            "price": "0.04429",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUNDIX",
            "score": 80,
            "price": "0.14540",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LSK",
            "score": 80,
            "price": "0.12440",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICX",
            "score": 80,
            "price": "0.03593",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HIVE",
            "score": 80,
            "price": "0.05901",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RPL",
            "score": 80,
            "price": "1.8010",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAIKO",
            "score": 80,
            "price": "0.11430",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VTHO",
            "score": 80,
            "price": "0.000563",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MLN",
            "score": 80,
            "price": "3.0250",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOTX",
            "score": 80,
            "price": "0.004500",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HAEDAL",
            "score": 80,
            "price": "0.03063",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLOCK",
            "score": 80,
            "price": "0.05905",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COW",
            "score": 80,
            "price": "0.18350",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CKB",
            "score": 80,
            "price": "0.001464",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IDOL",
            "score": 80,
            "price": "0.02296",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CARV",
            "score": 80,
            "price": "0.05566",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BMT",
            "score": 80,
            "price": "0.01515",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BABY",
            "score": 80,
            "price": "0.01466",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DIA",
            "score": 80,
            "price": "0.18170",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POWR",
            "score": 80,
            "price": "0.06159",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USUAL",
            "score": 80,
            "price": "0.01341",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETHW",
            "score": 80,
            "price": "0.30800",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APR",
            "score": 80,
            "price": "0.17024",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACE",
            "score": 80,
            "price": "0.11830",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYS",
            "score": 80,
            "price": "0.008740",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FRAX",
            "score": 80,
            "price": "0.45680",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000000BOB",
            "score": 80,
            "price": "0.01266",
            "change_24h": "-4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLUX",
            "score": 80,
            "price": "0.06357",
            "change_24h": "-4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BREV",
            "score": 80,
            "price": "0.11470",
            "change_24h": "-5.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLUID",
            "score": 80,
            "price": "1.4880",
            "change_24h": "-5.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YB",
            "score": 80,
            "price": "0.11540",
            "change_24h": "-5.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CROSS",
            "score": 80,
            "price": "0.09955",
            "change_24h": "-6.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEGA",
            "score": 80,
            "price": "0.15573",
            "change_24h": "-6.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SANTOS",
            "score": 80,
            "price": "1.1280",
            "change_24h": "-6.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAKE",
            "score": 80,
            "price": "0.02706",
            "change_24h": "-8.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MBOX",
            "score": 80,
            "price": "0.01179",
            "change_24h": "-9.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AGT",
            "score": 80,
            "price": "0.01778",
            "change_24h": "-13.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIGENSYN",
            "score": 80,
            "price": "0.03795",
            "change_24h": "-24.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRIA",
            "score": 77,
            "price": "0.03702",
            "change_24h": "+7.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVA",
            "score": 77,
            "price": "0.27040",
            "change_24h": "+7.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALLO",
            "score": 77,
            "price": "0.11688",
            "change_24h": "+6.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CETUS",
            "score": 77,
            "price": "0.02868",
            "change_24h": "+5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACU",
            "score": 77,
            "price": "0.09205",
            "change_24h": "+4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GMX",
            "score": 77,
            "price": "7.3350",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "QNT",
            "score": 77,
            "price": "69.5500",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ROSE",
            "score": 77,
            "price": "0.009830",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COTI",
            "score": 77,
            "price": "0.01365",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MTL",
            "score": 77,
            "price": "0.29520",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIO",
            "score": 75,
            "price": "0.04238",
            "change_24h": "+26.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000RATS",
            "score": 75,
            "price": "0.03873",
            "change_24h": "+5.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOPH",
            "score": 75,
            "price": "0.008662",
            "change_24h": "+1.4%",
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
            "coin": "ARPA",
            "score": 75,
            "price": "0.009860",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEL",
            "score": 75,
            "price": "0.10480",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOT",
            "score": 75,
            "price": "0.000426",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RLC",
            "score": 75,
            "price": "0.42750",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INX",
            "score": 75,
            "price": "0.009823",
            "change_24h": "-5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XVG",
            "score": 75,
            "price": "0.003069",
            "change_24h": "-5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACX",
            "score": 72,
            "price": "0.04322",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LIGHT",
            "score": 72,
            "price": "0.15310",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOME",
            "score": 72,
            "price": "0.01507",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDEN",
            "score": 72,
            "price": "0.03486",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CTK",
            "score": 72,
            "price": "0.17960",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALL",
            "score": 72,
            "price": "0.54680",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NXPC",
            "score": 72,
            "price": "0.29570",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CVC",
            "score": 72,
            "price": "0.03058",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "T",
            "score": 72,
            "price": "0.005820",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SLP",
            "score": 72,
            "price": "0.000692",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WAXP",
            "score": 72,
            "price": "0.006584",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYN",
            "score": 72,
            "price": "0.05269",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOCA",
            "score": 72,
            "price": "0.01359",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STORJ",
            "score": 72,
            "price": "0.09630",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLUAI",
            "score": 70,
            "price": "0.01357",
            "change_24h": "+19.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENSO",
            "score": 70,
            "price": "1.0511",
            "change_24h": "+18.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FORM",
            "score": 70,
            "price": "0.25820",
            "change_24h": "+6.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTCDOM",
            "score": 70,
            "price": "5460.60",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DODOX",
            "score": 70,
            "price": "0.01873",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "US",
            "score": 70,
            "price": "0.004319",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HANA",
            "score": 70,
            "price": "0.03818",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PHB",
            "score": 70,
            "price": "0.10720",
            "change_24h": "-6.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KOMA",
            "score": 70,
            "price": "0.006683",
            "change_24h": "-8.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000XEC",
            "score": 67,
            "price": "0.006950",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BNT",
            "score": 67,
            "price": "0.30660",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AKE",
            "score": 65,
            "price": "0.000343",
            "change_24h": "+28.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAGMA",
            "score": 62,
            "price": "0.22802",
            "change_24h": "+17.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKYAI",
            "score": 60,
            "price": "0.34027",
            "change_24h": "+29.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAG",
            "score": 60,
            "price": "0.000674",
            "change_24h": "+22.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUTH",
            "score": 60,
            "price": "0.009866",
            "change_24h": "+4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BR",
            "score": 50,
            "price": "0.16162",
            "change_24h": "+85.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BSB",
            "score": 50,
            "price": "0.57333",
            "change_24h": "+67.8%",
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
