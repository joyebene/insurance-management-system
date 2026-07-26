"use client";

import { useEffect, useState } from "react";

import { Payment } from "@/types/payment";
import { PaymentService } from "@/services/payment.service";

export function usePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe =
      PaymentService.subscribe((payments) => {
        setPayments(payments);
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  return {
    payments,
    loading,
  };
}