# Data Requirements

| Module | PostgreSQL | Graph Server | Wiki Gate | External API | Static Only | Notes |
|---|---|---|---|---|---|---|
| Enterprise Hub | — | — | — | — | ✅ | KPI counts are hardcoded; future: live graph query |
| Dashboard | ✅ | — | — | — | — | Widget data from hestiaos_portal DB |
| Tech Research Tree | — | — | — | — | ✅ | 20 tech nodes hardcoded; future: live from graph server |
| Deep Research | — | ✅ | ✅ | ✅ | — | Not yet migrated |
| Governance Traces | — | — | — | ✅ | — | Not yet migrated |
| CRM | — | — | — | ✅ | — | Twenty CRM proxy (read-only) |
| Finance | — | — | — | ✅ | — | Firefly III proxy |
| OpenProject | — | — | — | ✅ | — | OpenProject integration |
