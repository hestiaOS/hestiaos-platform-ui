"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { navigationGroups } from "../config/navigation.config";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("hestiaos.sidebar.collapsed") === "true"
  );

  const C = {
    sidebar: {
      width: "var(--hestiaos-sidebar-width, 210px)", flexShrink: 0,
      background: "var(--hestiaos-sidebar-bg, var(--hestiaos-bar))",
      borderRight: "1px solid var(--hestiaos-border)", overflowY: "auto",
      display: "flex", flexDirection: "column", transition: "width .2s",
    } as React.CSSProperties,
    collapsed: { width: 48 } as React.CSSProperties,
    label: { fontSize: 9, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--hestiaos-text-muted)", padding: "8px 12px 4px" } as React.CSSProperties,
    item: (active: boolean, experimental: boolean): React.CSSProperties => ({
      display: "block", padding: "6px 12px", fontSize: 12, color: active ? "var(--hestiaos-brand)" : experimental ? "var(--hestiaos-text-muted)" : "var(--hestiaos-text)",
      textDecoration: "none", borderLeft: `2px solid ${active ? "var(--hestiaos-sidebar-item-active-border, var(--hestiaos-brand))" : "transparent"}`,
      background: active ? "var(--hestiaos-sidebar-item-active-bg, rgba(230,106,44,0.06))" : "transparent",
      fontWeight: active ? 600 : 400, transition: "all .1s", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
    }),
    toggle: { display: "flex", justifyContent: "center", alignItems: "center", height: 28, margin: "4px 8px",
      border: "none", borderRadius: 6, background: "transparent", color: "var(--hestiaos-text-muted)",
      cursor: "pointer", fontSize: 10 } as React.CSSProperties,
  };

  return (
    <aside style={{ ...C.sidebar, ...(collapsed ? C.collapsed : {}) }}>
      <button style={C.toggle} onClick={() => { const n = !collapsed; setCollapsed(n); localStorage.setItem("hestiaos.sidebar.collapsed", String(n)); }}>
        {collapsed ? "▶" : "◀"}
      </button>
      {!collapsed && navigationGroups.map(g => (
        <div key={g.id} style={{ padding: "4px 0" }}>
          <div style={C.label}>{g.label}</div>
          {g.items.map(i => (
            <a key={i.id} href={i.route} style={C.item(pathname === i.route, i.status === "experimental")}>
              {i.label}
              {i.status === "experimental" && <span style={{ fontSize: 8, marginLeft: 4, opacity: .5 }}>🧪</span>}
            </a>
          ))}
        </div>
      ))}
    </aside>
  );
}
