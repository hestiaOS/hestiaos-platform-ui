// ── Module Contract ──────────────────────────────────

export type HestiaOSModuleStatus =
  | "active"
  | "experimental"
  | "disabled"
  | "hidden"
  | "legacy";

export type HestiaOSModuleCategory =
  | "executive"
  | "operate"
  | "platform"
  | "finance_external"
  | "research_knowledge"
  | "admin";

export interface HestiaOSModuleDefinition {
  id: string;
  title: string;
  description: string;
  category: HestiaOSModuleCategory;
  route: string;
  component: React.ComponentType<HestiaOSModuleProps>;
  icon?: string;
  status: HestiaOSModuleStatus;
  requiredRoles?: string[];
  requiredFeatures?: string[];
  dataRequirements?: HestiaOSDataRequirement[];
  dependencies?: HestiaOSModuleDependency[];
  assistantContext?: HestiaOSAssistantContext;
}

export interface HestiaOSModuleProps {
  user: HestiaOSUserContext;
  config: HestiaOSPlatformConfig;
  permissions: HestiaOSPermissionContext;
}

export type HestiaOSDataRequirement =
  | "api"
  | "postgresql"
  | "graph_server"
  | "wiki_gate"
  | "static"
  | "none";

export interface HestiaOSModuleDependency {
  moduleId: string;
  reason: string;
}

export interface HestiaOSUserContext {
  id: string;
  name: string;
  email: string;
  role: string;
  partnerId?: string;
  initials: string;
}

export interface HestiaOSPlatformConfig {
  productName: string;
  environment: "dev" | "prod";
  defaultTheme: "dark" | "light";
}

export interface HestiaOSPermissionContext {
  canApprove: boolean;
  seesAllTenants: boolean;
  isAdmin: boolean;
}

export interface HestiaOSAssistantContext {
  agent: string;
  scope: string;
  welcome: string;
}
