// ── Design Token Contract ───────────────────────────
// 3-layer hierarchy: Base → Semantic → Component
// Nur Tokens kennen Farben. Kein Modul darf #E66A2C kennen.

// ── Layer 1: Base Tokens (raw values) ────────────────
export const baseTokens = {
  orange: { 500: "#E66A2C", 600: "#C84F18", 700: "#A83D12", 400: "#F2884A" },
  graphite: { 900: "#2F3136", 800: "#3D4148", 700: "#4A4E55", 600: "#767C86", 500: "#9AA1AC" },
  neutral: { 0: "#FFFFFF", 50: "#EEF0F3", 100: "#F2F3F5", 200: "#F7F8FA", 300: "#E8E9EB", 900: "#16181C", 950: "#1B1D22", 980: "#25282E", 990: "#2B2E34" },
  green: { 700: "#2E7D32", 50: "#E8F5E9", 900: "#1E3A24" },
  amber: { 800: "#E65100", 50: "#FFF3E0", 900: "#3A2A14" },
  red: { 700: "#C62828", 50: "#FDECEA", 900: "#3A1A1A" },
  blue: { 700: "#1565C0", 50: "#E3F2FD", 900: "#15263A" },
  radius: { sm: "6px", md: "10px", lg: "16px", xl: "24px", pill: "999px" },
  spacing: { xs: "4px", sm: "8px", md: "14px", lg: "20px", xl: "28px" },
  fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "17px", xl: "22px", xxl: "28px" },
  fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  fonts: {
    stack: `"Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  },
} as const;

// ── Layer 2: Semantic Tokens ────────────────────────
export interface SemanticTokens {
  brand: string;
  brandHover: string;
  brandMuted: string;
  background: string;
  surface: string;
  surfaceElevated: string;
  bar: string;
  border: string;
  borderFocus: string;
  text: string;
  textMuted: string;
  textInverse: string;
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  danger: string;
  dangerBg: string;
  info: string;
  infoBg: string;
  logoStroke: string;
  logoFill: string;
  searchBg: string;
  searchBorder: string;
}

export const semanticDark: SemanticTokens = {
  brand: baseTokens.orange[500],
  brandHover: baseTokens.orange[600],
  brandMuted: `rgba(230,106,44,0.16)`,
  background: baseTokens.neutral[900],
  surface: baseTokens.neutral[980],
  surfaceElevated: baseTokens.neutral[990],
  bar: baseTokens.neutral[950],
  border: `rgba(255,255,255,0.10)`,
  borderFocus: baseTokens.orange[500],
  text: "#ECEDEF",
  textMuted: baseTokens.graphite[500],
  textInverse: baseTokens.graphite[900],
  success: baseTokens.green[700],
  successBg: baseTokens.green[900],
  warning: baseTokens.amber[800],
  warningBg: baseTokens.amber[900],
  danger: baseTokens.red[700],
  dangerBg: baseTokens.red[900],
  info: baseTokens.blue[700],
  infoBg: baseTokens.blue[900],
  logoStroke: "#FFFFFF",
  logoFill: baseTokens.graphite[900],
  searchBg: baseTokens.neutral[980],
  searchBorder: `rgba(255,255,255,0.10)`,
};

export const semanticLight: SemanticTokens = {
  brand: baseTokens.orange[500],
  brandHover: baseTokens.orange[600],
  brandMuted: `rgba(230,106,44,0.10)`,
  background: baseTokens.neutral[50],
  surface: baseTokens.neutral[0],
  surfaceElevated: baseTokens.neutral[200],
  bar: `rgba(255,255,255,0.96)`,
  border: `rgba(47,49,54,0.12)`,
  borderFocus: baseTokens.orange[500],
  text: baseTokens.graphite[900],
  textMuted: baseTokens.graphite[600],
  textInverse: "#ECEDEF",
  success: baseTokens.green[700],
  successBg: baseTokens.green[50],
  warning: baseTokens.amber[800],
  warningBg: baseTokens.amber[50],
  danger: baseTokens.red[700],
  dangerBg: baseTokens.red[50],
  info: baseTokens.blue[700],
  infoBg: baseTokens.blue[50],
  logoStroke: baseTokens.graphite[900],
  logoFill: "#FFFFFF",
  searchBg: baseTokens.neutral[100],
  searchBorder: `rgba(47,49,54,0.12)`,
};

// ── Layer 3: Component Tokens ───────────────────────
export interface ComponentTokens {
  topbar: { height: string; bg: string; border: string };
  sidebar: { width: string; bg: string; border: string; itemActiveBg: string; itemActiveBorder: string };
  card: { bg: string; border: string; radius: string; hoverShadow: string };
  badge: { successBg: string; successColor: string; warningBg: string; warningColor: string; dangerBg: string; dangerColor: string; pillRadius: string };
  button: { primaryBg: string; primaryColor: string; ghostBorder: string; ghostColor: string; radius: string; padding: string };
  input: { bg: string; border: string; focusBorder: string; focusRing: string; radius: string; padding: string };
  kpi: { bg: string; border: string; valueColor: string; labelColor: string };
}

export function componentTokens(_sem: SemanticTokens): ComponentTokens {
  return {
    topbar: { height: "56px", bg: _sem.bar, border: _sem.border },
    sidebar: { width: "210px", bg: _sem.bar, border: _sem.border, itemActiveBg: _sem.brandMuted, itemActiveBorder: _sem.brand },
    card: { bg: _sem.surface, border: _sem.border, radius: baseTokens.radius.md, hoverShadow: "0 4px 12px rgba(0,0,0,0.06)" },
    badge: { successBg: _sem.successBg, successColor: _sem.success, warningBg: _sem.warningBg, warningColor: _sem.warning, dangerBg: _sem.dangerBg, dangerColor: _sem.danger, pillRadius: baseTokens.radius.pill },
    button: { primaryBg: _sem.brand, primaryColor: "#FFFFFF", ghostBorder: _sem.border, ghostColor: _sem.text, radius: baseTokens.radius.pill, padding: `${baseTokens.spacing.sm} ${baseTokens.spacing.md}` },
    input: { bg: _sem.searchBg, border: _sem.border, focusBorder: _sem.borderFocus, focusRing: `0 0 0 3px rgba(230,106,44,0.15)`, radius: baseTokens.radius.pill, padding: `${baseTokens.spacing.sm} ${baseTokens.spacing.md}` },
    kpi: { bg: _sem.surface, border: _sem.border, valueColor: _sem.brand, labelColor: _sem.textMuted },
  };
}
