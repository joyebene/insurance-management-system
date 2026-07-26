"use client";

import { useEffect, useState } from "react";

import {
  CompanySettings,
  SettingsService,
} from "@/services/settings.service";

export function useSettings() {
  const [settings, setSettings] =
    useState<CompanySettings | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      SettingsService.subscribe((data) => {
        setSettings(data);
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  return {
    settings,
    loading,
  };
}