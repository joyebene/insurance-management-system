"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface DashboardStats {
  customers: number;
  policies: number;
  claims: number;
  pendingClaims: number;
  revenue: number;
  payments: number;
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    customers: 0,
    policies: 0,
    claims: 0,
    pendingClaims: 0,
    revenue: 0,
    payments: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubUsers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        setStats((prev) => ({
          ...prev,
          customers: snapshot.docs.filter(
            (doc) => doc.data().role === "customer"
          ).length,
        }));
      }
    );

    const unsubPolicies = onSnapshot(
      collection(db, "policies"),
      (snapshot) => {
        setStats((prev) => ({
          ...prev,
          policies: snapshot.size,
        }));
      }
    );

    const unsubClaims = onSnapshot(
      collection(db, "claims"),
      (snapshot) => {
        const pending = snapshot.docs.filter(
          (doc) => doc.data().status === "Pending"
        ).length;

        setStats((prev) => ({
          ...prev,
          claims: snapshot.size,
          pendingClaims: pending,
        }));
      }
    );

    const unsubPayments = onSnapshot(
      collection(db, "payments"),
      (snapshot) => {
        let revenue = 0;

        snapshot.docs.forEach((doc) => {
          const payment = doc.data();

          if (payment.status === "Paid") {
            revenue += payment.amount || 0;
          }
        });

        setStats((prev) => ({
          ...prev,
          revenue,
          payments: snapshot.size,
        }));

        setLoading(false);
      }
    );

    return () => {
      unsubUsers();
      unsubPolicies();
      unsubClaims();
      unsubPayments();
    };
  }, []);

  return {
    stats,
    loading,
  };
}