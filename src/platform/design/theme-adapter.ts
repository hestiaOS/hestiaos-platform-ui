// ── Theme Adapter: Tokens → CSS Variables ───────────
// Kein Modul kennt konkrete Farben. Nur CSS Variables.
// Theme-Wechsel ändert nur die Variablen — keine Komponente.

import type { HestiaOSThemePack } from "../themes";
import { baseTokens } from "./tokens";

export function tokensToCssVars(theme: HestiaOSThemePack): Record<string, string> {
  const s = theme.semantic;
  const c = theme.components;

  return {
    // Fonts (non-circular platform font stack)
    "--font-stack": baseTokens.fonts.stack,
    "--font-space": baseTokens.fonts.stack,
    "--font-inter": baseTokens.fonts.stack,
    "--font-display": baseTokens.fonts.stack,
    "--font-body": baseTokens.fonts.stack,

    // Semantic
    "--hestiaos-brand": s.brand,
    "--hestiaos-brand-hover": s.brandHover,
    "--hestiaos-bg": s.background,
    "--hestiaos-surface": s.surface,
    "--hestiaos-surface-elevated": s.surfaceElevated,
    "--hestiaos-bar": s.bar,
    "--hestiaos-border": s.border,
    "--hestiaos-border-focus": s.borderFocus,
    "--hestiaos-text": s.text,
    "--hestiaos-text-muted": s.textMuted,
    "--hestiaos-success": s.success,
    "--hestiaos-success-bg": s.successBg,
    "--hestiaos-warning": s.warning,
    "--hestiaos-warning-bg": s.warningBg,
    "--hestiaos-danger": s.danger,
    "--hestiaos-danger-bg": s.dangerBg,
    "--hestiaos-logo-stroke": s.logoStroke,
    "--hestiaos-logo-fill": s.logoFill,
    "--hestiaos-search-bg": s.searchBg,
    "--hestiaos-search-border": s.searchBorder,

    // Component
    "--hestiaos-topbar-height": c.topbar.height,
    "--hestiaos-topbar-bg": c.topbar.bg,
    "--hestiaos-sidebar-width": c.sidebar.width,
    "--hestiaos-sidebar-bg": c.sidebar.bg,
    "--hestiaos-sidebar-item-active-bg": c.sidebar.itemActiveBg,
    "--hestiaos-sidebar-item-active-border": c.sidebar.itemActiveBorder,
    "--hestiaos-card-bg": c.card.bg,
    "--hestiaos-card-border": c.card.border,
    "--hestiaos-card-radius": c.card.radius,
    "--hestiaos-button-primary-bg": c.button.primaryBg,
    "--hestiaos-button-primary-color": c.button.primaryColor,
    "--hestiaos-button-radius": c.button.radius,
    "--hestiaos-input-bg": c.input.bg,
    "--hestiaos-input-border": c.input.border,
    "--hestiaos-input-focus-ring": c.input.focusRing,
    "--hestiaos-input-radius": c.input.radius,
    "--hestiaos-kpi-value-color": c.kpi.valueColor,
    "--hestiaos-kpi-label-color": c.kpi.labelColor,
  };
}

export function applyTheme(theme: HestiaOSThemePack) {
  const vars = tokensToCssVars(theme);
  const root = document.documentElement;
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
  root.setAttribute("data-theme", theme.mode);
  localStorage.setItem("ht-theme", theme.id);
}
