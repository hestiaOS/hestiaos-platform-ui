# Design Tokens Contract

Das HestiaOS Design-System ist in einer strikten 3-Schichten-Hierarchie aufgebaut, um eine konsistente Branding-Freiheit der Applikationsmodule zu gewährleisten:

```text
Layer 1: Base Tokens (Rohwerte wie Farbpaletten, Radien, Abstände)
  │
  ▼
Layer 2: Semantic Tokens (Abstrakte Bedeutungen wie brand, success, danger, background)
  │
  ▼
Layer 3: Component Tokens (Spezifische Komponentenvariablen wie button.primaryBg, card.radius)
```

## 1. Base Tokens (`design/tokens.ts`)
Die Rohwerte definieren das HestiaOS-Farbspektrum (einschließlich des primären HestiaOS-Orange `#E66A2C`), Abstände, Schriftgrößen und Eckenradien. **Kein Modul darf diese Rohwerte oder Hex-Codes direkt importieren.**

```typescript
export const baseTokens = {
  orange: { 500: "#E66A2C", 600: "#C84F18", ... },
  graphite: { 900: "#2F3136", ... },
  neutral: { 0: "#FFFFFF", 50: "#EEF0F3", ... },
  radius: { sm: "6px", md: "10px", lg: "16px", ... },
  spacing: { xs: "4px", sm: "8px", md: "14px", ... }
};
```

## 2. Semantic Tokens
Semantische Tokens definieren die logische Funktion einer Farbe oder eines Werts. Es gibt vordefinierte Sets für helle (`semanticLight`) und dunkle (`semanticDark`) Umgebungen.

| Token | Dark Mode Wert | Light Mode Wert | Zweck |
|---|---|---|---|
| `brand` | `#E66A2C` | `#E66A2C` | Primäre Brand-Aktionsfarbe |
| `brandHover` | `#C84F18` | `#C84F18` | Hover-Zustand für Brand-Elemente |
| `background` | `#16181C` | `#EEF0F3` | Globaler Seitenhintergrund |
| `surface` | `#25282E` | `#FFFFFF` | Karten- und Panel-Hintergrund |
| `border` | `rgba(255,255,255,0.10)` | `rgba(47,49,54,0.12)` | Standardtrennlinien |
| `borderFocus` | `#E66A2C` | `#E66A2C` | Tastatur-Fokusrand |
| `text` | `#ECEDEF` | `#2F3136` | Primärtext |

## 3. Component Tokens
Diese beschreiben konkrete Styling-Elemente einzelner UI-Primitive. Sie werden über die Funktion `componentTokens(semantic)` generiert.

- **Topbar**: Höhe, Hintergrund, Rahmen.
- **Sidebar**: Breite, Hintergrund, aktive Elementhintergründe.
- **Card**: Hintergrund, Rahmen, Eckenradius, Hover-Schatten.
- **Button**: Abstände, Eckenradien, Primärfarben.
- **Input**: Rahmen, Hintergrund, Fokusringe.

## 4. Theme-Adapter & CSS-Variablen
Der `theme-adapter.ts` übersetzt die TypeScript-Tokens in CSS-Custom-Properties (z. B. `--hestiaos-brand`, `--hestiaos-bg`), die dann an `document.documentElement` gebunden werden. Dadurch bleiben alle React-Komponenten frei von JavaScript-Farblogik und reagieren dynamisch auf Theme-Änderungen über CSS-Variablen.
