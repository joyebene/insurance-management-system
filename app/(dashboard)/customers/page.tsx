"use client";

import CustomerTable from "@/components/dashboard/CustomerTable";
import Loader from "@/components/ui/Loader";
import PageHeader from "@/components/dashboard/PageHeader";

import { useCustomers } from "@/hooks/useCustomers";

export default function CustomersPage() {
  const { customers, loading } = useCustomers();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        title="Customers"
        description="Manage all registered customers."
      />

      <CustomerTable customers={customers} />
    </>
  );
}