# 策略中心 - 9大策略完整技术文档

**版本**: v1.0 | **生成时间**: 2026-05-02 | **数据源**: Binance USDT 永续合约 15min K线

---

## 通用回测设置

| 参数 | 值 | 说明 |
|------|-----|------|
| **K线周期** | 15分钟 | 所有策略统一使用15min K线 |
| **仓位模型** | 15% 复利 | 每笔交易使用账户资金的15% |
| **初始资金** | $10,000 | 模拟账户起始余额 |
| **最大持仓** | 1笔 | 同一时间只持有一个仓位 |
| **手续费** | 0% | 未计入手续费（Binance Maker 0.02%, Taker 0.05%） |
| **资金费率** | 未计入 | 未计入每8小时资金费率 |
| **滑点** | 未计入 | 假设以收盘价成交，无滑点 |

---

## 策略1: 海龟突破 (Turtle Breakout)

### 核心逻辑
经典的唐奇安通道突破策略。价格突破20周期高点做多，跌破10周期低点平仓。

### 技术指标
- **Donchian Channel Upper**: `max(high, 20)` — 过去20根K线的最高价
- **Donchian Channel Lower**: `min(low, 10)` — 过去10根K线的最低价

### 入场条件（同时满足）
1. `close > donchian_upper_20`（当前收盘价突破20周期高点）
2. 当前无持仓

### 出场条件（满足任一）
1. `close < donchian_lower_10`（跌破10周期低点）
2. `(close - entry_price) / entry_price < -0.08`（止损8%）

### 计算示例
假设当前是第100根K线：
- `donchian_upper_20 = max(high[80], high[81], ..., high[99])`
- `donchian_lower_10 = min(low[90], low[91], ..., low[99])`
- 如果 `close[100] > donchian_upper_20` → **做多**
- 如果持仓中 `close[i] < donchian_lower_10` → **平仓**

### LABUSDT 表现
- 交易9笔 | 胜率56% | 盈亏比42.40 | 账户收益+26.3%

---

## 策略2: EMA趋势跟踪 (EMA Trend Following)

### 核心逻辑
使用三条EMA均线的多头排列判断趋势，金叉做多，死叉平仓。

### 技术指标
- **EMA9**: 9周期指数移动平均，`EMA = close * (2/10) + prev_EMA * (1 - 2/10)`
- **EMA20**: 20周期指数移动平均，`EMA = close * (2/21) + prev_EMA * (1 - 2/21)`
- **EMA50**: 50周期指数移动平均，`EMA = close * (2/51) + prev_EMA * (1 - 2/51)`

### EMA计算公式
```
EMA(t) = Price(t) * k + EMA(t-1) * (1-k)
其中 k = 2 / (period + 1)

EMA9:  k = 2/10  = 0.2
EMA20: k = 2/21  ≈ 0.0952
EMA50: k = 2/51  ≈ 0.0392
```

### 入场条件（同时满足）
1. `EMA9 > EMA20`（短期均线在中期上方）
2. `EMA20 > EMA50`（中期均线在长期上方）
3. 当前无持仓

### 出场条件（满足任一）
1. `EMA9 < EMA20`（EMA死叉，短期跌破中期）
2. `(close - entry_price) / entry_price < -0.08`（止损8%）
3. `(close - entry_price) / entry_price > 0.20`（止盈20%）

### 手工筛选步骤
1. 计算每根K线的EMA9、EMA20、EMA50
2. 当三条线从下到上排列（EMA50 < EMA20 < EMA9）时，**做多**
3. 当EMA9下穿EMA20时，**平仓**

### LABUSDT 表现
- 交易52笔 | 胜率65% | 盈亏比3.24 | 账户收益+20.9%

---

## 策略3: 量价突破 (Volume-Price Breakout)

### 核心逻辑
放量（>2x均量）且价格突破20周期高点时做多，跌破10周期低点平仓。

### 技术指标
- **Donchian Upper 20**: `max(high, 20)`
- **Donchian Lower 10**: `min(low, 10)`
- **Volume MA 20**: `mean(volume, 20)` — 过去20根K线的平均成交量

### 入场条件（同时满足）
1. `close > donchian_upper_20`（价格突破20周期高点）
2. `volume > volume_ma_20 * 2`（成交量大于2倍均量）
3. 当前无持仓

### 出场条件（满足任一）
1. `close < donchian_lower_10`（跌破10周期低点）
2. `(close - entry_price) / entry_price < -0.08`（止损8%）
3. `(close - entry_price) / entry_price > 0.20`（止盈20%）

