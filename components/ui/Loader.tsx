"use client";

export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center gap-5">

        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-amber-500" />

        <div className="space-y-1 text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            Insurance Management System
          </h3>

          <p className="text-sm text-slate-500">
            Loading...
          </p>
        </div>

      </div>
    </div>
  );
}