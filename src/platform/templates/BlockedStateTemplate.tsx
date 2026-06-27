"use client";
import React from "react";
import { Card, Badge, Button } from "../primitives";

export type HestiaOSBlockerType = "Auth" | "DB" | "API" | "Not Migrated";

interface BlockedStateTemplateProps {
  moduleName: string;
  blockerType: HestiaOSBlockerType;
  description: string;
  nextStep?: string;
  onAction?: () => void;
  actionLabel?: string;
  style?: React.CSSProperties;
}

export function BlockedStateTemplate({
  moduleName,
  blockerType,
  description,
  nextStep,
  onAction,
  actionLabel = "Erneut prüfen",
  style,
}: BlockedStateTemplateProps) {
  const badgeTone = blockerType === "Auth" ? "warning" : blockerType === "Not Migrated" ? "neutral" : "danger";

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        textAlign: "center",
        minHeight: 320,
        borderColor: "var(--hestiaos-border)",
        ...style,
      }}
    >
      <div
        style={{
          marginBottom: 16,
          fontSize: 36,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "var(--hestiaos-warning)",
        }}
        role="img"
        aria-label="Locked"
      >
        🔒
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 12 }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--hestiaos-text)",
            margin: 0,
            fontFamily: "var(--font-display)",
          }}
        >
          {moduleName} vorübergehend gesperrt
        </h3>
        <Badge tone={badgeTone}>{blockerType}</Badge>
      </div>
      <p style={{ color: "var(--hestiaos-text-muted)", fontSize: 13, maxWidth: 450, margin: "0 auto 12px", lineHeight: 1.5 }}>
        {description}
      </p>
      {nextStep && (
        <div
          style={{
            margin: "12px auto 20px",
            padding: "8px 14px",
            background: "var(--hestiaos-surface)",
            border: "1px solid var(--hestiaos-border)",
            borderRadius: 8,
            fontSize: 12,
            color: "var(--hestiaos-text)",
            display: "inline-block",
            maxWidth: 450,
          }}
        >
          <strong>Nächster Schritt:</strong> {nextStep}
        </div>
      )}
      {onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}
