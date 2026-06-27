"use client";
import React from "react";
import { Button, Card } from "../primitives";

interface ErrorStateTemplateProps {
  title?: string;
  message: string;
  details?: string;
  onRetry?: () => void;
  retryLabel?: string;
  style?: React.CSSProperties;
}

export function ErrorStateTemplate({ title = "Fehler aufgetreten", message, details, onRetry, retryLabel = "Erneut versuchen", style }: ErrorStateTemplateProps) {
  return (
    <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", textAlign: "center", minHeight: 300, borderColor: "var(--hestiaos-danger)", ...style }}>
      <div style={{ marginBottom: 16, fontSize: 36, display: "flex", justifyContent: "center", alignItems: "center", color: "var(--hestiaos-danger)" }}>
        ⚠️
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--hestiaos-danger)", marginBottom: 8, fontFamily: "var(--font-display)" }}>
        {title}
      </h3>
      <p style={{ color: "var(--hestiaos-text)", fontSize: 13, maxWidth: 450, margin: "0 auto 12px", fontWeight: 500 }}>
        {message}
      </p>
      {details && (
        <pre style={{ background: "var(--hestiaos-surface)", border: "1px solid var(--hestiaos-border)", borderRadius: 6, padding: "8px 12px", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--hestiaos-text-muted)", maxWidth: 500, overflowX: "auto", margin: "0 auto 20px", textAlign: "left" }}>
          {details}
        </pre>
      )}
      {onRetry && (
        <Button variant="danger" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </Card>
  );
}
