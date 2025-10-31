"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function EditApplicationsPage() {
  const locale = useLocale();
  const t = useTranslations("Account");
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = "https://modelshostesses.com/api";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/${locale}/login`);
      return;
    }

    const checkProgressAndRedirect = async () => {
      try {
        setLoading(true);
        setError(null);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [modelRes, hostessRes] = await Promise.all([
          fetch(`${baseUrl}/api/models/progress`, { headers }),
          fetch(`${baseUrl}/api/hostesses/progress`, { headers }),
        ]);

        const modelOk = modelRes.ok
          ? await modelRes.json().catch(() => null)
          : null;
        const hostessOk = hostessRes.ok
          ? await hostessRes.json().catch(() => null)
          : null;

        if (modelOk?.model_id) {
          router.push(`/${locale}/registration/model`);
          return;
        }
        if (hostessOk?.hostess_id) {
          router.push(`/${locale}/registration/hostess`);
          return;
        }

        // If no progress, send to chooser to start
        router.push(`/${locale}/choose`);
      } catch (e: any) {
        setError(e.message || "Failed to determine application status");
      } finally {
        setLoading(false);
      }
    };

    checkProgressAndRedirect();
  }, [router, locale]);

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center text-white bg-gradient-to-br from-gray-700 to-gray-900">
      {loading ? (
        t("loading")
      ) : error ? (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
          {error}
        </div>
      ) : null}
    </div>
  );
}
