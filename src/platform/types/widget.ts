export type HestiaOSWidgetSize = "sm" | "md" | "lg" | "xl";

export interface HestiaOSWidgetDefinition {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<HestiaOSWidgetProps>;
  defaultSize: HestiaOSWidgetSize;
  allowedRoles?: string[];
  requiredFeatures?: string[];
  dataSource?: string;
  refreshIntervalMs?: number;
  status: "active" | "experimental" | "disabled";
}

export interface HestiaOSWidgetProps {
  user: import("./module").HestiaOSUserContext;
  widgetId: string;
  config: HestiaOSWidgetRuntimeConfig;
}

export interface HestiaOSWidgetRuntimeConfig {
  size: HestiaOSWidgetSize;
  refreshIntervalMs: number;
}
