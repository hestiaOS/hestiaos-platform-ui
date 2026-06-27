# Interfaces

Dieses Dokument sammelt die zentralen TypeScript-Interfaces des HestiaOS UI-Frameworks, welche die Verträge (Contracts) zwischen Kernel, Shell, Modulen und Widgets definieren.

## 1. Modul-Verträge (`types/module.ts`)

### `HestiaOSModuleDefinition`
Beschreibt ein registriertes Systemmodul.
```typescript
export interface HestiaOSModuleDefinition {
  id: string;
  title: string;
  description: string;
  category: HestiaOSModuleCategory;
  route: string;
  component?: React.ComponentType<HestiaOSModuleProps>;
  icon?: string;
  status: HestiaOSModuleStatus;
  requiredRoles?: string[];
  requiredFeatures?: string[];
  dataRequirements?: HestiaOSDataRequirement[];
  dependencies?: HestiaOSModuleDependency[];
  assistantContext?: HestiaOSAssistantContext;
}
```

### `HestiaOSModuleProps`
Die Properties, die jedes Modul vom Kernel injiziert bekommt.
```typescript
export interface HestiaOSModuleProps {
  user: HestiaOSUserContext;
  config: HestiaOSPlatformConfig;
  permissions: HestiaOSPermissionContext;
}
```

### `HestiaOSUserContext`
```typescript
export interface HestiaOSUserContext {
  id: string;
  name: string;
  email: string;
  role: string;
  partnerId?: string;
  initials: string;
}
```

---

## 2. Widget-Verträge (`types/widget.ts`)

### `HestiaOSWidgetDefinition`
```typescript
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
```

### `HestiaOSWidgetProps`
```typescript
export interface HestiaOSWidgetProps {
  user: import("./module").HestiaOSUserContext;
  widgetId: string;
  config: HestiaOSWidgetRuntimeConfig;
}
```

---

## 3. Navigations-Verträge (`types/navigation.ts`)

### `HestiaOSNavigationItem`
```typescript
export interface HestiaOSNavigationItem {
  id: string;
  label: string;
  route: string;
  group: string;
  icon?: string;
  moduleId?: string;
  requiredRoles?: string[];
  status?: "active" | "experimental" | "blocked" | "legacy" | "hidden" | "disabled";
}
```

### `HestiaOSNavigationGroup`
```typescript
export interface HestiaOSNavigationGroup {
  id: string;
  label: string;
  order: number;
  items: HestiaOSNavigationItem[];
}
```

---

## 4. Assistant-Verträge & Kontextregeln (`types/assistant.ts` / Konzept)

### `HestiaOSAssistantContext`
Definiert den fachlichen Kontext, den ein Modul für den AI-Assistant bereitstellt:
```typescript
export interface HestiaOSAssistantContext {
  scope: string;          // Fachlicher Bereich (z. B. "tickets", "evidence")
  relevantId?: string;    // ID des aktuell fokussierten Datensatzes
  queryContext?: string;  // Zusätzliche, modulspezifische Hintergrundinformationen
}
```

### Richtlinien für die Assistant-Integration

1.  **Passive Unterstützung**: Das AssistantPanel darf kontextbezogene Vorschläge, Zusammenfassungen oder Erklärungen anzeigen.
2.  **Sicherheits-Gate**: Es darf unter keinen Umständen unbemerkt Aktionen ausführen oder Daten im Hintergrund manipulieren. Jegliche schreibende API-Interaktion ist im aktuellen Sprint verboten.
3.  **Shell-Kapselung**: Nur die Shell ist für das Rendern des AI-Assistant-Panels zuständig. Die Module stellen lediglich ihren Kontext über die Registrierung bereit.

