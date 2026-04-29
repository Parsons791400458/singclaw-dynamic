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
    "label": "今天 · 2026-04-29",
    "data": [
      {
            "coin": "BROCCOLI714",
            "score": 100,
            "price": "0.01799",
            "change_24h": "+11.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEREBRO",
            "score": 100,
            "price": "0.01919",
            "change_24h": "+9.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "REZ",
            "score": 100,
            "price": "0.004338",
            "change_24h": "+9.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APE",
            "score": 100,
            "price": "0.15340",
            "change_24h": "+8.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LIT",
            "score": 100,
            "price": "0.92580",
            "change_24h": "+8.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZKJ",
            "score": 100,
            "price": "0.01923",
            "change_24h": "+8.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MUBARAK",
            "score": 100,
            "price": "0.01426",
            "change_24h": "+7.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLOW",
            "score": 100,
            "price": "0.04066",
            "change_24h": "+7.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUMP",
            "score": 100,
            "price": "0.001889",
            "change_24h": "+7.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEAT",
            "score": 100,
            "price": "0.57910",
            "change_24h": "+6.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACH",
            "score": 100,
            "price": "0.007372",
            "change_24h": "+5.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DRIFT",
            "score": 100,
            "price": "0.03634",
            "change_24h": "+4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TUT",
            "score": 100,
            "price": "0.01120",
            "change_24h": "+4.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORCA",
            "score": 100,
            "price": "1.5360",
            "change_24h": "+4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZK",
            "score": 100,
            "price": "0.01594",
            "change_24h": "+4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TST",
            "score": 100,
            "price": "0.01113",
            "change_24h": "+4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAN",
            "score": 100,
            "price": "0.008700",
            "change_24h": "+3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GUN",
            "score": 100,
            "price": "0.01465",
            "change_24h": "+3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "S",
            "score": 100,
            "price": "0.04692",
            "change_24h": "+3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CYS",
            "score": 100,
            "price": "0.49170",
            "change_24h": "+3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FARTCOIN",
            "score": 100,
            "price": "0.20520",
            "change_24h": "+3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INIT",
            "score": 100,
            "price": "0.09333",
            "change_24h": "+3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDU",
            "score": 100,
            "price": "0.04661",
            "change_24h": "+2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BULLA",
            "score": 100,
            "price": "0.007183",
            "change_24h": "+2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASTER",
            "score": 100,
            "price": "0.65640",
            "change_24h": "+2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XTZ",
            "score": 100,
            "price": "0.38780",
            "change_24h": "+2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PENDLE",
            "score": 100,
            "price": "1.3431",
            "change_24h": "+2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000CHEEMS",
            "score": 100,
            "price": "0.000596",
            "change_24h": "+2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIXEL",
            "score": 100,
            "price": "0.008520",
            "change_24h": "+2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GOAT",
            "score": 100,
            "price": "0.01753",
            "change_24h": "+2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "我踏马来了",
            "score": 100,
            "price": "0.01022",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOCA",
            "score": 100,
            "price": "0.01410",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPACE",
            "score": 100,
            "price": "0.006990",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RED",
            "score": 100,
            "price": "0.13090",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOON",
            "score": 100,
            "price": "0.16840",
            "change_24h": "+2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PLUME",
            "score": 100,
            "price": "0.01249",
            "change_24h": "+2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HYPER",
            "score": 100,
            "price": "0.12254",
            "change_24h": "+1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORDI",
            "score": 100,
            "price": "4.4070",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SIGN",
            "score": 100,
            "price": "0.01580",
            "change_24h": "+1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEIRO",
            "score": 100,
            "price": "0.000088",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRADOOR",
            "score": 100,
            "price": "0.79200",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRASS",
            "score": 100,
            "price": "0.35340",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZAMA",
            "score": 100,
            "price": "0.02682",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONT",
            "score": 100,
            "price": "0.07170",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIA",
            "score": 100,
            "price": "0.05095",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CFG",
            "score": 100,
            "price": "0.20770",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOVR",
            "score": 100,
            "price": "2.3530",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVNT",
            "score": 100,
            "price": "0.15330",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PENGU",
            "score": 100,
            "price": "0.009962",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "币安人生",
            "score": 100,
            "price": "0.36976",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAT",
            "score": 100,
            "price": "0.01127",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MASK",
            "score": 100,
            "price": "0.52240",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USTC",
            "score": 100,
            "price": "0.006028",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LUNA2",
            "score": 100,
            "price": "0.06503",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAITO",
            "score": 100,
            "price": "0.42950",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BERA",
            "score": 100,
            "price": "0.37300",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "D",
            "score": 100,
            "price": "0.01227",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BARD",
            "score": 100,
            "price": "0.28510",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOMI",
            "score": 100,
            "price": "0.17930",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STO",
            "score": 100,
            "price": "0.08897",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JUP",
            "score": 100,
            "price": "0.18940",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "0G",
            "score": 100,
            "price": "0.55310",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PNUT",
            "score": 100,
            "price": "0.05488",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLUR",
            "score": 100,
            "price": "0.02754",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUMP",
            "score": 100,
            "price": "2.4800",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ROBO",
            "score": 100,
            "price": "0.02055",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PRL",
            "score": 100,
            "price": "0.32760",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENJ",
            "score": 100,
            "price": "0.05782",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FF",
            "score": 100,
            "price": "0.06530",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INJ",
            "score": 100,
            "price": "3.5760",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FET",
            "score": 100,
            "price": "0.19900",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IP",
            "score": 100,
            "price": "0.50460",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HYPE",
            "score": 100,
            "price": "40.2550",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PAXG",
            "score": 100,
            "price": "4587.42",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAUT",
            "score": 100,
            "price": "4589.05",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPX",
            "score": 100,
            "price": "0.36770",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BASED",
            "score": 100,
            "price": "0.13914",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAHARA",
            "score": 100,
            "price": "0.02287",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENSO",
            "score": 100,
            "price": "0.90630",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKY",
            "score": 100,
            "price": "0.08647",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XLM",
            "score": 100,
            "price": "0.16186",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AXS",
            "score": 100,
            "price": "1.4790",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANANAS31",
            "score": 100,
            "price": "0.009356",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIRB",
            "score": 100,
            "price": "0.13401",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XPL",
            "score": 100,
            "price": "0.09570",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000LUNC",
            "score": 100,
            "price": "0.06624",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VANA",
            "score": 100,
            "price": "1.4830",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LDO",
            "score": 100,
            "price": "0.39120",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SIREN",
            "score": 100,
            "price": "0.68280",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MON",
            "score": 100,
            "price": "0.02931",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GPS",
            "score": 100,
            "price": "0.007510",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPELL",
            "score": 100,
            "price": "0.000175",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDGE",
            "score": 100,
            "price": "1.3266",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GIGGLE",
            "score": 100,
            "price": "34.5900",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAS",
            "score": 100,
            "price": "0.01394",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEC",
            "score": 100,
            "price": "334.1400",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KITE",
            "score": 100,
            "price": "0.14588",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EIGEN",
            "score": 97,
            "price": "0.18420",
            "change_24h": "+4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STRK",
            "score": 97,
            "price": "0.03956",
            "change_24h": "+3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPEN",
            "score": 97,
            "price": "0.27780",
            "change_24h": "+2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000BONK",
            "score": 97,
            "price": "0.006274",
            "change_24h": "+2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WIF",
            "score": 97,
            "price": "0.17880",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WLD",
            "score": 97,
            "price": "0.25130",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRX",
            "score": 97,
            "price": "0.32178",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AXL",
            "score": 95,
            "price": "0.05963",
            "change_24h": "+8.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIEVERSE",
            "score": 95,
            "price": "0.77310",
            "change_24h": "+7.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPG",
            "score": 95,
            "price": "0.29820",
            "change_24h": "+7.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STABLE",
            "score": 95,
            "price": "0.03634",
            "change_24h": "+5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SWARMS",
            "score": 95,
            "price": "0.01900",
            "change_24h": "+4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ELSA",
            "score": 95,
            "price": "0.07136",
            "change_24h": "+4.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YB",
            "score": 95,
            "price": "0.12660",
            "change_24h": "+4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETHW",
            "score": 95,
            "price": "0.32350",
            "change_24h": "+3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIXBT",
            "score": 95,
            "price": "0.02780",
            "change_24h": "+3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AWE",
            "score": 95,
            "price": "0.05803",
            "change_24h": "+3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GUA",
            "score": 95,
            "price": "0.86500",
            "change_24h": "+3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BRETT",
            "score": 95,
            "price": "0.007207",
            "change_24h": "+3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GALA",
            "score": 95,
            "price": "0.003360",
            "change_24h": "+3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOLV",
            "score": 95,
            "price": "0.004057",
            "change_24h": "+3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EPIC",
            "score": 95,
            "price": "0.29890",
            "change_24h": "+2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONG",
            "score": 95,
            "price": "0.07497",
            "change_24h": "+2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MYX",
            "score": 95,
            "price": "0.27010",
            "change_24h": "+2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTR",
            "score": 95,
            "price": "0.02953",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COMP",
            "score": 95,
            "price": "23.6900",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GMX",
            "score": 95,
            "price": "7.2870",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "4",
            "score": 95,
            "price": "0.01059",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OGN",
            "score": 95,
            "price": "0.02354",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKR",
            "score": 95,
            "price": "0.01631",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLESS",
            "score": 95,
            "price": "0.006037",
            "change_24h": "+1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APT",
            "score": 95,
            "price": "0.97690",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPORTFUN",
            "score": 95,
            "price": "0.04510",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COLLECT",
            "score": 95,
            "price": "0.02877",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AGT",
            "score": 95,
            "price": "0.01900",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPN",
            "score": 95,
            "price": "0.17460",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICNT",
            "score": 95,
            "price": "0.37420",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LISTA",
            "score": 95,
            "price": "0.08833",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIPPIN",
            "score": 95,
            "price": "0.02639",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AAVE",
            "score": 95,
            "price": "96.3800",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POPCAT",
            "score": 95,
            "price": "0.06069",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PORTAL",
            "score": 95,
            "price": "0.01165",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAGMA",
            "score": 95,
            "price": "0.18771",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "THETA",
            "score": 95,
            "price": "0.20770",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KERNEL",
            "score": 95,
            "price": "0.06521",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLUID",
            "score": 95,
            "price": "1.6570",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALGO",
            "score": 95,
            "price": "0.11240",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAPIEN",
            "score": 95,
            "price": "0.09004",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GENIUS",
            "score": 95,
            "price": "0.54120",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RIVER",
            "score": 95,
            "price": "6.2910",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHZ",
            "score": 95,
            "price": "0.04669",
            "change_24h": "-5.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "B2",
            "score": 95,
            "price": "0.50680",
            "change_24h": "-5.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GWEI",
            "score": 95,
            "price": "0.09024",
            "change_24h": "-5.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRIA",
            "score": 95,
            "price": "0.03458",
            "change_24h": "-6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LAB",
            "score": 95,
            "price": "0.68130",
            "change_24h": "-6.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHIP",
            "score": 95,
            "price": "0.06845",
            "change_24h": "-8.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HIGH",
            "score": 95,
            "price": "0.21270",
            "change_24h": "-9.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "B",
            "score": 95,
            "price": "0.12520",
            "change_24h": "-9.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIOT",
            "score": 95,
            "price": "0.07719",
            "change_24h": "-9.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPK",
            "score": 92,
            "price": "0.03779",
            "change_24h": "+5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CFX",
            "score": 92,
            "price": "0.06127",
            "change_24h": "+3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANTRA",
            "score": 92,
            "price": "0.01079",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POL",
            "score": 92,
            "price": "0.09265",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BOME",
            "score": 92,
            "price": "0.000513",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "W",
            "score": 92,
            "price": "0.01292",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZRO",
            "score": 92,
            "price": "1.4429",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LINEA",
            "score": 92,
            "price": "0.003561",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAND",
            "score": 92,
            "price": "0.07693",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUI",
            "score": 92,
            "price": "0.92860",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OP",
            "score": 92,
            "price": "0.12150",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TON",
            "score": 92,
            "price": "1.3066",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VVV",
            "score": 92,
            "price": "8.8680",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WLFI",
            "score": 92,
            "price": "0.07340",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RENDER",
            "score": 92,
            "price": "1.7640",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XRP",
            "score": 92,
            "price": "1.3844",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SEI",
            "score": 92,
            "price": "0.05929",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETHFI",
            "score": 92,
            "price": "0.42730",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIO",
            "score": 90,
            "price": "0.03324",
            "change_24h": "+18.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BB",
            "score": 90,
            "price": "0.02946",
            "change_24h": "+10.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VELODROME",
            "score": 90,
            "price": "0.01845",
            "change_24h": "+10.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAN",
            "score": 90,
            "price": "0.07506",
            "change_24h": "+6.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BROCCOLIF3B",
            "score": 90,
            "price": "0.004263",
            "change_24h": "+5.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COAI",
            "score": 90,
            "price": "0.35170",
            "change_24h": "+4.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CTSI",
            "score": 90,
            "price": "0.03330",
            "change_24h": "+3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EVAA",
            "score": 90,
            "price": "0.60490",
            "change_24h": "+3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVAAI",
            "score": 90,
            "price": "0.008565",
            "change_24h": "+2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANK",
            "score": 90,
            "price": "0.03447",
            "change_24h": "+2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHILLGUY",
            "score": 90,
            "price": "0.01129",
            "change_24h": "+1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WCT",
            "score": 90,
            "price": "0.06241",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAI",
            "score": 90,
            "price": "0.01095",
            "change_24h": "+1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACT",
            "score": 90,
            "price": "0.01416",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MMT",
            "score": 90,
            "price": "0.13480",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AT",
            "score": 90,
            "price": "0.16430",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FORM",
            "score": 90,
            "price": "0.24440",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLUAI",
            "score": 90,
            "price": "0.01144",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUST",
            "score": 90,
            "price": "0.07065",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ME",
            "score": 90,
            "price": "0.10720",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SXT",
            "score": 90,
            "price": "0.01669",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NOT",
            "score": 90,
            "price": "0.000400",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BREV",
            "score": 90,
            "price": "0.12380",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ILV",
            "score": 90,
            "price": "4.8150",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IO",
            "score": 90,
            "price": "0.11800",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOODENG",
            "score": 90,
            "price": "0.05784",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GMT",
            "score": 90,
            "price": "0.01156",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOPH",
            "score": 90,
            "price": "0.008733",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIDA",
            "score": 90,
            "price": "0.01690",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HEMI",
            "score": 90,
            "price": "0.007922",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LIGHT",
            "score": 90,
            "price": "0.15760",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000SATS",
            "score": 90,
            "price": "0.000014",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "C",
            "score": 90,
            "price": "0.07504",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOME",
            "score": 90,
            "price": "0.01514",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "Q",
            "score": 90,
            "price": "0.009957",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAIA",
            "score": 90,
            "price": "0.04699",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDEN",
            "score": 90,
            "price": "0.03557",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RESOLV",
            "score": 90,
            "price": "0.02942",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MINA",
            "score": 90,
            "price": "0.06106",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TREE",
            "score": 90,
            "price": "0.06995",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RECALL",
            "score": 90,
            "price": "0.05157",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USELESS",
            "score": 90,
            "price": "0.03939",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ESP",
            "score": 90,
            "price": "0.06793",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NIL",
            "score": 90,
            "price": "0.04027",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASR",
            "score": 90,
            "price": "1.2790",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RONIN",
            "score": 90,
            "price": "0.09970",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PYTH",
            "score": 90,
            "price": "0.04761",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EUL",
            "score": 90,
            "price": "1.3814",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SLP",
            "score": 90,
            "price": "0.000713",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SCRT",
            "score": 90,
            "price": "0.10220",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAT",
            "score": 90,
            "price": "0.10050",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SHELL",
            "score": 90,
            "price": "0.03480",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KNC",
            "score": 90,
            "price": "0.14210",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BABY",
            "score": 90,
            "price": "0.01524",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALLO",
            "score": 90,
            "price": "0.11012",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SONIC",
            "score": 90,
            "price": "0.03769",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VELVET",
            "score": 90,
            "price": "0.11324",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IMX",
            "score": 90,
            "price": "0.16800",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKL",
            "score": 90,
            "price": "0.006810",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HAEDAL",
            "score": 90,
            "price": "0.03164",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DUSK",
            "score": 90,
            "price": "0.12270",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAVA",
            "score": 90,
            "price": "0.05920",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FOGO",
            "score": 90,
            "price": "0.01815",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CGPT",
            "score": 90,
            "price": "0.02570",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RAVE",
            "score": 90,
            "price": "0.83820",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MERL",
            "score": 90,
            "price": "0.03608",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BR",
            "score": 90,
            "price": "0.10312",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROM",
            "score": 90,
            "price": "2.1180",
            "change_24h": "-6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HUMA",
            "score": 90,
            "price": "0.02083",
            "change_24h": "-6.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "M",
            "score": 90,
            "price": "3.4422",
            "change_24h": "-6.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DEXE",
            "score": 90,
            "price": "12.7180",
            "change_24h": "-12.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAG",
            "score": 90,
            "price": "0.000604",
            "change_24h": "-12.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZKC",
            "score": 87,
            "price": "0.08001",
            "change_24h": "+9.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "A",
            "score": 87,
            "price": "0.09472",
            "change_24h": "+7.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAO",
            "score": 87,
            "price": "262.7200",
            "change_24h": "+6.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AERO",
            "score": 87,
            "price": "0.48150",
            "change_24h": "+6.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DYDX",
            "score": 87,
            "price": "0.16240",
            "change_24h": "+5.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARK",
            "score": 87,
            "price": "0.18400",
            "change_24h": "+5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TIA",
            "score": 87,
            "price": "0.37510",
            "change_24h": "+5.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RAYSOL",
            "score": 87,
            "price": "0.77250",
            "change_24h": "+5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GLM",
            "score": 87,
            "price": "0.14023",
            "change_24h": "+5.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DYM",
            "score": 87,
            "price": "0.01923",
            "change_24h": "+4.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZETA",
            "score": 87,
            "price": "0.05571",
            "change_24h": "+4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MORPHO",
            "score": 87,
            "price": "2.0169",
            "change_24h": "+3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PARTI",
            "score": 87,
            "price": "0.04084",
            "change_24h": "+3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAFE",
            "score": 87,
            "price": "0.14740",
            "change_24h": "+3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AKT",
            "score": 87,
            "price": "0.48960",
            "change_24h": "+3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CYBER",
            "score": 87,
            "price": "0.54190",
            "change_24h": "+3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOLO",
            "score": 87,
            "price": "0.06214",
            "change_24h": "+2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TLM",
            "score": 87,
            "price": "0.001881",
            "change_24h": "+2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TOWNS",
            "score": 87,
            "price": "0.003239",
            "change_24h": "+2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEME",
            "score": 87,
            "price": "0.000579",
            "change_24h": "+2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JST",
            "score": 87,
            "price": "0.08437",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TOSHI",
            "score": 87,
            "price": "0.000185",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOVE",
            "score": 87,
            "price": "0.01789",
            "change_24h": "+2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WOO",
            "score": 87,
            "price": "0.01953",
            "change_24h": "+1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOGE",
            "score": 87,
            "price": "0.10048",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JASMY",
            "score": 87,
            "price": "0.005926",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIL",
            "score": 87,
            "price": "0.92700",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BCH",
            "score": 87,
            "price": "452.1500",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UNI",
            "score": 87,
            "price": "3.2540",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000FLOKI",
            "score": 87,
            "price": "0.03214",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000SHIB",
            "score": 87,
            "price": "0.006163",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000PEPE",
            "score": 87,
            "price": "0.003889",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETC",
            "score": 87,
            "price": "8.4300",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARB",
            "score": 87,
            "price": "0.12530",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOT",
            "score": 87,
            "price": "1.2320",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEAR",
            "score": 87,
            "price": "1.3580",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEN",
            "score": 87,
            "price": "5.8870",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICP",
            "score": 87,
            "price": "2.4160",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DASH",
            "score": 87,
            "price": "35.0100",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JCT",
            "score": 85,
            "price": "0.003621",
            "change_24h": "+17.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZKP",
            "score": 85,
            "price": "0.09418",
            "change_24h": "+15.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NAORIS",
            "score": 85,
            "price": "0.09154",
            "change_24h": "+8.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IR",
            "score": 85,
            "price": "0.03105",
            "change_24h": "+8.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ESPORTS",
            "score": 85,
            "price": "0.36750",
            "change_24h": "+6.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRIFFAIN",
            "score": 85,
            "price": "0.01944",
            "change_24h": "+6.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHR",
            "score": 85,
            "price": "0.02242",
            "change_24h": "+6.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MITO",
            "score": 85,
            "price": "0.04620",
            "change_24h": "+6.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALICE",
            "score": 85,
            "price": "0.15100",
            "change_24h": "+5.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WET",
            "score": 85,
            "price": "0.09520",
            "change_24h": "+5.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000CAT",
            "score": 85,
            "price": "0.001900",
            "change_24h": "+5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIN",
            "score": 85,
            "price": "0.08963",
            "change_24h": "+3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000RATS",
            "score": 85,
            "price": "0.03968",
            "change_24h": "+2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RARE",
            "score": 85,
            "price": "0.01733",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XNY",
            "score": 85,
            "price": "0.005870",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUMPBTC",
            "score": 85,
            "price": "0.02545",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SENT",
            "score": 85,
            "price": "0.01817",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONDO",
            "score": 85,
            "price": "0.26570",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENA",
            "score": 85,
            "price": "0.10747",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VIRTUAL",
            "score": 85,
            "price": "0.69490",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOL",
            "score": 85,
            "price": "84.3900",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PHB",
            "score": 85,
            "price": "0.11730",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AR",
            "score": 85,
            "price": "1.8890",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BNB",
            "score": 85,
            "price": "625.4500",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LINK",
            "score": 85,
            "price": "9.2780",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CKB",
            "score": 85,
            "price": "0.001505",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVAX",
            "score": 85,
            "price": "9.2120",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTC",
            "score": 85,
            "price": "76751.80",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BICO",
            "score": 85,
            "price": "0.02680",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JELLYJELLY",
            "score": 85,
            "price": "0.05275",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KOMA",
            "score": 85,
            "price": "0.007632",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANA",
            "score": 85,
            "price": "0.09160",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARKM",
            "score": 85,
            "price": "0.11230",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STG",
            "score": 85,
            "price": "0.21350",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POWER",
            "score": 85,
            "price": "0.09195",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CLO",
            "score": 85,
            "price": "0.13530",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALCH",
            "score": 85,
            "price": "0.07981",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ON",
            "score": 85,
            "price": "0.12640",
            "change_24h": "-5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEGA",
            "score": 85,
            "price": "0.16866",
            "change_24h": "-5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IRYS",
            "score": 85,
            "price": "0.03521",
            "change_24h": "-5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TURTLE",
            "score": 85,
            "price": "0.05321",
            "change_24h": "-10.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZBT",
            "score": 85,
            "price": "0.17383",
            "change_24h": "-11.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RUNE",
            "score": 82,
            "price": "0.53730",
            "change_24h": "+6.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CELR",
            "score": 82,
            "price": "0.002868",
            "change_24h": "+5.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KSM",
            "score": 82,
            "price": "4.8830",
            "change_24h": "+3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUSHI",
            "score": 82,
            "price": "0.21370",
            "change_24h": "+2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MET",
            "score": 82,
            "price": "0.15610",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YGG",
            "score": 82,
            "price": "0.04132",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LA",
            "score": 82,
            "price": "0.16370",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XMR",
            "score": 82,
            "price": "381.4100",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYRUP",
            "score": 82,
            "price": "0.24726",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZRX",
            "score": 82,
            "price": "0.11370",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MIRA",
            "score": 82,
            "price": "0.08588",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JTO",
            "score": 82,
            "price": "0.34080",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PHA",
            "score": 82,
            "price": "0.03210",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEWT",
            "score": 82,
            "price": "0.07773",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TURBO",
            "score": 82,
            "price": "0.001161",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000000MOG",
            "score": 82,
            "price": "0.15250",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FRAX",
            "score": 82,
            "price": "0.46840",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POLYX",
            "score": 82,
            "price": "0.04922",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZORA",
            "score": 82,
            "price": "0.01301",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "METIS",
            "score": 82,
            "price": "3.5760",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CC",
            "score": 82,
            "price": "0.14910",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "THE",
            "score": 82,
            "price": "0.10190",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ANIME",
            "score": 82,
            "price": "0.004746",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NMR",
            "score": 82,
            "price": "8.9110",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOGS",
            "score": 82,
            "price": "0.000032",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ANKR",
            "score": 82,
            "price": "0.005015",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HMSTR",
            "score": 82,
            "price": "0.000153",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALT",
            "score": 82,
            "price": "0.007554",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GAS",
            "score": 82,
            "price": "1.6510",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VET",
            "score": 82,
            "price": "0.007168",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ERA",
            "score": 82,
            "price": "0.14360",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAGA",
            "score": 82,
            "price": "0.01768",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIGTIME",
            "score": 82,
            "price": "0.01341",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BSV",
            "score": 82,
            "price": "15.4800",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USUAL",
            "score": 82,
            "price": "0.01405",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HFT",
            "score": 82,
            "price": "0.01442",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NIGHT",
            "score": 82,
            "price": "0.03413",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZIL",
            "score": 82,
            "price": "0.004050",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VANRY",
            "score": 82,
            "price": "0.005257",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WAL",
            "score": 82,
            "price": "0.07337",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUPER",
            "score": 82,
            "price": "0.12330",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATH",
            "score": 82,
            "price": "0.005937",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TNSR",
            "score": 82,
            "price": "0.04056",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LUMIA",
            "score": 80,
            "price": "0.19090",
            "change_24h": "+18.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UB",
            "score": 80,
            "price": "0.05705",
            "change_24h": "+15.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BSB",
            "score": 80,
            "price": "0.83520",
            "change_24h": "+12.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KGEN",
            "score": 80,
            "price": "0.18983",
            "change_24h": "+12.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIGHT",
            "score": 80,
            "price": "0.004500",
            "change_24h": "+12.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NOM",
            "score": 80,
            "price": "0.002921",
            "change_24h": "+12.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LQTY",
            "score": 80,
            "price": "0.33010",
            "change_24h": "+5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UMA",
            "score": 80,
            "price": "0.46640",
            "change_24h": "+3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOLO",
            "score": 80,
            "price": "0.03645",
            "change_24h": "+3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATA",
            "score": 80,
            "price": "0.01012",
            "change_24h": "+3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRB",
            "score": 80,
            "price": "18.7110",
            "change_24h": "+2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SNX",
            "score": 80,
            "price": "0.32070",
            "change_24h": "+2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RVN",
            "score": 80,
            "price": "0.005940",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IN",
            "score": 80,
            "price": "0.06697",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PTB",
            "score": 80,
            "price": "0.000806",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HEI",
            "score": 80,
            "price": "0.08098",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HBAR",
            "score": 80,
            "price": "0.08963",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CRV",
            "score": 80,
            "price": "0.23100",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COOKIE",
            "score": 80,
            "price": "0.01639",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYS",
            "score": 80,
            "price": "0.009450",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LTC",
            "score": 80,
            "price": "55.6700",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETH",
            "score": 80,
            "price": "2297.31",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "龙虾",
            "score": 80,
            "price": "0.007884",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVA",
            "score": 80,
            "price": "0.25380",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SCR",
            "score": 80,
            "price": "0.04573",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ADA",
            "score": 80,
            "price": "0.24810",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VIC",
            "score": 80,
            "price": "0.05575",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MBOX",
            "score": 80,
            "price": "0.01294",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "2Z",
            "score": 80,
            "price": "0.08528",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATOM",
            "score": 80,
            "price": "1.9810",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BMT",
            "score": 80,
            "price": "0.01553",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLUX",
            "score": 80,
            "price": "0.06773",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OG",
            "score": 80,
            "price": "3.0000",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CTK",
            "score": 80,
            "price": "0.18150",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MELANIA",
            "score": 80,
            "price": "0.10930",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARIA",
            "score": 80,
            "price": "0.06420",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DIA",
            "score": 80,
            "price": "0.18850",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLOCK",
            "score": 80,
            "price": "0.06052",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000000BOB",
            "score": 80,
            "price": "0.01375",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAKE",
            "score": 80,
            "price": "0.03139",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NFP",
            "score": 80,
            "price": "0.01582",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STBL",
            "score": 80,
            "price": "0.03313",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FOLKS",
            "score": 80,
            "price": "1.4190",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEAMX",
            "score": 80,
            "price": "0.001930",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DODOX",
            "score": 80,
            "price": "0.01930",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SSV",
            "score": 80,
            "price": "2.8100",
            "change_24h": "-5.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CETUS",
            "score": 80,
            "price": "0.02879",
            "change_24h": "-6.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SANTOS",
            "score": 80,
            "price": "1.2570",
            "change_24h": "-7.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARC",
            "score": 80,
            "price": "0.06684",
            "change_24h": "-9.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAVIA",
            "score": 77,
            "price": "0.03897",
            "change_24h": "+9.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KMNO",
            "score": 77,
            "price": "0.02123",
            "change_24h": "+6.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACE",
            "score": 77,
            "price": "0.12520",
            "change_24h": "+3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CARV",
            "score": 77,
            "price": "0.05864",
            "change_24h": "+3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LSK",
            "score": 77,
            "price": "0.12880",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XVG",
            "score": 77,
            "price": "0.003293",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COTI",
            "score": 77,
            "price": "0.01392",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEW",
            "score": 77,
            "price": "0.000596",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YFI",
            "score": 77,
            "price": "2734.00",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CELO",
            "score": 77,
            "price": "0.08930",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ID",
            "score": 77,
            "price": "0.03107",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOST",
            "score": 77,
            "price": "0.001080",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JOE",
            "score": 77,
            "price": "0.04597",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "C98",
            "score": 77,
            "price": "0.02136",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOTA",
            "score": 77,
            "price": "0.05610",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GTC",
            "score": 77,
            "price": "0.09570",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "QNT",
            "score": 77,
            "price": "69.3800",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PEOPLE",
            "score": 77,
            "price": "0.007590",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RSR",
            "score": 77,
            "price": "0.001779",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIO",
            "score": 75,
            "price": "0.10219",
            "change_24h": "+18.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INX",
            "score": 75,
            "price": "0.01093",
            "change_24h": "+9.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IDOL",
            "score": 75,
            "price": "0.02390",
            "change_24h": "+6.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARPA",
            "score": 75,
            "price": "0.01023",
            "change_24h": "+3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOT",
            "score": 75,
            "price": "0.000446",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRT",
            "score": 75,
            "price": "0.02496",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APR",
            "score": 75,
            "price": "0.18015",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LAYER",
            "score": 75,
            "price": "0.08463",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LPT",
            "score": 75,
            "price": "2.1430",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAGIC",
            "score": 75,
            "price": "0.06598",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CAKE",
            "score": 75,
            "price": "1.5079",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1MBABYDOGE",
            "score": 75,
            "price": "0.000411",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENS",
            "score": 75,
            "price": "6.0710",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAS",
            "score": 75,
            "price": "0.03302",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USDC",
            "score": 75,
            "price": "0.99950",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HANA",
            "score": 75,
            "price": "0.04036",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TA",
            "score": 75,
            "price": "0.04731",
            "change_24h": "-5.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SFP",
            "score": 75,
            "price": "0.33660",
            "change_24h": "-6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PLAY",
            "score": 75,
            "price": "0.09844",
            "change_24h": "-17.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DAM",
            "score": 75,
            "price": "0.02059",
            "change_24h": "-64.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CROSS",
            "score": 72,
            "price": "0.10890",
            "change_24h": "+11.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FHE",
            "score": 72,
            "price": "0.01936",
            "change_24h": "+6.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WAXP",
            "score": 72,
            "price": "0.006755",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROMPT",
            "score": 72,
            "price": "0.03601",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CVC",
            "score": 72,
            "price": "0.03122",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COS",
            "score": 72,
            "price": "0.001172",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NXPC",
            "score": 72,
            "price": "0.29820",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAIKO",
            "score": 72,
            "price": "0.11840",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "F",
            "score": 72,
            "price": "0.005606",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POWR",
            "score": 72,
            "price": "0.06487",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORDER",
            "score": 72,
            "price": "0.05538",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COW",
            "score": 72,
            "price": "0.18730",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALPINE",
            "score": 72,
            "price": "0.45140",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOOD",
            "score": 72,
            "price": "0.003241",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STORJ",
            "score": 72,
            "price": "0.09880",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "G",
            "score": 72,
            "price": "0.003651",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANANA",
            "score": 72,
            "price": "3.8670",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICX",
            "score": 72,
            "price": "0.03730",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DEEP",
            "score": 72,
            "price": "0.02973",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RPL",
            "score": 72,
            "price": "1.9340",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AZTEC",
            "score": 72,
            "price": "0.02031",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TWT",
            "score": 72,
            "price": "0.42940",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACU",
            "score": 72,
            "price": "0.09103",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RIF",
            "score": 70,
            "price": "0.05439",
            "change_24h": "+15.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANTA",
            "score": 70,
            "price": "0.06712",
            "change_24h": "+6.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AEVO",
            "score": 70,
            "price": "0.02716",
            "change_24h": "+5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CATI",
            "score": 70,
            "price": "0.04787",
            "change_24h": "+4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYN",
            "score": 70,
            "price": "0.05414",
            "change_24h": "+2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUTH",
            "score": 70,
            "price": "0.009458",
            "change_24h": "+1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ROSE",
            "score": 70,
            "price": "0.01001",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EGLD",
            "score": 70,
            "price": "4.2350",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1INCH",
            "score": 70,
            "price": "0.09510",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STX",
            "score": 70,
            "price": "0.22600",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEO",
            "score": 70,
            "price": "2.8580",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BNT",
            "score": 70,
            "price": "0.31620",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTCDOM",
            "score": 70,
            "price": "5431.60",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AKE",
            "score": 70,
            "price": "0.000306",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CLANKER",
            "score": 70,
            "price": "23.8900",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XPIN",
            "score": 70,
            "price": "0.001321",
            "change_24h": "-6.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "API3",
            "score": 67,
            "price": "0.40560",
            "change_24h": "+24.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AGLD",
            "score": 67,
            "price": "0.26340",
            "change_24h": "+1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAV",
            "score": 67,
            "price": "0.01581",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RLC",
            "score": 67,
            "price": "0.44430",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOTX",
            "score": 67,
            "price": "0.004700",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEL",
            "score": 67,
            "price": "0.10880",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XVS",
            "score": 67,
            "price": "2.6020",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LYN",
            "score": 65,
            "price": "0.07582",
            "change_24h": "+21.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UAI",
            "score": 65,
            "price": "0.39820",
            "change_24h": "+12.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONE",
            "score": 65,
            "price": "0.002362",
            "change_24h": "+6.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROVE",
            "score": 65,
            "price": "0.24880",
            "change_24h": "+1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACX",
            "score": 65,
            "price": "0.04459",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MLN",
            "score": 65,
            "price": "3.1360",
            "change_24h": "+1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUNDIX",
            "score": 65,
            "price": "0.15140",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AERGO",
            "score": 65,
            "price": "0.05691",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALL",
            "score": 65,
            "price": "0.55620",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STEEM",
            "score": 65,
            "price": "0.05749",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HIVE",
            "score": 65,
            "price": "0.06079",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SQD",
            "score": 65,
            "price": "0.03145",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CVX",
            "score": 65,
            "price": "1.7300",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AUCTION",
            "score": 65,
            "price": "4.7810",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUN",
            "score": 65,
            "price": "0.01832",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "T",
            "score": 65,
            "price": "0.006073",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VTHO",
            "score": 65,
            "price": "0.000577",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAC",
            "score": 60,
            "price": "0.01401",
            "change_24h": "+29.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKYAI",
            "score": 60,
            "price": "0.21533",
            "change_24h": "+28.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "H",
            "score": 60,
            "price": "0.17396",
            "change_24h": "+25.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000XEC",
            "score": 60,
            "price": "0.007120",
            "change_24h": "+1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAND",
            "score": 60,
            "price": "0.22750",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MTL",
            "score": 60,
            "price": "0.30010",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "QTUM",
            "score": 60,
            "price": "0.89000",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASTR",
            "score": 60,
            "price": "0.008115",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "US",
            "score": 50,
            "price": "0.005110",
            "change_24h": "+23.2%",
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
            <div className="text-3xl font-black text-[var(--sc-purple,#a855f7)]">530</div>
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
