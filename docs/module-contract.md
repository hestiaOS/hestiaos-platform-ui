# Module Contract

Module sind die funktionalen Einheiten (Business-Logik) im HestiaOS-Ökosystem. Sie sind strikt vom UI-Kernel getrennt und dürfen keine hardcodierten Framework-Layouts (wie Seitenleisten oder Topbars) enthalten.

## 1. Moduldefinition (`types/module.ts`)
Jedes Modul muss das Interface `HestiaOSModuleDefinition` implementieren:

```typescript
export interface HestiaOSModuleDefinition {
  id: string;             // Eindeutige Kennung (z. B. "enterprise-hub")
  title: string;          // Anzeigename im UI
  description: string;    // Kurzbeschreibung
  category: HestiaOSModuleCategory; // Einordnung (executive, operate, platform, etc.)
  route: string;          // Relative URL im Portal (z. B. "/enterprise-hub")
  component: React.ComponentType<HestiaOSModuleProps>; // Die React-Page (optional zur Kompilierungszeit bei rein statischen Routen)
  status: HestiaOSModuleStatus; // Lebenszyklus-Status
  requiredRoles?: string[];  // Optionale RBAC-Rollenberechtigung
  dataRequirements?: HestiaOSDataRequirement[]; // Infrastruktur-Anforderungen
}
```

## 2. Modul-Properties (`HestiaOSModuleProps`)
Die Modulkomponente erhält vom System-Kernel Kontext-Informationen injiziert:

- `user`: Aktueller Benutzerkontext (Name, Rolle, Initiale, E-Mail).
- `config`: Platform-Konfiguration (Umgebung, Produktname, Standard-Theme).
- `permissions`: Vorberechnete RBAC-Flags (z. B. `isAdmin`, `canApprove`).

## 3. Runtime Validierung (`schemas/module.schema.ts`)
Bei der Registrierung im Kernel wird jedes Modul über ein Zod-Schema validiert. Ungültige Module (z. B. Routen ohne führenden Slash `/` oder ungültige Kategorien) führen zu einem Systemfehler beim Laden des Registries.

```typescript
export const moduleDefinitionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  category: moduleCategorySchema,
  route: z.string().startsWith("/"),
  status: moduleStatusSchema,
  requiredRoles: z.array(z.string()).optional(),
  dataRequirements: z.array(z.enum(["api", "postgresql", "graph_server", "wiki_gate", "static", "none"])).optional(),
});
```

## 4. Status & Lebenszyklus (`HestiaOSModuleStatus`)
- **active**: Voll funktionsfähig und für alle berechtigten Benutzer sichtbar.
- **experimental**: Markiert mit einem Reagenzglas-Icon `🧪`. Sichtbar für interne Rollen.
- **disabled**: Modul deaktiviert. Führt beim Aufruf zu einer Fehlermeldung.
- **hidden**: Aktiv, aber nicht in den Standard-Navigationsmenüs aufgeführt.
- **legacy**: Historischer Zustand. Wird in zukünftigen Slices migriert.
