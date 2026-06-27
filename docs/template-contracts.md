# Template & State Contracts

Templates strukturieren Seitenlayouts und fangen verschiedene Zustände konsistent ab. Sie enthalten keine Business-Logik oder Datenabfragen und nutzen ausschließlich Primitives und CSS-Variablen.

---

## 1. Module State System (Zustands-Matrix)

Das HestiaOS UI-Framework erzwingt eine einheitliche Zustandsbehandlung für alle Module und Kacheln. Die folgende Tabelle beschreibt die 8 standardisierten Zustände:

| Zustand | Wann nutzen? | Template-Komponente | Visuelle Darstellung | Nutzeraktion | Entwickleraktion |
|---|---|---|---|---|---|
| **ready** | Daten vollständig geladen und UI bereit. | Beliebiges Seiten-/Kachel-Template. | Normales Inhalts-Layout. | Daten einsehen, suchen, absenden. | Datenbindung und Event-Handler registrieren. |
| **loading** | Während asynchroner Fetch-Vorgänge. | `LoadingStateTemplate` / Spinner. | Pulsierende Skeletons oder Spinner (`h-spinner`). | Abwarten (Interaktive Elemente gesperrt). | Lade-Status über Boolean-Flags steuern. |
| **empty** | Keine Datensätze vorhanden. | `EmptyStateTemplate`. | Zentrierte Box mit Ordner-Symbol `📁`. | CTA-Button betätigen (z.B. "Neu anlegen"). | Leere Arrays prüfen und Empty-Ansicht rendern. |
| **error** | API-Fehler, Netzwerkabbruch, Absturz. | `ErrorStateTemplate`. | Rote Warnbox mit `⚠️` und Log-Bereich. | "Erneut versuchen"-Knopf klicken. | Error Boundaries nutzen; Stack-Traces kapseln. |
| **blocked** | Fehlende Berechtigung, DB-/API-Ausfall. | `BlockedStateTemplate`. | Box mit Schloss-Symbol `🔒` und Next-Step. | IT-Support benachrichtigen, Fehler beheben. | Blockierungs-Typ auslesen und übergeben. |
| **disabled** | Aktion für aktuelle Rolle unzulässig. | Inaktive Buttons / Sidebar-Links. | Reduzierte Deckkraft (0.4), Cursor `not-allowed`. | Keine Interaktion möglich. | `disabled`-Attribut setzen; Events blockieren. |
| **experimental** | Module im Betatest / Labor-Status. | `ModuleStatusBadge` / Reagenzglas. | Kennzeichnung mit `EXP / LAB`-Badge. | Mit Vorsicht nutzen; Feedback senden. | Status-Flag im Registry auf `experimental` setzen. |
| **legacy** | Veraltete Module vor der Migration. | `ModuleStatusBadge` / Graues Badge. | Kennzeichnung mit `LEGACY`-Badge. | Auf neuere Module ausweichen. | Deprecation-Warnung einbinden. |

---

## 2. Übersicht der Templates

Hier ist die Übersicht über alle 11 im UI-Kernel implementierten Templates:

### 1. ModuleTemplate
Standard-Layout für funktionale Hauptmodule.
*   **Props**: `module` (Definition), `status` (loading/ready/error/empty), `errorMessage`, `children`.
*   **Zustände**: Rendert automatisch Lade-Hinweise, Fehlermeldungen bei Inaktivität oder Platzhalter bei fehlenden Daten.
*   **Styling**: Keine harten Farben; Status-Chips über `Badge`.

### 2. DashboardTemplate
Visualisierungsgitter des Executive Dashboards.
*   **Props**: `widgets` (Registrierte Widgets), `defaultLayout` (ID-Array).
*   **Features**: Filtert inaktive Widgets aus, rendert systemwichtige KPIs (z. B. `system-status`) obenan und ordnet Kacheln anhand ihrer CSS-Rastergröße (`.widget--sm` bis `.widget--xl`) an.

### 3. WidgetTemplate
Layout-Rahmen für ein einzelnes Dashboard-Widget.
*   **Props**: `widget` (Definition), `status` (loading/ready/error/empty), `errorMessage`, `onRefresh`, `children`.
*   **Visuals**: Kachel-Rahmen über `Card`, Status-Indikator über `StatusDot`, Aktualisierungs-Aktion über `IconButton` und Lade-/Fehler-Zustände.

### 4. DetailPageTemplate
Layout für tiefergehende Informationsseiten (Details eines Datensatzes).
*   **Props**: `title`, `subtitle`, `onBack`, `actions`, `metadata`, `children`.
*   **Layout**: Zweispaltiges Grid bei vorhandenen Metadaten (Inhaltsbereich links, Metadaten-Kachel rechts). Beinhaltet eine standardisierte Zurück-Schaltfläche.

### 5. TablePageTemplate
Layout für tabellarische Datenauflistungen.
*   **Props**: `title`, `subtitle`, `actions`, `filterSlot`, `headers`, `rows`, `style`.
*   **Features**: Header-Zeile mit Filtermöglichkeiten (`filterSlot` über `Toolbar`), responsive Scroll-Tabelle und Empty-Zustand.

### 6. FormPageTemplate
Standard-Eingabelayout für Formulare.
*   **Props**: `title`, `subtitle`, `onSubmit`, `onCancel`, `submitLabel`, `cancelLabel`, `loading`, `errorMessage`, `children`.
*   **Features**: Integrierte Fehler-Infobox, Lade-Blocker für Buttons, einheitliche Speichern/Abbrechen-Aktionen am Formularende.

