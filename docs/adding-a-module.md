# Adding a Module

Diese Anleitung beschreibt Schritt für Schritt, wie Entwickler ein neues funktionales Modul (Business-Logik) in das HestiaOS-Ökosystem integrieren.

## Schritt 1: Modul-Page erstellen
Erstelle ein Next.js Route-Verzeichnis unter `app/(shell)/<dein-modul>/page.tsx`. 

Die Seitenkomponente darf keine Shell (Topbar/Sidebar) enthalten. Sie sollte das `ModuleTemplate` verwenden und die eigentliche fachliche UI hineinrendern:

```typescript
"use client";
import { ModuleTemplate } from "@/src/platform/templates/ModuleTemplate";
import { useTheme } from "@/src/platform/design/ThemeProvider";
// nutze Primitives für Inhalte: Card, Button, Input, StatusDot

const myModuleDef = {
  id: "my-module",
  title: "Mein Modul",
  description: "Bietet wichtige Geschäftsfunktionen.",
  category: "operate" as const,
  route: "/my-module",
  status: "active" as const
};

export default function MyModulePage() {
  return (
    <ModuleTemplate module={myModuleDef} status="ready">
      <div>
        {/* Deine Business-Logik / Formulare / Tabellen */}
      </div>
    </ModuleTemplate>
  );
}
```

## Schritt 2: Modul im Registry eintragen
Trage die Moduldefinition in die Registrierungsdatei `src/platform/registry/modules.registry.ts` ein. 

*Hinweis: Zur Laufzeit wird dieser Eintrag gegen das Zod-Schema (`moduleDefinitionSchema`) geprüft.*

```typescript
const raw: HestiaOSModuleDefinition[] = [
  ...
  {
    id: "my-module",
    title: "Mein Modul",
    description: "Bietet wichtige Geschäftsfunktionen.",
    category: "operate",
    route: "/my-module",
    status: "active",
    requiredRoles: ["admin", "internal"], // optionaler Rollenschutz
    dataRequirements: ["api"] // Infrastruktur-Anforderung
  }
];
```

## Schritt 3: In die Navigation einbinden
Öffne `src/platform/config/navigation.config.ts` und füge dein Modul einer der passenden Navigationsgruppen hinzu (z. B. `operate` für "B — Operate").

```typescript
export const navigationGroups: HestiaOSNavigationGroup[] = [
  {
    id: "operate",
    label: "B — Operate",
    order: 2,
    items: [
      ...
      { id: "my-module", label: "Mein Modul", route: "/my-module", group: "operate", status: "active" }
    ]
  }
];
```

## Schritt 4: Schema-Audit & Testlauf
Starte den Entwicklungsserver (`npm run dev`) und navigiere im Browser zum neuen Modul. Prüfe, ob:
- Der Menüpunkt in der Seitenleiste gerendert wird.
- Der Rollenfilter wie erwartet funktioniert (indem du dich mit verschiedenen Test-Benutzern anmeldest).
- Keine TypeScript- oder Zod-Validierungsfehler in der Konsole erscheinen.
