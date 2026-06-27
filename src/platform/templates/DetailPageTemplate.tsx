"use client";
import React from "react";
import { Button, Card, Separator, SectionHeader } from "../primitives";

interface DetailPageTemplateProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  metadata?: React.ReactNode;
  children: React.ReactNode;
}

export function DetailPageTemplate({ title, subtitle, onBack, actions, metadata, children }: DetailPageTemplateProps) {
  return (
    <div style={{ maxWidth: 1100, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Zurück
          </Button>
        )}
      </div>
      <SectionHeader title={title} subtitle={subtitle} actions={actions} />
      <div style={{ display: "grid", gridTemplateColumns: metadata ? "1fr 300px" : "1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {children}
        </div>
        {metadata && (
          <Card style={{ alignSelf: "start" }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "var(--hestiaos-text)" }}>Details & Metadaten</h3>
            <Separator />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {metadata}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
