"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";

import PageHeader from "@/components/dashboard/PageHeader";
import ClaimDialog from "@/components/dashboard/ClaimDialog";
import ClaimForm from "@/components/dashboard/ClaimForm";
import ClaimTable from "@/components/dashboard/ClaimTable";

import { useClaims } from "@/hooks/useClaims";
import { ClaimService } from "@/services/claim.service";
import { Claim } from "@/types/claim";

export default function ClaimsPage() {
  const { claims, loading } = useClaims();

  const [open, setOpen] = useState(false);

  async function handleApprove(claim: Claim) {
    await ClaimService.update(claim.id, {
      status: "Approved",
    });
  }

  async function handleReject(claim: Claim) {
    await ClaimService.update(claim.id, {
      status: "Rejected",
    });
  }

  async function handleDelete(claim: Claim) {
    const confirmed = window.confirm(
      `Delete claim ${claim.claimNumber}?`
    );

    if (!confirmed) return;

    await ClaimService.delete(claim.id);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        title="Claims Management"
        description="Manage insurance claims submitted by customers."
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-5 w-5" />
            New Claim
          </Button>
        }
      />

      <ClaimTable
        claims={claims}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={handleDelete}
      />

      <ClaimDialog
        open={open}
        title="Submit New Claim"
        onClose={() => setOpen(false)}
      >
        <ClaimForm
          onSuccess={() => setOpen(false)}
        />
      </ClaimDialog>
    </>
  );
}