// hooks/useAnalytics.ts
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

interface AnalyticsData {
  totalRevenue: number;
  activeCustomers: number;
  totalClaims: number;
  avgResolutionTime: number;
  monthlyClaims: number;
  claimsGrowth: number;
  approvalRate: number;
  avgResponseTime: number;
  recentActivities: Array<{
    title: string;
    time: string;
    status: string;
  }>;
  recentTransactions: Array<{
    customer: string;
    policy: string;
    type: string;
    amount: number;
    status: string;
    date: string;
  }>;
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRevenue: 0,
    activeCustomers: 0,
    totalClaims: 0,
    avgResolutionTime: 0,
    monthlyClaims: 0,
    claimsGrowth: 0,
    approvalRate: 0,
    avgResponseTime: 0,
    recentActivities: [],
    recentTransactions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Fetch your analytics data here
      // This is a mock implementation
      
      setAnalytics({
        totalRevenue: 2500000,
        activeCustomers: 124,
        totalClaims: 45,
        avgResolutionTime: 48,
        monthlyClaims: 12,
        claimsGrowth: 15,
        approvalRate: 78,
        avgResponseTime: 24,
        recentActivities: [
          { title: "New claim filed by John Doe", time: "2 hours ago", status: "pending" },
          { title: "Policy renewed for Jane Smith", time: "5 hours ago", status: "approved" },
          { title: "Claim #1234 approved", time: "1 day ago", status: "approved" },
        ],
        recentTransactions: [
          { customer: "John Doe", policy: "Auto Insurance", type: "Payment", amount: 50000, status: "Completed", date: "2024-01-15" },
          { customer: "Jane Smith", policy: "Health Insurance", type: "Claim", amount: 150000, status: "Pending", date: "2024-01-14" },
        ],
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  return { analytics, loading };
}