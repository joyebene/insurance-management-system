"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

interface PolicyDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function PolicyDialog({
  open,
  title,
  onClose,
  children,
}: PolicyDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <h2 className="text-2xl font-bold text-slate-900">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Body */}

        <div className="max-h-[80vh] overflow-y-auto p-6">
          {children}
        </div>

      </div>

    </div>
  );
}