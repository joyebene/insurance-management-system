import {
  Bell,
  ChartBar,
  ClipboardCheck,
  CreditCard,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react";

import { SidebarGroup } from "@/types/sidebar";

export const sidebarGroups: SidebarGroup[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["admin", "customer"],
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: ChartBar,
        roles: ["admin"],
      },
    ],
  },

  {
    title: "Insurance",
    items: [
      {
        title: "My Policies",
        href: "/policies",
        icon: Shield,
        roles: ["customer"],
      },
      {
        title: "Claims",
        href: "/claims",
        icon: FileText,
        roles: ["admin", "customer"],
      },
      {
        title: "Payments",
        href: "/payments",
        icon: CreditCard,
        roles: ["admin", "customer"],
      },
    ],
  },

  {
    title: "Administration",
    items: [
      {
        title: "Customers",
        href: "/customers",
        icon: Users,
        roles: ["admin"],
      },
      {
        title: "Policy Management",
        href: "/policy-management",
        icon: ClipboardCheck,
        roles: ["admin"],
      },
    ],
  },

  {
    title: "Account",
    items: [
      {
        title: "Profile",
        href: "/profile",
        icon: User,
        roles: ["admin", "customer"],
      },
      {
        title: "Support",
        href: "/support",
        icon: LifeBuoy,
        roles: ["customer"],
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
        roles: ["admin"],
      },
    ],
  },
];