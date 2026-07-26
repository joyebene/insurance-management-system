"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CreditCard,
  FileText,
  Shield,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Activity,
  DollarSign,
  AlertCircle,
  ChevronRight,
  Calendar,
  Filter,
  Download,
  Eye,
  MoreVertical,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import Loader from "@/components/ui/Loader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import PageHeader from "@/components/dashboard/PageHeader";
import Button from "@/components/ui/Button";
import { useDashboard } from "@/hooks/useDashboardStats";
import { useAnalytics } from "@/hooks/useAnalytics";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore";

// Types
interface RecentClaim {
  id: string;
  customerName: string;
  title: string;
  amount: number;
  status: "Pending" | "Under Review" | "Approved" | "Rejected";
  date: string;
  policyNumber: string;
}

interface RecentPolicy {
  id: string;
  policyNumber: string;
  policyName: string;
  customerName: string;
  startDate: string;
  status: "Active" | "Expired" | "Pending";
  premium: number;
}

interface TopCustomer {
  uid: string;
  name: string;
  email: string;
  policies: number;
  claims: number;
  totalPremium: number;
}

export default function AdminDashboard() {
  const { stats, loading } = useDashboard();
  const { analytics, loading: analyticsLoading } = useAnalytics();
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  
  // State for dynamic data
  const [recentClaims, setRecentClaims] = useState<RecentClaim[]>([]);
  const [recentPolicies, setRecentPolicies] = useState<RecentPolicy[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Fetch real data
  useEffect(() => {
    const fetchRecentData = async () => {
      try {
        setLoadingData(true);

        // Fetch recent claims
        const claimsQuery = query(
          collection(db, "claims"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const claimsSnapshot = await getDocs(claimsQuery);
        const claims = claimsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as RecentClaim[];
        setRecentClaims(claims);

        // Fetch recent policies
        const policiesQuery = query(
          collection(db, "policies"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const policiesSnapshot = await getDocs(policiesQuery);
        const policies = policiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as RecentPolicy[];
        setRecentPolicies(policies);

        // Fetch top customers (simplified - you might need a more complex query)
        const usersQuery = query(
          collection(db, "users"),
          where("role", "==", "customer"),
          limit(5)
        );
        const usersSnapshot = await getDocs(usersQuery);
        const customers = usersSnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data()
        })) as TopCustomer[];
        setTopCustomers(customers);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchRecentData();
  }, []);

  if (loading || analyticsLoading || loadingData) {
    return <Loader />;
  }

  // Helper function for status badges
  const getStatusBadge = (status: string) => {
    const styles = {
      "Pending": "bg-amber-100 text-amber-700",
      "Under Review": "bg-blue-100 text-blue-700",
      "Approved": "bg-green-100 text-green-700",
      "Rejected": "bg-red-100 text-red-700",
      "Active": "bg-green-100 text-green-700",
      "Expired": "bg-red-100 text-red-700",
    };
    return styles[status as keyof typeof styles] || "bg-slate-100 text-slate-700";
  };

  return (
    <div className="space-y-8">
      {/* Header with action buttons */}
      <PageHeader
        title="Admin Dashboard"
        description="Complete overview of your insurance business."
        action={
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-1 rounded-xl border border-slate-200 p-1">
              {["week", "month", "year"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as any)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-lg transition ${
                    timeRange === range
                      ? "bg-amber-500 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" fullWidth={false}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        }
      />

      {/* Main Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Customers"
          value={stats.customers}
          icon={Users}
          color="bg-blue-500"
          subtitle={`+${Math.floor(stats.customers * 0.12)} this month`}
          trend="up"
        />
        <DashboardCard
          title="Total Policies"
          value={stats.policies}
          icon={Shield}
          color="bg-green-500"
          subtitle={`+${Math.floor(stats.policies * 0.08)} this month`}
          trend="up"
        />
        <DashboardCard
          title="Pending Claims"
          value={stats.pendingClaims}
          icon={FileText}
          color="bg-red-500"
          subtitle={`${stats.pendingClaims} need attention`}
          trend="down"
        />
        <DashboardCard
          title="Revenue"
          value={`₦${stats.revenue.toLocaleString()}`}
          icon={CreditCard}
          color="bg-amber-500"
          subtitle={`+${Math.floor(stats.revenue * 0.15)} from last month`}
          trend="up"
        />
      </div>

      {/* Quick Stats with Progress */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Approval Rate</span>
            <span className="text-sm font-semibold text-green-600">+5.2%</span>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-bold">78%</span>
            <span className="text-sm text-slate-500">of claims</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div className="h-2 w-[78%] rounded-full bg-green-500"></div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Avg. Response Time</span>
            <span className="text-sm font-semibold text-green-600">-8%</span>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-bold">24h</span>
            <span className="text-sm text-slate-500">average</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div className="h-2 w-[65%] rounded-full bg-indigo-500"></div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Customer Satisfaction</span>
            <span className="text-sm font-semibold text-green-600">+2.1%</span>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-bold">4.8</span>
            <span className="text-sm text-slate-500">/ 5.0</span>
          </div>
          <div className="mt-3 flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Active Policies</span>
            <span className="text-sm font-semibold text-green-600">+12%</span>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-3xl font-bold">{stats.policies}</span>
            <span className="text-sm text-slate-500">total</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div className="h-2 w-[92%] rounded-full bg-amber-500"></div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Claims Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Claims Overview</h3>
            <div className="flex gap-2">
              <button className="text-sm text-slate-500 hover:text-amber-600">Monthly</button>
              <button className="text-sm text-slate-500 hover:text-amber-600">Weekly</button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 pt-4">
            {[65, 45, 78, 55, 90, 72, 85, 60, 95, 80, 70, 88].map((value, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div 
                  className="w-full rounded-lg bg-amber-500 transition-all hover:bg-amber-600"
                  style={{ height: `${(value / 100) * 200}px` }}
                ></div>
                <span className="text-xs text-slate-500">W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Revenue Trend</h3>
            <span className="text-sm text-green-600 flex items-center">
              <ArrowUpRight className="h-4 w-4" />
              +15.3%
            </span>
          </div>
          <div className="relative h-64">
            {/* Simple line chart representation */}
            <svg className="h-full w-full" viewBox="0 0 400 200">
              <polyline
                points="0,180 40,160 80,140 120,120 160,100 200,80 240,60 280,40 320,20 360,10 400,0"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="3"
                className="transition-all"
              />
              <polygon
                points="0,180 40,160 80,140 120,120 160,100 200,80 240,60 280,40 320,20 360,10 400,0 400,200 0,200"
                fill="url(#revenueGradient)"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Recent Claims & Policies */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Claims */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Claims</h3>
            <Link
              href="/dashboard/admin/claims"
              className="text-sm text-amber-600 hover:text-amber-700 flex items-center"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentClaims.length > 0 ? (
              recentClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-amber-50 p-2">
                      <FileText className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">{claim.title}</p>
                      <p className="text-sm text-slate-500">
                        {claim.customerName} • {claim.policyNumber}
                      </p>
                      <p className="text-xs text-slate-400">{claim.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm">
                      ₦{claim.amount.toLocaleString()}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(claim.status)}`}>
                      {claim.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-4">No recent claims</p>
            )}
          </div>
        </div>

        {/* Recent Policies */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Policies</h3>
            <Link
              href="/dashboard/admin/policies"
              className="text-sm text-amber-600 hover:text-amber-700 flex items-center"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentPolicies.length > 0 ? (
              recentPolicies.map((policy) => (
                <div
                  key={policy.id}
                  className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-50 p-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{policy.policyName}</p>
                      <p className="text-sm text-slate-500">
                        {policy.customerName} • {policy.policyNumber}
                      </p>
                      <p className="text-xs text-slate-400">Started: {policy.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm">
                      ₦{policy.premium.toLocaleString()}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(policy.status)}`}>
                      {policy.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-4">No recent policies</p>
            )}
          </div>
        </div>
      </div>

        {/* Top Customers */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Top Customers</h3>
            <Link
              href="/dashboard/admin/customers"
              className="text-sm text-amber-600 hover:text-amber-700 flex items-center"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Policies</th>
                  <th className="pb-3 font-medium">Claims</th>
                  <th className="pb-3 font-medium text-right">Total Premium</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.length > 0 ? (
                  topCustomers.map((customer) => (
                    <tr key={customer.uid} className="border-b border-slate-100 last:border-0">
                      <td className="py-3">
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-slate-500">{customer.email}</p>
                        </div>
                      </td>
                      <td className="py-3">{customer.policies || 0}</td>
                      <td className="py-3">{customer.claims || 0}</td>
                      <td className="py-3 text-right font-semibold">
                        ₦{(customer.totalPremium || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-slate-500">
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}