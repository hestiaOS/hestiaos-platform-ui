# Permissions and Roles

HestiaOS verfügt über ein integriertes rollenbasiertes Zugriffskontrollsystem (Role-Based Access Control, RBAC), das sowohl die Sichtbarkeit in Menüs als auch den Zugriff auf Seitenebene schützt.

## 1. Benutzerrollen (`HestiaOSUserContext`)
Jeder angemeldete Benutzer hat eine zugewiesene Rolle. Die wichtigsten Standard-Rollen im Partner-Portal sind:

- **admin**: Administrator mit vollständigen Lese-, Schreib- und Genehmigungsrechten. Sieht alle Tenants und Konfigurationen.
- **internal**: Interne Mitarbeiter von SPRIND/HestiaOS. Haben Zugriff auf operative Module und Research-Tools.
- **partner**: Externe Design-Partner. Eingeschränkter Zugriff auf eigene Projekte und Tickets.

## 2. Berechtigungskontext (`HestiaOSPermissionContext`)
Zusätzlich zur Roh-Rolle berechnet der Kernel beim Anmelden logische Berechtigungs-Flags (`permissions`), die direkt an die Module übergeben werden:

- `canApprove`: Bestimmt, ob der Benutzer Aktionen freigeben oder absegnen darf (z. B. Tickets genehmigen).
- `seesAllTenants`: Bestimmt, ob Daten mandantenübergreifend geladen werden dürfen.
- `isAdmin`: Vereinfachtes Flag zur Prüfung von administrativen Rechten.

## 3. Schutz von Routen und Menüs (`requiredRoles`)
Die Registrierung von Modulen und Navigationselementen kann über das optionale Array `requiredRoles` eingeschränkt werden:

```typescript
// Nur Administratoren dürfen diesen Menüpunkt sehen
{
  id: "admin",
  label: "Benutzer & Audit",
  route: "/admin",
  group: "admin",
  requiredRoles: ["admin"]
}
```

### Validierungsablauf:
1. **Sidebar-Rendering**: Die Sidebar vergleicht die Rolle des Benutzers mit dem `requiredRoles`-Array jedes Navigationselements. Fehlt der Rolle die Berechtigung, wird das Element ausgeblendet.
2. **Module-Routing**: Beim Laden einer Seite prüft der Shell-Router die Berechtigung. Versucht ein Benutzer ohne ausreichende Berechtigungen eine geschützte Route aufzurufen, wird er auf eine "Zugriff verweigert"-Seite umgeleitet.
3. **Widget-Sichtbarkeit**: Widgets auf dem Dashboard prüfen ebenfalls das Feld `allowedRoles`. Nicht autorisierte Widgets werden im Grid ausgeblendet.
