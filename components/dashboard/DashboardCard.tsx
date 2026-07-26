"use client";

import { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
  trend = "neutral",
  trendValue,
}: Props) {
  // Helper to get trend icon and color
  const getTrendStyles = () => {
    switch (trend) {
      case "up":
        return {
          icon: ArrowUpRight,
          color: "text-green-600",
          bg: "bg-green-50",
        };
      case "down":
        return {
          icon: ArrowDownRight,
          color: "text-red-600",
          bg: "bg-red-50",
        };
      default:
        return {
          icon: Minus,
          color: "text-slate-400",
          bg: "bg-slate-50",
        };
    }
  };

  const TrendIcon = getTrendStyles().icon;
  const trendStyles = getTrendStyles();

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        {/* Left side - Title and Value */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 truncate">
            {value}
          </h2>
          
          {/* Subtitle */}
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500 truncate">{subtitle}</p>
          )}
        </div>

        {/* Right side - Icon */}
        <div className={`rounded-xl p-3 ${color} shrink-0 ml-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Trend Indicator */}
      {trendValue && (
        <div className="mt-4 flex items-center gap-2">
          <div className={`flex items-center rounded-full ${trendStyles.bg} px-2.5 py-0.5`}>
            <TrendIcon className={`h-4 w-4 ${trendStyles.color}`} />
            <span className={`ml-1 text-sm font-medium ${trendStyles.color}`}>
              {trendValue}
            </span>
          </div>
          <span className="text-sm text-slate-400">vs last period</span>
        </div>
      )}
    </div>
  );
}