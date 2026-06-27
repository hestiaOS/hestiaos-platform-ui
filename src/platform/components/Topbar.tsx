"use client";

import { useEffect } from "react";
import { useTheme } from "../design/ThemeProvider";
import { Button, Input } from "../primitives";
import { getTheme } from "../themes";

export function Topbar() {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    const next = theme.mode === "dark" ? "hestiaos-default-light" : "hestiaos-default-dark";
    setTheme(next);
  };

  return (
    <header style={{
      display: "flex", alignItems: "center", gap: 20, height: "var(--hestiaos-topbar-height, 56px)",
      padding: "0 18px", background: "var(--hestiaos-topbar-bg, var(--hestiaos-bar))",
      borderBottom: "1px solid var(--hestiaos-border)", backdropFilter: "blur(12px)",
      position: "sticky", top: 0, zIndex: 40,
    }}>
      {/* Brand */}
      <a href="/enterprise-hub" title="Zur Startseite" style={{
        display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
        textDecoration: "none", flexShrink: 0,
      }}>
        <svg width="30" height="30" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-label="HestiaOS">
          <g fill="none" stroke="var(--hestiaos-logo-stroke)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
            <path d="M72 64 L104 45 L116 51"/><path d="M168 64 L136 45 L124 51"/>
            <path d="M54 88 L82 104 L82 142"/><path d="M186 88 L158 104 L158 142"/>
            <path d="M54 152 L82 136"/><path d="M186 152 L158 136"/>
            <path d="M72 176 L104 195 L116 189"/><path d="M168 176 L136 195 L124 189"/>
            <path d="M120 22 L120 68"/><path d="M42 82 L68 98"/><path d="M198 82 L172 98"/>
            <path d="M42 158 L68 142"/><path d="M198 158 L172 142"/>
          </g>
          <circle cx="120" cy="22" r="13" fill="var(--hestiaos-logo-fill)" stroke="var(--hestiaos-logo-stroke)" strokeWidth="8"/>
          <circle cx="36" cy="78" r="13" fill="var(--hestiaos-logo-fill)" stroke="var(--hestiaos-logo-stroke)" strokeWidth="8"/>
          <circle cx="204" cy="78" r="13" fill="var(--hestiaos-logo-fill)" stroke="var(--hestiaos-logo-stroke)" strokeWidth="8"/>
          <circle cx="36" cy="162" r="13" fill="var(--hestiaos-logo-fill)" stroke="var(--hestiaos-logo-stroke)" strokeWidth="8"/>
          <circle cx="204" cy="162" r="13" fill="var(--hestiaos-logo-fill)" stroke="var(--hestiaos-logo-stroke)" strokeWidth="8"/>
          <path d="M120 76 L162 100 L162 148 L120 172 L78 148 L78 100 Z" fill="var(--hestiaos-brand)" stroke="none"/>
          <circle cx="120" cy="126" r="31" fill="var(--hestiaos-logo-fill)" stroke="none"/>
          <circle cx="120" cy="126" r="21" fill="var(--hestiaos-brand)" stroke="none"/>
          <path d="M120 147 L120 188" stroke="var(--hestiaos-brand)" strokeWidth="10" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, letterSpacing: "-.02em", color: "var(--hestiaos-text)" }}>
          hestiaos<b style={{ color: "var(--hestiaos-brand)", fontWeight: 700 }}>OS</b>
        </span>
        <span style={{ width: 1, height: 20, background: "var(--hestiaos-border)", margin: "0 4px" }}/>
        <span style={{ color: "var(--hestiaos-text-muted)", fontSize: 13, fontWeight: 500 }}>Interne Plattform</span>
      </a>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, flex: 1, maxWidth: 440, height: 38, padding: "0 14px",
        borderRadius: 999, background: "var(--hestiaos-search-bg)", border: "1px solid var(--hestiaos-search-border, var(--hestiaos-border))" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--hestiaos-text-muted)" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" placeholder="Plattform durchsuchen: Projekte, ADRs, Traces, Graph ..." aria-label="Suche" style={{
          flex: 1, border: 0, outline: 0, background: "transparent", color: "var(--hestiaos-text)",
          fontFamily: "var(--font-inter)", fontSize: 13,
        }}/>
        <span style={{ fontSize: 10, color: "var(--hestiaos-text-muted)", border: "1px solid var(--hestiaos-border)", borderRadius: 6, padding: "2px 6px", whiteSpace: "nowrap" }}>Strg K</span>
      </div>

      {/* Live Metrics */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 11, color: "var(--hestiaos-text-muted)", whiteSpace: "nowrap", flexShrink: 0 }}>
        CPU <span id="htCpu" style={{ color: "var(--hestiaos-brand)", fontWeight: 600 }}>--</span>
        RAM <span id="htRam" style={{ color: "var(--hestiaos-brand)", fontWeight: 600 }}>--</span>
        Disk <span id="htDisk" style={{ color: "var(--hestiaos-brand)", fontWeight: 600 }}>--</span>
      </div>

      <span style={{ flex: 1 }}/>

      {/* User Area */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <Button variant="ghost" size="sm" onClick={toggle}>{theme.mode === "dark" ? "☀" : "☾"}</Button>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ width: 30, height: 30, borderRadius: 999, background: "var(--hestiaos-brand)", color: "#fff",
            fontWeight: 700, fontSize: 11, display: "grid", placeItems: "center" }}>CW</span>
          <span style={{ fontWeight: 600, fontSize: 14, color: "var(--hestiaos-text)" }}>Christian Walter</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".06em", color: "var(--hestiaos-brand)",
            border: "1px solid var(--hestiaos-brand)", borderRadius: 6, padding: "2px 7px" }}>ADMIN</span>
        </div>
        <Button variant="ghost" size="sm">Account</Button>
        <Button variant="ghost" size="sm" onClick={() => location.href = "/logout"}>Sign out</Button>
      </div>
    </header>
  );
}
