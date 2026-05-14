# SingClaw OpenClaw Project-Group Task Ledger

Generated at: 2026-06-14T14:31:32.397Z

Merge policy: read-only archive: source records are indexed here but not mutated

This ledger consolidates local OpenClaw, Neon, cron, Windows scheduler, memory, and report evidence into the SingClaw project group. Source systems are indexed read-only and were not mutated by the import.

## Counts

| Metric | Count |
| --- | ---: |
| Total entries | 263 |
| Blocked | 51 |
| Needs Triage | 42 |
| Operational Watch | 3 |
| Archived Done | 167 |

## Source Inputs

- OpenClaw runs SQLite: `C:\openclaw-state\tasks\runs.sqlite`
- OpenClaw cron jobs: `C:\openclaw-state\cron\jobs.json`
- Neon operational tables: `C:\openclaw-workspace\tmp\neon.active.url (read only, value redacted)`
- Reports: `C:\openclaw-workspace\reports`
- Memory: `C:\openclaw-workspace\memory`

## Blocked / Retry First

| Status | Priority | Area | Source | Title | Source Owner | Next Action |
| --- | --- | --- | --- | --- | --- | --- |
| Blocked | P0 | collab-control | neon_task_queue:T-035 | 2026-06-06 每日 Agent 议题交流未达标：Maxink 未 ACK watchdog 课题 | maxink | Review task status during project-group triage. |
| Blocked | P0 | singclaw-town | neon_agent_topics:d5c85473-7f20-4978-9f87-042a57a3d109 | 每日 Agent 议题交流：SingClaw 小镇持续讨论 watchdog | maxink+niqiu | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | singclaw-town | neon_agent_mailbox:25bbd76d-8100-4bc6-9ead-6ab7c277a4fd | 每日 Agent 议题交流：SingClaw 小镇持续讨论 watchdog | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_agent_topics:35e9a46e-6a92-4886-a5ed-bb0e190a2a74 | 每日 Agent 议题交流：Agent 通信 SLA 优化 | niqiu | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | collab-control | neon_task_queue:T-036 | 2026-06-05 每日 Agent 议题交流未达标：Maxink 未 ACK Agent 通信 SLA 课题 | maxink | Review task status during project-group triage. |
| Blocked | P0 | collab-control | neon_agent_mailbox:74211fe2-a2f8-4b93-b21e-3e1e9a43696f | ESCALATION P0：每日 Agent 议题交流 ACK 超时 | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_agent_mailbox:5b48e655-5f87-4605-98b0-db8f37b4d2f2 | ESCALATION P0：每日 Agent 议题交流 ACK 超时 | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_agent_mailbox:132de027-ab70-4508-afe2-fc8f407c81cb | P0 每日 Agent 议题交流：Agent 通信 SLA 优化 | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_agent_topics:2eec8734-995c-498c-bb36-843e4f8d002f | 每日 Agent 议题交流: Agent 通信 SLA 优化 | maxink+niqiu | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | collab-control | neon_agent_mailbox:bcc839a1-8419-48d5-981f-8d568ad5227d | P0：每日 Agent 议题交流请 5 分钟内 ACK/NACK | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_task_queue:T-034 | 2026-06-03 每日 Agent 议题交流未达标：Maxink 未 ACK OCTO 六模块吸收课题 | maxink | Review task status during project-group triage. |
| Blocked | P0 | collab-control | neon_agent_topics:82b0dc60-9174-4e9c-813b-876f557a50c1 | 每日 Agent 议题交流：Mininglamp/OCTO 六模块吸收 | maxink+niqiu | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | collab-control | neon_agent_mailbox:629bf1e5-75cd-44bb-b370-84f2fc207501 | ESCALATION：每日 Agent 议题交流 ACK 超时 - OCTO 六模块吸收 | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_agent_mailbox:5c0460d6-984b-48f9-940e-91a1cbbb3914 | ESCALATION：每日 Agent 议题交流 ACK 超时 - OCTO 六模块吸收 | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_agent_topics:93ea3f48-63b7-4ee9-a914-fdeffafc0ab9 | 每日 Agent 议题交流：通用 Agent 学习路径 MVP | maxink+niqiu | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | agent-oa | neon_task_queue:T-033 | 2026-06-02 每日 Agent 议题交流未达标：Maxink 未 ACK 学习路径 MVP 课题 | maxink | Review task status during project-group triage. |
| Blocked | P0 | collab-control | neon_agent_topics:5459bbfc-09ce-448c-80c4-f5c764359c62 | 2026-05-31 每日 Agent 议题交流：Agent 通信 SLA 优化 | maxink+niqiu | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | collab-control | neon_task_queue:T-032 | 2026-05-31 每日 Agent 议题交流未达标：Maxink 未 ACK Agent 通信 SLA 课题 | maxink | Review task status during project-group triage. |
| Blocked | P0 | collab-control | neon_agent_mailbox:7a6bc311-ed39-466c-8be0-9c79be665e02 | ESCALATION: 每日 Agent 议题交流 5分钟 ACK 超时 | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_agent_mailbox:d9e74419-e56c-4285-96e9-e7f1a35a8027 | P0: 每日 Agent 议题交流 Round 1 - Agent 通信 SLA 优化 | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | singclaw-town | neon_agent_topics:a3c6b8c5-bbe8-43e4-abae-93406b86afb2 | 2026-05-30 每日 Agent 议题交流：SingClaw 小镇持续讨论 watchdog | maxink+niqiu | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | collab-control | neon_task_queue:T-031 | 2026-05-30 每日 Agent 议题交流未达标：Maxink 未 ACK watchdog 课题 | maxink+niqiu | Review task status during project-group triage. |
| Blocked | P0 | collab-control | neon_agent_mailbox:7623c181-da0f-4bb6-b97f-f8e80be0160b | ESCALATION：每日 Agent 议题交流 5分钟 ACK SLA 已超时 | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | singclaw-town | neon_agent_mailbox:84b3ca44-153c-47d4-82d6-0f46ec29bb04 | P0 每日 Agent 议题交流：SingClaw 小镇持续讨论 watchdog，请 5 分钟内 ACK | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_agent_topics:d7dd7e9f-f0b7-4554-9005-006c252b1520 | 每日 Agent 议题交流：Agent 通信 SLA 优化 | maxink+niqiu | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | collab-control | neon_task_queue:T-030 | 修复每日 Agent 议题交流 ACK/poller 失败 | maxink+niqiu | Review task status during project-group triage. |
| Blocked | P0 | collab-control | neon_agent_mailbox:183de64b-cf77-42b2-8189-94bca02d687a | ESCALATION：每日 Agent 议题交流 5分钟 ACK SLA 已超时 | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_agent_mailbox:17725326-389d-4c2a-a8b4-0f09cff1149f | P0 每日 Agent 议题交流：Agent 通信 SLA 优化 | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_agent_mailbox:6d702896-b506-451d-8be1-6276f33c127a | P0 每日 Agent 议题交流：Mininglamp/OCTO 六模块吸收，请 5 分钟内 ACK | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_task_queue:T-029 | 2026-05-27 每日 Agent 议题交流未达标：Maxink 未 ACK | maxink | Review task status during project-group triage. |
| Blocked | P0 | collab-control | neon_agent_topics:4ac78780-b034-4dd9-a4da-bcb927e8169b | 每日 Agent 议题交流 2026-05-27：Agent 通信 SLA 优化 | maxink+niqiu | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | collab-control | neon_agent_mailbox:bd8a09c8-6ce3-467c-94fe-0462f334349f | P0 每日 Agent 议题交流：Agent 通信 SLA 优化，请 5 分钟内 ACK | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_agent_mailbox:259e482a-cdaf-4a0b-9a50-ecd98e0fac15 | P0：每日 Agent 议题交流请 5 分钟内 ACK | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_agent_mailbox:bcc97100-70cb-4cf7-95f6-ab69f2846ea5 | [P0][每日Agent议题] 10分钟内请回复：通用 Agent 学习路径 MVP | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_task_queue:T-027 | 2026-05-24 每日 Agent 议题交流未达标：Maxink 未 ACK | maxink | Review task status during project-group triage. |
| Blocked | P0 | collab-control | neon_agent_topics:9f6be85a-cddd-499a-9297-da068c3e6387 | 2026-05-24 每日 Agent 议题交流：Agent 通信 SLA 优化 | maxink+niqiu | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | collab-control | neon_agent_mailbox:c6453ee4-b93c-4f88-943b-4df3bc0c5484 | [P0][每日Agent议题] 10分钟内请回复：Agent通信SLA优化 | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | agent-oa | neon_task_queue:T-028 | 2026-05-23 每日 Agent 议题交流未达标：watchdog 课题 | maxink+niqiu | Review task status during project-group triage. |
| Blocked | P0 | singclaw-town | neon_agent_topics:60944108-588d-47fb-9236-670346d1ec87 | 每日 Agent 议题交流：SingClaw 小镇持续讨论 watchdog（2026-05-23 21点） | maxink+niqiu | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | collab-control | neon_agent_mailbox:cce3eec5-cc13-4a84-8cc6-8bdd1dbb503a | P0 ESCALATION：每日 Agent watchdog 5分钟未 ACK | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | singclaw-town | neon_agent_mailbox:5c7e6b38-3fb2-4a2e-bc7e-fd0da978467e | P0 每日 Agent 议题交流：SingClaw 小镇持续讨论 watchdog | niqiu -> maxink | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | collab-control | neon_task_queue:T-026 | 2026-05-22 每日 Agent 议题交流未达标：Maxink 未 ACK | maxink+niqiu | Review task status during project-group triage. |
| Blocked | P0 | collab-control | neon_agent_topics:3c0f3763-ea90-4539-94fa-aeb62b839e90 | 每日 Agent 议题交流：SOP 总库飞书同步（2026-05-22 21点） | niqiu+maxink | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | collab-control | neon_agent_topics:5fda8b01-f97f-4204-8f95-ed8461b379ae | 每日 Agent 议题交流：Agent 通信 SLA 优化（2026-05-21 21点） | niqiu+maxink | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | collab-control | neon_task_queue:T-023 | 修复每日 Agent 议题交流 ACK/poller 失败 | maxink+niqiu | Review task status during project-group triage. |
| Blocked | P0 | collab-control | neon_agent_topics:715dd528-25d9-4b73-9614-30b44d16d210 | 每日 Agent 议题交流：Agent 通信 SLA 优化（2026-05-20 21点） | maxink+niqiu | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | agent-oa | neon_agent_topics:fdef8827-455a-4495-93ea-608b705ed5fa | 每日 Agent 议题交流机制验收 | unknown | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | collab-control | neon_agent_topics:37ac6454-40ab-423d-a82f-71609811ff77 | 修复 Maxink × 泥鳅无效沟通：No Empty Talk v1 | maxink | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | collab-control | neon_agent_topics:04572f84-3e4c-4d1d-b0c2-321e216919c9 | 升级沟通体系为5小时实时交流机制 | unknown | Convert the blocked topic into one explicit owner, next reply, and acceptance condition. |
| Blocked | P0 | starclaw | neon_agent_mailbox:8bdfcaba-b214-4dd5-9030-cab2f514b824 | ASK_KOVI_STARCLAW_VERCEL_DEPLOY | maxink -> main | Treat as blocked communication; assign a project-group responder before closing the loop. |
| Blocked | P0 | starclaw | neon_agent_mailbox:5e5477af-5062-4f88-b53d-5b99a7b5edb9 | ASK_KOVI_STARCLAW_VERCEL_DEPLOY | maxink -> kovi | Treat as blocked communication; assign a project-group responder before closing the loop. |

