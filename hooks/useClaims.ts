"use client";

import { useEffect, useState } from "react";

import { Claim } from "@/types/claim";
import { ClaimService } from "@/services/claim.service";

export function useClaims() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = ClaimService.subscribe((claims) => {
      setClaims(claims);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    claims,
    loading,
  };
}