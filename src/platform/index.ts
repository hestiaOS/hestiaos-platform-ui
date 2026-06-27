// ── Platform Barrel Export ──────────────────────────
// Stable import paths for downstream modules.
// Usage: import { ... } from "@/platform";

// Design
export { baseTokens, semanticDark, semanticLight, componentTokens } from "./design/tokens";
export type { SemanticTokens, ComponentTokens } from "./design/tokens";
export { applyTheme, tokensToCssVars } from "./design/theme-adapter";
export { ThemeProvider, useTheme } from "./design/ThemeProvider";

// Themes
export { hestiaosDefaultDark, hestiaosDefaultLight, hestiaosPitch, hestiaosResearch, getTheme, themeRegistry } from "./themes";
export type { HestiaOSThemePack } from "./themes";

// Primitives
export { Button, Card, Badge, Input, Panel, StatusDot, Separator } from "./primitives";

// Templates
export { ModuleTemplate } from "./templates/ModuleTemplate";
export { DashboardTemplate } from "./templates/DashboardTemplate";

// Components (Shell)
export { HestiaOSPlatformShell } from "./components/Shell";
export { Topbar } from "./components/Topbar";
export { Sidebar } from "./components/Sidebar";

// Registry
export { hestiaosModules } from "./registry/modules.registry";
export { resolveModuleById, resolveModuleByRoute } from "./registry/resolveModule";
export { hestiaosWidgets } from "./registry/widgets.registry";

// Config
export { navigationGroups } from "./config/navigation.config";
export { platformConfig } from "./config/platform.config";

// Schemas
export { validateModule, moduleDefinitionSchema, widgetSchema } from "./schemas/module.schema";

// Types
export type {
  HestiaOSModuleDefinition, HestiaOSModuleStatus, HestiaOSModuleCategory,
  HestiaOSModuleProps, HestiaOSUserContext, HestiaOSPlatformConfig,
  HestiaOSPermissionContext, HestiaOSAssistantContext,
  HestiaOSDataRequirement, HestiaOSModuleDependency,
} from "./types/module";
export type { HestiaOSWidgetDefinition, HestiaOSWidgetSize, HestiaOSWidgetProps } from "./types/widget";
export type { HestiaOSNavigationItem, HestiaOSNavigationGroup } from "./types/navigation";
