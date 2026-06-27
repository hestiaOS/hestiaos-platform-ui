# HestiaOS UI Framework

> Unified modular platform shell — Next.js 14 + React 18 + TypeScript

## Was das ist

Die HestiaOSPlatformShell lost 27 einzelne HTML-Dateien und eine separate Portal-Shell ab.
Statt kopierter Topbars/Sidebars pro Seite gibt es **eine** Shell mit zentraler Konfiguration.

## Architektur

```
HestiaOSPlatformShell
├── Topbar      (SVG-Logo + Suche + Metrics + User Menu)
├── Sidebar     (Navigation aus zentraler Config)
├── MainContent (aktives Modul)
└── AssistantPanel (optional)
```

## Zentrale Dateien

| Datei | Zweck |
|---|---|
| `src/platform/types/module.ts` | Module Contract |
| `src/platform/types/widget.ts` | Widget Contract |
| `src/platform/types/navigation.ts` | Navigation Contract |
| `src/platform/config/navigation.config.ts` | Zentrale Navigation (5 Gruppen, 24 Eintrage) |
| `src/platform/config/platform.config.ts` | Plattform-Konfiguration |
| `src/platform/registry/modules.registry.ts` | Modul-Registry (8 Module) |
| `src/platform/registry/widgets.registry.ts` | Widget-Registry (7 Widgets) |

## Was NICHT mehr erlaubt ist

- Einzelne HTML-Seiten mit kopierter Topbar
- Eigenes CSS pro Modul ohne Design-Tokens
- Verschiedene Navigationsquellen
- Shell-Injection per HTML-String
- Module ohne Registry-Eintrag

## Migration

1. `_archive/ui-pre-unified-shell-2026-06-22/` — Legacy gesichert
2. Contracts + Config + Registry — Slice 1 (jetzt)
3. HestiaOSPlatformShell bauen — Slice 2
4. 3 Beispielmodule migrieren — Slice 3
5. Rest migrieren — Slice 4+
