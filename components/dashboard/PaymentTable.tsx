"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";

import { Payment } from "@/types/payment";

interface PaymentTableProps {
  payments: Payment[];
  onDelete?: (payment: Payment) => void;
}

export default function PaymentTable({
  payments,
  onDelete,
}: PaymentTableProps) {
  const [search, setSearch] = useState("");

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const value = search.toLowerCase();

      return (
        payment.paymentNumber
          .toLowerCase()
          .includes(value) ||
        payment.customerName
          .toLowerCase()
          .includes(value) ||
        payment.policyNumber
          .toLowerCase()
          .includes(value)
      );
    });
  }, [payments, search]);

  const badge = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-5">

        <div className="relative max-w-md">

          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search payments..."
            className="h-12 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none focus:border-amber-500"
          />

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left">
                Payment No.
              </th>

              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-left">
                Policy
              </th>

              <th className="px-6 py-4 text-left">
                Amount
              </th>

              <th className="px-6 py-4 text-left">
                Method
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredPayments.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-slate-500"
                >
                  No payments found.
                </td>

              </tr>

            ) : (

              filteredPayments.map((payment) => (

                <tr
                  key={payment.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-5">
                    {payment.paymentNumber}
                  </td>

                  <td className="px-6 py-5">
                    {payment.customerName}
                  </td>

                  <td className="px-6 py-5">
                    {payment.policyNumber}
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    ₦{payment.amount.toLocaleString()}
                  </td>

                  <td className="px-6 py-5">
                    {payment.paymentMethod}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(payment.status)}`}
                    >
                      {payment.status}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center">

                      <button
                        onClick={() =>
                          onDelete?.(payment)
                        }
                        className="rounded-lg bg-red-100 p-2 text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}