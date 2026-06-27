// ── Module Registry (validated) ────────────────────
// ADR-067 Phase 2a: Registry an die echten Clean-Route-Shell-Routen angeglichen.
// Quelle der Wahrheit fuer Module. Sichtbare Pitch-Module == reale app/(shell)/*-Routen.
// Navigation wird in Phase 2b aus dieser Registry abgeleitet (noch nicht hier).
import type { HestiaOSModuleDefinition } from "../types/module";
import { validateModule } from "../schemas/module.schema";

const raw: HestiaOSModuleDefinition[] = [
  // ── 8 verifizierte Pitch-Module (sichtbar, aktiv; jede route existiert als app/(shell)/*) ──
  { id: "enterprise-hub", title: "Enterprise Hub", description: "Executive overview with KPIs, resource bar, and production chain.", category: "executive", route: "/enterprise-hub", component: () => null, status: "active", requiredRoles: ["admin", "internal"], dataRequirements: ["static"] },
  { id: "dashboard", title: "Dashboard", description: "Widget-based command center.", category: "executive", route: "/dashboard", component: () => null, status: "active", requiredRoles: ["admin", "internal", "partner"], dataRequirements: ["postgresql"] },
  { id: "governance-traces", title: "Governance Traces", description: "Verifizierter Snapshot: Klassifizierte Governance-Aktionen mit Policy, Actor und Trace-ID.", category: "executive", route: "/governance-traces", component: () => null, status: "active", dataRequirements: ["api"] },
  { id: "evidence", title: "Evidence & Artefacts", description: "Verifizierter Snapshot: Revisionssichere Nachweise mit Statusverfolgung.", category: "executive", route: "/evidence", component: () => null, status: "active", dataRequirements: ["static"] },
  { id: "reports", title: "Reports", description: "Verifizierter Snapshot: Konsolidierte Analysen und Compliance-Berichte mit nachvollziehbarer Methodik.", category: "executive", route: "/reports", component: () => null, status: "active", dataRequirements: ["static"] },
  { id: "tech-tree", title: "Research Tree", description: "Interactive research tree with 20 technology nodes.", category: "research_knowledge", route: "/tech-tree", component: () => null, status: "active", dataRequirements: ["static"] },
  { id: "tickets", title: "Change Proposals", description: "Verifizierter Snapshot: Änderungsanträge mit menschlicher Freigabe und nachvollziehbarer Policy-Zuordnung.", category: "operate", route: "/tickets", component: () => null, status: "active", dataRequirements: ["static"] },
  { id: "wiki", title: "Wiki / Markdown Viewer", description: "Verifizierter Snapshot: Systemdokumentation und Architektur-Wissen aus dem SecondBrain-Kanon.", category: "research_knowledge", route: "/wiki", component: () => null, status: "active", dataRequirements: ["static"] },

  // ── Reale Shell-Route, aber bewusst NICHT Teil der Pitch-Oberflaeche ──
  { id: "portal2", title: "Portal (intern)", description: "Internal portal shell variant. Not part of the clean pitch surface.", category: "platform", route: "/portal2", component: () => null, status: "hidden", requiredRoles: ["admin", "internal"] },

  // ── PLANNED: noch KEINE Clean-Route implementiert (ADR-067, Phase > 2). ──
  // Bewusst status:"hidden" -> erscheinen NICHT in der Navigation. Der Route-Validator
  // meldet sie als "registry route without app route" -> das ist hier INTENDED und
  // dokumentiert; sie werden auf "active" gehoben, sobald die Route existiert.
  { id: "deep-research", title: "Deep Research", description: "Meta-prompt preflight -> graph + wiki + trace. LIVE-Demo: Startet Forschungslauf über den Demo-Orchestrator.", category: "research_knowledge", route: "/deep-research", component: () => null, status: "active", requiredRoles: ["admin", "internal"], dataRequirements: ["graph_server", "wiki_gate", "api"] },
  { id: "crm", title: "CRM", description: "Twenty CRM read-only integration. Geplant, noch keine Clean-Route.", category: "operate", route: "/crm", component: () => null, status: "hidden", dataRequirements: ["api"] },
  { id: "projects", title: "Projekte", description: "OpenProject + ADR overview. Geplant, noch keine Clean-Route.", category: "operate", route: "/projects", component: () => null, status: "hidden", dataRequirements: ["api"] },
];

// Validate all modules at import time
raw.forEach(m => validateModule(m));

export const hestiaosModules = raw;
