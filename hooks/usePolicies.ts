"use client";

import { useEffect, useState } from "react";

import { Policy } from "@/types/policy";
import { PolicyService } from "@/services/policy.service";

export function usePolicies() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = PolicyService.subscribe((data) => {
      setPolicies(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    policies,
    loading,
  };
}