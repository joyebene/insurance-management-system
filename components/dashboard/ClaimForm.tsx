"use client";

import { useEffect, useMemo, useState } from "react";
import {
    collection,
    onSnapshot,
} from "firebase/firestore";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { db } from "@/lib/firebase";
import { generateClaimNumber } from "@/lib/generateClaimNumber";
import { ClaimService } from "@/services/claim.service";
import { Policy } from "@/types/policy";
import { AppUser } from "@/types/user";

interface Props {
    onSuccess?: () => void;
}

export default function ClaimForm({
    onSuccess,
}: Props) {
    const [customers, setCustomers] = useState<AppUser[]>([]);
    const [policies, setPolicies] = useState<Policy[]>([]);

    const [customerId, setCustomerId] = useState("");
    const [policyId, setPolicyId] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [amount, setAmount] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribeUsers = onSnapshot(
            collection(db, "users"),
            (snapshot) => {
                const users = snapshot.docs
                    .map((doc) => ({
                        uid: doc.id,
                        ...(doc.data() as Omit<AppUser, "uid">),
                    }))
                    .filter((user) => user.role === "customer");

                setCustomers(users);
            }
        );

        const unsubscribePolicies = onSnapshot(
            collection(db, "policies"),
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Policy, "id">),
                }));

                setPolicies(data);
            }
        );

        return () => {
            unsubscribeUsers();
            unsubscribePolicies();
        };
    }, []);

    const customerPolicies = useMemo(() => {
        return policies.filter(
            (policy) => policy.customerId === customerId
        );
    }, [policies, customerId]);

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        try {
            setLoading(true);

            const selectedCustomer = customers.find(
                (customer) => customer.uid === customerId
            );

            const selectedPolicy = policies.find(
                (policy) => policy.id === policyId
            );

            if (!selectedCustomer || !selectedPolicy) {
                alert("Please select a valid customer and policy.");
                setLoading(false);
                return;
            }

            await ClaimService.create({
                customerId,
                customerName: selectedCustomer.fullName,
                policyId,
                policyNumber: selectedPolicy.policyNumber,
                claimNumber: generateClaimNumber(),
                title,
                description,
                amount: Number(amount),
                status: "Pending",
            });

            setCustomerId("");
            setPolicyId("");
            setTitle("");
            setDescription("");
            setAmount("");

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
                    required
                    value={customerId}
                    onChange={(e) =>
                        setCustomerId(e.target.value)
                    }
                    className="h-12 w-full rounded-xl border border-slate-300 px-4"
                >
                    <option value="">
                        Select Customer
                    </option>

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

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Policy
                </label>

                <select
                    required
                    value={policyId}
                    onChange={(e) =>
                        setPolicyId(e.target.value)
                    }
                    className="h-12 w-full rounded-xl border border-slate-300 px-4"
                >
                    <option value="">
                        Select Policy
                    </option>

                    {customerPolicies.map((policy) => (
                        <option
                            key={policy.id}
                            value={policy.id}
                        >
                            {policy.policyNumber} •{" "}
                            {policy.policyName}
                        </option>
                    ))}
                </select>
            </div>

            <Input
                label="Claim Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                required
            />

            <div>

                <label className="mb-2 block text-sm font-medium">
                    Description
                </label>

                <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-amber-500"
                />

            </div>

            <Input
                label="Claim Amount"
                type="number"
                value={amount}
                onChange={(e) =>
                    setAmount(e.target.value)
                }
                required
            />

            <Button
                loading={loading}
                type="submit"
            >
                Submit Claim
            </Button>
        </form>
    );
}