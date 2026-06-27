"use client";
import React from "react";
import { Toolbar, SectionHeader, Card } from "../primitives";

interface TablePageTemplateProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  filterSlot?: React.ReactNode;
  headers: string[];
  rows: React.ReactNode[];
  style?: React.CSSProperties;
}

export function TablePageTemplate({ title, subtitle, actions, filterSlot, headers, rows, style }: TablePageTemplateProps) {
  return (
    <div style={{ maxWidth: 1100, ...style }}>
      <SectionHeader title={title} subtitle={subtitle} actions={actions} />
      {filterSlot && <Toolbar>{filterSlot}</Toolbar>}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
            <thead>
              <tr style={{ background: "var(--hestiaos-surface)", borderBottom: "1px solid var(--hestiaos-border)" }}>
                {headers.map((h, i) => (
                  <th key={i} style={{ padding: "12px 16px", fontWeight: 600, color: "var(--hestiaos-text-muted)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={headers.length} style={{ padding: 40, textAlign: "center", color: "var(--hestiaos-text-muted)" }}>
                    Keine Einträge gefunden.
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--hestiaos-border)", transition: "background-color 0.15s" }}>
                    {row}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
