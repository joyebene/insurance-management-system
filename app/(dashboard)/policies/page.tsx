"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  FileText,
  Calendar,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download,
  RefreshCw,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";

import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import PageHeader from "@/components/dashboard/PageHeader";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";

interface Policy {
  id: string;
  policyNumber: string;
  policyName: string;
  type: string;
  coverage: string;
  premium: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Expired" | "Pending" | "Cancelled";
  customerId: string;
  customerName: string;
}

export default function CustomerPoliciesPage() {
  const router = useRouter();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchCustomerPolicies(user.uid);
      } else {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchCustomerPolicies = async (uid: string) => {
    try {
      setLoading(true);

      // Get customer data
      const userDoc = await getDoc(doc(db, "users", uid));
      const userData = userDoc.data();

      // Fetch policies for this customer
      const policiesQuery = query(
        collection(db, "policies"),
        where("customerId", "==", uid),
        orderBy("createdAt", "desc")
      );
      const policiesSnapshot = await getDocs(policiesQuery);

      const policiesData = policiesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        customerName: userData?.fullName || "Unknown",
      })) as Policy[];

      setPolicies(policiesData);
      setFilteredPolicies(policiesData);
    } catch (error) {
      console.error("Error fetching policies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter policies based on search and status
  useEffect(() => {
    let result = policies;

    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter((policy) => policy.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (policy) =>
          policy.policyNumber.toLowerCase().includes(term) ||
          policy.policyName.toLowerCase().includes(term) ||
          policy.type.toLowerCase().includes(term)
      );
    }

    setFilteredPolicies(result);
  }, [searchTerm, filterStatus, policies]);

  // Helper function for status badges
  const getStatusBadge = (status: string) => {
    const styles = {
      Active: "bg-green-100 text-green-700 border-green-200",
      Pending: "bg-amber-100 text-amber-700 border-amber-200",
      Expired: "bg-red-100 text-red-700 border-red-200",
      Cancelled: "bg-slate-100 text-slate-700 border-slate-200",
    };
    return (
      styles[status as keyof typeof styles] ||
      "bg-slate-100 text-slate-700 border-slate-200"
    );
  };

  // Helper function for status icons
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4" />;
      case "Pending":
        return <Clock className="h-4 w-4" />;
      case "Expired":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Get status count
  const getStatusCount = (status: string) => {
    if (status === "all") return policies.length;
    return policies.filter((p) => p.status === status).length;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Policies"
        description="View and manage all your insurance policies."
        action={
          <Link href="/dashboard/customer/policies/new">
            <Button>
              <Plus className="mr-2 h-5 w-5" />
              Buy New Policy
            </Button>
          </Link>
        }
      />

      {/* Policy Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-700">Active Policies</span>
            <Shield className="h-5 w-5 text-green-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-green-700">
            {policies.filter((p) => p.status === "Active").length}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-amber-700">Pending</span>
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-700">
            {policies.filter((p) => p.status === "Pending").length}
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-red-700">Expired</span>
            <XCircle className="h-5 w-5 text-red-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-red-700">
            {policies.filter((p) => p.status === "Expired").length}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">Total Premium</span>
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-blue-700">
            ₦
            {policies
              .reduce((sum, p) => sum + (p.premium || 0), 0)
              .toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-200 bg-white p-4">
        {/* Search */}
        <div className="flex flex-1 items-center rounded-xl border border-slate-200 px-3 focus-within:border-amber-500">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search policies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full bg-transparent px-2 outline-none"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto">
          {["all", "Active", "Pending", "Expired", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
                filterStatus === status
                  ? "bg-amber-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                {getStatusCount(status)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Policies List */}
      {filteredPolicies.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <Shield className="mx-auto h-16 w-16 text-slate-300" />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            No Policies Found
          </h3>
          <p className="mt-2 text-slate-500">
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your filters"
              : "You haven't purchased any policies yet"}
          </p>
          <Link href="/dashboard/customer/policies/new">
            <Button className="mt-4" fullWidth={false}>
              <Plus className="mr-2 h-4 w-4" />
              Buy Your First Policy
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPolicies.map((policy) => (
            <div
              key={policy.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg"
            >
              {/* Policy Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-amber-500" />
                    <span className="text-sm font-medium text-slate-500">
                      {policy.policyNumber}
                    </span>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    {policy.policyName}
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(
                    policy.status
                  )}`}
                >
                  {getStatusIcon(policy.status)}
                  {policy.status}
                </span>
              </div>

              {/* Policy Details */}
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Type</span>
                  <span className="font-medium text-slate-700">
                    {policy.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Coverage</span>
                  <span className="font-medium text-slate-700">
                    {policy.coverage}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Premium</span>
                  <span className="font-semibold text-amber-600">
                    ₦{policy.premium.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Duration</span>
                  <span className="text-slate-600">
                    {policy.startDate} → {policy.endDate}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                <Link
                  href={`/dashboard/customer/policies/${policy.id}`}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth={false}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              {/* Premium Progress */}
              {policy.status === "Active" && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Coverage Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className="h-1.5 rounded-full bg-green-500"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}