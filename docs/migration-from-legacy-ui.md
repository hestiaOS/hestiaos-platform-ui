# Migration from Legacy UI

## Before (Legacy)

Legacy pages in `app/lab/`, `app/portal/` use:
- Direct Next.js page components
- No shared Shell/Topbar/Sidebar
- No ModuleTemplate
- No platform design tokens
- Inline styles with hardcoded hex colors
- No Zod validation of module configs

## After (Platform Kernel)

New shell routes in `app/(shell)/` use:
- `HestiaOSPlatformShell` wrapping all content
- `ModuleTemplate` for consistent loading/error/empty/ready states
- CSS variables from `design/tokens.ts` (3-layer token system)
- Zod-validated module definitions in `modules.registry.ts`
- Theme-aware via `ThemeProvider`

## Migration Path

1. Module content extracted to `src/modules/<name>/page.tsx`
2. Route page in `app/(shell)/<name>/page.tsx` re-exports module
3. Module registered in `modules.registry.ts` with `component` field
4. Navigation entry in `navigation.config.ts`

## Migrated Modules

| Module | Route | File |
|---|---|---|
| Enterprise Hub | `/enterprise-hub` | `src/modules/enterprise-hub/page.tsx` |
| Dashboard | `/dashboard` | `src/modules/dashboard/page.tsx` |
| Tech Research Tree | `/tech-tree` | `src/modules/tech-tree/page.tsx` |
