import type { HestiaOSWidgetDefinition } from "../types/widget";
import { widgetSchema } from "../schemas/module.schema";

const raw: HestiaOSWidgetDefinition[] = [
  { id: "system-status", title: "System Status", description: "Live service health with status dots.", component: () => null, defaultSize: "md", dataSource: "/health", refreshIntervalMs: 15000, status: "active" },
  { id: "evidence-status", title: "Evidence Status", description: "Test suite results with source labels.", component: () => null, defaultSize: "md", dataSource: "/evidence", status: "active" },
  { id: "latest-decision", title: "Latest Decision", description: "Recent Human Gate decision with trace.", component: () => null, defaultSize: "md", dataSource: "/decisions", refreshIntervalMs: 30000, status: "active" },
  { id: "pilot-status", title: "Pilot Status", description: "Current pilot phase and next milestone.", component: () => null, defaultSize: "sm", status: "active" },
  { id: "tech-tree-widget", title: "Research Tree Mini", description: "Compact research tree view for dashboard.", component: () => null, defaultSize: "lg", status: "experimental" },
  { id: "research-trace", title: "Research Trace", description: "Recent deep research traces.", component: () => null, defaultSize: "md", dataSource: "/research/findings", status: "experimental" },
  { id: "finance-widget", title: "Finanzen", description: "Firefly budget summary.", component: () => null, defaultSize: "sm", dataSource: "/finanzen/api", status: "active" },
];

// Validate all widgets at import time
raw.forEach(w => widgetSchema.parse(w));

export const hestiaosWidgets = raw;
