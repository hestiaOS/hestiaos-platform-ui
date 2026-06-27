# Navigation Config

Die Navigation innerhalb der HestiaOS-Unified-Shell wird zentral über eine statische Konfigurationsdatei gesteuert, um Redundanzen und uneinheitliche Menüstrukturen zu vermeiden.

## 1. Konfigurationsort & Struktur (`config/navigation.config.ts`)
Die Datei exportiert ein Array vom Typ `HestiaOSNavigationGroup[]`. Jede Gruppe enthält eine Reihe von Navigationselementen:

```typescript
export interface HestiaOSNavigationGroup {
  id: string;      // Gruppen-ID (z. B. "executive")
  label: string;   // Überschrift in der Sidebar (z. B. "A — Executive")
  order: number;   // Sortierungsreihenfolge in der Seitenleiste
  items: HestiaOSNavigationItem[]; // Liste der Verweise
}
```

## 2. Navigationselemente (`HestiaOSNavigationItem`)
Die einzelnen Menüpunkte definieren ihren Pfad, ihre Gruppenzugehörigkeit und Berechtigungsregeln sowie ihren Behandlungs-Status:

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

---

## 3. Die Standard-Gruppen
Die Navigation ist in fünf funktionale Kernbereiche strukturiert (entsprechend dem Platform Concept):

1. **A — Executive** (`executive`): Dashboards, Entscheidungen und Governance Traces.
2. **B — Operate** (`operate`): Aktive Arbeitswerkzeuge wie Research Tree, Tickets, Projekte und CRM.
3. **C — Platform** (`platform`): Technische Dienste, Agentensteuerung und System-Monitoring.
4. **Finanzen & Extern** (`external`): Schnittstellen zu externen Dienstleistern (Steuerberater, Firefly-Finanzen, Wiki, HestiaOSBoard).
5. **Admin** (`admin`): Globale Benutzer- und Audit-Log-Schnittstelle.

---

## 4. Rollen- und Status-Semantik in der Sidebar
Die Darstellung der Sidebar-Elemente orientiert sich streng an der Status-Definition, um eine hohe Benutzerführung zu gewährleisten:

### Status-Visualisierungs-Matrix

Das UI ordnet die fachlichen Modul-Betriebszustände den technischen Navigations-Zuständen zu:

*   **active (Voll funktionsfähig / `functional`)**:
    *   *Verhalten*: Voll interaktiv (Schreiben + Lesen).
    *   *Styling*: Volle Deckkraft, Akzentfarbe bei Aktivierung/Hover. Eindeutiges Funktionssymbol.
*   **active mit Snapshot-Kennzeichnung (Schreibgeschützt / `static`)**:
    *   *Verhalten*: Datenanzeige als statischer Snapshot, schreibende Aktionen sind deaktiviert.
    *   *Styling*: Volle Deckkraft, aber mit grauem `SNAPSHOT`- oder `LESEMODUS`-Badge neben dem Label.
*   **experimental (Betatest / Labor)**:
    *   *Verhalten*: Zum Testen freigegeben, Datenbasis evtl. unvollständig.
    *   *Styling*: Gelber Indikator, Reagenzglas-Symbol (`🧪`) oder `EXP / LAB`-Badge.
*   **blocked (Gesperrt / `blocked`)**:
    *   *Verhalten*: **Sichtbar, aber gesperrt.** Klick führt auf die `BlockedStateTemplate`-Seite, die sachlich über Berechtigungen oder System-Fehler aufklärt.
    *   *Styling*: Rotes Schloss-Symbol (`🔒`) oder kleines `GESPERRT`-Badge. Text leicht ausgegraut.
*   **blocked / HOLD (Wartestatus / `hold/API missing`)**:
    *   *Verhalten*: Sichtbar, führt auf `BlockedStateTemplate` mit klarem Hinweis auf ausstehende API-Freigabe.
    *   *Styling*: Gelbes Schloss-Symbol (`🔒`) oder `HOLD`-Badge.
*   **legacy (Alt-System / `legacy`)**:
    *   *Verhalten*: Zugriff auf das nicht-migrierte Alt-System vor der Portal-Standardisierung.
    *   *Styling*: **Eigener grauer/monochromer Bereich.** Gekennzeichnet mit `ALT-UI` oder `LEGACY`-Badge. Keine farbigen Akzente.
*   **disabled (Inaktiv)**:
    *   *Verhalten*: **Nicht anklickbar.**
    *   *Styling*: Reduzierte Deckkraft (Opacity 0.4), grauer Text, Mauszeiger `not-allowed`, `pointer-events: none`.
*   **hidden (Versteckt)**:
    *   *Verhalten*: **Unsichtbar in der Sidebar.** Nur über direkte URL-Eingabe für Auditoren oder Administratoren aufrufbar.

### Filterung
1.  **Rollen-Filter** (`requiredRoles`): Hat der Benutzer nicht die geforderte Rolle (z. B. `admin`), wird der Menüpunkt komplett ausgeblendet.
2.  **Status-Filter**: Sidebar-Komponenten werten das Feld `status` aus und wenden die oben definierte Visualisierungs-Matrix an.

