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
    "label": "今天 · 2026-05-07",
    "data": [
      {
            "coin": "ICP",
            "score": 100,
            "price": "2.9790",
            "change_24h": "+9.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SIREN",
            "score": 100,
            "price": "0.81300",
            "change_24h": "+8.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KSM",
            "score": 100,
            "price": "5.4260",
            "change_24h": "+8.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STG",
            "score": 100,
            "price": "0.25050",
            "change_24h": "+7.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JTO",
            "score": 100,
            "price": "0.41370",
            "change_24h": "+6.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDGE",
            "score": 100,
            "price": "1.3751",
            "change_24h": "+6.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FARTCOIN",
            "score": 100,
            "price": "0.24480",
            "change_24h": "+6.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAO",
            "score": 100,
            "price": "304.3900",
            "change_24h": "+6.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHILLGUY",
            "score": 100,
            "price": "0.01818",
            "change_24h": "+6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POPCAT",
            "score": 100,
            "price": "0.06687",
            "change_24h": "+5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SANTOS",
            "score": 100,
            "price": "1.1870",
            "change_24h": "+5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLOCK",
            "score": 100,
            "price": "0.06463",
            "change_24h": "+4.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DEXE",
            "score": 100,
            "price": "11.3360",
            "change_24h": "+4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLUX",
            "score": 100,
            "price": "0.07326",
            "change_24h": "+4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORCA",
            "score": 100,
            "price": "1.6690",
            "change_24h": "+4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KITE",
            "score": 100,
            "price": "0.15340",
            "change_24h": "+4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VIRTUAL",
            "score": 100,
            "price": "0.85440",
            "change_24h": "+4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UB",
            "score": 100,
            "price": "0.14109",
            "change_24h": "+3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TST",
            "score": 100,
            "price": "0.02025",
            "change_24h": "+3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RIF",
            "score": 100,
            "price": "0.05453",
            "change_24h": "+3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENA",
            "score": 100,
            "price": "0.11539",
            "change_24h": "+3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DASH",
            "score": 100,
            "price": "50.4600",
            "change_24h": "+3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPX",
            "score": 100,
            "price": "0.41610",
            "change_24h": "+3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZK",
            "score": 100,
            "price": "0.01807",
            "change_24h": "+3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HAEDAL",
            "score": 100,
            "price": "0.03240",
            "change_24h": "+3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOON",
            "score": 100,
            "price": "0.17290",
            "change_24h": "+3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DIA",
            "score": 100,
            "price": "0.20040",
            "change_24h": "+3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "D",
            "score": 100,
            "price": "0.01149",
            "change_24h": "+2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RIVER",
            "score": 100,
            "price": "6.0120",
            "change_24h": "+2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIGTIME",
            "score": 100,
            "price": "0.01436",
            "change_24h": "+2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIDA",
            "score": 100,
            "price": "0.01787",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SONIC",
            "score": 100,
            "price": "0.03921",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOVR",
            "score": 100,
            "price": "2.2390",
            "change_24h": "+2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAHARA",
            "score": 100,
            "price": "0.02529",
            "change_24h": "+2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALGO",
            "score": 100,
            "price": "0.12130",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "S",
            "score": 100,
            "price": "0.04792",
            "change_24h": "+2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CAKE",
            "score": 100,
            "price": "1.5497",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARB",
            "score": 100,
            "price": "0.12370",
            "change_24h": "+1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PRL",
            "score": 100,
            "price": "0.27620",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NOT",
            "score": 100,
            "price": "0.000609",
            "change_24h": "+1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BNB",
            "score": 100,
            "price": "644.5000",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHZ",
            "score": 100,
            "price": "0.04262",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRIA",
            "score": 100,
            "price": "0.04554",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XPL",
            "score": 100,
            "price": "0.09660",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZRO",
            "score": 100,
            "price": "1.4472",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000BONK",
            "score": 100,
            "price": "0.006728",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WLFI",
            "score": 100,
            "price": "0.06710",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MON",
            "score": 100,
            "price": "0.03154",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRASS",
            "score": 100,
            "price": "0.35020",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NOM",
            "score": 100,
            "price": "0.002523",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000SATS",
            "score": 100,
            "price": "0.000016",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENJ",
            "score": 100,
            "price": "0.05009",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UNI",
            "score": 100,
            "price": "3.4120",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PENDLE",
            "score": 100,
            "price": "1.9204",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUMP",
            "score": 100,
            "price": "0.001899",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RED",
            "score": 100,
            "price": "0.14300",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANANAS31",
            "score": 100,
            "price": "0.01150",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CARV",
            "score": 100,
            "price": "0.05919",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENS",
            "score": 100,
            "price": "6.4990",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKYAI",
            "score": 100,
            "price": "0.77432",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPEN",
            "score": 100,
            "price": "0.21360",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATH",
            "score": 100,
            "price": "0.006429",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PLUME",
            "score": 100,
            "price": "0.01235",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EIGEN",
            "score": 100,
            "price": "0.19420",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BB",
            "score": 100,
            "price": "0.03208",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "0G",
            "score": 100,
            "price": "0.54470",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACE",
            "score": 100,
            "price": "0.12790",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORDI",
            "score": 100,
            "price": "5.1840",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DUSK",
            "score": 100,
            "price": "0.14343",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WIF",
            "score": 100,
            "price": "0.21480",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONDO",
            "score": 100,
            "price": "0.31930",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LINEA",
            "score": 100,
            "price": "0.003667",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BASED",
            "score": 100,
            "price": "0.08896",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IP",
            "score": 100,
            "price": "0.52890",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FET",
            "score": 100,
            "price": "0.21980",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TIA",
            "score": 100,
            "price": "0.37710",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RENDER",
            "score": 100,
            "price": "1.9060",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LDO",
            "score": 100,
            "price": "0.38170",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JUP",
            "score": 100,
            "price": "0.19390",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RUNE",
            "score": 100,
            "price": "0.54610",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PYTH",
            "score": 100,
            "price": "0.05028",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVAX",
            "score": 100,
            "price": "9.4820",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIL",
            "score": 100,
            "price": "1.0730",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTC",
            "score": 100,
            "price": "80934.80",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SEI",
            "score": 100,
            "price": "0.06010",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ROBO",
            "score": 100,
            "price": "0.02009",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "REZ",
            "score": 100,
            "price": "0.005267",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LPT",
            "score": 100,
            "price": "2.2060",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WLD",
            "score": 100,
            "price": "0.24960",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOLO",
            "score": 100,
            "price": "0.06937",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XLM",
            "score": 100,
            "price": "0.15992",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XRP",
            "score": 100,
            "price": "1.4049",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKY",
            "score": 100,
            "price": "0.07909",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AXS",
            "score": 100,
            "price": "1.3500",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PARTI",
            "score": 100,
            "price": "0.05075",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HBAR",
            "score": 100,
            "price": "0.08987",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPK",
            "score": 100,
            "price": "0.03517",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEME",
            "score": 100,
            "price": "0.000600",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AAVE",
            "score": 100,
            "price": "92.2900",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATOM",
            "score": 100,
            "price": "1.8750",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AR",
            "score": 100,
            "price": "2.4800",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BERA",
            "score": 100,
            "price": "0.37630",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALLO",
            "score": 100,
            "price": "0.11031",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000FLOKI",
            "score": 100,
            "price": "0.03314",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INJ",
            "score": 100,
            "price": "3.7960",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NIGHT",
            "score": 100,
            "price": "0.03199",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APT",
            "score": 100,
            "price": "1.0024",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETH",
            "score": 100,
            "price": "2320.10",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "4",
            "score": 100,
            "price": "0.01322",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRB",
            "score": 100,
            "price": "19.5960",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PNUT",
            "score": 100,
            "price": "0.05981",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUMP",
            "score": 100,
            "price": "2.3300",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETHFI",
            "score": 100,
            "price": "0.42380",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASTER",
            "score": 100,
            "price": "0.66580",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "2Z",
            "score": 100,
            "price": "0.09318",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVNT",
            "score": 100,
            "price": "0.14560",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIXBT",
            "score": 100,
            "price": "0.03313",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOODENG",
            "score": 100,
            "price": "0.06202",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COMP",
            "score": 100,
            "price": "23.0500",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FOGO",
            "score": 100,
            "price": "0.01919",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RAYSOL",
            "score": 100,
            "price": "0.79010",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TURBO",
            "score": 100,
            "price": "0.001282",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STEEM",
            "score": 100,
            "price": "0.05819",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENSO",
            "score": 100,
            "price": "0.91090",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "W",
            "score": 100,
            "price": "0.01347",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZIL",
            "score": 100,
            "price": "0.004330",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MORPHO",
            "score": 100,
            "price": "2.1860",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STO",
            "score": 100,
            "price": "0.08442",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDU",
            "score": 100,
            "price": "0.04501",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HYPER",
            "score": 100,
            "price": "0.10571",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GIGGLE",
            "score": 100,
            "price": "35.3600",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEGA",
            "score": 100,
            "price": "0.12283",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APE",
            "score": 100,
            "price": "0.15380",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HYPE",
            "score": 100,
            "price": "42.3630",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DYDX",
            "score": 100,
            "price": "0.14560",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WAL",
            "score": 100,
            "price": "0.07434",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GLM",
            "score": 100,
            "price": "0.13906",
            "change_24h": "-4.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HIVE",
            "score": 100,
            "price": "0.06555",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BABY",
            "score": 100,
            "price": "0.01704",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOGE",
            "score": 100,
            "price": "0.11052",
            "change_24h": "-4.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AXL",
            "score": 100,
            "price": "0.07201",
            "change_24h": "-4.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAT",
            "score": 100,
            "price": "0.009110",
            "change_24h": "-4.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZBT",
            "score": 100,
            "price": "0.18235",
            "change_24h": "-4.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BOME",
            "score": 100,
            "price": "0.000580",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIO",
            "score": 100,
            "price": "0.04828",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAS",
            "score": 97,
            "price": "0.03634",
            "change_24h": "+3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JST",
            "score": 97,
            "price": "0.08718",
            "change_24h": "+3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VANA",
            "score": 97,
            "price": "1.5980",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CFG",
            "score": 95,
            "price": "0.26350",
            "change_24h": "+14.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INIT",
            "score": 95,
            "price": "0.09996",
            "change_24h": "+9.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GUN",
            "score": 95,
            "price": "0.01565",
            "change_24h": "+7.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OP",
            "score": 95,
            "price": "0.14010",
            "change_24h": "+5.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STX",
            "score": 95,
            "price": "0.26010",
            "change_24h": "+4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CGPT",
            "score": 95,
            "price": "0.02827",
            "change_24h": "+3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IRYS",
            "score": 95,
            "price": "0.03550",
            "change_24h": "+3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KMNO",
            "score": 95,
            "price": "0.02142",
            "change_24h": "+2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OG",
            "score": 95,
            "price": "3.1160",
            "change_24h": "+2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANK",
            "score": 95,
            "price": "0.03415",
            "change_24h": "+2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAPIEN",
            "score": 95,
            "price": "0.10112",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GPS",
            "score": 95,
            "price": "0.008195",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AZTEC",
            "score": 95,
            "price": "0.02128",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GALA",
            "score": 95,
            "price": "0.003691",
            "change_24h": "+1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASR",
            "score": 95,
            "price": "1.2720",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEC",
            "score": 95,
            "price": "536.6400",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VANRY",
            "score": 95,
            "price": "0.005462",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SCR",
            "score": 95,
            "price": "0.04934",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SQD",
            "score": 95,
            "price": "0.03475",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GWEI",
            "score": 95,
            "price": "0.13598",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALPINE",
            "score": 95,
            "price": "0.47200",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BCH",
            "score": 95,
            "price": "462.2800",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COOKIE",
            "score": 95,
            "price": "0.01810",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOL",
            "score": 95,
            "price": "87.7900",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SCRT",
            "score": 95,
            "price": "0.11074",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ADA",
            "score": 95,
            "price": "0.26440",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USUAL",
            "score": 95,
            "price": "0.01552",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LINK",
            "score": 95,
            "price": "9.8730",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEAT",
            "score": 95,
            "price": "0.54500",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRT",
            "score": 95,
            "price": "0.02600",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WET",
            "score": 95,
            "price": "0.09430",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VELVET",
            "score": 95,
            "price": "0.09272",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APR",
            "score": 95,
            "price": "0.16945",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SNX",
            "score": 95,
            "price": "0.32640",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAND",
            "score": 95,
            "price": "0.07627",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VET",
            "score": 95,
            "price": "0.007560",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARKM",
            "score": 95,
            "price": "0.12910",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ROSE",
            "score": 95,
            "price": "0.01049",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UAI",
            "score": 95,
            "price": "0.32110",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOT",
            "score": 95,
            "price": "1.2940",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALL",
            "score": 95,
            "price": "0.58980",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOTA",
            "score": 95,
            "price": "0.05820",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IMX",
            "score": 95,
            "price": "0.17160",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANA",
            "score": 95,
            "price": "0.09140",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LTC",
            "score": 95,
            "price": "56.1800",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CRV",
            "score": 95,
            "price": "0.24200",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KERNEL",
            "score": 95,
            "price": "0.06249",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETC",
            "score": 95,
            "price": "9.1900",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUNDIX",
            "score": 95,
            "price": "0.15440",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUI",
            "score": 95,
            "price": "0.96910",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKR",
            "score": 95,
            "price": "0.01614",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STABLE",
            "score": 95,
            "price": "0.03314",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000SHIB",
            "score": 95,
            "price": "0.006304",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUSHI",
            "score": 95,
            "price": "0.22620",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPG",
            "score": 95,
            "price": "0.25970",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "C",
            "score": 95,
            "price": "0.07863",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RSR",
            "score": 95,
            "price": "0.001979",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NFP",
            "score": 95,
            "price": "0.01275",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BARD",
            "score": 95,
            "price": "0.26900",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SIGN",
            "score": 95,
            "price": "0.01554",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000PEPE",
            "score": 95,
            "price": "0.004095",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "THETA",
            "score": 95,
            "price": "0.20930",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LYN",
            "score": 95,
            "price": "0.06500",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOME",
            "score": 95,
            "price": "0.01314",
            "change_24h": "-4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AERO",
            "score": 95,
            "price": "0.44510",
            "change_24h": "-6.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ANKR",
            "score": 95,
            "price": "0.005028",
            "change_24h": "-6.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIPPIN",
            "score": 95,
            "price": "0.02390",
            "change_24h": "-6.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RAVE",
            "score": 95,
            "price": "0.63540",
            "change_24h": "-6.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHIP",
            "score": 95,
            "price": "0.05204",
            "change_24h": "-7.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLUR",
            "score": 95,
            "price": "0.02616",
            "change_24h": "-7.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DRIFT",
            "score": 95,
            "price": "0.03514",
            "change_24h": "-8.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANANA",
            "score": 92,
            "price": "4.3280",
            "change_24h": "+5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FF",
            "score": 92,
            "price": "0.06375",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIXEL",
            "score": 92,
            "price": "0.008351",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRX",
            "score": 92,
            "price": "0.34489",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POL",
            "score": 92,
            "price": "0.09866",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CC",
            "score": 92,
            "price": "0.14715",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CATI",
            "score": 90,
            "price": "0.07111",
            "change_24h": "+14.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NIL",
            "score": 90,
            "price": "0.04583",
            "change_24h": "+12.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GUA",
            "score": 90,
            "price": "0.92880",
            "change_24h": "+8.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USELESS",
            "score": 90,
            "price": "0.04647",
            "change_24h": "+6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ESPORTS",
            "score": 90,
            "price": "0.41660",
            "change_24h": "+5.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOTX",
            "score": 90,
            "price": "0.004840",
            "change_24h": "+2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FOLKS",
            "score": 90,
            "price": "1.4220",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIEVERSE",
            "score": 90,
            "price": "0.73870",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "H",
            "score": 90,
            "price": "0.20307",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YB",
            "score": 90,
            "price": "0.11770",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MINA",
            "score": 90,
            "price": "0.06398",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TWT",
            "score": 90,
            "price": "0.43940",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLUAI",
            "score": 90,
            "price": "0.01559",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "B2",
            "score": 90,
            "price": "0.63380",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SLP",
            "score": 90,
            "price": "0.000732",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AUCTION",
            "score": 90,
            "price": "4.8990",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XTZ",
            "score": 90,
            "price": "0.37620",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "A",
            "score": 90,
            "price": "0.08905",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MMT",
            "score": 90,
            "price": "0.13750",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IN",
            "score": 90,
            "price": "0.06748",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MASK",
            "score": 90,
            "price": "0.50250",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GMT",
            "score": 90,
            "price": "0.01113",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PHA",
            "score": 90,
            "price": "0.03404",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZETA",
            "score": 90,
            "price": "0.05992",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COW",
            "score": 90,
            "price": "0.17640",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEAMX",
            "score": 90,
            "price": "0.001982",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAC",
            "score": 90,
            "price": "0.02226",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "QNT",
            "score": 90,
            "price": "69.8300",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SENT",
            "score": 90,
            "price": "0.01658",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CYBER",
            "score": 90,
            "price": "0.55110",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUST",
            "score": 90,
            "price": "0.06948",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZRX",
            "score": 90,
            "price": "0.11320",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AEVO",
            "score": 90,
            "price": "0.02885",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOMI",
            "score": 90,
            "price": "0.18730",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NMR",
            "score": 90,
            "price": "8.8680",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "F",
            "score": 90,
            "price": "0.005663",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKL",
            "score": 90,
            "price": "0.007030",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZKP",
            "score": 90,
            "price": "0.08413",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ME",
            "score": 90,
            "price": "0.10770",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUPER",
            "score": 90,
            "price": "0.12560",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000RATS",
            "score": 90,
            "price": "0.03844",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MELANIA",
            "score": 90,
            "price": "0.10600",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STBL",
            "score": 90,
            "price": "0.03672",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MIRA",
            "score": 90,
            "price": "0.08205",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROVE",
            "score": 90,
            "price": "0.25490",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XMR",
            "score": 90,
            "price": "405.6600",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AT",
            "score": 90,
            "price": "0.16515",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WAXP",
            "score": 90,
            "price": "0.006828",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TLM",
            "score": 90,
            "price": "0.001904",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TNSR",
            "score": 90,
            "price": "0.04039",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RARE",
            "score": 90,
            "price": "0.01723",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TOSHI",
            "score": 90,
            "price": "0.000184",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LAYER",
            "score": 90,
            "price": "0.08621",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACT",
            "score": 90,
            "price": "0.01593",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAFE",
            "score": 90,
            "price": "0.13650",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAT",
            "score": 90,
            "price": "0.10530",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KOMA",
            "score": 90,
            "price": "0.007294",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AGLD",
            "score": 90,
            "price": "0.25250",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "METIS",
            "score": 90,
            "price": "3.6370",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIRB",
            "score": 90,
            "price": "0.13350",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOVE",
            "score": 90,
            "price": "0.01795",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UMA",
            "score": 90,
            "price": "0.47390",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "G",
            "score": 90,
            "price": "0.003699",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEW",
            "score": 90,
            "price": "0.000623",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALT",
            "score": 90,
            "price": "0.007893",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LISTA",
            "score": 90,
            "price": "0.08641",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEWT",
            "score": 90,
            "price": "0.07544",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAGIC",
            "score": 90,
            "price": "0.06664",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLOW",
            "score": 90,
            "price": "0.03971",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAIA",
            "score": 90,
            "price": "0.04629",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "THE",
            "score": 90,
            "price": "0.10190",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ANIME",
            "score": 90,
            "price": "0.004819",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BSV",
            "score": 90,
            "price": "16.2000",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANTRA",
            "score": 90,
            "price": "0.01003",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MET",
            "score": 90,
            "price": "0.16490",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOPH",
            "score": 90,
            "price": "0.008698",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EUL",
            "score": 90,
            "price": "1.3703",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ILV",
            "score": 90,
            "price": "4.6690",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORDER",
            "score": 90,
            "price": "0.05728",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RVN",
            "score": 90,
            "price": "0.005980",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TURTLE",
            "score": 90,
            "price": "0.05376",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ESP",
            "score": 90,
            "price": "0.06958",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GAS",
            "score": 90,
            "price": "1.6410",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1INCH",
            "score": 90,
            "price": "0.09700",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BREV",
            "score": 90,
            "price": "0.11850",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000000MOG",
            "score": 90,
            "price": "0.15080",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROMPT",
            "score": 90,
            "price": "0.03330",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RONIN",
            "score": 90,
            "price": "0.09930",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BRETT",
            "score": 90,
            "price": "0.007943",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAGA",
            "score": 90,
            "price": "0.01810",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TREE",
            "score": 90,
            "price": "0.06795",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "T",
            "score": 90,
            "price": "0.006034",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZKC",
            "score": 90,
            "price": "0.07443",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CETUS",
            "score": 90,
            "price": "0.02732",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ELSA",
            "score": 90,
            "price": "0.07481",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MBOX",
            "score": 90,
            "price": "0.01157",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POWR",
            "score": 90,
            "price": "0.06585",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAN",
            "score": 90,
            "price": "0.008496",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MYX",
            "score": 90,
            "price": "0.24380",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YGG",
            "score": 90,
            "price": "0.04341",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1MBABYDOGE",
            "score": 90,
            "price": "0.000434",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OGN",
            "score": 90,
            "price": "0.02385",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CVX",
            "score": 90,
            "price": "1.7780",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GOAT",
            "score": 90,
            "price": "0.01869",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LSK",
            "score": 90,
            "price": "0.13180",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VIC",
            "score": 90,
            "price": "0.04622",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RESOLV",
            "score": 90,
            "price": "0.03072",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TOWNS",
            "score": 90,
            "price": "0.003535",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARK",
            "score": 90,
            "price": "0.17720",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LA",
            "score": 90,
            "price": "0.13740",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACX",
            "score": 90,
            "price": "0.04319",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOLO",
            "score": 90,
            "price": "0.03172",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANTA",
            "score": 90,
            "price": "0.06670",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COAI",
            "score": 90,
            "price": "0.34310",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EPIC",
            "score": 90,
            "price": "0.34570",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WCT",
            "score": 90,
            "price": "0.06411",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HUMA",
            "score": 90,
            "price": "0.02099",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAI",
            "score": 90,
            "price": "0.01105",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POLYX",
            "score": 90,
            "price": "0.04992",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOLV",
            "score": 90,
            "price": "0.004231",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAVA",
            "score": 90,
            "price": "0.06160",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRADOOR",
            "score": 90,
            "price": "0.70880",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BROCCOLI714",
            "score": 90,
            "price": "0.01814",
            "change_24h": "-4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOOD",
            "score": 90,
            "price": "0.003198",
            "change_24h": "-4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPN",
            "score": 90,
            "price": "0.17840",
            "change_24h": "-4.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYRUP",
            "score": 90,
            "price": "0.24481",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIO",
            "score": 90,
            "price": "0.10275",
            "change_24h": "-4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVAAI",
            "score": 90,
            "price": "0.006937",
            "change_24h": "-4.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MUBARAK",
            "score": 90,
            "price": "0.01580",
            "change_24h": "-5.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LIT",
            "score": 90,
            "price": "0.92440",
            "change_24h": "-5.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEN",
            "score": 90,
            "price": "7.1310",
            "change_24h": "-5.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STRK",
            "score": 90,
            "price": "0.04021",
            "change_24h": "-5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "API3",
            "score": 90,
            "price": "0.36090",
            "change_24h": "-5.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIGENSYN",
            "score": 90,
            "price": "0.03046",
            "change_24h": "-5.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZAMA",
            "score": 90,
            "price": "0.02800",
            "change_24h": "-6.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEIRO",
            "score": 90,
            "price": "0.000094",
            "change_24h": "-6.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AKT",
            "score": 90,
            "price": "0.60550",
            "change_24h": "-6.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PENGU",
            "score": 90,
            "price": "0.01032",
            "change_24h": "-7.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "币安人生",
            "score": 90,
            "price": "0.34864",
            "change_24h": "-7.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MERL",
            "score": 90,
            "price": "0.03599",
            "change_24h": "-8.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SXT",
            "score": 90,
            "price": "0.01359",
            "change_24h": "-8.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FORM",
            "score": 90,
            "price": "0.26880",
            "change_24h": "-9.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAS",
            "score": 90,
            "price": "0.01633",
            "change_24h": "-9.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LUNA2",
            "score": 90,
            "price": "0.06789",
            "change_24h": "-9.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONT",
            "score": 90,
            "price": "0.06210",
            "change_24h": "-12.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PORTAL",
            "score": 90,
            "price": "0.01015",
            "change_24h": "-13.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USTC",
            "score": 90,
            "price": "0.006886",
            "change_24h": "-14.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HIGH",
            "score": 90,
            "price": "0.18500",
            "change_24h": "-16.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STORJ",
            "score": 90,
            "price": "0.11220",
            "change_24h": "-17.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAITO",
            "score": 87,
            "price": "0.50820",
            "change_24h": "+6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TUT",
            "score": 87,
            "price": "0.01313",
            "change_24h": "+4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NXPC",
            "score": 87,
            "price": "0.31150",
            "change_24h": "+3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LQTY",
            "score": 87,
            "price": "0.32410",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CFX",
            "score": 87,
            "price": "0.06349",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEAR",
            "score": 85,
            "price": "1.4800",
            "change_24h": "+12.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAG",
            "score": 85,
            "price": "0.001503",
            "change_24h": "+11.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "M",
            "score": 85,
            "price": "3.7692",
            "change_24h": "+8.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NAORIS",
            "score": 85,
            "price": "0.15185",
            "change_24h": "+7.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PLAY",
            "score": 85,
            "price": "0.10925",
            "change_24h": "+6.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPORTFUN",
            "score": 85,
            "price": "0.06101",
            "change_24h": "+4.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLESS",
            "score": 85,
            "price": "0.006376",
            "change_24h": "+2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAUT",
            "score": 85,
            "price": "4688.51",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PAXG",
            "score": 85,
            "price": "4688.47",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ON",
            "score": 85,
            "price": "0.13611",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BICO",
            "score": 85,
            "price": "0.02514",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COLLECT",
            "score": 85,
            "price": "0.02997",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEO",
            "score": 85,
            "price": "2.9040",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JASMY",
            "score": 85,
            "price": "0.005783",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARPA",
            "score": 85,
            "price": "0.01035",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AGT",
            "score": 85,
            "price": "0.01228",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "QTUM",
            "score": 85,
            "price": "0.90600",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEL",
            "score": 85,
            "price": "0.11180",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000XEC",
            "score": 85,
            "price": "0.007330",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CKB",
            "score": 85,
            "price": "0.001549",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HFT",
            "score": 85,
            "price": "0.01503",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPELL",
            "score": 85,
            "price": "0.000170",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATA",
            "score": 85,
            "price": "0.01042",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000000BOB",
            "score": 85,
            "price": "0.01754",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOST",
            "score": 85,
            "price": "0.001095",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CELO",
            "score": 85,
            "price": "0.09155",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "C98",
            "score": 85,
            "price": "0.02156",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RLC",
            "score": 85,
            "price": "0.46980",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PHB",
            "score": 85,
            "price": "0.10910",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAV",
            "score": 85,
            "price": "0.01525",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOT",
            "score": 85,
            "price": "0.000431",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUMPBTC",
            "score": 85,
            "price": "0.01567",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GMX",
            "score": 85,
            "price": "7.2510",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JOE",
            "score": 85,
            "price": "0.04744",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XVS",
            "score": 85,
            "price": "2.6050",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MTL",
            "score": 85,
            "price": "0.31640",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EGLD",
            "score": 85,
            "price": "4.2350",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASTR",
            "score": 85,
            "price": "0.008777",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SSV",
            "score": 85,
            "price": "2.8260",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YFI",
            "score": 85,
            "price": "2704.00",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAND",
            "score": 85,
            "price": "0.22630",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONE",
            "score": 85,
            "price": "0.002334",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ID",
            "score": 85,
            "price": "0.03192",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WOO",
            "score": 85,
            "price": "0.01939",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CTSI",
            "score": 85,
            "price": "0.03257",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COTI",
            "score": 85,
            "price": "0.01393",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACH",
            "score": 85,
            "price": "0.007742",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PEOPLE",
            "score": 85,
            "price": "0.008250",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHR",
            "score": 85,
            "price": "0.02588",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JCT",
            "score": 85,
            "price": "0.003035",
            "change_24h": "-6.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XVG",
            "score": 85,
            "price": "0.003685",
            "change_24h": "-6.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BR",
            "score": 85,
            "price": "0.16744",
            "change_24h": "-7.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CLANKER",
            "score": 85,
            "price": "26.3500",
            "change_24h": "-12.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRIFFAIN",
            "score": 85,
            "price": "0.01462",
            "change_24h": "-12.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALICE",
            "score": 85,
            "price": "0.13500",
            "change_24h": "-13.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BSB",
            "score": 85,
            "price": "0.47426",
            "change_24h": "-21.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLUID",
            "score": 82,
            "price": "1.7360",
            "change_24h": "+3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IO",
            "score": 80,
            "price": "0.15330",
            "change_24h": "+21.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HMSTR",
            "score": 80,
            "price": "0.000217",
            "change_24h": "+16.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GENIUS",
            "score": 80,
            "price": "0.57940",
            "change_24h": "+13.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACU",
            "score": 80,
            "price": "0.12239",
            "change_24h": "+11.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICNT",
            "score": 80,
            "price": "0.39010",
            "change_24h": "+10.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ERA",
            "score": 80,
            "price": "0.14260",
            "change_24h": "+4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUN",
            "score": 80,
            "price": "0.02004",
            "change_24h": "+2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIN",
            "score": 80,
            "price": "0.09648",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GTC",
            "score": 80,
            "price": "0.09016",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FRAX",
            "score": 80,
            "price": "0.47640",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "US",
            "score": 80,
            "price": "0.004904",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CTK",
            "score": 80,
            "price": "0.18120",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HEI",
            "score": 80,
            "price": "0.08528",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VTHO",
            "score": 80,
            "price": "0.000594",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XPIN",
            "score": 80,
            "price": "0.001243",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COS",
            "score": 80,
            "price": "0.001139",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AERGO",
            "score": 80,
            "price": "0.05544",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALCH",
            "score": 80,
            "price": "0.07791",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOCA",
            "score": 80,
            "price": "0.01363",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RPL",
            "score": 80,
            "price": "1.9330",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VELODROME",
            "score": 80,
            "price": "0.01747",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYN",
            "score": 80,
            "price": "0.05436",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BROCCOLIF3B",
            "score": 80,
            "price": "0.004481",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAIKO",
            "score": 80,
            "price": "0.11630",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICX",
            "score": 80,
            "price": "0.03803",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MITO",
            "score": 80,
            "price": "0.05181",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LIGHT",
            "score": 80,
            "price": "0.14910",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BMT",
            "score": 80,
            "price": "0.01628",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BULLA",
            "score": 80,
            "price": "0.006791",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JELLYJELLY",
            "score": 80,
            "price": "0.05289",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CVC",
            "score": 80,
            "price": "0.03135",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000CHEEMS",
            "score": 80,
            "price": "0.000628",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "我踏马来了",
            "score": 80,
            "price": "0.01069",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MLN",
            "score": 80,
            "price": "3.0390",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POWER",
            "score": 80,
            "price": "0.08409",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETHW",
            "score": 80,
            "price": "0.31380",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVA",
            "score": 80,
            "price": "0.27420",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IDOL",
            "score": 80,
            "price": "0.02516",
            "change_24h": "-4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DODOX",
            "score": 80,
            "price": "0.01863",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KGEN",
            "score": 80,
            "price": "0.18330",
            "change_24h": "-5.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DYM",
            "score": 80,
            "price": "0.01955",
            "change_24h": "-5.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYS",
            "score": 80,
            "price": "0.008860",
            "change_24h": "-5.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZORA",
            "score": 80,
            "price": "0.01283",
            "change_24h": "-5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HEMI",
            "score": 80,
            "price": "0.007514",
            "change_24h": "-5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIA",
            "score": 80,
            "price": "0.04981",
            "change_24h": "-5.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDEN",
            "score": 80,
            "price": "0.03596",
            "change_24h": "-5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SHELL",
            "score": 80,
            "price": "0.03641",
            "change_24h": "-5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RECALL",
            "score": 80,
            "price": "0.05133",
            "change_24h": "-5.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DEEP",
            "score": 80,
            "price": "0.03033",
            "change_24h": "-6.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CROSS",
            "score": 80,
            "price": "0.09472",
            "change_24h": "-7.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAVIA",
            "score": 80,
            "price": "0.03968",
            "change_24h": "-8.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CYS",
            "score": 80,
            "price": "0.46410",
            "change_24h": "-8.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPACE",
            "score": 80,
            "price": "0.007148",
            "change_24h": "-9.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIOT",
            "score": 80,
            "price": "0.08295",
            "change_24h": "-9.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LUMIA",
            "score": 80,
            "price": "0.11701",
            "change_24h": "-9.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAN",
            "score": 80,
            "price": "0.06866",
            "change_24h": "-9.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONG",
            "score": 80,
            "price": "0.06796",
            "change_24h": "-10.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000LUNC",
            "score": 80,
            "price": "0.08708",
            "change_24h": "-22.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KNC",
            "score": 77,
            "price": "0.15050",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EVAA",
            "score": 75,
            "price": "0.70880",
            "change_24h": "+18.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USDC",
            "score": 75,
            "price": "0.99949",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CELR",
            "score": 75,
            "price": "0.002840",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SFP",
            "score": 75,
            "price": "0.31870",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BNT",
            "score": 75,
            "price": "0.32270",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SWARMS",
            "score": 75,
            "price": "0.02615",
            "change_24h": "-10.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PTB",
            "score": 75,
            "price": "0.000701",
            "change_24h": "-10.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAKE",
            "score": 75,
            "price": "0.02537",
            "change_24h": "-11.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "B",
            "score": 75,
            "price": "0.31270",
            "change_24h": "-30.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARC",
            "score": 72,
            "price": "0.07093",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AWE",
            "score": 72,
            "price": "0.05651",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VVV",
            "score": 70,
            "price": "12.5710",
            "change_24h": "+19.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROM",
            "score": 70,
            "price": "2.1410",
            "change_24h": "+6.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000CAT",
            "score": 70,
            "price": "0.002200",
            "change_24h": "+5.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "Q",
            "score": 70,
            "price": "0.01043",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HANA",
            "score": 70,
            "price": "0.03760",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTCDOM",
            "score": 70,
            "price": "5570.80",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUTH",
            "score": 70,
            "price": "0.009452",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAGMA",
            "score": 70,
            "price": "0.23609",
            "change_24h": "-5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "龙虾",
            "score": 70,
            "price": "0.007365",
            "change_24h": "-5.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARIA",
            "score": 70,
            "price": "0.05770",
            "change_24h": "-5.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTR",
            "score": 70,
            "price": "0.02971",
            "change_24h": "-6.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INX",
            "score": 70,
            "price": "0.009400",
            "change_24h": "-6.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AKE",
            "score": 70,
            "price": "0.000314",
            "change_24h": "-7.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIGHT",
            "score": 70,
            "price": "0.004283",
            "change_24h": "-8.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CLO",
            "score": 70,
            "price": "0.10488",
            "change_24h": "-8.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TA",
            "score": 65,
            "price": "0.05205",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOGS",
            "score": 60,
            "price": "0.000101",
            "change_24h": "+64.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TON",
            "score": 60,
            "price": "2.7171",
            "change_24h": "+32.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XNY",
            "score": 60,
            "price": "0.007994",
            "change_24h": "+19.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEREBRO",
            "score": 55,
            "price": "0.03884",
            "change_24h": "+32.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LAB",
            "score": 50,
            "price": "4.5109",
            "change_24h": "+64.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FHE",
            "score": 50,
            "price": "0.05270",
            "change_24h": "+42.5%",
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
