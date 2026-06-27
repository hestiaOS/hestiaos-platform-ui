// ── Module Schema (Runtime Validation) ─────────────
import { z } from "zod";

export const moduleStatusSchema = z.enum(["active", "experimental", "disabled", "hidden", "legacy"]);
export const moduleCategorySchema = z.enum(["executive", "operate", "platform", "finance_external", "research_knowledge", "admin"]);

export const moduleDefinitionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  category: moduleCategorySchema,
  route: z.string().startsWith("/"),
  component: z.any(),  // React.ComponentType — validated at TypeScript level
  status: moduleStatusSchema,
  requiredRoles: z.array(z.string()).optional(),
  requiredFeatures: z.array(z.string()).optional(),
  dataRequirements: z.array(z.enum(["api", "postgresql", "graph_server", "wiki_gate", "static", "none"])).optional(),
  dependencies: z.array(z.object({ moduleId: z.string(), reason: z.string() })).optional(),
  assistantContext: z.object({ agent: z.string(), scope: z.string(), welcome: z.string() }).optional(),
});

export type ModuleDefinitionValidated = z.infer<typeof moduleDefinitionSchema>;

export function validateModule(data: unknown): ModuleDefinitionValidated {
  return moduleDefinitionSchema.parse(data);
}

// ── Widget Schema ─────────────────────────────────
export const widgetSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  component: z.any(),
  defaultSize: z.enum(["sm", "md", "lg", "xl"]),
  allowedRoles: z.array(z.string()).optional(),
  requiredFeatures: z.array(z.string()).optional(),
  dataSource: z.string().optional(),
  refreshIntervalMs: z.number().min(1000).optional(),
  status: z.enum(["active", "experimental", "disabled"]),
});

// ── Navigation Schema ─────────────────────────────
export const navigationItemSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  route: z.string(),
  group: z.string(),
  icon: z.string().optional(),
  moduleId: z.string().optional(),
  requiredRoles: z.array(z.string()).optional(),
  status: z.enum(["active", "disabled", "hidden", "experimental"]).optional(),
});

export const navigationGroupSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  order: z.number(),
  items: z.array(navigationItemSchema).min(1),
});

// ── Theme Schema ──────────────────────────────────
export const themeSchema = z.object({
  id: z.string().min(1),
  label: z.string(),
  mode: z.enum(["light", "dark"]),
  semantic: z.object({
    brand: z.string(), background: z.string(), surface: z.string(), text: z.string(), textMuted: z.string(),
    border: z.string(), success: z.string(), warning: z.string(), danger: z.string(),
  }),
});
