"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { db } from "@/lib/firebase";
import { generatePaymentNumber } from "@/lib/generatePaymentNumber";
import { PaymentService } from "@/services/payment.service";

import { Policy } from "@/types/policy";
import { AppUser } from "@/types/user";

interface Props {
  onSuccess?: () => void;
}

export default function PaymentForm({
  onSuccess,
}: Props) {
  const [customers, setCustomers] = useState<AppUser[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);

  const [customerId, setCustomerId] = useState("");
  const [policyId, setPolicyId] = useState("");

  const [amount, setAmount] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Bank Transfer");

  const [status, setStatus] =
    useState("Paid");

  const [paidAt, setPaidAt] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const users = snapshot.docs
          .map((doc) => ({
            uid: doc.id,
            ...(doc.data() as Omit<AppUser, "uid">),
          }))
          .filter(
            (user) => user.role === "customer"
          );

        setCustomers(users);
      }
    );

    const unsubscribePolicies =
      onSnapshot(
        collection(db, "policies"),
        (snapshot) => {
          const data = snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...(doc.data() as Omit<
                Policy,
                "id"
              >),
            })
          );

          setPolicies(data);
        }
      );

    return () => {
      unsubscribeUsers();
      unsubscribePolicies();
    };
  }, []);

  const customerPolicies =
    useMemo(() => {
      return policies.filter(
        (policy) =>
          policy.customerId === customerId
      );
    }, [policies, customerId]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const customer = customers.find(
        (c) => c.uid === customerId
      );

      const policy = policies.find(
        (p) => p.id === policyId
      );

      if (!customer || !policy) {
        alert("Invalid customer or policy.");
        return;
      }

      await PaymentService.create({
        customerId,
        customerName: customer.fullName,

        policyId,
        policyNumber:
          policy.policyNumber,

        paymentNumber:
          generatePaymentNumber(),

        amount: Number(amount),

        paymentMethod: paymentMethod as any,

        status: status as any,

        paidAt: new Date(paidAt),
      });

      setCustomerId("");
      setPolicyId("");
      setAmount("");
      setPaymentMethod("Bank Transfer");
      setStatus("Paid");
      setPaidAt("");

      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert("Unable to save payment.");
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
          required
          value={customerId}
          onChange={(e) =>
            setCustomerId(
              e.target.value
            )
          }
          className="h-12 w-full rounded-xl border border-slate-300 px-4"
        >
          <option value="">
            Select Customer
          </option>

          {customers.map(
            (customer) => (
              <option
                key={customer.uid}
                value={customer.uid}
              >
                {customer.fullName}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Policy
        </label>

        <select
          required
          value={policyId}
          onChange={(e) =>
            setPolicyId(
              e.target.value
            )
          }
          className="h-12 w-full rounded-xl border border-slate-300 px-4"
        >
          <option value="">
            Select Policy
          </option>

          {customerPolicies.map(
            (policy) => (
              <option
                key={policy.id}
                value={policy.id}
              >
                {policy.policyNumber} •{" "}
                {policy.policyName}
              </option>
            )
          )}
        </select>
      </div>

      <Input
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) =>
          setAmount(
            e.target.value
          )
        }
        required
      />

      <div>
        <label className="mb-2 block text-sm font-medium">
          Payment Method
        </label>

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(
              e.target.value
            )
          }
          className="h-12 w-full rounded-xl border border-slate-300 px-4"
        >
          <option>
            Bank Transfer
          </option>

          <option>
            Cash
          </option>

          <option>
            Card
          </option>

          <option>
            Mobile Money
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="h-12 w-full rounded-xl border border-slate-300 px-4"
        >
          <option>Paid</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
      </div>

      <Input
        label="Payment Date"
        type="date"
        value={paidAt}
        onChange={(e) =>
          setPaidAt(
            e.target.value
          )
        }
        required
      />

      <Button
        loading={loading}
        type="submit"
      >
        Record Payment
      </Button>
    </form>
  );
}