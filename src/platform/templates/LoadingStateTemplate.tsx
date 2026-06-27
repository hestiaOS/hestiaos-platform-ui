"use client";
import React from "react";
import { Card } from "../primitives";

interface LoadingStateTemplateProps {
  label?: string;
  style?: React.CSSProperties;
}

export function LoadingStateTemplate({ label = "Inhalte werden geladen...", style }: LoadingStateTemplateProps) {
  return (
    <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", textAlign: "center", minHeight: 300, ...style }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes h-spinner {
          to { transform: rotate(360deg); }
        }
      `}} />
      <div style={{
        display: "inline-block",
        width: 32,
        height: 32,
        border: "3px solid var(--hestiaos-border)",
        borderTopColor: "var(--hestiaos-brand)",
        borderRadius: "50%",
        animation: "h-spinner 0.8s linear infinite",
        marginBottom: 16
      }} />
      <p style={{ color: "var(--hestiaos-text-muted)", fontSize: 13, fontWeight: 500 }}>
        {label}
      </p>
    </Card>
  );
}
