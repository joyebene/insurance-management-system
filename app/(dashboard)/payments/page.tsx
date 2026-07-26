"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

import PageHeader from "@/components/dashboard/PageHeader";
import PaymentDialog from "@/components/dashboard/PaymentDialog";
import PaymentForm from "@/components/dashboard/PaymentForm";
import PaymentTable from "@/components/dashboard/PaymentTable";

import { usePayments } from "@/hooks/usePayments";
import { PaymentService } from "@/services/payment.service";
import { Payment } from "@/types/payment";

export default function PaymentsPage() {
  const { payments, loading } =
    usePayments();

  const [open, setOpen] =
    useState(false);

  async function handleDelete(
    payment: Payment
  ) {
    const confirmed = window.confirm(
      `Delete ${payment.paymentNumber}?`
    );

    if (!confirmed) return;

    await PaymentService.delete(
      payment.id
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        title="Payments"
        description="Manage premium payments."
        action={
          <Button
            onClick={() =>
              setOpen(true)
            }
          >
            <Plus className="mr-2 h-5 w-5" />
            Record Payment
          </Button>
        }
      />

      <PaymentTable
        payments={payments}
        onDelete={handleDelete}
      />

      <PaymentDialog
        open={open}
        title="Record Payment"
        onClose={() =>
          setOpen(false)
        }
      >
        <PaymentForm
          onSuccess={() =>
            setOpen(false)
          }
        />
      </PaymentDialog>
    </>
  );
}