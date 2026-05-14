# Sprint 3: 执行状态循环 + 风险守门

日期：2026-06-18

## 本次变更文件

- `src/components/TradingMissionDesk.tsx`
- `src/lib/trading-desk.ts`
- `src/lib/trading-plans-store.ts`
- `src/app/api/trading-plans/route.ts`
- `supabase/migrations/20260618000000_trade_plan_status.sql`
- `docs/sprints/sprint-3-execution-risk-loop.md`

## 执行状态行为说明

- 在交易计划表单中新增 `执行状态` 选择项：
  - `draft`（草稿）
  - `planned`（已计划）
  - `executed`（已执行）
  - `cancelled`（已取消）
- 表单保存时会一并提交 `status`，并在本地草稿与列表中持久化。
- 最近计划列表现在显示状态标签，并支持简单筛选（全部 / 草稿 / 已计划 / 已执行 / 已取消）。
- 兼容历史数据：当后端返回的计划缺少状态时，前端与后端默认展示为 `planned`。

## 风险校验规则（保存前）

- 缺失字段仍会阻止保存：
  - 标的为空
  - 账户规模 ≤ 0
  - 风险百分比 ≤ 0
  - 机会说明为空
  - 核心风险为空
  - 失效条件为空
- 风险百分比 > 2：
  - 页面会显示“激进计划，需确认”的风险状态；
  - 出现显式勾选框 `我确认当前计划为高风险...`；
  - 勾选前按钮不可点击；
  - 勾选后可保存。
- 页面实时展示风险预算（USDT）和风险状态（可执行 / 可执行（已确认） / 不可执行），满足“教育型提示”要求。

## 数据源真实性改动

- 将 `src/lib/trading-desk.ts` 中的数据源状态从 `connected` 改为：
  - `manual`（手工填充）
  - `simulated`（模拟预演）
  - `reference-only`（参考素材）
- 在仪表盘头部 `数据状态` 卡片中新增展示，明确说明当前为“手工/模拟/参考”口径，不展示 Binance / OKX / Coinglass / CMC 为 `connected`。
- 新增 migration：`supabase/migrations/20260618000000_trade_plan_status.sql` 为 `trade_plans` 增加 `status` 列并约束；
  - API 存储层同时兼容“无新列的旧库”，通过回退查询/写入策略保持兼容。

## 验证结果

- `cmd /c npm run lint`：通过
- `cmd /c npm run build`：通过

## `/dashboard` 人工烟测清单

1. 打开 `/dashboard`，确认 `数据状态` 区域显示：
   - 手工/模拟/参考数据说明；
   - 数据来源清单中的状态不是 `connected`。
2. 进入交易计划表单，验证：
   - 未填写必填项时按钮显示为不可用；
   - 风险比例、账户规模为 0 或空时提示不可保存；
   - 风险比例 > 2 时必须勾选确认后按钮才可点击；
   - 风险预算和风险状态文案同步更新。
3. 选择执行状态并保存计划：
   - 计划应保存成功（本地演示与 Supabase 路径都可成功返回）；
   - 最近计划卡片展示状态标签并支持筛选。
4. 检查历史列表：
   - 列出最近计划（最多 5 条）；
   - 不同状态可筛选；
   - 历史记录无状态时显示为 `已计划`。

## 已知风险 / Sprint 4 建议

- 新增 `trade_plans.status` 字段 migration 在当前会话未自动执行数据库；
  建议在下一次数据库迁移窗口应用并确认现网环境。
- 部分中文文本仍可能受编码展示差异影响，建议 Sprint 4 增加文案统一清理。
- 建议 Sprint 4：
  1. 继续完善计划执行闭环（已计划 -> 已执行/已取消）状态流转后的复盘挂钩；
  2. 在知识任务页加入“执行结果回填”入口（不进入外部 API）。
