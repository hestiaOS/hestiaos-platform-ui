// ── UI Primitives ───────────────────────────────────
// Keine Business-Logik. Nur Struktur + States + Tokens.
// Kein Primitives kennt eine Brand-Farbe — nur CSS Variables.
// Respektiert prefers-reduced-motion.

"use client";
import React from "react";

// Reduced motion hook
function useReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Animation-safe transition
const tx = (base: string, instant: boolean) => instant ? "none" : base;

// ── Button ────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({ variant = "secondary", size = "md", loading, children, disabled, style, ...props }: ButtonProps) {
  const base: React.CSSProperties = {
    fontFamily: "var(--font-inter), var(--font-display)",
    fontWeight: 600,
    border: "1px solid var(--hestiaos-border)",
    borderRadius: "var(--hestiaos-button-radius, 999px)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "all .15s",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: size === "sm" ? 11 : size === "lg" ? 15 : 13,
    padding: size === "sm" ? "4px 10px" : size === "lg" ? "10px 20px" : "7px 14px",
    ...style,
  };

  if (variant === "primary") {
    base.background = "var(--hestiaos-brand)";
    base.color = "var(--hestiaos-button-primary-color, #fff)";
    base.borderColor = "var(--hestiaos-brand)";
  } else if (variant === "danger") {
    base.background = "var(--hestiaos-danger-bg)";
    base.color = "var(--hestiaos-danger)";
    base.borderColor = "var(--hestiaos-danger)";
  } else {
    base.background = "transparent";
    base.color = "var(--hestiaos-text)";
  }

  return <button style={base} disabled={disabled || loading} {...props}>{loading ? "…" : children}</button>;
}

// ── Card ─────────────────────────────────────────
interface CardProps { children: React.ReactNode; className?: string; hover?: boolean; style?: React.CSSProperties }

export function Card({ children, hover, style }: CardProps) {
  return <div style={{
    background: "var(--hestiaos-card-bg, var(--hestiaos-surface))",
    border: "1px solid var(--hestiaos-card-border, var(--hestiaos-border))",
    borderRadius: "var(--hestiaos-card-radius, 10px)",
    padding: 14,
    transition: "all .15s",
    ...(hover ? { cursor: "pointer" } : {}),
    ...style,
  }}>{children}</div>;
}

// ── Badge ────────────────────────────────────────
type BadgeTone = "success" | "warning" | "danger" | "info" | "neutral";

interface BadgeProps { tone?: BadgeTone; children: React.ReactNode; style?: React.CSSProperties }

export function Badge({ tone = "neutral", children, style }: BadgeProps) {
  const colors: Record<BadgeTone, { bg: string; color: string }> = {
    success: { bg: "var(--hestiaos-success-bg)", color: "var(--hestiaos-success)" },
    warning: { bg: "var(--hestiaos-warning-bg)", color: "var(--hestiaos-warning)" },
    danger: { bg: "var(--hestiaos-danger-bg)", color: "var(--hestiaos-danger)" },
    info: { bg: "var(--hestiaos-info-bg, rgba(21,101,192,0.12))", color: "var(--hestiaos-info, #1565C0)" },
    neutral: { bg: "var(--hestiaos-surface)", color: "var(--hestiaos-text-muted)" },
  };
  const c = colors[tone];
  return <span style={{
    display: "inline-block", padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 600, background: c.bg, color: c.color, border: `1px solid ${c.color}20`,
    ...style,
  }}>{children}</span>;
}

// ── Panel ────────────────────────────────────────
interface PanelProps { children: React.ReactNode; title?: string; style?: React.CSSProperties }

export function Panel({ children, title, style }: PanelProps) {
  return <div style={{
    background: "var(--hestiaos-card-bg, var(--hestiaos-surface))", border: "1px solid var(--hestiaos-border)", borderRadius: 12, overflow: "hidden", ...style,
  }}>
    {title && <div style={{ padding: "8px 14px", borderBottom: "1px solid var(--hestiaos-border)", fontWeight: 600, fontSize: 12, color: "var(--hestiaos-text)" }}>{title}</div>}
    <div style={{ padding: 14 }}>{children}</div>
  </div>;
}

