"use client";

import { Edit, Eye, Trash2 } from "lucide-react";

import { AppUser } from "@/types/user";

interface CustomerTableProps {
  customers: AppUser[];
}

export default function CustomerTable({
  customers,
}: CustomerTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="px-5 py-4 text-left">Name</th>
            <th className="px-5 py-4 text-left">Email</th>
            <th className="px-5 py-4 text-left">Phone</th>
            <th className="px-5 py-4 text-left">Role</th>
            <th className="px-5 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.uid}
              className="border-t"
            >
              <td className="px-5 py-4 font-medium">
                {customer.fullName}
              </td>

              <td className="px-5 py-4">
                {customer.email}
              </td>

              <td className="px-5 py-4">
                {customer.phone}
              </td>

              <td className="px-5 py-4 capitalize">
                {customer.role}
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-center gap-2">

                  <button className="rounded-lg p-2 hover:bg-slate-100">
                    <Eye size={18} />
                  </button>

                  <button className="rounded-lg p-2 hover:bg-slate-100">
                    <Edit size={18} />
                  </button>

                  <button className="rounded-lg p-2 text-red-600 hover:bg-red-50">
                    <Trash2 size={18} />
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}