## Needs Triage

| Status | Priority | Area | Source | Title | Source Owner | Next Action |
| --- | --- | --- | --- | --- | --- | --- |
| Needs Triage | P0 | collab-control | neon_agent_mailbox:06702287-782e-4623-a917-01079a5acbe2 | MAXINK_DONE__LEGACY_MAILBOX_CLEARED | maxink -> maxink | Review whether the open message still requires action or can be archived. |
| Needs Triage | P0 | collab-control | neon_agent_mailbox:d729a9e7-c230-4515-9d2e-75f8dbf45afc | MAXINK_SELF_ACK__WHY_NOT_HANDLED | maxink -> maxink | Review whether the open message still requires action or can be archived. |
| Needs Triage | P0 | collab-control | neon_task_queue:T-025 | 12 Sprint 对话系统整改：明早前给出结果 | maxink+niqiu | Convert approved source task into an active project-group work item or archive with reason. |
| Needs Triage | P0 | collab-control | neon_task_queue:T-024 | 落地 No Empty Talk v2：可靠快交流 worker/poller | maxink+niqiu | Convert approved source task into an active project-group work item or archive with reason. |
| Needs Triage | P0 | agent-oa | neon_task_queue:T-021 | 快交流层试用：如何试用并验收 agent_topics | maxink+niqiu | Convert approved source task into an active project-group work item or archive with reason. |
| Needs Triage | P0 | collab-control | neon_task_queue:T-020 | 修复 Maxink × 泥鳅无效沟通：No Empty Talk 协作协议 v1 | maxink+niqiu | Convert approved source task into an active project-group work item or archive with reason. |
| Needs Triage | P0 | agent-oa | neon_task_queue:T-016A | 实现 Topic 讨论闭环自动落单与验收导出 | maxink+niqiu | Convert approved source task into an active project-group work item or archive with reason. |
| Needs Triage | P0 | collab-control | neon_task_queue:T-016 | Singclaw Persistent Topic Discussion Loop | maxink+niqiu | Convert approved source task into an active project-group work item or archive with reason. |
| Needs Triage | P0 | agent-oa | neon_task_queue:T-014 | Singclaw组织架构与游戏运行模型 | maxink | Draft migration plan in this repo first; do not mutate Neon until separately authorized. |
| Needs Triage | P0 | singclaw-town | neon_task_queue:T-013 | Singclaw小镇游戏化Quest与知识碎片机制 | maxink+niqiu | Draft migration plan in this repo first; do not mutate Neon until separately authorized. |
| Needs Triage | P0 | singclaw-town | neon_task_queue:T-010 | Singclaw Town DB Foundation | maxink+niqiu | Draft migration plan in this repo first; do not mutate Neon until separately authorized. |
| Needs Triage | P0 | collab-control | neon_task_queue:T-009 | 泥鳅腾讯云OpenClaw秘书职责与资产管理 | niqiu | Review task status during project-group triage. |
| Needs Triage | P0 | collab-control | neon_agent_mailbox:8c382ab0-78c9-40c9-9094-31fce9db5be5 | OpenClaw落地方案讨论 | niqiu -> maxink | Review whether the open message still requires action or can be archived. |
| Needs Triage | P0 | collab-control | neon_task_queue:T-007 | OpenClaw企业级Worker Poller协议与Schema加固 | maxink+niqiu | Draft migration plan in this repo first; do not mutate Neon until separately authorized. |
| Needs Triage | P0 | agent-oa | project_program_surface:program:agent-oa | agent-oa project surface consolidated from OpenClaw evidence | OpenClaw workspace evidence | Assign a current project-group owner and decide whether this surface becomes active delivery, watch-only, or archive. |
| Needs Triage | P0 | collab-control | project_program_surface:program:collab-control | collab-control project surface consolidated from OpenClaw evidence | OpenClaw workspace evidence | Assign a current project-group owner and decide whether this surface becomes active delivery, watch-only, or archive. |
| Needs Triage | P1 | alpha-scanner | openclaw_report:C:\openclaw-workspace\reports\revenue-agent\daily-2026-06-12.md | [OpenClaw Revenue Agent] Daily Progress - 2026-06-12 | OpenClaw workspace | Use this file as source evidence during project-group triage; do not treat it as an upstream task state. |
| Needs Triage | P1 | alpha-scanner | openclaw_report:C:\openclaw-workspace\reports\revenue-agent\daily-2026-06-03.md | [OpenClaw Revenue Agent] Daily Progress - 2026-06-03 | OpenClaw workspace | Use this file as source evidence during project-group triage; do not treat it as an upstream task state. |
| Needs Triage | P1 | collab-control | neon_agent_mailbox:6ba0de55-828d-43c2-9808-3da715971192 | ACK_RECEIVED_HANDOFF_20260519 | niqiu -> maxink | Review whether the open message still requires action or can be archived. |
| Needs Triage | P1 | singclaw-town | neon_agent_mailbox:3cf26b43-609a-4dc1-a3e4-1074a49ae7fa | NIQIU_GAME_PRINCIPLE_ACK | niqiu -> singclaw-hub | Review whether the open message still requires action or can be archived. |
| Needs Triage | P1 | singclaw-town | neon_agent_mailbox:4fa04054-b788-408d-a844-06df10902a7f | NIQIU_GAME_LOOP_ACK | niqiu -> maxink | Review whether the open message still requires action or can be archived. |
| Needs Triage | P1 | collab-control | neon_agent_mailbox:b674dd7a-be51-4d75-9b2e-28373de76d4c | NIQIU_ORG_MODEL_ACK | niqiu -> maxink | Review whether the open message still requires action or can be archived. |
| Needs Triage | P1 | collab-control | neon_agent_mailbox:24d05a09-b76e-4e73-903a-0f2e89495eb9 | NIQIU_SINGCLAW_TOWN_ACK | niqiu -> maxink | Review whether the open message still requires action or can be archived. |
| Needs Triage | P1 | singclaw-town | neon_task_queue:T-012 | Singclaw Town Topic Demo | maxink+niqiu | Convert approved source task into an active project-group work item or archive with reason. |
| Needs Triage | P1 | singclaw-town | neon_task_queue:T-011 | Singclaw Town Agent Registry / 宝可梦图鉴 | maxink | Convert approved source task into an active project-group work item or archive with reason. |
| Needs Triage | P1 | collab-control | neon_agent_mailbox:87969fea-13c6-4095-98ad-1c748ed8e774 | NIQIU_EMAIL_NACK - 交付物邮件回复 | niqiu -> maxink | Review whether the open message still requires action or can be archived. |
| Needs Triage | P1 | collab-control | neon_agent_mailbox:294264cc-453d-49a5-922d-ac42513f71bd | NIQIU_SECRETARY_ACK | niqiu -> H Sing | Review whether the open message still requires action or can be archived. |
| Needs Triage | P1 | collab-control | neon_task_queue:T-008 | 产品想法：OpenClaw Multi-Agent Topic Protocol MVP | maxink+niqiu | Draft migration plan in this repo first; do not mutate Neon until separately authorized. |
| Needs Triage | P1 | collab-control | neon_agent_mailbox:78095578-8aa3-4300-b430-4cbe6ece4038 | NIQIU_MULTI_AGENT_MVP_CONSENSUS | niqiu -> maxink | Review whether the open message still requires action or can be archived. |
| Needs Triage | P1 | collab-control | neon_agent_mailbox:6df190bb-6fe0-42bc-bac8-d2d63e022a03 | Re: 多Agent Topic协作MVP落地方案讨论 | niqiu -> maxink | Review whether the open message still requires action or can be archived. |
| Needs Triage | P1 | collab-control | neon_agent_mailbox:7b34b4f8-5054-453c-a5d3-260f601a6c17 | NIQIU_5MIN_TEST_ACK | niqiu -> maxink | Review whether the open message still requires action or can be archived. |
| Needs Triage | P1 | collab-control | neon_agent_mailbox:5388adda-24c2-4d6a-b03d-8c70e32a7bee | 泥鳅腾讯云OpenClaw现状同步 | niqiu -> maxink | Review whether the open message still requires action or can be archived. |
| Needs Triage | P1 | alpha-scanner | project_program_surface:program:alpha-scanner | alpha-scanner project surface consolidated from OpenClaw evidence | OpenClaw workspace evidence | Assign a current project-group owner and decide whether this surface becomes active delivery, watch-only, or archive. |
| Needs Triage | P1 | shrimpfi | project_program_surface:program:shrimpfi | shrimpfi project surface consolidated from OpenClaw evidence | OpenClaw workspace evidence | Assign a current project-group owner and decide whether this surface becomes active delivery, watch-only, or archive. |
| Needs Triage | P1 | starclaw | project_program_surface:program:starclaw | starclaw project surface consolidated from OpenClaw evidence | OpenClaw workspace evidence | Assign a current project-group owner and decide whether this surface becomes active delivery, watch-only, or archive. |
| Needs Triage | P2 | collab-control | neon_agent_topics:773bab2c-a882-48b3-b126-23a5a8179f3a | 2026-06-01 每日 Agent 议题交流：通用 Agent 学习路径 MVP | maxink+niqiu | Review topic outcome and decide whether it becomes an active project-group work item. |
| Needs Triage | P2 | collab-control | neon_agent_topics:1d454d92-7461-45f1-950e-ff2735bf23bf | 2026-05-28 每日 Agent 议题交流：Mininglamp/OCTO 六模块吸收 | maxink+niqiu | Review topic outcome and decide whether it becomes an active project-group work item. |
| Needs Triage | P2 | singclaw-town | neon_agent_topics:ee5a8a74-da37-417c-9941-20173243f513 | 2026-05-26 每日 Agent 议题交流：SingClaw 小镇持续讨论 watchdog | maxink+niqiu | Review topic outcome and decide whether it becomes an active project-group work item. |
| Needs Triage | P2 | collab-control | neon_agent_topics:1653683b-bb20-4202-88d5-9027adfe781d | 2026-05-25 每日 Agent 议题交流：通用 Agent 学习路径 MVP | maxink+niqiu | Review topic outcome and decide whether it becomes an active project-group work item. |
| Needs Triage | P2 | collab-control | neon_agent_topics:eb294edd-ffae-4a6b-ae88-ad020ea214c5 | 继续 Maxink × 泥鳅沟通：把过去两天断点补成可执行闭环（2026-05-22） | maxink+niqiu | Review topic outcome and decide whether it becomes an active project-group work item. |
| Needs Triage | P2 | collab-control | neon_agent_topics:b396915c-133a-4b1b-82b1-4a9fbce0a760 | 快交流层试用：如何用 agent_topics 跑一轮真实协作 | maxink | Review topic outcome and decide whether it becomes an active project-group work item. |
| Needs Triage | normal | starclaw | neon_agent_mailbox:e2942acf-d79c-43d2-b0b4-ba805fb20d6e | RE: ASK_KOVI_STARCLAW_VERCEL_DEPLOY | niqiu -> maxink | Review whether the open message still requires action or can be archived. |

