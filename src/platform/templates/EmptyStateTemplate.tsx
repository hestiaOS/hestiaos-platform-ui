"use client";
import React from "react";
import { Button, Card } from "../primitives";

interface EmptyStateTemplateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  style?: React.CSSProperties;
}

export function EmptyStateTemplate({ title, description, icon, actionLabel, onAction, style }: EmptyStateTemplateProps) {
  return (
    <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", textAlign: "center", minHeight: 300, ...style }}>
      {icon ? (
        <div style={{ marginBottom: 16, fontSize: 32, display: "flex", justifyContent: "center", alignItems: "center", color: "var(--hestiaos-text-muted)" }}>
          {icon}
        </div>
      ) : (
        <div style={{ marginBottom: 16, fontSize: 32, display: "flex", justifyContent: "center", alignItems: "center", color: "var(--hestiaos-text-muted)" }}>
          📁
        </div>
      )}
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--hestiaos-text)", marginBottom: 8, fontFamily: "var(--font-display)" }}>
        {title}
      </h3>
      <p style={{ color: "var(--hestiaos-text-muted)", fontSize: 13, maxWidth: 400, margin: "0 auto 20px", lineHeight: 1.5 }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}
