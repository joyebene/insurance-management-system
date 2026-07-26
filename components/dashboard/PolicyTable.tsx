"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Edit,
  Eye,
  Search,
  Trash2,
} from "lucide-react";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Policy } from "@/types/policy";
import { AppUser } from "@/types/user";

interface PolicyTableProps {
  policies: Policy[];
  onEdit?: (policy: Policy) => void;
  onDelete?: (policy: Policy) => void;
}

export default function PolicyTable({
  policies,
  onEdit,
  onDelete,
}: PolicyTableProps) {
  const [search, setSearch] = useState("");

  const [customers, setCustomers] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const map: Record<string, string> = {};

        snapshot.docs.forEach((doc) => {
          const user = doc.data() as AppUser;
          map[doc.id] = user.fullName;
        });

        setCustomers(map);
      }
    );

    return unsubscribe;
  }, []);

  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      const customer =
        customers[policy.customerId] ?? "";

      return (
        policy.policyNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        policy.policyType
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [policies, search, customers]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Expired":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-5">

        <div className="relative max-w-md">

          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

          <input
            placeholder="Search policies..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="h-12 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none focus:border-amber-500"
          />

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Policy No.
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Policy Type
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Premium
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Coverage
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredPolicies.length === 0 ? (
              <tr>

                <td
                  colSpan={7}
                  className="py-12 text-center text-slate-500"
                >
                  No policies found.
                </td>

              </tr>
            ) : (
              filteredPolicies.map((policy) => (
                <tr
                  key={policy.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-6 py-5 font-medium">
                    {policy.policyNumber}
                  </td>

                  <td className="px-6 py-5">
                    {customers[policy.customerId] ??
                      "Unknown"}
                  </td>

                  <td className="px-6 py-5">
                    {policy.policyType}
                  </td>

                  <td className="px-6 py-5">
                    ₦
                    {Number(
                      policy.premium
                    ).toLocaleString()}
                  </td>

                  <td className="px-6 py-5">
                    ₦
                    {Number(
                      policy.coverageAmount
                    ).toLocaleString()}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                        policy.status
                      )}`}
                    >
                      {policy.status}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-2">

                      <button
                        className="rounded-lg p-2 hover:bg-slate-100"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          onEdit?.(policy)
                        }
                        className="rounded-lg p-2 hover:bg-slate-100"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() =>
                          onDelete?.(policy)
                        }
                        className="rounded-lg p-2 text-red-600 hover:bg-red-100"
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