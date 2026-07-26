"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">

        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>

        <input
          ref={ref}
          className={clsx(
            "h-12 w-full rounded-xl border border-slate-300 px-4 outline-none transition text-gray-900",
            "focus:border-amber-500",
            error && "border-red-500",
            className
          )}
          {...props}
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;