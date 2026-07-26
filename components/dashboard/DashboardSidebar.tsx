"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { sidebarGroups } from "@/constants/sidebar";
import { UserRole } from "@/types/sidebar";

interface DashboardSidebarProps {
  role: UserRole;
}

export default function DashboardSidebar({
  role,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}

      <div className="border-b border-slate-200 px-6 py-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Insurance Management System
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          All Round Insurance
        </p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        {sidebarGroups.map((group) => {

          const items = group.items.filter((item) =>
            item.roles.includes(role)
          );

          if (!items.length) return null;

          return (
            <div key={group.title} className="mb-8">

              <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                {group.title}
              </h2>

              <div className="space-y-1">

                {items.map((item) => {

                  const Icon = item.icon;

                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={clsx(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                        active
                          ? "bg-amber-500 text-white shadow-lg"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      )}
                    >
                      <Icon size={20} />

                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}