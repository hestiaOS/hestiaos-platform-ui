# HestiaOS Platform UI Kernel

> Design Tokens → Primitives → Templates → Shell → Registry → Config

## Architektur

```text
Module (Business-Logik)
  │ nutzt
  ▼
Template (Struktur + States + Slots)
  │ nutzt
  ▼
Primitives (Button, Card, Badge, Input, Panel)
  │ nutzt
  ▼
CSS Variables (keine harten Farben)
  │ kommen von
  ▼
Theme Adapter (Tokens → CSS Variables)
  │ liest
  ▼
Theme Pack (hestiaos-default-dark, -light, -pitch, -research)
```

## Regeln

```text
Kein Modul kennt eine Brand-Farbe (#E66A2C).
Kein Modul definiert eine eigene Topbar/Sidebar.
Kein Template enthält Business-Logik.
Kein Primitive enthält Fachdaten.
Nur Tokens kennen konkrete Farbwerte.
```

## Schichten

| Schicht | Pfad | Inhalt |
|---|---|---|
| Design Tokens | `design/tokens.ts` | 3-Layer: Base → Semantic → Component |
| Theme Adapter | `design/theme-adapter.ts` | Tokens → CSS Variables |
| Theme Provider | `design/ThemeProvider.tsx` | React Context + applyTheme() |
| Theme Packs | `themes/index.ts` | hestiaos-default-dark/light/pitch/research |
| Primitives | `primitives/index.tsx` | Button, Card, Badge, Input, Panel, StatusDot |
| Templates | `templates/ModuleTemplate.tsx` | Loading/Error/Empty/Ready |
| Shell | `components/Shell.tsx` | Topbar + Sidebar + Main |
| Registry | `registry/modules.registry.ts` | 8 Module (validated) |
| Config | `config/navigation.config.ts` | 5 Gruppen, 24 Einträge |
| Schemas | `schemas/module.schema.ts` | Zod Runtime Validation |
| Types | `types/*.ts` | TypeScript Contracts |
