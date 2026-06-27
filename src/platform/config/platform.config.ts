import type { HestiaOSPlatformConfig } from "../types/module";

export const platformConfig: HestiaOSPlatformConfig = {
  productName: "hestiaOS",
  environment: (process.env.NEXT_PUBLIC_ENV as "dev" | "prod") ?? "dev",
  defaultTheme: "dark",
};
