"use client";

import { useEffect, useState } from "react";

import { AppUser } from "@/types/user";
import { UserService } from "@/services/user.service";

export function useCustomers() {
  const [customers, setCustomers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = UserService.subscribeCustomers((users) => {
      setCustomers(users);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    customers,
    loading,
  };
}