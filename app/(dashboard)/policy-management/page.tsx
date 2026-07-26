"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

import PageHeader from "@/components/dashboard/PageHeader";
import PolicyDialog from "@/components/dashboard/PolicyDialog";
import PolicyForm from "@/components/dashboard/PolicyForm";
import PolicyTable from "@/components/dashboard/PolicyTable";

import { usePolicies } from "@/hooks/usePolicies";
import { PolicyService } from "@/services/policy.service";
import { Policy } from "@/types/policy";

export default function PolicyManagementPage() {
  const { policies, loading } = usePolicies();

  const [open, setOpen] = useState(false);

  async function handleDelete(policy: Policy) {
    const confirmDelete = window.confirm(
      `Delete ${policy.policyNumber}?`
    );

    if (!confirmDelete) return;

    await PolicyService.delete(policy.id);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        title="Policy Management"
        description="Create, update and manage insurance policies."
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-5 w-5" />

            New Policy
          </Button>
        }
      />

      <PolicyTable
        policies={policies}
        onDelete={handleDelete}
        onEdit={(policy) => {
          console.log(policy);
        }}
      />

      <PolicyDialog
        open={open}
        title="Create Policy"
        onClose={() => setOpen(false)}
      >
        <PolicyForm
          onSuccess={() => setOpen(false)}
        />
      </PolicyDialog>
    </>
  );
}