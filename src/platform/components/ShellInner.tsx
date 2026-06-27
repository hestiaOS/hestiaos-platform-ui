"use client";

import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";

export function ShellInner({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: 'var(--font-body), "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <Topbar />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <Sidebar />
        <main style={{ flex: 1, overflowY: "auto", padding: "24px 28px", background: "var(--hestiaos-bg)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
