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
            "coin": "UB",
            "score": 100,
            "price": "0.07011",
            "change_24h": "+9.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APE",
            "score": 100,
            "price": "0.16010",
            "change_24h": "+7.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACH",
            "score": 100,
            "price": "0.007425",
            "change_24h": "+6.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "D",
            "score": 100,
            "price": "0.01249",
            "change_24h": "+4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000CHEEMS",
            "score": 100,
            "price": "0.000619",
            "change_24h": "+4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BB",
            "score": 100,
            "price": "0.02890",
            "change_24h": "+4.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDU",
            "score": 100,
            "price": "0.04786",
            "change_24h": "+4.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HYPER",
            "score": 100,
            "price": "0.12222",
            "change_24h": "+4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOMI",
            "score": 100,
            "price": "0.18460",
            "change_24h": "+4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BOME",
            "score": 100,
            "price": "0.000522",
            "change_24h": "+4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000LUNC",
            "score": 100,
            "price": "0.07411",
            "change_24h": "+4.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WIF",
            "score": 100,
            "price": "0.18440",
            "change_24h": "+3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVA",
            "score": 100,
            "price": "0.25880",
            "change_24h": "+3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOGE",
            "score": 100,
            "price": "0.10634",
            "change_24h": "+3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CGPT",
            "score": 100,
            "price": "0.02762",
            "change_24h": "+3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORCA",
            "score": 100,
            "price": "1.6860",
            "change_24h": "+3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XNY",
            "score": 100,
            "price": "0.005778",
            "change_24h": "+2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CYS",
            "score": 100,
            "price": "0.51950",
            "change_24h": "+2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POL",
            "score": 100,
            "price": "0.09489",
            "change_24h": "+2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAITO",
            "score": 100,
            "price": "0.44720",
            "change_24h": "+2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RED",
            "score": 100,
            "price": "0.13510",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FOLKS",
            "score": 100,
            "price": "1.4640",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CLO",
            "score": 100,
            "price": "0.12276",
            "change_24h": "+2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NIL",
            "score": 100,
            "price": "0.03856",
            "change_24h": "+2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MON",
            "score": 100,
            "price": "0.02698",
            "change_24h": "+2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "H",
            "score": 100,
            "price": "0.17990",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BULLA",
            "score": 100,
            "price": "0.007203",
            "change_24h": "+2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORDI",
            "score": 100,
            "price": "4.3730",
            "change_24h": "+1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CRV",
            "score": 100,
            "price": "0.23190",
            "change_24h": "+1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VANA",
            "score": 100,
            "price": "1.4670",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000SHIB",
            "score": 100,
            "price": "0.006235",
            "change_24h": "+1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CFX",
            "score": 100,
            "price": "0.05873",
            "change_24h": "+1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "API3",
            "score": 100,
            "price": "0.37110",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MORPHO",
            "score": 100,
            "price": "1.9844",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LINEA",
            "score": 100,
            "price": "0.003553",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIL",
            "score": 100,
            "price": "0.92100",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HIGH",
            "score": 100,
            "price": "0.21240",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BROCCOLI714",
            "score": 100,
            "price": "0.01838",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APT",
            "score": 100,
            "price": "0.99770",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOODENG",
            "score": 100,
            "price": "0.05944",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUMP",
            "score": 100,
            "price": "0.001755",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PENGU",
            "score": 100,
            "price": "0.009829",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TIA",
            "score": 100,
            "price": "0.34930",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000PEPE",
            "score": 100,
            "price": "0.003869",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZBT",
            "score": 100,
            "price": "0.18105",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PLAY",
            "score": 100,
            "price": "0.10020",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NIGHT",
            "score": 100,
            "price": "0.03274",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OP",
            "score": 100,
            "price": "0.12000",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACT",
            "score": 100,
            "price": "0.01371",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONDO",
            "score": 100,
            "price": "0.26290",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETC",
            "score": 100,
            "price": "8.3340",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICP",
            "score": 100,
            "price": "2.3780",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANANAS31",
            "score": 100,
            "price": "0.009822",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOON",
            "score": 100,
            "price": "0.16460",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEIRO",
            "score": 100,
            "price": "0.000088",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAND",
            "score": 100,
            "price": "0.07222",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LTC",
            "score": 100,
            "price": "55.1000",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONT",
            "score": 100,
            "price": "0.07080",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000BONK",
            "score": 100,
            "price": "0.006141",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOT",
            "score": 100,
            "price": "1.2030",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASTER",
            "score": 100,
            "price": "0.65370",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000FLOKI",
            "score": 100,
            "price": "0.03205",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FARTCOIN",
            "score": 100,
            "price": "0.19680",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VIRTUAL",
            "score": 100,
            "price": "0.68430",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "G",
            "score": 100,
            "price": "0.003576",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STRK",
            "score": 100,
            "price": "0.03837",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIO",
            "score": 100,
            "price": "0.11172",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JUP",
            "score": 100,
            "price": "0.17870",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GALA",
            "score": 100,
            "price": "0.003198",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UAI",
            "score": 100,
            "price": "0.34870",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARB",
            "score": 100,
            "price": "0.12400",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FET",
            "score": 100,
            "price": "0.19540",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHIP",
            "score": 100,
            "price": "0.06349",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DUSK",
            "score": 100,
            "price": "0.12161",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FF",
            "score": 100,
            "price": "0.06309",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SEI",
            "score": 100,
            "price": "0.05704",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COMP",
            "score": 100,
            "price": "23.5000",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WLD",
            "score": 100,
            "price": "0.24310",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HYPE",
            "score": 100,
            "price": "39.5600",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPK",
            "score": 100,
            "price": "0.03559",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "币安人生",
            "score": 100,
            "price": "0.34189",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PNUT",
            "score": 100,
            "price": "0.05273",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BCH",
            "score": 100,
            "price": "440.7800",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HBAR",
            "score": 100,
            "price": "0.08735",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENA",
            "score": 100,
            "price": "0.10210",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENJ",
            "score": 100,
            "price": "0.05553",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAT",
            "score": 100,
            "price": "0.01075",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INJ",
            "score": 100,
            "price": "3.4110",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEAR",
            "score": 100,
            "price": "1.3010",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETHFI",
            "score": 100,
            "price": "0.40750",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RENDER",
            "score": 100,
            "price": "1.6680",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KITE",
            "score": 100,
            "price": "0.14192",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AXL",
            "score": 100,
            "price": "0.06054",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STO",
            "score": 100,
            "price": "0.08921",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPEN",
            "score": 100,
            "price": "0.27180",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DYDX",
            "score": 100,
            "price": "0.15060",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GIGGLE",
            "score": 100,
            "price": "31.4000",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHZ",
            "score": 100,
            "price": "0.04116",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PLUME",
            "score": 100,
            "price": "0.01166",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZRO",
            "score": 100,
            "price": "1.4325",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CFG",
            "score": 100,
            "price": "0.20180",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CTSI",
            "score": 100,
            "price": "0.03108",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RAYSOL",
            "score": 100,
            "price": "0.77110",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XPL",
            "score": 100,
            "price": "0.09050",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VVV",
            "score": 100,
            "price": "8.4830",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKY",
            "score": 100,
            "price": "0.07904",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LDO",
            "score": 100,
            "price": "0.36470",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AXS",
            "score": 100,
            "price": "1.3520",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAO",
            "score": 100,
            "price": "248.4900",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEREBRO",
            "score": 100,
            "price": "0.02552",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "0G",
            "score": 100,
            "price": "0.53170",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALT",
            "score": 100,
            "price": "0.007456",
            "change_24h": "-3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SIREN",
            "score": 100,
            "price": "0.66520",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLUR",
            "score": 100,
            "price": "0.02662",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPX",
            "score": 100,
            "price": "0.35700",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EIGEN",
            "score": 100,
            "price": "0.17640",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RIVER",
            "score": 100,
            "price": "6.3030",
            "change_24h": "-4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WLFI",
            "score": 100,
            "price": "0.06080",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AR",
            "score": 97,
            "price": "1.8930",
            "change_24h": "+2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RUNE",
            "score": 97,
            "price": "0.49790",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TON",
            "score": 97,
            "price": "1.3209",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALGO",
            "score": 97,
            "price": "0.11050",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UNI",
            "score": 97,
            "price": "3.1780",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHR",
            "score": 95,
            "price": "0.02417",
            "change_24h": "+10.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LUNA2",
            "score": 95,
            "price": "0.06997",
            "change_24h": "+8.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZETA",
            "score": 95,
            "price": "0.05839",
            "change_24h": "+6.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRB",
            "score": 95,
            "price": "19.2210",
            "change_24h": "+5.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KGEN",
            "score": 95,
            "price": "0.18346",
            "change_24h": "+4.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "C",
            "score": 95,
            "price": "0.07749",
            "change_24h": "+3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LAB",
            "score": 95,
            "price": "0.71860",
            "change_24h": "+2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLESS",
            "score": 95,
            "price": "0.005930",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAFE",
            "score": 95,
            "price": "0.14610",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOGS",
            "score": 95,
            "price": "0.000031",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIN",
            "score": 95,
            "price": "0.09381",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ID",
            "score": 95,
            "price": "0.03043",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PEOPLE",
            "score": 95,
            "price": "0.007440",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HEMI",
            "score": 95,
            "price": "0.007616",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ILV",
            "score": 95,
            "price": "4.6680",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAPIEN",
            "score": 95,
            "price": "0.08959",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ANIME",
            "score": 95,
            "price": "0.004671",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STABLE",
            "score": 95,
            "price": "0.03253",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOLO",
            "score": 95,
            "price": "0.03066",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VET",
            "score": 95,
            "price": "0.006979",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STX",
            "score": 95,
            "price": "0.22070",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "2Z",
            "score": 95,
            "price": "0.08178",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1INCH",
            "score": 95,
            "price": "0.09250",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZORA",
            "score": 95,
            "price": "0.01247",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SHELL",
            "score": 95,
            "price": "0.03401",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BERA",
            "score": 95,
            "price": "0.35830",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COAI",
            "score": 95,
            "price": "0.32980",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BARD",
            "score": 95,
            "price": "0.27540",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAN",
            "score": 95,
            "price": "0.07270",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RONIN",
            "score": 95,
            "price": "0.09400",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OGN",
            "score": 95,
            "price": "0.02294",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MERL",
            "score": 95,
            "price": "0.03267",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JASMY",
            "score": 95,
            "price": "0.005628",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GPS",
            "score": 95,
            "price": "0.007581",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "QTUM",
            "score": 95,
            "price": "0.85900",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIDA",
            "score": 95,
            "price": "0.01636",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPELL",
            "score": 95,
            "price": "0.000166",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOTA",
            "score": 95,
            "price": "0.05420",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAT",
            "score": 95,
            "price": "0.09640",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "C98",
            "score": 95,
            "price": "0.02005",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ANKR",
            "score": 95,
            "price": "0.004711",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDGE",
            "score": 95,
            "price": "1.1741",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YFI",
            "score": 95,
            "price": "2631.00",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOVE",
            "score": 95,
            "price": "0.01704",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATOM",
            "score": 95,
            "price": "1.8770",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KERNEL",
            "score": 95,
            "price": "0.06277",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANTRA",
            "score": 95,
            "price": "0.01000",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "B",
            "score": 95,
            "price": "0.13010",
            "change_24h": "-2.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WAL",
            "score": 95,
            "price": "0.06892",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ON",
            "score": 95,
            "price": "0.11455",
            "change_24h": "-3.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRASS",
            "score": 95,
            "price": "0.32620",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VELVET",
            "score": 95,
            "price": "0.11296",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "S",
            "score": 95,
            "price": "0.04315",
            "change_24h": "-5.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AERO",
            "score": 95,
            "price": "0.44210",
            "change_24h": "-6.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPG",
            "score": 95,
            "price": "0.23200",
            "change_24h": "-13.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "REZ",
            "score": 92,
            "price": "0.004505",
            "change_24h": "+6.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ADA",
            "score": 92,
            "price": "0.24650",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOVR",
            "score": 92,
            "price": "2.4360",
            "change_24h": "+1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IP",
            "score": 92,
            "price": "0.49180",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETH",
            "score": 92,
            "price": "2256.51",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BNB",
            "score": 92,
            "price": "616.6000",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XRP",
            "score": 92,
            "price": "1.3660",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVAX",
            "score": 92,
            "price": "9.0860",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XLM",
            "score": 92,
            "price": "0.15906",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUMP",
            "score": 92,
            "price": "2.3730",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLOW",
            "score": 90,
            "price": "0.04563",
            "change_24h": "+13.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIXBT",
            "score": 90,
            "price": "0.03119",
            "change_24h": "+12.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DRIFT",
            "score": 90,
            "price": "0.03951",
            "change_24h": "+10.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USTC",
            "score": 90,
            "price": "0.006816",
            "change_24h": "+10.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FORM",
            "score": 90,
            "price": "0.26710",
            "change_24h": "+10.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAS",
            "score": 90,
            "price": "0.01489",
            "change_24h": "+8.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SWARMS",
            "score": 90,
            "price": "0.02651",
            "change_24h": "+7.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEC",
            "score": 90,
            "price": "349.7500",
            "change_24h": "+7.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000RATS",
            "score": 90,
            "price": "0.03871",
            "change_24h": "+6.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARIA",
            "score": 90,
            "price": "0.06300",
            "change_24h": "+5.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "我踏马来了",
            "score": 90,
            "price": "0.009354",
            "change_24h": "+5.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GUN",
            "score": 90,
            "price": "0.01505",
            "change_24h": "+4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JST",
            "score": 90,
            "price": "0.08852",
            "change_24h": "+2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TA",
            "score": 90,
            "price": "0.05068",
            "change_24h": "+2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SONIC",
            "score": 90,
            "price": "0.03752",
            "change_24h": "+1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JELLYJELLY",
            "score": 90,
            "price": "0.05380",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALCH",
            "score": 90,
            "price": "0.07917",
            "change_24h": "+1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ELSA",
            "score": 90,
            "price": "0.07056",
            "change_24h": "+1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MET",
            "score": 90,
            "price": "0.15400",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PARTI",
            "score": 90,
            "price": "0.04109",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1MBABYDOGE",
            "score": 90,
            "price": "0.000415",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000SATS",
            "score": 90,
            "price": "0.000014",
            "change_24h": "+0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RIF",
            "score": 90,
            "price": "0.05457",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIGTIME",
            "score": 90,
            "price": "0.01319",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RESOLV",
            "score": 90,
            "price": "0.02932",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CHILLGUY",
            "score": 90,
            "price": "0.01129",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COOKIE",
            "score": 90,
            "price": "0.01614",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CC",
            "score": 90,
            "price": "0.15127",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CETUS",
            "score": 90,
            "price": "0.02766",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIPPIN",
            "score": 90,
            "price": "0.02556",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAI",
            "score": 90,
            "price": "0.01041",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATH",
            "score": 90,
            "price": "0.005808",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZKC",
            "score": 90,
            "price": "0.07355",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOLO",
            "score": 90,
            "price": "0.06214",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROM",
            "score": 90,
            "price": "2.0470",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SIGN",
            "score": 90,
            "price": "0.01569",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZAMA",
            "score": 90,
            "price": "0.02626",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAHARA",
            "score": 90,
            "price": "0.02203",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ESP",
            "score": 90,
            "price": "0.06793",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYRUP",
            "score": 90,
            "price": "0.23760",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YGG",
            "score": 90,
            "price": "0.04009",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NOT",
            "score": 90,
            "price": "0.000383",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "UMA",
            "score": 90,
            "price": "0.45010",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SENT",
            "score": 90,
            "price": "0.01714",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EUL",
            "score": 90,
            "price": "1.3137",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENS",
            "score": 90,
            "price": "5.9840",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IN",
            "score": 90,
            "price": "0.06589",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TST",
            "score": 90,
            "price": "0.01060",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DOOD",
            "score": 90,
            "price": "0.003178",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PYTH",
            "score": 90,
            "price": "0.04631",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAIA",
            "score": 90,
            "price": "0.04542",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEW",
            "score": 90,
            "price": "0.000576",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARC",
            "score": 90,
            "price": "0.07431",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANA",
            "score": 90,
            "price": "0.08930",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000CAT",
            "score": 90,
            "price": "0.001881",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ROBO",
            "score": 90,
            "price": "0.01838",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVNT",
            "score": 90,
            "price": "0.14670",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BICO",
            "score": 90,
            "price": "0.02534",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALICE",
            "score": 90,
            "price": "0.14530",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZIL",
            "score": 90,
            "price": "0.003930",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "THE",
            "score": 90,
            "price": "0.09850",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OPN",
            "score": 90,
            "price": "0.16050",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEO",
            "score": 90,
            "price": "2.7170",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PHA",
            "score": 90,
            "price": "0.03089",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IO",
            "score": 90,
            "price": "0.11510",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AT",
            "score": 90,
            "price": "0.16525",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MASK",
            "score": 90,
            "price": "0.50060",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TWT",
            "score": 90,
            "price": "0.42510",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MMT",
            "score": 90,
            "price": "0.13070",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ME",
            "score": 90,
            "price": "0.10400",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LYN",
            "score": 90,
            "price": "0.06959",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TOWNS",
            "score": 90,
            "price": "0.003164",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANK",
            "score": 90,
            "price": "0.03389",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEME",
            "score": 90,
            "price": "0.000562",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "W",
            "score": 90,
            "price": "0.01234",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPACE",
            "score": 90,
            "price": "0.006615",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUN",
            "score": 90,
            "price": "0.01845",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRT",
            "score": 90,
            "price": "0.02402",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TURBO",
            "score": 90,
            "price": "0.001127",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "4",
            "score": 90,
            "price": "0.009551",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DYM",
            "score": 90,
            "price": "0.01805",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XTZ",
            "score": 90,
            "price": "0.36530",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIXEL",
            "score": 90,
            "price": "0.008034",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VANRY",
            "score": 90,
            "price": "0.005080",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NMR",
            "score": 90,
            "price": "8.7790",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GMT",
            "score": 90,
            "price": "0.01086",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKL",
            "score": 90,
            "price": "0.006620",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BRETT",
            "score": 90,
            "price": "0.007022",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SPORTFUN",
            "score": 90,
            "price": "0.04509",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SSV",
            "score": 90,
            "price": "2.6850",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SAGA",
            "score": 90,
            "price": "0.01699",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000000MOG",
            "score": 90,
            "price": "0.14650",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZK",
            "score": 90,
            "price": "0.01518",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TURTLE",
            "score": 90,
            "price": "0.04678",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CAKE",
            "score": 90,
            "price": "1.4465",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIRB",
            "score": 90,
            "price": "0.13290",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CVX",
            "score": 90,
            "price": "1.6700",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLUID",
            "score": 90,
            "price": "1.5310",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TNSR",
            "score": 90,
            "price": "0.03913",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MUBARAK",
            "score": 90,
            "price": "0.01336",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INIT",
            "score": 90,
            "price": "0.09079",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TREE",
            "score": 90,
            "price": "0.06683",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USELESS",
            "score": 90,
            "price": "0.03748",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SNX",
            "score": 90,
            "price": "0.30290",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RARE",
            "score": 90,
            "price": "0.01699",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MIRA",
            "score": 90,
            "price": "0.08071",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AERGO",
            "score": 90,
            "price": "0.05588",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XPIN",
            "score": 90,
            "price": "0.001258",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PTB",
            "score": 90,
            "price": "0.000761",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PORTAL",
            "score": 90,
            "price": "0.01116",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HMSTR",
            "score": 90,
            "price": "0.000152",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TOSHI",
            "score": 90,
            "price": "0.000181",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MANTA",
            "score": 90,
            "price": "0.06616",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FOGO",
            "score": 90,
            "price": "0.01717",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "METIS",
            "score": 90,
            "price": "3.3530",
            "change_24h": "-3.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MITO",
            "score": 90,
            "price": "0.04511",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GOAT",
            "score": 90,
            "price": "0.01640",
            "change_24h": "-3.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAVA",
            "score": 90,
            "price": "0.05650",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ERA",
            "score": 90,
            "price": "0.13680",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LISTA",
            "score": 90,
            "price": "0.08208",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WCT",
            "score": 90,
            "price": "0.06093",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEAT",
            "score": 90,
            "price": "0.54930",
            "change_24h": "-4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACE",
            "score": 90,
            "price": "0.11740",
            "change_24h": "-4.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AKT",
            "score": 90,
            "price": "0.49970",
            "change_24h": "-4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EPIC",
            "score": 90,
            "price": "0.30370",
            "change_24h": "-4.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FIGHT",
            "score": 90,
            "price": "0.003888",
            "change_24h": "-4.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIA",
            "score": 90,
            "price": "0.04934",
            "change_24h": "-4.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FHE",
            "score": 90,
            "price": "0.01747",
            "change_24h": "-4.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOLV",
            "score": 90,
            "price": "0.004554",
            "change_24h": "-6.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DEXE",
            "score": 90,
            "price": "11.3540",
            "change_24h": "-7.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GRIFFAIN",
            "score": 90,
            "price": "0.01836",
            "change_24h": "-8.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LIT",
            "score": 90,
            "price": "0.88740",
            "change_24h": "-8.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZKP",
            "score": 90,
            "price": "0.08088",
            "change_24h": "-9.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PRL",
            "score": 90,
            "price": "0.28270",
            "change_24h": "-11.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NOM",
            "score": 90,
            "price": "0.002626",
            "change_24h": "-14.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NFP",
            "score": 90,
            "price": "0.01255",
            "change_24h": "-17.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VIC",
            "score": 90,
            "price": "0.04397",
            "change_24h": "-19.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AWE",
            "score": 87,
            "price": "0.06091",
            "change_24h": "+5.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HUMA",
            "score": 87,
            "price": "0.02191",
            "change_24h": "+5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MYX",
            "score": 87,
            "price": "0.26540",
            "change_24h": "+5.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICNT",
            "score": 87,
            "price": "0.38130",
            "change_24h": "+4.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GLM",
            "score": 87,
            "price": "0.14153",
            "change_24h": "+3.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRADOOR",
            "score": 87,
            "price": "0.73910",
            "change_24h": "+3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ESPORTS",
            "score": 87,
            "price": "0.38990",
            "change_24h": "+2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KMNO",
            "score": 87,
            "price": "0.02064",
            "change_24h": "+2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DASH",
            "score": 87,
            "price": "35.0400",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XMR",
            "score": 87,
            "price": "379.1700",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LINK",
            "score": 87,
            "price": "9.1000",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOL",
            "score": 87,
            "price": "82.9000",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUI",
            "score": 87,
            "price": "0.90520",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IMX",
            "score": 87,
            "price": "0.16350",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LPT",
            "score": 87,
            "price": "2.0740",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AAVE",
            "score": 87,
            "price": "92.9600",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KNC",
            "score": 87,
            "price": "0.13730",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AKE",
            "score": 85,
            "price": "0.000317",
            "change_24h": "+19.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ENSO",
            "score": 85,
            "price": "1.0102",
            "change_24h": "+15.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GENIUS",
            "score": 85,
            "price": "0.49920",
            "change_24h": "+8.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALLO",
            "score": 85,
            "price": "0.11798",
            "change_24h": "+7.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PENDLE",
            "score": 85,
            "price": "1.3713",
            "change_24h": "+4.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PAXG",
            "score": 85,
            "price": "4616.53",
            "change_24h": "+1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAUT",
            "score": 85,
            "price": "4614.26",
            "change_24h": "+1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IRYS",
            "score": 85,
            "price": "0.03548",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTC",
            "score": 85,
            "price": "76263.40",
            "change_24h": "+0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "龙虾",
            "score": 85,
            "price": "0.007018",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COTI",
            "score": 85,
            "price": "0.01361",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARKM",
            "score": 85,
            "price": "0.11010",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CELR",
            "score": 85,
            "price": "0.002777",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUSHI",
            "score": 85,
            "price": "0.20540",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAGIC",
            "score": 85,
            "price": "0.06346",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LQTY",
            "score": 85,
            "price": "0.30150",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LSK",
            "score": 85,
            "price": "0.12410",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "QNT",
            "score": 85,
            "price": "68.6400",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DEEP",
            "score": 85,
            "price": "0.02808",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STG",
            "score": 85,
            "price": "0.21490",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LAYER",
            "score": 85,
            "price": "0.08122",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BANANA",
            "score": 85,
            "price": "3.7560",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOST",
            "score": 85,
            "price": "0.001049",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RSR",
            "score": 85,
            "price": "0.001655",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WOO",
            "score": 85,
            "price": "0.01846",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAV",
            "score": 85,
            "price": "0.01510",
            "change_24h": "-1.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HFT",
            "score": 85,
            "price": "0.01414",
            "change_24h": "-2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AGLD",
            "score": 85,
            "price": "0.24980",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XVG",
            "score": 85,
            "price": "0.003086",
            "change_24h": "-2.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "THETA",
            "score": 85,
            "price": "0.19530",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONE",
            "score": 85,
            "price": "0.002270",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BAND",
            "score": 85,
            "price": "0.21330",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KOMA",
            "score": 85,
            "price": "0.006727",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COS",
            "score": 85,
            "price": "0.001120",
            "change_24h": "-3.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FRAX",
            "score": 85,
            "price": "0.45140",
            "change_24h": "-3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MBOX",
            "score": 85,
            "price": "0.01185",
            "change_24h": "-5.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JCT",
            "score": 85,
            "price": "0.002902",
            "change_24h": "-6.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COLLECT",
            "score": 85,
            "price": "0.02815",
            "change_24h": "-7.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUMPBTC",
            "score": 85,
            "price": "0.01559",
            "change_24h": "-11.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIGENSYN",
            "score": 85,
            "price": "0.04026",
            "change_24h": "-11.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AGT",
            "score": 85,
            "price": "0.01783",
            "change_24h": "-12.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PIEVERSE",
            "score": 85,
            "price": "0.68060",
            "change_24h": "-12.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LUMIA",
            "score": 85,
            "price": "0.15148",
            "change_24h": "-13.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BASED",
            "score": 85,
            "price": "0.11267",
            "change_24h": "-14.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AVAAI",
            "score": 85,
            "price": "0.007070",
            "change_24h": "-18.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JOE",
            "score": 82,
            "price": "0.04714",
            "change_24h": "+5.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CATI",
            "score": 82,
            "price": "0.05107",
            "change_24h": "+2.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GMX",
            "score": 82,
            "price": "7.3460",
            "change_24h": "+1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKR",
            "score": 82,
            "price": "0.01590",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SOPH",
            "score": 82,
            "price": "0.008605",
            "change_24h": "+0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LA",
            "score": 82,
            "price": "0.15700",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SUPER",
            "score": 82,
            "price": "0.11990",
            "change_24h": "+0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CYBER",
            "score": 82,
            "price": "0.52270",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BSV",
            "score": 82,
            "price": "15.8000",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KAS",
            "score": 82,
            "price": "0.03246",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POLYX",
            "score": 82,
            "price": "0.04721",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ONG",
            "score": 82,
            "price": "0.07182",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARK",
            "score": 82,
            "price": "0.17350",
            "change_24h": "-1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GUA",
            "score": 80,
            "price": "0.90410",
            "change_24h": "+13.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AIOT",
            "score": 80,
            "price": "0.13216",
            "change_24h": "+10.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "B2",
            "score": 80,
            "price": "0.53960",
            "change_24h": "+10.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "JTO",
            "score": 80,
            "price": "0.35210",
            "change_24h": "+3.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "LIGHT",
            "score": 80,
            "price": "0.15230",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EDEN",
            "score": 80,
            "price": "0.03470",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRX",
            "score": 80,
            "price": "0.32633",
            "change_24h": "+0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STBL",
            "score": 80,
            "price": "0.03307",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AZTEC",
            "score": 80,
            "price": "0.01936",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CTK",
            "score": 80,
            "price": "0.17820",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOME",
            "score": 80,
            "price": "0.01493",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TUT",
            "score": 80,
            "price": "0.01067",
            "change_24h": "+0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASTR",
            "score": 80,
            "price": "0.008045",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TLM",
            "score": 80,
            "price": "0.001817",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACX",
            "score": 80,
            "price": "0.04285",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZRX",
            "score": 80,
            "price": "0.11020",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALPINE",
            "score": 80,
            "price": "0.44420",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RPL",
            "score": 80,
            "price": "1.8120",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SXT",
            "score": 80,
            "price": "0.01661",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "T",
            "score": 80,
            "price": "0.005811",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BROCCOLIF3B",
            "score": 80,
            "price": "0.004036",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ORDER",
            "score": 80,
            "price": "0.05395",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEAMX",
            "score": 80,
            "price": "0.001897",
            "change_24h": "-0.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IOTX",
            "score": 80,
            "price": "0.004520",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLOCK",
            "score": 80,
            "price": "0.05904",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "Q",
            "score": 80,
            "price": "0.01016",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "COW",
            "score": 80,
            "price": "0.18370",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POWR",
            "score": 80,
            "price": "0.06201",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HIVE",
            "score": 80,
            "price": "0.05889",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DODOX",
            "score": 80,
            "price": "0.01854",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "F",
            "score": 80,
            "price": "0.005365",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SLP",
            "score": 80,
            "price": "0.000684",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WAXP",
            "score": 80,
            "price": "0.006569",
            "change_24h": "-1.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "OG",
            "score": 80,
            "price": "2.8980",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ICX",
            "score": 80,
            "price": "0.03584",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MLN",
            "score": 80,
            "price": "3.0100",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROMPT",
            "score": 80,
            "price": "0.03472",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STORJ",
            "score": 80,
            "price": "0.09570",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CARV",
            "score": 80,
            "price": "0.05577",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VTHO",
            "score": 80,
            "price": "0.000561",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BMT",
            "score": 80,
            "price": "0.01508",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAIKO",
            "score": 80,
            "price": "0.11410",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CELO",
            "score": 80,
            "price": "0.08564",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYN",
            "score": 80,
            "price": "0.05200",
            "change_24h": "-1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUST",
            "score": 80,
            "price": "0.06741",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MOCA",
            "score": 80,
            "price": "0.01344",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BABY",
            "score": 80,
            "price": "0.01459",
            "change_24h": "-1.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NEWT",
            "score": 80,
            "price": "0.07377",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SQD",
            "score": 80,
            "price": "0.03005",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PUNDIX",
            "score": 80,
            "price": "0.14470",
            "change_24h": "-1.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAVIA",
            "score": 80,
            "price": "0.03613",
            "change_24h": "-2.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "VELODROME",
            "score": 80,
            "price": "0.01733",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "STEEM",
            "score": 80,
            "price": "0.05582",
            "change_24h": "-2.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HAEDAL",
            "score": 80,
            "price": "0.03020",
            "change_24h": "-2.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HEI",
            "score": 80,
            "price": "0.07932",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ASR",
            "score": 80,
            "price": "1.2290",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "DIA",
            "score": 80,
            "price": "0.18070",
            "change_24h": "-2.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SCR",
            "score": 80,
            "price": "0.04352",
            "change_24h": "-2.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "IDOL",
            "score": 80,
            "price": "0.02253",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HANA",
            "score": 80,
            "price": "0.03829",
            "change_24h": "-3.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XAN",
            "score": 80,
            "price": "0.008217",
            "change_24h": "-3.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "US",
            "score": 80,
            "price": "0.004296",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ETHW",
            "score": 80,
            "price": "0.30650",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MELANIA",
            "score": 80,
            "price": "0.10300",
            "change_24h": "-3.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EVAA",
            "score": 80,
            "price": "0.59570",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "FLUX",
            "score": 80,
            "price": "0.06325",
            "change_24h": "-3.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SCRT",
            "score": 80,
            "price": "0.09685",
            "change_24h": "-4.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BREV",
            "score": 80,
            "price": "0.11400",
            "change_24h": "-5.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RECALL",
            "score": 80,
            "price": "0.04728",
            "change_24h": "-5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AEVO",
            "score": 80,
            "price": "0.02695",
            "change_24h": "-5.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POPCAT",
            "score": 80,
            "price": "0.05596",
            "change_24h": "-6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "M",
            "score": 80,
            "price": "3.2136",
            "change_24h": "-6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "A",
            "score": 80,
            "price": "0.08931",
            "change_24h": "-6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SANTOS",
            "score": 80,
            "price": "1.1280",
            "change_24h": "-6.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CROSS",
            "score": 80,
            "price": "0.09972",
            "change_24h": "-6.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "INX",
            "score": 80,
            "price": "0.009879",
            "change_24h": "-7.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTR",
            "score": 80,
            "price": "0.02552",
            "change_24h": "-7.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "YB",
            "score": 80,
            "price": "0.11440",
            "change_24h": "-7.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RAVE",
            "score": 80,
            "price": "0.71120",
            "change_24h": "-8.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MEGA",
            "score": 80,
            "price": "0.16322",
            "change_24h": "-9.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAKE",
            "score": 80,
            "price": "0.02666",
            "change_24h": "-9.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRIA",
            "score": 77,
            "price": "0.03813",
            "change_24h": "+8.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ZEN",
            "score": 77,
            "price": "5.7770",
            "change_24h": "+1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "KSM",
            "score": 77,
            "price": "4.7290",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MTL",
            "score": 77,
            "price": "0.29550",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "EGLD",
            "score": 77,
            "price": "4.1030",
            "change_24h": "-0.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MINA",
            "score": 77,
            "price": "0.05893",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GAS",
            "score": 77,
            "price": "1.6030",
            "change_24h": "-0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BIO",
            "score": 75,
            "price": "0.04273",
            "change_24h": "+25.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "GWEI",
            "score": 75,
            "price": "0.10849",
            "change_24h": "+15.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TRUTH",
            "score": 75,
            "price": "0.009768",
            "change_24h": "+2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "WET",
            "score": 75,
            "price": "0.09637",
            "change_24h": "+1.0%",
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
            "coin": "GTC",
            "score": 75,
            "price": "0.09317",
            "change_24h": "-0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CKB",
            "score": 75,
            "price": "0.001472",
            "change_24h": "-1.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BEL",
            "score": 75,
            "price": "0.10460",
            "change_24h": "-1.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "HOT",
            "score": 75,
            "price": "0.000427",
            "change_24h": "-1.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RLC",
            "score": 75,
            "price": "0.42700",
            "change_24h": "-1.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ARPA",
            "score": 75,
            "price": "0.009830",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SFP",
            "score": 75,
            "price": "0.31980",
            "change_24h": "-2.8%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PHB",
            "score": 75,
            "price": "0.10710",
            "change_24h": "-6.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "APR",
            "score": 75,
            "price": "0.16544",
            "change_24h": "-7.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "USUAL",
            "score": 72,
            "price": "0.01369",
            "change_24h": "+0.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "PROVE",
            "score": 72,
            "price": "0.24600",
            "change_24h": "+0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CVC",
            "score": 72,
            "price": "0.03059",
            "change_24h": "+0.1%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ALL",
            "score": 72,
            "price": "0.54460",
            "change_24h": "-0.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "RVN",
            "score": 72,
            "price": "0.005820",
            "change_24h": "-0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "AUCTION",
            "score": 72,
            "price": "4.7430",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NXPC",
            "score": 72,
            "price": "0.29440",
            "change_24h": "-0.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "XVS",
            "score": 72,
            "price": "2.5180",
            "change_24h": "-0.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ACU",
            "score": 70,
            "price": "0.09587",
            "change_24h": "+9.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ROSE",
            "score": 70,
            "price": "0.009890",
            "change_24h": "+1.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BTCDOM",
            "score": 70,
            "price": "5465.50",
            "change_24h": "+0.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "ATA",
            "score": 70,
            "price": "0.009550",
            "change_24h": "-2.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000000BOB",
            "score": 70,
            "price": "0.01232",
            "change_24h": "-5.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SYS",
            "score": 70,
            "price": "0.008530",
            "change_24h": "-5.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "POWER",
            "score": 67,
            "price": "0.09192",
            "change_24h": "+6.7%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BNT",
            "score": 67,
            "price": "0.30710",
            "change_24h": "-0.0%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "1000XEC",
            "score": 67,
            "price": "0.006940",
            "change_24h": "-0.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAC",
            "score": 65,
            "price": "0.01849",
            "change_24h": "+29.6%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "NAORIS",
            "score": 65,
            "price": "0.13820",
            "change_24h": "+22.3%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BLUAI",
            "score": 62,
            "price": "0.01387",
            "change_24h": "+18.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "MAGMA",
            "score": 62,
            "price": "0.23128",
            "change_24h": "+15.5%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "CLANKER",
            "score": 62,
            "price": "23.6200",
            "change_24h": "+1.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "SKYAI",
            "score": 60,
            "price": "0.34167",
            "change_24h": "+28.2%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "TAG",
            "score": 60,
            "price": "0.000670",
            "change_24h": "+24.9%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BR",
            "score": 50,
            "price": "0.15969",
            "change_24h": "+81.4%",
            "change_4h": "待追踪",
            "change_8h": "待追踪"
      },
      {
            "coin": "BSB",
            "score": 50,
            "price": "0.61013",
            "change_24h": "+32.3%",
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
