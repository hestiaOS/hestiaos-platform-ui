// ── Theme Pack Contract ─────────────────────────────
import type { SemanticTokens, ComponentTokens } from "../design/tokens";
import { semanticDark, semanticLight, componentTokens } from "../design/tokens";

export interface HestiaOSThemePack {
  id: string;
  label: string;
  mode: "light" | "dark";
  semantic: SemanticTokens;
  components: ComponentTokens;
}

export const hestiaosDefaultDark: HestiaOSThemePack = {
  id: "hestiaos-default-dark",
  label: "HestiaOS Default Dark",
  mode: "dark",
  semantic: semanticDark,
  components: componentTokens(semanticDark),
};

export const hestiaosDefaultLight: HestiaOSThemePack = {
  id: "hestiaos-default-light",
  label: "HestiaOS Default Light",
  mode: "light",
  semantic: semanticLight,
  components: componentTokens(semanticLight),
};

export const hestiaosPitch: HestiaOSThemePack = {
  id: "hestiaos-pitch",
  label: "SPRIND Pitch Mode",
  mode: "dark",
  semantic: semanticDark,
  components: componentTokens(semanticDark),
};

export const hestiaosResearch: HestiaOSThemePack = {
  id: "hestiaos-research",
  label: "Research Mode",
  mode: "dark",
  semantic: semanticDark,
  components: componentTokens(semanticDark),
};

export const themeRegistry: Record<string, HestiaOSThemePack> = {
  [hestiaosDefaultDark.id]: hestiaosDefaultDark,
  [hestiaosDefaultLight.id]: hestiaosDefaultLight,
  [hestiaosPitch.id]: hestiaosPitch,
  [hestiaosResearch.id]: hestiaosResearch,
};

export function getTheme(id: string): HestiaOSThemePack {
  return themeRegistry[id] ?? hestiaosDefaultDark;
}
