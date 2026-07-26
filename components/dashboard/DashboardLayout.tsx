"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

import { UserRole } from "@/types/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const [role, setRole] = useState<UserRole>("customer");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        window.location.href = "/login";
        return;
      }

      setUser(currentUser);

      const userRef = doc(db, "users", currentUser.uid);

      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setRole(userSnap.data().role);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-100">

      <div className="hidden lg:block">
        <DashboardSidebar role={role} />
      </div>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />

          <div className="fixed left-0 top-0 z-50 lg:hidden">
            <DashboardSidebar role={role} />
          </div>
        </>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">

        <DashboardHeader
          onMenuClick={() => setOpen(true)}
          user={user}
          role={role}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
}