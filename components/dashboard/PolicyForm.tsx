"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { db } from "@/lib/firebase";
import { generatePolicyNumber } from "@/lib/generatePolicyNumber";
import { PolicyService } from "@/services/policy.service";

interface Customer {
  uid: string;
  fullName: string;
}

interface Props {
  onSuccess?: () => void;
}

export default function PolicyForm({ onSuccess }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [policyType, setPolicyType] = useState("Life");

  const [premium, setPremium] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCustomers = async () => {
      const snapshot = await getDocs(collection(db, "users"));

      const list = snapshot.docs
        .map((doc) => ({
          uid: doc.id,
          ...(doc.data() as Omit<Customer, "uid">),
        }))
        .filter((user: any) => user.role === "customer");

      setCustomers(list);
    };

    loadCustomers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await PolicyService.create({
        customerId,
        policyNumber: generatePolicyNumber(),
        policyName,
        policyType: policyType as any,
        premium: Number(premium),
        coverageAmount: Number(coverageAmount),
        status: "Active",
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });

      setCustomerId("");
      setPolicyName("");
      setPolicyType("Life");
      setPremium("");
      setCoverageAmount("");
      setStartDate("");
      setEndDate("");

      onSuccess?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Customer
        </label>

        <select
          className="h-12 w-full rounded-xl border border-slate-300 px-4"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option
              key={customer.uid}
              value={customer.uid}
            >
              {customer.fullName}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Policy Name"
        value={policyName}
        onChange={(e) => setPolicyName(e.target.value)}
        required
      />

      <div>
        <label className="mb-2 block text-sm font-medium">
          Policy Type
        </label>

        <select
          className="h-12 w-full rounded-xl border border-slate-300 px-4"
          value={policyType}
          onChange={(e) => setPolicyType(e.target.value)}
        >
          <option>Life</option>
          <option>Health</option>
          <option>Motor</option>
          <option>Travel</option>
          <option>Home</option>
        </select>
      </div>

      <Input
        label="Premium"
        type="number"
        value={premium}
        onChange={(e) => setPremium(e.target.value)}
      />

      <Input
        label="Coverage Amount"
        type="number"
        value={coverageAmount}
        onChange={(e) => setCoverageAmount(e.target.value)}
      />

      <Input
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <Input
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <Button
        loading={loading}
        type="submit"
      >
        Create Policy
      </Button>
    </form>
  );
}