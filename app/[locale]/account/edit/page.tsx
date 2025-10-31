"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

type User = {
  id: number;
  email: string;
  username: string;
  fullname: string;
};

export default function EditAccountPage() {
  const locale = useLocale();
  const t = useTranslations("Account");
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<{ username: string; fullname: string }>({
    username: "",
    fullname: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const baseUrl = "https://modelshostesses.com/api";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/${locale}/login`);
      return;
    }

    const fetchAccount = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${baseUrl}/api/account`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load account");
        const data = await res.json();
        setUser(data.user);
        setForm({
          username: data.user?.username ?? "",
          fullname: data.user?.fullname ?? "",
        });
      } catch (e: any) {
        setError(e.message || "Failed to load account");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [router, locale]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      // Try a conventional update route; gracefully handle if not implemented
      const res = await fetch(`${baseUrl}/api/account`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: form.username,
          fullname: form.fullname,
        }),
      });

      if (!res.ok) {
        // Some backends use PATCH
        const retry = await fetch(`${baseUrl}/api/account`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: form.username,
            fullname: form.fullname,
          }),
        });
        if (!retry.ok) {
          const err = await retry.json().catch(() => ({} as any));
          throw new Error(err?.error || `Save failed (${retry.status})`);
        }
      }

      setSuccess("Saved successfully");
      // Optionally refresh account info
      setTimeout(() => router.push(`/${locale}/account`), 800);
    } catch (e: any) {
      setError(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center text-white">
        {t("loading")}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 bg-gradient-to-br from-gray-700 to-gray-900">
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-6">{t("editAccount")}</h1>

        {error && (
          <div className="mb-4 text-red-300 bg-red-900/30 border border-red-700 rounded-lg p-3">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-300 bg-green-900/30 border border-green-700 rounded-lg p-3">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm opacity-90">Email</label>
            <input
              type="email"
              value={user?.email ?? ""}
              disabled
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 opacity-80"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm opacity-90">
              {t("username")}
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2"
              placeholder="username"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm opacity-90">
              {t("fullname")}
            </label>
            <input
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2"
              placeholder="Full name"
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-rose-400 to-pink-500 disabled:opacity-70 px-5 py-2 rounded-lg"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/${locale}/account`)}
              className="px-4 py-2 rounded-lg border border-white/20"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