### 7. EmptyStateTemplate
Platzhalter für leere Ansichten (z. B. keine Suchergebnisse).
*   **Props**: `title`, `description`, `icon`, `actionLabel`, `onAction`.
*   **Visuals**: Zentrierter Kasten mit Symbol, Erklärtext und optionaler Primär-Aktion (z. B. "Neuen Eintrag anlegen").

### 8. ErrorStateTemplate
Auffällige Fehler-Anzeigebox.
*   **Props**: `title`, `message`, `details`, `onRetry`, `retryLabel`.
*   **Visuals**: Farbliche Umrandung in Warnfarbe (`var(--hestiaos-danger)`), ausklappbarer Roh-Fehler-Logbereich in Festbreitenschrift und "Erneut versuchen"-Knopf.

### 9. LoadingStateTemplate
Zustand für asynchron nachgeladene Seiteninhalte.
*   **Props**: `label`.
*   **Visuals**: Mittig platzierter, unendlich rotierender Ladekreis (`h-spinner`), der sich farblich an das geladene Theme anpasst (`var(--hestiaos-brand)`).

### 10. AssistantPanelTemplate
Layout für die integrierte AI-Assistant-Seitenleiste.
*   **Props**: `agentName`, `scopeName`, `messages`, `inputValue`, `onInputChange`, `onSend`, `loading`.
*   **Features**: Verlauf von Benutzer- und Assistant-Nachrichten mit unterschiedlichen Chatblasen (Brand-Farbe für Benutzer, Oberflächen-Farbe für AI) und Texteingabezeile mit Senden-Button.

### 11. BlockedStateTemplate
Standardisierte Anzeige für gesperrte oder nicht migrierte Module (UX Blocked-State Pattern).
*   **Props**: `moduleName`, `blockerType` (Auth/DB/API/Not Migrated), `description`, `nextStep`, `onAction`, `actionLabel`.
*   **Features**: Klare, nicht-panische Sperrmeldung mit Schloss-Symbol, Anzeige der Fehlerkategorie über farbliche Badges, optionales Handlungsfeld ("Nächster Schritt") und Wiederholungs-Aktion.

---

## 3. AssistantPanel-Kontextregeln

Das AI AssistantPanel dient als passiver, unterstützender Copilot und muss folgenden Sicherheits- und Verhaltensregeln entsprechen:
1.  **Keine geheimen Aktionen**: Das Panel darf niemals selbstständig und verdeckt Daten modifizieren, Zugriffsrechte verändern oder API-Endpunkte mutieren.
2.  **Kontextuelle Anlieferung**: Jedes Modul liefert über das Registry-Attribut `assistantContext` (vom Typ `HestiaOSAssistantContext`) den aktuellen fachlichen Bezug (z.B. die ID des bearbeiteten Tickets oder die Such-Kategorie).
3.  **Shell-Kapselung**: Die Shell rendert das `AssistantPanelTemplate` in einer gesonderten Seitenleiste und füttert es mit dem Modulkontext.
4.  **Mutations-Verbot**: Es dürfen im aktuellen Entwicklungszyklus keine API-Mutationen aus dem AssistantPanel heraus getriggert werden. Interaktionen beschränken sich auf Textfragen und -antworten.

---

## Accessibility Notes (A11y-Richtlinien)
Bei der Nutzung und Erweiterung von Templates müssen folgende Barrierefreiheits-Standards eingehalten werden:

1.  **Reduced Motion**:
    *   Sämtliche CSS-Transitions (wie `.15s` Hover-Effekte) müssen bei verringerten Bewegungsanimationen im Browser deaktiviert werden.
    *   *Umsetzung*: Lade-Spinner (`LoadingStateTemplate`) respektieren dies durch gedrosselte CSS-Animationen. In Slice 3 wird ein globaler Media-Query-Guard eingeführt.
2.  **Focus States**:
    *   Alle interaktiven Elemente (Buttons, Inputs, Icon-Schaltflächen) müssen bei Tastaturfokus (`:focus` bzw. `onFocus`) eine deutliche visuelle Umrandung erhalten.
    *   *Umsetzung*: `Input` und `IconButton` verwenden standardmäßig eine farblich abgesetzte Fokuseinfassung (`var(--hestiaos-border-focus)`) mit weichem Schatten.
3.  **Blocked-State Semantics**:
    *   Gesperrte Ansichten (`BlockedStateTemplate`) und Fehlermeldungen verwenden `role="img"` mit aussagekräftigen `aria-label`-Attributen für dekorative oder emotionale Icons (z. B. das Schloss-Symbol 🔒), damit Screenreader den Zustand korrekt erfassen.
4.  **Status Not Only By Color**:
    *   Status-Meldungen (wie OK, Warnung, Fehler, Aktiv) dürfen niemals ausschließlich über Farbänderungen kommuniziert werden.
    *   *Umsetzung*: Zusätzliche Textlabel (in Badges), eindeutige Symbole (wie `🧪`, `⚠️`, `🔒`) oder Textzusätze begleiten farbcodierte Statusdots.
5.  **Aria-Labels for Icon Buttons**:
    *   Schaltflächen ohne sichtbaren Text (z. B. der Refresh-Kreis `↻` im `WidgetTemplate`) müssen zwingend ein `aria-label` tragen, das die Funktion beschreibt (z. B. `aria-label="Aktualisieren"`).