// ── Input ────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { placeholder?: string }

export function Input({ style, ...props }: InputProps) {
  return <input style={{
    width: "100%", padding: "10px 14px", borderRadius: "var(--hestiaos-input-radius, 999px)",
    border: "1px solid var(--hestiaos-input-border, var(--hestiaos-border))",
    background: "var(--hestiaos-input-bg, var(--hestiaos-search-bg))",
    color: "var(--hestiaos-text)", fontSize: 13, fontFamily: "var(--font-inter)", outline: "none",
    transition: "border-color .15s, box-shadow .15s",
    ...style,
  }} {...props}
    onFocus={(e) => { e.currentTarget.style.borderColor = "var(--hestiaos-border-focus)"; e.currentTarget.style.boxShadow = "var(--hestiaos-input-focus-ring, 0 0 0 3px rgba(230,106,44,0.15))"; }}
    onBlur={(e) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = ""; }}
  />;
}

// ── StatusDot ────────────────────────────────────
export function StatusDot({ status }: { status: "ok" | "warning" | "error" | "idle" }) {
  const colors: Record<string, string> = { ok: "var(--hestiaos-success)", warning: "var(--hestiaos-warning)", error: "var(--hestiaos-danger)", idle: "var(--hestiaos-text-muted)" };
  return <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: 999, background: colors[status] }} />;
}

// ── Separator ────────────────────────────────────
export function Separator() { return <hr style={{ border: "none", borderTop: "1px solid var(--hestiaos-border)", margin: "10px 0" }} />; }

// ── Toolbar ──────────────────────────────────────
interface ToolbarProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Toolbar({ children, style }: ToolbarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "8px 12px",
        background: "var(--hestiaos-surface)",
        border: "1px solid var(--hestiaos-border)",
        borderRadius: "var(--hestiaos-card-radius, 10px)",
        marginBottom: 16,
        flexWrap: "wrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── MetricPill ───────────────────────────────────
interface MetricPillProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  style?: React.CSSProperties;
}

export function MetricPill({ label, value, trend, style }: MetricPillProps) {
  const trendColor =
    trend === "up"
      ? "var(--hestiaos-success)"
      : trend === "down"
      ? "var(--hestiaos-danger)"
      : "var(--hestiaos-text-muted)";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 12px",
        background: "var(--hestiaos-surface)",
        border: "1px solid var(--hestiaos-border)",
        borderRadius: "var(--hestiaos-button-radius, 999px)",
        fontSize: 12,
        fontWeight: 500,
        color: "var(--hestiaos-text)",
        ...style,
      }}
    >
      <span style={{ color: "var(--hestiaos-text-muted)" }}>{label}:</span>
      <span style={{ fontWeight: 700 }}>{value}</span>
      {trend && (
        <span style={{ color: trendColor, fontSize: 10 }}>
          {trend === "up" ? "▲" : trend === "down" ? "▼" : "•"}
        </span>
      )}
    </div>
  );
}

// ── IconButton ───────────────────────────────────
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function IconButton({ children, style, disabled, ...props }: IconButtonProps) {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: "999px",
        border: "1px solid var(--hestiaos-border)",
        background: "transparent",
        color: "var(--hestiaos-text)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "all .15s",
        outline: "none",
        ...style,
      }}
      disabled={disabled}
      {...props}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "var(--hestiaos-border-focus)";
        e.currentTarget.style.boxShadow = "var(--hestiaos-input-focus-ring, 0 0 0 3px rgba(230,106,44,0.15))";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {children}
    </button>
  );
}

// ── SectionHeader ─────────────────────────────────
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  style?: React.CSSProperties;
}

export function SectionHeader({ title, subtitle, actions, style }: SectionHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 16,
        paddingBottom: 8,
        borderBottom: "1px solid var(--hestiaos-border)",
        ...style,
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--hestiaos-text)",
            margin: 0,
            borderTop: "none",
            paddingTop: 0,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ color: "var(--hestiaos-text-muted)", fontSize: 12, margin: "4px 0 0" }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div style={{ display: "flex", alignItems: "center", gap: 8 }}>{actions}</div>}
    </div>
  );
}

