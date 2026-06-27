"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getTheme, hestiaosDefaultDark } from "../themes";
import { applyTheme } from "./theme-adapter";
import type { HestiaOSThemePack } from "../themes";

interface ThemeCtx {
  theme: HestiaOSThemePack;
  setTheme: (id: string) => void;
}

const Ctx = createContext<ThemeCtx>({ theme: hestiaosDefaultDark, setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<HestiaOSThemePack>(() => {
    if (typeof window === "undefined") return hestiaosDefaultDark;
    const stored = localStorage.getItem("ht-theme") ?? "hestiaos-default-dark";
    return getTheme(stored);
  });

  useEffect(() => { applyTheme(theme); }, [theme]);

  const setTheme = (id: string) => setThemeState(getTheme(id));

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export function useTheme() { return useContext(Ctx); }
