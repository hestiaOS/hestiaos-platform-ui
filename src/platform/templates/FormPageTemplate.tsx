"use client";
import React from "react";
import { Button, Card, SectionHeader } from "../primitives";

interface FormPageTemplateProps {
  title: string;
  subtitle?: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function FormPageTemplate({ title, subtitle, onSubmit, onCancel, submitLabel = "Speichern", cancelLabel = "Abbrechen", loading, errorMessage, children, style }: FormPageTemplateProps) {
  return (
    <div style={{ maxWidth: 650, ...style }}>
      <SectionHeader title={title} subtitle={subtitle} />
      <Card>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {errorMessage && (
            <div style={{ background: "var(--hestiaos-danger-bg)", color: "var(--hestiaos-danger)", fontSize: 13, fontWeight: 600, padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(198,40,40,0.15)" }}>
              {errorMessage}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {children}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 10, borderTop: "1px solid var(--hestiaos-border)", paddingTop: 16 }}>
            {onCancel && (
              <Button type="button" variant="ghost" onClick={onCancel} disabled={loading}>
                {cancelLabel}
              </Button>
            )}
            <Button type="submit" variant="primary" loading={loading} disabled={loading}>
              {submitLabel}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