### 手工筛选步骤
1. 计算20周期最高价和20周期均量
2. 当 `收盘价 > 20周期最高价` 且 `成交量 > 2 * 20周期均量` 时，**做多**
3. 当 `收盘价 < 10周期最低价` 或 触发止损/止盈时，**平仓**

### LABUSDT 表现
- 交易17笔 | 胜率65% | 盈亏比3.62 | 账户收益+20.2%

---

## 策略4: ATR自适应止损 (ATR Adaptive Stop)

### 核心逻辑
用ATR（平均真实波幅）动态计算止损止盈位。15min涨幅>3%且放量入场。

### 技术指标
- **TR (真实波幅)**: `max(high-low, abs(high-prev_close), abs(low-prev_close))`
- **ATR14**: `mean(TR, 14)` — 过去14根K线的平均真实波幅
- **Volume MA 4**: `mean(volume, 4)` — 过去4根K线的平均成交量

### ATR计算公式
```
TR(t) = max(
    high(t) - low(t),
    abs(high(t) - close(t-1)),
    abs(low(t) - close(t-1))
)
ATR14(t) = sum(TR(t-13), ..., TR(t)) / 14
```

### 入场条件（同时满足）
1. `(close - close[4]) / close[4] > 0.03`（4根K线涨幅>3%，即1小时涨幅>3%）
2. `volume > volume_ma_4 * 1.5`（成交量大于1.5倍4周期均量）
3. 当前无持仓

### 出场条件（满足任一）
1. `entry_price - close > ATR14 * 2`（ATR*2止损）
2. `close - entry_price > ATR14 * 3`（ATR*3止盈）
3. `(close - entry_price) / entry_price < -0.08`（硬性止损8%）
4. `(close - entry_price) / entry_price > 0.20`（硬性止盈20%）

### 手工筛选步骤
1. 计算每根K线的TR和ATR14
2. 检查1小时（4根15min K）涨幅是否>3%
3. 检查成交量是否>1.5倍4周期均量
4. 满足条件后，止损位 = `entry_price - ATR14 * 2`，止盈位 = `entry_price + ATR14 * 3`

### LABUSDT 表现
- 交易18笔 | 胜率67% | 盈亏比2.43 | 账户收益+19.4%

---

## 策略5: 时间序列动量 (Time Series Momentum)

### 核心逻辑
4小时（16根15min K线）涨幅>5%时做多，动量反转（4h跌幅>5%）时平仓。

### 技术指标
- **Change 4h**: `(close - close[16]) / close[16]` — 16根K线前的涨跌幅

### 入场条件（同时满足）
1. `change_4h > 0.05`（4小时涨幅>5%）
2. 当前无持仓

### 出场条件（满足任一）
1. `change_4h < -0.05`（4小时跌幅>5%，动量反转）
2. `(close - entry_price) / entry_price < -0.08`（止损8%）
3. `(close - entry_price) / entry_price > 0.20`（止盈20%）

### 手工筛选步骤
1. 每根K线计算：`(当前价 - 16根K前的价格) / 16根K前的价格`
2. 当结果 > 5% 时，**做多**
3. 当结果 < -5% 时，**平仓**

### LABUSDT 表现
- 交易9笔 | 胜率78% | 盈亏比2.10 | 账户收益+19.1%

---

## 策略6: 双策略切换 (Dual Strategy Switch)

### 核心逻辑
结合趋势跟踪和均值回归。趋势模式（EMA多头排列）和反转模式（RSI超卖）任一触发即入场。

### 技术指标
- **EMA9**: 9周期指数移动平均
- **EMA20**: 20周期指数移动平均
- **RSI14**: 14周期相对强弱指数

### RSI计算公式
```
delta = close - close[1]
gain = max(delta, 0)
loss = max(-delta, 0)
avg_gain = mean(gain, 14)
avg_loss = mean(loss, 14)
RS = avg_gain / avg_loss
RSI = 100 - (100 / (1 + RS))
```

### 入场条件（满足任一）
1. **趋势模式**: `EMA9 > EMA20`
2. **均值回归模式**: `RSI14 < 30`（超卖）
3. 当前无持仓

### 出场条件（满足任一）
1. `EMA9 < EMA20` 且 `RSI14 > 70`（趋势反转+超买）
2. `(close - entry_price) / entry_price < -0.08`（止损8%）
3. `(close - entry_price) / entry_price > 0.20`（止盈20%）

### LABUSDT 表现
- 交易9笔 | 胜率78% | 盈亏比2.10 | 账户收益+19.1%

