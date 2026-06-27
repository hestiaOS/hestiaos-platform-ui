// ── Navigation (ADR-067 Phase 2b: aus der Registry ABGELEITET) ──────────────
// Route + Status kommen NUR aus modules.registry.ts (Single Source of Truth).
// Diese Datei traegt nur noch die Praesentationsschicht: Gruppen-Label + Reihenfolge
// je Category. Es wird hier KEINE Route und KEIN Status mehr doppelt gepflegt.
// Sichtbar sind ausschliesslich Module mit status === "active"; hidden/experimental/
// disabled/legacy (z. B. crm, projects, deep-research, portal2) erscheinen bewusst nicht.
import type { HestiaOSNavigationGroup, HestiaOSNavigationItem } from "../types/navigation";
import { hestiaosModules } from "../registry/modules.registry";
import type { HestiaOSModuleCategory } from "../types/module";

// Thin mapping layer: Category -> sichtbares Gruppen-Label + Sortierung.
const GROUP_META: Record<HestiaOSModuleCategory, { label: string; order: number }> = {
  executive:          { label: "A — Executive", order: 1 },
  research_knowledge: { label: "B — Research & Knowledge", order: 2 },
  operate:            { label: "C — Operate", order: 3 },
  platform:           { label: "D — Platform", order: 4 },
  finance_external:   { label: "E — Finanzen & Extern", order: 5 },
  admin:              { label: "Admin", order: 6 },
};

// Nur diese Status erscheinen als klickbare Nav-Eintraege.
const VISIBLE_STATUS = new Set(["active"]);

function deriveNavigationGroups(): HestiaOSNavigationGroup[] {
  const byCategory = new Map<HestiaOSModuleCategory, HestiaOSNavigationItem[]>();

  for (const mod of hestiaosModules) {
    if (!VISIBLE_STATUS.has(mod.status)) continue; // hidden/planned raus
    const item: HestiaOSNavigationItem = {
      id: mod.id,
      label: mod.title,
      route: mod.route,
      group: mod.category,
      moduleId: mod.id,
      requiredRoles: mod.requiredRoles,
      status: "active",
    };
    const list = byCategory.get(mod.category) ?? [];
    list.push(item);
    byCategory.set(mod.category, list);
  }

  return [...byCategory.entries()]
    .map(([category, items]) => ({
      id: category,
      label: GROUP_META[category]?.label ?? category,
      order: GROUP_META[category]?.order ?? 99,
      items, // Reihenfolge folgt der Registry-Reihenfolge
    }))
    .sort((a, b) => a.order - b.order);
}

// Abgeleitet beim Import. Export-Vertrag identisch -> Sidebar unveraendert.
export const navigationGroups: HestiaOSNavigationGroup[] = deriveNavigationGroups();
