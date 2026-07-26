"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Spinner from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function Button({
  children,
  className,
  loading,
  disabled,
  variant = "primary", // Default to primary
  size = "md", // Default to medium
  fullWidth = true, // Keep fullWidth as default for backward compatibility
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl";
  
  // Size variants
  const sizeStyles = {
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  // Color variants
  const variantStyles = {
    primary: "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 disabled:opacity-60",
    secondary: "bg-slate-700 text-white hover:bg-slate-800 active:bg-slate-900 disabled:opacity-60",
    outline: "border-2 border-amber-500 text-amber-600 hover:bg-amber-50 active:bg-amber-100 disabled:opacity-60",
    ghost: "text-slate-600 hover:bg-slate-100 active:bg-slate-200 disabled:opacity-60",
    danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 disabled:opacity-60",
    success: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 disabled:opacity-60",
  };

  // Width styles
  const widthStyles = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      disabled={loading || disabled}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        widthStyles,
        "disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size={size === "sm" ? 16 : size === "lg" ? 22 : 18} />
          <span className={size === "sm" ? "ml-2" : "ml-3"}>Please wait...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}