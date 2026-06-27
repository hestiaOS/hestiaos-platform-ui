# HestiaOS Platform UI Kernel

> Design Tokens → Primitives → Templates → Shell → Registry → Config

**HestiaOS Platform UI** is a modular, governance-first UI framework for building
role-based dashboards and portals with Next.js 14 + React 18 + TypeScript.

## Architecture

```
Module (Business Logic)
  │ uses
  ▼
Template (Structure + States + Slots)
  │ uses
  ▼
Primitives (Button, Card, Badge, Input, Panel)
  │ uses
  ▼
CSS Variables (no hardcoded colors)
  │ from
  ▼
Theme Adapter (Tokens → CSS Variables)
  │ reads
  ▼
Theme Pack (hestiaos-default-dark, -light, -pitch, -research)
```

## Layers

| Layer | Path | Content |
|-------|------|---------|
| Design Tokens | `src/platform/design/tokens.ts` | 3-Layer: Base → Semantic → Component |
| Theme Adapter | `src/platform/design/theme-adapter.ts` | Tokens → CSS Variables |
| Theme Provider | `src/platform/design/ThemeProvider.tsx` | React Context + applyTheme() |
| Theme Packs | `src/platform/themes/index.ts` | Dark/Light/Pitch/Research |
| Primitives | `src/platform/primitives/index.tsx` | Button, Card, Badge, Input, Panel, StatusDot |
| Templates | `src/platform/templates/` | Loading/Error/Empty/Ready states |
| Shell | `src/platform/components/Shell.tsx` | Topbar + Sidebar + Main |
| Registry | `src/platform/registry/` | Module & Widget registries |
| Config | `src/platform/config/` | Navigation & platform config |
| Schemas | `src/platform/schemas/module.schema.ts` | Zod runtime validation |
| Types | `src/platform/types/` | TypeScript contracts |

## Rules

- No module knows a brand color (`#E66A2C`).
- No module defines its own Topbar/Sidebar.
- No template contains business logic.
- No primitive contains domain data.
- Only tokens know concrete color values.

## Documentation

See [`docs/`](docs/) for:

- [Module Contract](docs/module-contract.md)
- [Widget Contract](docs/widget-contract.md)
- [Adding a Module](docs/adding-a-module.md)
- [Adding a Widget](docs/adding-a-widget.md)
- [Navigation Config](docs/navigation-config.md)
- [Design Tokens](docs/design-tokens.md)
- [Template Contracts](docs/template-contracts.md)
- [Permissions & Roles](docs/permissions-and-roles.md)
- [Dashboard Customization](docs/dashboard-customization.md)
- [Data Requirements](docs/data-requirements.md)
- [Interfaces](docs/interfaces.md)
- [Migration from Legacy UI](docs/migration-from-legacy-ui.md)
- [Branch & PR Strategy](docs/branch-pr-strategy.md)

## License

Apache-2.0
