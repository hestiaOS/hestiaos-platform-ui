"use client";

import { Badge, Separator } from "../primitives";
import type { HestiaOSModuleDefinition } from "../types/module";

interface ModuleTemplateProps {
  module: HestiaOSModuleDefinition;
  status: "loading" | "ready" | "error" | "empty";
  errorMessage?: string;
  children?: React.ReactNode;
}

// Keine Business-Logik. Keine harten Farben. Nur Primitives + Tokens.
export function ModuleTemplate({ module: mod, status, errorMessage, children }: ModuleTemplateProps) {
  if (status === "loading") {
    return <div style={{ padding: 60, textAlign: "center", color: "var(--hestiaos-text-muted)" }}>Lade {mod.title}...</div>;
  }

  if (status === "error") {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <div style={{ color: "var(--hestiaos-danger)", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Fehler in {mod.title}</div>
        <div style={{ color: "var(--hestiaos-text-muted)", fontSize: 13 }}>{errorMessage ?? "Modul nicht erreichbar."}</div>
      </div>
    );
  }

  const tone = mod.status === "active" ? "success" : mod.status === "experimental" ? "warning" : "neutral";

  return (
    <div style={{ maxWidth: 1100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, letterSpacing: "-.02em", color: "var(--hestiaos-brand)", margin: 0 }}>
          {mod.title}
        </h1>
        <Badge tone={tone as "success" | "warning" | "neutral"}>{mod.status}</Badge>
      </div>
      <p style={{ color: "var(--hestiaos-text-muted)", fontSize: 13, marginBottom: 18, marginTop: 4 }}>{mod.description}</p>
      {status === "empty" ? (
        <div style={{ padding: 40, textAlign: "center", color: "var(--hestiaos-text-muted)", fontSize: 13 }}>Keine Daten.</div>
      ) : (
        <>
          <Separator />
          <div style={{ marginTop: 14 }}>{children}</div>
        </>
      )}
    </div>
  );
}
