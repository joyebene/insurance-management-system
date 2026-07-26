import { LucideIcon } from "lucide-react";

export type UserRole = "admin" | "customer";

export interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}