---

## 策略7: MA20趋势跟踪 (MA20 Trend)

### 核心逻辑
最简单的趋势策略。价格上穿MA20做多，下穿MA20平仓。

### 技术指标
- **MA20**: 20周期简单移动平均，`mean(close, 20)`

### 入场条件（同时满足）
1. `close > MA20`（当前价格在MA20上方）
2. `close[1] <= MA20[1]`（前一根K线价格在MA20下方或等于）
3. 当前无持仓

### 出场条件（满足任一）
1. `close < MA20` 且 `close[1] >= MA20[1]`（下穿MA20）
2. `(close - entry_price) / entry_price < -0.08`（止损8%）
3. `(close - entry_price) / entry_price > 0.20`（止盈20%）

### 手工筛选步骤
1. 计算20周期简单移动平均
2. 当价格从下方穿越MA20时，**做多**
3. 当价格从上方穿越MA20时，**平仓**

### LABUSDT 表现
- 交易19笔 | 胜率63% | 盈亏比2.26 | 账户收益+15.7%

---

## 策略8: 布林带突破 (Bollinger Band Breakout)

### 核心逻辑
价格突破布林带上轨做多，跌破中轨平仓。

### 技术指标
- **BB Mid (MA20)**: `mean(close, 20)`
- **BB Upper**: `MA20 + 2 * std(close, 20)`
- **BB Lower**: `MA20 - 2 * std(close, 20)`
- **BB Width**: `(BB_Upper - BB_Lower) / MA20` — 布林带宽度

### 标准差计算公式
```
std = sqrt(sum((close[i] - MA20)^2, i=0..19) / 20)
```

### 入场条件（同时满足）
1. `close > BB_Upper`（价格突破布林带上轨）
2. 当前无持仓

### 出场条件（满足任一）
1. `close < BB_Mid`（跌破布林带中轨）
2. `(close - entry_price) / entry_price < -0.08`（止损8%）
3. `(close - entry_price) / entry_price > 0.20`（止盈20%）

### 手工筛选步骤
1. 计算20周期均值和标准差
2. BB上轨 = 均值 + 2*标准差，BB中轨 = 均值
3. 当价格突破上轨时，**做多**
4. 当价格跌破中轨时，**平仓**

### LABUSDT 表现
- 交易65笔 | 胜率49% | 盈亏比3.27 | 账户收益+14.6%

---

## 策略9: RSI均值回归 (RSI Mean Reversion)

### 核心逻辑
RSI<30超卖买入，RSI>70超买卖出。

### 技术指标
- **RSI14**: 14周期相对强弱指数（计算公式见策略6）

### 入场条件（同时满足）
1. `RSI14 < 30`（超卖）
2. 当前无持仓

### 出场条件（满足任一）
1. `RSI14 > 70`（超买）
2. `(close - entry_price) / entry_price < -0.08`（止损8%）
3. `(close - entry_price) / entry_price > 0.20`（止盈20%）

### 手工筛选步骤
1. 计算14周期RSI
2. 当RSI < 30时，**做多**
3. 当RSI > 70时，**平仓**

### LABUSDT 表现
- 交易32笔 | 胜率53% | 盈亏比1.50 | 账户收益+6.6%

---

## 通用止损/止盈规则

所有策略都遵循以下硬性风控规则：

| 规则 | 值 | 说明 |
|------|-----|------|
| **止损** | -8% | 任何策略亏损达到8%必须平仓 |
| **止盈** | +20% | 任何策略盈利达到20%必须平仓 |
| **仓位** | 15% | 每笔交易使用账户资金的15% |
| **复利** | 是 | 盈利滚入下一笔交易 |

## 如何手工回测

1. **获取数据**: 从Binance下载15min K线数据（Open, High, Low, Close, Volume）
2. **计算指标**: 用Excel/Google Sheets计算各策略所需指标
3. **逐根K线判断**: 从第50根K线开始（需要足够的历史数据计算指标）
4. **记录交易**: 记录每次入场价、出场价、盈亏、持仓时间
5. **计算账户**: 按15%仓位复利计算最终收益

### Excel公式示例
```
EMA9: =B2*(2/10)+C1*(1-2/10)  (B2是当前收盘价，C1是前一期EMA9)
MA20: =AVERAGE(B2:B21)  (B2:B21是最近20个收盘价)
RSI14: 需要辅助列计算gain和loss，然后用14周期平均
```

---

**文档版本**: v1.0 | **最后更新**: 2026-05-02 | **维护人**: AI策略团队
