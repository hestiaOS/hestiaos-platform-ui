# Adding a Widget

Diese Anleitung beschreibt, wie Entwickler ein neues Widget erstellen und auf dem Executive Dashboard registrieren.

## Schritt 1: Widget-Komponente erstellen
Erstelle die Render-Komponente für dein Widget. Verwende das `WidgetTemplate` zur Strukturierung der Kachel und Darstellung der verschiedenen Zustände:

```typescript
"use client";
import React from "react";
import { WidgetTemplate } from "@/src/platform/templates/WidgetTemplate";
import type { HestiaOSWidgetProps } from "@/src/platform/types/widget";

export function MyCustomWidget({ user, widgetId, config }: HestiaOSWidgetProps) {
  const [data, setData] = React.useState<any>(null);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error" | "empty">("loading");

  const fetchData = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/my-widget-endpoint");
      const json = await res.json();
      if (!json || json.length === 0) {
        setStatus("empty");
      } else {
        setData(json);
        setStatus("ready");
      }
    } catch {
      setStatus("error");
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const widgetDef = {
    id: widgetId,
    title: "Mein Widget",
    description: "Zeigt custom Daten",
    defaultSize: config.size,
    status: "active" as const,
    component: () => null // Registry Platzhalter
  };

  return (
    <WidgetTemplate widget={widgetDef} status={status} onRefresh={fetchData}>
      <div>
        {/* Inhalt deines Widgets im ready-Zustand */}
        <p>Aktueller Wert: {data?.value}</p>
      </div>
    </WidgetTemplate>
  );
}
```

## Schritt 2: Widget im Registry eintragen
Öffne `src/platform/registry/widgets.registry.ts` und trage dein neues Widget in das `hestiaosWidgets`-Array ein:

```typescript
export const hestiaosWidgets: HestiaOSWidgetDefinition[] = [
  ...
  {
    id: "my-custom-widget",
    title: "Mein Widget",
    description: "Zeigt wichtige custom Daten live.",
    component: () => null, // Platzhalter
    defaultSize: "md",
    dataSource: "/api/my-widget-endpoint",
    refreshIntervalMs: 30000, // stummes Refresh alle 30s
    status: "active"
  }
];
```

## Schritt 3: Dashboard-Layout anpassen
Falls das Widget standardmäßig auf dem Dashboard erscheinen soll, stelle sicher, dass es im Default-Layout oder im `localStorage` unter `hestiaos.dashboard.layout` eingetragen ist.

## Schritt 4: Verifizierung
Das Dashboard lädt alle Widgets aus dem Registry automatisch. Navigiere zum `/enterprise-hub` und prüfe, ob dein neues Widget korrekt gerendert wird, ob der Ladezustand funktioniert und ob der Refresh-Knopf die Daten neu lädt.
