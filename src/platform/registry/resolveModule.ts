import type { HestiaOSModuleDefinition } from "../types/module";
import { hestiaosModules } from "./modules.registry";

export function resolveModuleById(id: string): HestiaOSModuleDefinition {
  const mod = hestiaosModules.find((m) => m.id === id);
  if (!mod) throw new Error(`resolveModuleById: no module with id "${id}"`);
  return mod;
}

export function resolveModuleByRoute(route: string): HestiaOSModuleDefinition {
  const mod = hestiaosModules.find((m) => m.route === route);
  if (!mod) throw new Error(`resolveModuleByRoute: no module with route "${route}"`);
  return mod;
}
