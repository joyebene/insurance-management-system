"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "@/lib/firebase";

export function useReports() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      setCustomers(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })));
    });

    const unsubPolicies = onSnapshot(collection(db, "policies"), (snapshot) => {
      setPolicies(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })));
    });

    const unsubClaims = onSnapshot(collection(db, "claims"), (snapshot) => {
      setClaims(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })));
    });

    const unsubPayments = onSnapshot(collection(db, "payments"), (snapshot) => {
      setPayments(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })));

      setLoading(false);
    });

    return () => {
      unsubUsers();
      unsubPolicies();
      unsubClaims();
      unsubPayments();
    };
  }, []);

  return {
    customers,
    policies,
    claims,
    payments,
    loading,
  };
}