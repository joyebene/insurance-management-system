"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ChevronRight,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";

import Loader from "@/components/ui/Loader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import PageHeader from "@/components/dashboard/PageHeader";
import Button from "@/components/ui/Button";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface CustomerStats {
  activePolicies: number;
  pendingClaims: number;
  approvedClaims: number;
  totalClaims: number;
}

interface RecentClaim {
  id: string;
  title: string;
  status: string;
  date: string;
  amount: number;
}

export default function CustomerDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [stats, setStats] = useState<CustomerStats>({
    activePolicies: 0,
    pendingClaims: 0,
    approvedClaims: 0,
    totalClaims: 0,
  });
  const [recentClaims, setRecentClaims] = useState<RecentClaim[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchCustomerData(user.uid);
      } else {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchCustomerData = async (uid: string) => {
    try {
      setLoading(true);

      // Fetch policies
      const policiesQuery = query(
        collection(db, "policies"),
        where("customerId", "==", uid)
      );
      const policiesSnapshot = await getDocs(policiesQuery);
      const activePolicies = policiesSnapshot.size;

      // Fetch claims
      const claimsQuery = query(
        collection(db, "claims"),
        where("customerId", "==", uid)
      );
      const claimsSnapshot = await getDocs(claimsQuery);

      let pending = 0;
      let approved = 0;
      const recent: RecentClaim[] = [];

      claimsSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.status === "Pending" || data.status === "Under Review") {
          pending++;
        } else if (data.status === "Approved") {
          approved++;
        }

        // Get 3 most recent claims
        if (recent.length < 3) {
          recent.push({
            id: doc.id,
            title: data.title,
            status: data.status,
            date: data.createdAt?.toDate?.()?.toLocaleDateString() || "N/A",
            amount: data.amount || 0,
          });
        }
      });

      setStats({
        activePolicies,
        pendingClaims: pending,
        approvedClaims: approved,
        totalClaims: claimsSnapshot.size,
      });

      setRecentClaims(recent);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Dashboard"
        description="Welcome back! Here's an overview of your insurance portfolio."
      />

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Active Policies"
          value={stats.activePolicies}
          icon={Shield}
          color="bg-green-500"
        />
        <DashboardCard
          title="Pending Claims"
          value={stats.pendingClaims}
          icon={Clock}
          color="bg-amber-500"
        />
        <DashboardCard
          title="Approved Claims"
          value={stats.approvedClaims}
          icon={CheckCircle}
          color="bg-emerald-500"
        />
        <DashboardCard
          title="Total Claims"
          value={stats.totalClaims}
          icon={FileText}
          color="bg-blue-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/dashboard/customer/claims/new">
          <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 p-8 text-center hover:border-amber-500 hover:bg-amber-100 transition-all cursor-pointer">
            <Plus className="mx-auto h-12 w-12 text-amber-600" />
            <h3 className="mt-3 font-semibold text-amber-900">
              File a New Claim
            </h3>
            <p className="text-sm text-amber-700">
              Submit a new insurance claim
            </p>
          </div>
        </Link>

        <Link href="/dashboard/customer/policies">
          <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-8 text-center hover:border-blue-500 hover:bg-blue-100 transition-all cursor-pointer">
            <Shield className="mx-auto h-12 w-12 text-blue-600" />
            <h3 className="mt-3 font-semibold text-blue-900">
              View My Policies
            </h3>
            <p className="text-sm text-blue-700">
              See all your active policies
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Claims */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Claims</h3>
          <Link
            href="/dashboard/customer/claims"
            className="text-sm text-amber-600 hover:text-amber-700 flex items-center"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {recentClaims.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <AlertCircle className="mx-auto h-12 w-12 mb-3 text-slate-300" />
            <p>You haven't filed any claims yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentClaims.map((claim) => (
              <div
                key={claim.id}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{claim.title}</p>
                  <p className="text-sm text-slate-500">{claim.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    ₦{claim.amount.toLocaleString()}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    claim.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : claim.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {claim.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}