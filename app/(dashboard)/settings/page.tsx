"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PageHeader from "@/components/dashboard/PageHeader";

import { useSettings } from "@/hooks/useSettings";
import { SettingsService } from "@/services/settings.service";

export default function SettingsPage() {
  const { settings, loading } = useSettings();

  const [companyName, setCompanyName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportPhone, setSupportPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!settings) return;

    setCompanyName(settings.companyName);
    setSupportEmail(settings.supportEmail);
    setSupportPhone(settings.supportPhone);
    setAddress(settings.address);
    setWebsite(settings.website);
  }, [settings]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setSaving(true);

      await SettingsService.save({
        companyName,
        supportEmail,
        supportPhone,
        address,
        website,
      });

      alert("Settings updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">

      <PageHeader
        title="Settings"
        description="Manage company information."
      />

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-6"
      >

        <Input
          label="Company Name"
          value={companyName}
          onChange={(e) =>
            setCompanyName(e.target.value)
          }
        />

        <Input
          label="Support Email"
          type="email"
          value={supportEmail}
          onChange={(e) =>
            setSupportEmail(e.target.value)
          }
        />

        <Input
          label="Support Phone"
          value={supportPhone}
          onChange={(e) =>
            setSupportPhone(e.target.value)
          }
        />

        <Input
          label="Office Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
        />

        <Input
          label="Website"
          value={website}
          onChange={(e) =>
            setWebsite(e.target.value)
          }
        />

        <Button
          loading={saving}
          type="submit"
        >
          Save Settings
        </Button>

      </form>

    </div>
  );
}