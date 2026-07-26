"use client";

import {
  CreditCard,
  FileText,
  Shield,
  Users,
} from "lucide-react";

import Loader from "@/components/ui/Loader";
import PageHeader from "@/components/dashboard/PageHeader";
import ReportCard from "@/components/dashboard/ReportCard";

import { useReports } from "@/hooks/useReports";

export default function ReportsPage() {
  const {
    customers,
    policies,
    claims,
    payments,
    loading,
  } = useReports();

  if (loading) {
    return <Loader />;
  }

  const totalRevenue = payments
    .filter((payment) => payment.status === "Paid")
    .reduce(
      (sum, payment) => sum + payment.amount,
      0
    );

  return (
    <div className="space-y-8">

      <PageHeader
        title="Reports"
        description="Business analytics and insurance reports."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <ReportCard
          title="Customers"
          value={customers.length}
          icon={Users}
        />

        <ReportCard
          title="Policies"
          value={policies.length}
          icon={Shield}
        />

        <ReportCard
          title="Claims"
          value={claims.length}
          icon={FileText}
        />

        <ReportCard
          title="Revenue"
          value={`₦${totalRevenue.toLocaleString()}`}
          icon={CreditCard}
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">
            Recent Claims
          </h2>

          {claims.slice(0, 5).map((claim) => (
            <div
              key={claim.id}
              className="border-b py-3"
            >
              <p className="font-semibold">
                {claim.claimNumber}
              </p>

              <p className="text-sm text-slate-500">
                {claim.customerName}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">
            Recent Payments
          </h2>

          {payments.slice(0, 5).map((payment) => (
            <div
              key={payment.id}
              className="border-b py-3"
            >
              <p className="font-semibold">
                {payment.paymentNumber}
              </p>

              <p className="text-sm text-slate-500">
                ₦{payment.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}