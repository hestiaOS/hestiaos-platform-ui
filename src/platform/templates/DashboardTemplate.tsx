"use client";

import { useState } from "react";
import type { HestiaOSWidgetDefinition } from "../types/widget";

interface DashboardTemplateProps {
  widgets: HestiaOSWidgetDefinition[];
  defaultLayout?: string[];
}

export function DashboardTemplate({ widgets, defaultLayout }: DashboardTemplateProps) {
  const [layout] = useState<string[]>(
    () => {
      const stored = typeof window !== "undefined" ? localStorage.getItem("hestiaos.dashboard.layout") : null;
      if (stored) try { return JSON.parse(stored) as string[]; } catch {}
      return defaultLayout ?? widgets.filter(w => w.status === "active").map(w => w.id);
    }
  );

  const activeWidgets = widgets.filter(w => layout.includes(w.id) && w.status !== "disabled");

  return (
    <div className="dashboard">
      <div className="kpis">
        {/* System status widget always first */}
        {activeWidgets.filter(w => w.id === "system-status").map(w => (
          <div key={w.id} className="kpi">
            <div className="kpi-n">—</div>
            <div className="kpi-l">{w.title}</div>
          </div>
        ))}
        {activeWidgets.filter(w => w.id !== "system-status").slice(0, 5).map(w => (
          <div key={w.id} className="kpi">
            <div className="kpi-n">—</div>
            <div className="kpi-l">{w.title}</div>
          </div>
        ))}
      </div>
      <div className="widget-grid">
        {activeWidgets.map(w => (
          <div key={w.id} className={`widget widget--${w.defaultSize}`}>
            <div className="widget-header">
              <span className="widget-title">{w.title}</span>
              {w.status === "experimental" && <span className="badge badge--experimental">🧪</span>}
            </div>
            <div className="widget-body">
              <p className="widget-placeholder">{w.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
