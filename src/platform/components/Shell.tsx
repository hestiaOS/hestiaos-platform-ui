import { ThemeProvider } from "../design/ThemeProvider";
import { ShellInner } from "./ShellInner";

export function HestiaOSPlatformShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ShellInner>{children}</ShellInner>
    </ThemeProvider>
  );
}
