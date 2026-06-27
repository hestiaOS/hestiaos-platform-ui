export interface HestiaOSNavigationItem {
  id: string;
  label: string;
  route: string;
  group: string;
  icon?: string;
  moduleId?: string;
  requiredRoles?: string[];
  status?: "active" | "disabled" | "hidden" | "experimental";
}

export interface HestiaOSNavigationGroup {
  id: string;
  label: string;
  order: number;
  items: HestiaOSNavigationItem[];
}
