"use client";
import React from "react";
import { Card, StatusDot, IconButton } from "../primitives";
import type { HestiaOSWidgetDefinition } from "../types/widget";

interface WidgetTemplateProps {
  widget: HestiaOSWidgetDefinition;
  status: "loading" | "ready" | "error" | "empty";
  errorMessage?: string;
  onRefresh?: () => void;
  children?: React.ReactNode;
}

export function WidgetTemplate({ widget, status, errorMessage, onRefresh, children }: WidgetTemplateProps) {
  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column", minHeight: status === "ready" ? "auto" : "140px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 8, borderBottom: "1px solid var(--hestiaos-border)", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 13, color: "var(--hestiaos-text)" }}>{widget.title}</span>
          {widget.status === "experimental" && (
            <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 999, background: "var(--hestiaos-warning-bg)", color: "var(--hestiaos-warning)" }}>🧪</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {status === "ready" && <StatusDot status="ok" />}
          {status === "loading" && <StatusDot status="idle" />}
          {status === "error" && <StatusDot status="error" />}
          {onRefresh && (
            <IconButton onClick={onRefresh} title="Aktualisieren" aria-label="Aktualisieren" disabled={status === "loading"}>
              ↻
            </IconButton>
          )}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: status === "ready" ? "stretch" : "center" }}>
        {status === "loading" && (
          <div style={{ textAlign: "center", color: "var(--hestiaos-text-muted)", fontSize: 12, padding: "20px 0" }}>
            Lade...
          </div>
        )}
        {status === "error" && (
          <div style={{ textAlign: "center", color: "var(--hestiaos-danger)", fontSize: 12, padding: "20px 0" }}>
            {errorMessage ?? "Fehler beim Laden."}
          </div>
        )}
        {status === "empty" && (
          <div style={{ textAlign: "center", color: "var(--hestiaos-text-muted)", fontSize: 12, padding: "20px 0" }}>
            Keine Daten vorhanden.
          </div>
        )}
        {status === "ready" && children}
      </div>
    </Card>
  );
}