## Operational Watch

| Status | Priority | Area | Source | Title | Source Owner | Next Action |
| --- | --- | --- | --- | --- | --- | --- |
| Operational Watch | P0 | agent-oa | windows_scheduled_tasks:OpenClaw-OA-Nightly-Sync | OpenClaw-OA-Nightly-Sync | Windows Task Scheduler | Keep watching nightly sync health; latest source result is indexed here only. |
| Operational Watch | P1 | app-singclaw | windows_scheduled_tasks:OpenClaw Gateway | OpenClaw Gateway | Windows Task Scheduler | Check whether this scheduler still needs to run; do not restart or edit without separate authorization. |
| Operational Watch | P1 | app-singclaw | windows_scheduled_tasks:OpenClawKeepAlive | OpenClawKeepAlive | Windows Task Scheduler | Check whether this scheduler still needs to run; do not restart or edit without separate authorization. |

## Archived Evidence

Showing 40 of 167. Full detail is in `docs/openclaw-singclaw-task-registry.json`.

| Status | Priority | Area | Source | Title | Source Owner | Next Action |
| --- | --- | --- | --- | --- | --- | --- |
| Archived Done | P0 | app-singclaw | openclaw_task_runs:dfcb3ecd-ee6e-424a-9945-a5322305f94d | [Sun 2026-06-14 21:52 GMT+8] An async command the user already approved has completed. Do not run the command again. ... | agent:main:telegram:direct:6509109244 | Keep as read-only evidence and link it when planning the active implementation. |
| Archived Done | P0 | singclaw-town | neon_agent_mailbox:debaee93-5b8d-4d9c-a531-4e6f0c4d2311 | REMEDIATION: Maxink late ACK + OA Risk Center implemented; request Niqiu ACK/NACK | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:4a6e3dfb-5bc8-4dcf-8046-4862d1167d8a | P0 每日 Agent 议题交流：SOP 总库飞书同步 | niqiu -> maxink | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:181cb8a3-76f8-4f46-8700-56540e5739c9 | P0 ESCALATION：每日 Agent 议题交流 5分钟未 ACK | niqiu -> maxink | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:e9cd4bb1-dcea-478e-b3eb-a19beb23392a | ESCALATION__MISSED_ACK__ESCALATION__MISSED_ACK__REPLY_REQUIRED__CONTINUE_AGENT_COMM_20260522 | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:0df8651e-e797-42cc-ae33-9dea91d52020 | ESCALATION__MISSED_ACK__REPLY_REQUIRED__CONTINUE_AGENT_COMM_20260522 | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:972b43f9-980d-419d-987e-1dc86585db15 | REPLY_REQUIRED__CONTINUE_AGENT_COMM_20260522 | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:9a3ae3ee-eafb-412e-ad06-888314b849b2 | DAILY_AGENT_TOPIC_20260521_21_REPLY_REQUIRED | niqiu -> maxink | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:8c39183c-98c2-4af3-a837-3ac95bad2060 | ESCALATION_DAILY_AGENT_TOPIC_20260521_21_ACK_MISSING | niqiu -> maxink | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:f6d38e80-92d7-4e67-a34c-4fcef7447a4a | P0_ACK_REQUIRED__REALTIME_DISCUSSION_5H_20260520 | niqiu -> maxink | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:45e2865e-4931-4c9f-bd6f-4816e66fa846 | REPLY_REQUIRED_T025_12_SPRINT_MORNING_DEADLINE | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:9b833765-d726-4f23-b794-ed4fa2d228e3 | MAXINK_ACK_NACK_T024_LANDING_GAP | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:a87d7744-4589-48de-8507-8f15776a6572 | MAXINK_ACK_NACK_T024_LANDING_GAP | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:7b90a44d-acb1-4be6-a9ab-84c393bed716 | DAILY_AGENT_TOPIC_20260520_21_REPLY_REQUIRED | niqiu -> maxink | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:b86d2b30-015d-4845-8327-2714e572978a | ESCALATION__MISSED_ACK__REALTIME_5H_ROUND_31_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:7a150fe5-4e2e-4e83-a80a-0e65a06e4ecb | ESCALATION__MISSED_ACK__REALTIME_5H_ROUND_32_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:7ada92e4-b161-40d2-a8d6-d18478b30116 | REALTIME_5H_ROUND_31_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:75d4b7af-26a7-40f6-9810-720d0d76a472 | REALTIME_5H_ROUND_32_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_task_queue:T-022 | 5小时实时交流：升级 Maxink×泥鳅沟通体系，确保持续话题产生确定性价值 | maxink+niqiu | Review task status during project-group triage. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:78cd7f63-70f3-4d8f-ab54-ab938f436f6f | REALTIME_5H_ROUND_30_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:cec521b9-8044-4f38-8c61-b325585c7fc6 | ESCALATION__MISSED_ACK__REALTIME_5H_ROUND_28_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:744a9d74-4fe5-47e4-8cf1-2fa636adda64 | REALTIME_5H_ROUND_28_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:fb7eb4cc-e910-4795-978b-b4f04c4a96d3 | REALTIME_5H_ROUND_29_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:2d0cec2a-1502-4117-858d-b6a4a82a7502 | REALTIME_5H_ROUND_27_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:8f185c05-f84b-4d1d-90bc-d5adfae33b56 | ESCALATION__MISSED_ACK__REALTIME_5H_ROUND_25_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:0a48f7c1-bf5c-4187-a95e-132e95d89db2 | REALTIME_5H_ROUND_25_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:02737429-fd55-418f-9e9b-ec71e62b9b18 | REALTIME_5H_ROUND_26_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:f977ab22-3707-40d1-9576-4e2ad4862592 | REALTIME_5H_ROUND_24_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:00fe0bde-d493-48b6-89f5-0d8624f97703 | REALTIME_5H_ROUND_23_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:f28ccabf-5e31-4258-9b32-6365aff15d30 | REALTIME_5H_ROUND_22_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:813dd6b1-d32c-4fa6-bac8-3ddd982b7342 | ESCALATION__MISSED_ACK__REALTIME_5H_ROUND_19_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:00753bb8-52ed-4cbd-bdf3-8d05389b88c3 | REALTIME_5H_ROUND_21_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:d940d280-02f6-435f-9de3-46976774c591 | ESCALATION__MISSED_ACK__REALTIME_5H_ROUND_18_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:2b5fc28a-fcf3-441a-a44b-4db610896492 | REALTIME_5H_ROUND_18_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:05d2ec43-b64e-4cd9-bc9c-607363b8065c | REALTIME_5H_ROUND_19_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:db4c8694-5a0b-467e-b71f-d9a3fd769f7c | REALTIME_5H_ROUND_20_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:57907e52-9be7-4027-ac50-8b77fc7e77f9 | REALTIME_5H_ROUND_17_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:638cafc1-97b1-4c55-a843-87cd0cac9b94 | ESCALATION__MISSED_ACK__ESCALATION__MISSED_ACK__ESCALATION__MISSED_ACK__REALTIME_5H_ROUND_5_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:af4909ed-6822-44ed-aa30-6f8ff918eae9 | ESCALATION__MISSED_ACK__ESCALATION__MISSED_ACK__ESCALATION__MISSED_ACK__REALTIME_5H_ROUND_6_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |
| Archived Done | P0 | collab-control | neon_agent_mailbox:9f2b8a12-8995-4e65-a3d2-1c14a071e88f | ESCALATION__MISSED_ACK__ESCALATION__MISSED_ACK__ESCALATION__MISSED_ACK__REALTIME_5H_ROUND_7_REPLY_REQUIRED | maxink -> niqiu | Keep as collaboration evidence. |

## Warnings

- None
