# Widget Contract

Widgets sind modulare, wiederverwendbare Kacheln, die auf dem Executive Dashboard angeordnet werden können. Sie dienen der schnellen Informationsbereitstellung und Live-Statusanzeige.

## 1. Widgetdefinition (`types/widget.ts`)
Jedes Widget muss die Struktur `HestiaOSWidgetDefinition` einhalten:

```typescript
export interface HestiaOSWidgetDefinition {
  id: string;             // Eindeutiger Identifikator (z. B. "system-status")
  title: string;          // Widget-Titel
  description: string;    // Zweckbeschreibung (wird als Platzhalter gerendert)
  component: React.ComponentType<HestiaOSWidgetProps>; // Render-Komponente
  defaultSize: HestiaOSWidgetSize; // Standard-Rastergröße
  allowedRoles?: string[];  // Zugriffsbeschränkung
  dataSource?: string;    // API-Endpunkt für Datenaktualisierungen
  refreshIntervalMs?: number; // Optionales Aktualisierungsintervall (min. 1000ms)
  status: "active" | "experimental" | "disabled";
}
```

## 2. Widget-Größen (`HestiaOSWidgetSize`)
Das Dashboard-Layout basiert auf einem CSS-Grid mit flexiblen Spalten. Widgets deklarieren eine der folgenden Größenklassen:

- **sm**: Kompakte Kachel (z. B. für eine einzelne KPI, Mindesthöhe 100px).
- **md**: Mittlere Kachel (z. B. für eine Status-Tabelle, Mindesthöhe 140px).
- **lg**: Breite Kachel (nimmt im Grid 2 Spalten ein).
- **xl**: Vollbreite Kachel (nimmt im Grid 3 Spalten ein).

## 3. Zod-Schema zur Laufzeit (`schemas/module.schema.ts`)
Widgets werden über das `widgetSchema` validiert:

```typescript
export const widgetSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  defaultSize: z.enum(["sm", "md", "lg", "xl"]),
  allowedRoles: z.array(z.string()).optional(),
  dataSource: z.string().optional(),
  refreshIntervalMs: z.number().min(1000).optional(),
  status: z.enum(["active", "experimental", "disabled"]),
});
```

## 4. Datenanbindung & Refresh
Das Attribut `dataSource` gibt dem System an, von welchem API-Endpunkt (z. B. `/health` oder `/evidence`) das Widget seine Daten lädt. Ist ein `refreshIntervalMs` angegeben, triggert das System in diesem Intervall einen stummen Daten-Fetch im Hintergrund, ohne die Seite neu zu laden.
