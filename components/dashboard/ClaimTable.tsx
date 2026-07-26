"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";

import { Claim } from "@/types/claim";

interface ClaimTableProps {
  claims: Claim[];
  onApprove?: (claim: Claim) => void;
  onReject?: (claim: Claim) => void;
  onDelete?: (claim: Claim) => void;
}

export default function ClaimTable({
  claims,
  onApprove,
  onReject,
  onDelete,
}: ClaimTableProps) {
  const [search, setSearch] = useState("");

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const value = search.toLowerCase();

      return (
        claim.claimNumber.toLowerCase().includes(value) ||
        claim.customerName.toLowerCase().includes(value) ||
        claim.policyNumber.toLowerCase().includes(value) ||
        claim.title.toLowerCase().includes(value)
      );
    });
  }, [claims, search]);

  function badge(status: string) {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-5">

        <div className="relative max-w-md">

          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

          <input
            placeholder="Search claims..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none focus:border-amber-500"
          />

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left">Claim No.</th>

              <th className="px-6 py-4 text-left">Customer</th>

              <th className="px-6 py-4 text-left">Policy</th>

              <th className="px-6 py-4 text-left">Title</th>

              <th className="px-6 py-4 text-left">Amount</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredClaims.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="py-12 text-center text-slate-500"
                >
                  No claims found.
                </td>

              </tr>

            ) : (

              filteredClaims.map((claim) => (

                <tr
                  key={claim.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-5">
                    {claim.claimNumber}
                  </td>

                  <td className="px-6 py-5">
                    {claim.customerName}
                  </td>

                  <td className="px-6 py-5">
                    {claim.policyNumber}
                  </td>

                  <td className="px-6 py-5">
                    {claim.title}
                  </td>

                  <td className="px-6 py-5">
                    ₦{claim.amount.toLocaleString()}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(claim.status)}`}
                    >
                      {claim.status}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-2">

                      {claim.status === "Pending" && (
                        <>
                          <button
                            onClick={() => onApprove?.(claim)}
                            className="rounded-lg bg-green-100 p-2 text-green-700"
                          >
                            <CheckCircle2 size={18} />
                          </button>

                          <button
                            onClick={() => onReject?.(claim)}
                            className="rounded-lg bg-red-100 p-2 text-red-700"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => onDelete?.(claim)}
                        className="rounded-lg bg-slate-100 p-2"
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