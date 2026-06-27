# Branch and PR Strategy

> 22.06.2026 · After Main Initialization

## 1. Baseline

| Branch | Commit | Role |
|---|---|---|
| `main` | `xxxxxxxx` | Canonical stable baseline — deployed, route-verified |
| `s9-registry-first` | `xxxxxxxx` | Closed / stabilized — no new feature work |

## 2. Branching Rule

* All new feature branches start from `main`
* PRs target `main`
* No direct feature commits on `main`
* Hotfixes may start from `main` and merge directly after review

## 3. Deployment Rule

* Deploy only after review and explicit deploy approval
* No automatic deploy from PR creation or merge
* Commands: `git push`, `rsync`, `npm run build`, `systemctl restart hestiaos-portal`

## 4. S9.3 Branch

| Field | Value |
|---|---|
| Branch name | `s9.3-route-wrapper-registry-backed` |
| Base | `main` at `xxxxxxxx` |
| Scope | Route wrappers registry-backed only |

## 5. S9.3 Boundaries

* No theme / legacy CSS changes
* No `.html` fallback changes
* No registry expansion unless explicitly scoped
* No Auth / RBAC / API / DB changes
* No S9.4 component loading
* No S9.5 dataRequirements

## 6. Required Validation (before PR)

* `npm run validate:platform-routes` — blocking: 0
* `npm run typecheck` — exit 0
* `npm run build` — compiled
* 8 clean-route smoke (HTTP 200)

## 7. Status

```
MAIN_BASELINE:             xxxxxxxx
S9_REGISTRY_FIRST:         CLOSED
S9.3:                      READY_TO_BRANCH_AFTER_APPROVAL
DEPLOY:                    MANUAL_APPROVAL_ONLY
```
