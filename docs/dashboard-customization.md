# Dashboard Customization

Das Executive Dashboard bietet eine flexible, widgetbasierte Benutzeroberfläche zur Visualisierung von operativen Kennzahlen und Systemzuständen.

## 1. Layout-Speicherung & Persistenz
Das Layout des Dashboards (welche Widgets an welcher Position gerendert werden) wird clientseitig im `localStorage` des Browsers unter dem Schlüssel `hestiaos.dashboard.layout` als JSON-Array von Widget-IDs gespeichert.

Existiert kein Eintrag im `localStorage`, fällt das Dashboard auf ein Standard-Layout zurück:
- Es filtert alle Widgets aus dem `hestiaosWidgets`-Registry mit dem Status `active` und deklariert diese als Standard-Layout.

## 2. Rendering-Ablauf (`DashboardTemplate.tsx`)
1. **Initialisierung**: Der State `layout` wird beim Laden der Komponente einmalig aus `localStorage` oder den Defaults ausgelesen.
2. **Filterung**: Alle inaktiven oder deaktivierten (`disabled`) Widgets werden ausgeblendet.
3. **KPIs**: Ein KPI-Bereich listet KPIs für wichtige System-Status auf (z. B. das Widget `system-status` steht immer an erster Stelle).
4. **Grid-Anordnung**: Die verbleibenden aktiven Widgets werden in ein CSS-Grid (`.widget-grid`) geladen.

```typescript
const activeWidgets = widgets.filter(w => layout.includes(w.id) && w.status !== "disabled");
```

## 3. Grid-Klassen & Anpassung
Die Größe der einzelnen Widgets im Raster wird über CSS-Modifikatoren bestimmt, die der Komponente als CSS-Klassen übergeben werden:

- `.widget--sm`: Belegt eine einzelne Standard-Zelle.
- `.widget--md`: Erhöhte Kachelhöhe.
- `.widget--lg`: Belegt 2 Spalten horizontal.
- `.widget--xl`: Belegt 3 Spalten horizontal (Vollbreite).

## 4. Zukünftige Erweiterungen
In Slice 3 wird das statische Array-Layout durch einen interaktiven Dashboard-Editor ersetzt:
- Drag-and-Drop zur Kachelanordnung.
- Größenänderungs-Griffe (Resize handles) an den Kachelecken.
- Widget-Store zur Auswahl und zum Hinzufügen neuer Kacheln aus dem Registry.
