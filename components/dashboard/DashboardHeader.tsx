"use client";

import Image from "next/image";
import { Bell, Menu, Search } from "lucide-react";
import { User } from "firebase/auth";
import { usePathname } from "next/navigation";

import { UserRole } from "@/types/sidebar";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  user: User | null;
  role: UserRole;
}

export default function DashboardHeader({
  onMenuClick,
  user,
  role,
}: DashboardHeaderProps) {
  const pathname = usePathname();

  const pageTitle =
    pathname === "/dashboard"
      ? "Dashboard"
      : pathname
          .split("/")
          .pop()
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()) ?? "Dashboard";

  const pageDescription =
    pathname === "/dashboard"
      ? "Welcome back"
      : `Manage ${pageTitle.toLowerCase()}`;

  const name =
    user?.displayName ??
    user?.email?.split("@")[0] ??
    "User";

  const initial = name.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">

      {/* Left */}

      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-6 w-6 text-slate-700" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {pageTitle}
          </h1>

          <p className="text-sm text-slate-500">
            {pageDescription}
          </p>
        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="relative hidden md:block">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="h-11 w-72 rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-amber-500 focus:bg-white"
          />

        </div>

        {/* Notifications */}

        <button className="relative rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100">

          <Bell className="h-5 w-5 text-slate-700" />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />

        </button>

        {/* User */}

        <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50">

          {user?.photoURL ? (
            <Image
              src={user.photoURL}
              alt={name}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-lg font-semibold text-white">
              {initial}
            </div>
          )}

          <div className="hidden text-left sm:block">

            <h3 className="text-sm font-semibold capitalize text-slate-900">
              {name}
            </h3>

            <p className="text-xs capitalize text-slate-500">
              {role}
            </p>

          </div>

        </button>

      </div>

    </header>
  );
}