"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

type Progress = {
  model?: {
    model_id: number;
    current_step: number;
    status?: string;
  } | null;
  hostess?: {
    hostess_id: number;
    current_step: number;
    status?: string;
  } | null;
};

export default function ViewApplicationsPage() {
  const locale = useLocale();
  const t = useTranslations("Account");
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress>({
    model: null,
    hostess: null,
  });
  const [adminModel, setAdminModel] = useState<any | null>(null);
  const [adminHostess, setAdminHostess] = useState<any | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const baseUrl = "https://modelshostesses.com/api";
  const adminBaseUrl = "https://modelshostesses.com/api";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/${locale}/login`);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const headers = { Authorization: `Bearer ${token}` };
        const [modelRes, hostessRes] = await Promise.all([
          fetch(`${baseUrl}/api/models/progress`, { headers }),
          fetch(`${baseUrl}/api/hostesses/progress`, { headers }),
        ]);

        const model = modelRes.ok
          ? await modelRes.json().catch(() => null)
          : null;
        const hostess = hostessRes.ok
          ? await hostessRes.json().catch(() => null)
          : null;

        const nextProgress: any = {
          model: model?.model_id
            ? ({
                model_id: model.model_id,
                current_step: model.current_step,
                status: model.status,
                created_at: (model as any).created_at,
                updated_at: (model as any).updated_at,
                review_notes: (model as any).review_notes,
              } as any)
            : null,
          hostess: hostess?.hostess_id
            ? ({
                hostess_id: hostess.hostess_id,
                current_step: hostess.current_step,
                status: hostess.status,
                created_at: (hostess as any).created_at,
                updated_at: (hostess as any).updated_at,
                review_notes: (hostess as any).review_notes,
              } as any)
            : null,
        };
        setProgress(nextProgress);

        // Fetch admin details for richer info if ids exist
        const adminToken = localStorage.getItem("adminToken");
        const adminHeaders = adminToken
          ? { Authorization: `Bearer ${adminToken}` }
          : undefined;
        if (adminHeaders && nextProgress.model?.model_id) {
          try {
            const r = await fetch(
              `${adminBaseUrl}/api/admin/models/${nextProgress.model.model_id}`,
              { headers: adminHeaders }
            );
            if (r.ok) setAdminModel(await r.json().catch(() => null));
          } catch {}
        } else {
          setAdminModel(null);
        }
        if (adminHeaders && nextProgress.hostess?.hostess_id) {
          try {
            const r = await fetch(
              `${adminBaseUrl}/api/admin/hostesses/${nextProgress.hostess.hostess_id}`,
              { headers: adminHeaders }
            );
            if (r.ok) setAdminHostess(await r.json().catch(() => null));
          } catch {}
        } else {
          setAdminHostess(null);
        }
      } catch (e: any) {
        setError(e.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router, locale]);

  // Use regular user token for deletion (not admin token)
  const handleDelete = async (type: "model" | "hostess", id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type} application?`))
      return;

    try {
      setDeleting(`${type}-${id}`);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      // Explicit endpoints to avoid the pluralization issue
      const url =
        type === "model"
          ? `${baseUrl}/api/models/${id}`
          : `${baseUrl}/api/hostesses/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to delete ${type} application`
        );
      }

      // Remove the deleted application from state
      setProgress((prev) => ({
        ...prev,
        [type]: null,
      }));

      // Also clear admin data
      if (type === "model") {
        setAdminModel(null);
      } else {
        setAdminHostess(null);
      }

      alert(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } application deleted successfully!`
      );
    } catch (e: any) {
      alert(e.message || "Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen pt-50 px-4 md:px-8 bg-gradient-to-br from-gray-700 to-gray-900 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t("viewApplications")}</h1>

        {loading && <div className="mb-6">{t("loading")}</div>}
        {error && (
          <div className="mb-6 bg-red-900/30 border border-red-700 rounded-lg p-4">
            {error}
          </div>
        )}

        {!loading && !progress.model && !progress.hostess && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="opacity-90 mb-4">No applications found.</p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/${locale}/choose`)}
                className="bg-gradient-to-r from-rose-400 to-pink-500 px-4 py-2 rounded-lg"
              >
                Start an application
              </button>
            </div>
          </div>
        )}

        {progress.model && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Model Application</h2>
              {progress.model.status && (
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${
                    progress.model.status?.toLowerCase() === "accepted"
                      ? "bg-green-500/20 border-green-400 text-green-200"
                      : progress.model.status?.toLowerCase() === "rejected"
                      ? "bg-red-500/20 border-red-400 text-red-200"
                      : "bg-yellow-500/20 border-yellow-400 text-yellow-200"
                  }`}
                >
                  {progress.model.status}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 opacity-95">
              <p>ID: {progress.model.model_id}</p>
              <p>Current step: {progress.model.current_step}</p>
              {(progress.model as any).created_at && (
                <p>Created: {(progress.model as any).created_at}</p>
              )}
              {(progress.model as any).updated_at && (
                <p>Updated: {(progress.model as any).updated_at}</p>
              )}
              {adminModel?.first_name && (
                <p>
                  Name: {adminModel.first_name} {adminModel.last_name}
                </p>
              )}
              {adminModel?.username && <p>Username: {adminModel.username}</p>}
              {adminModel?.email && <p>Email: {adminModel.email}</p>}
              {adminModel?.nationality && (
                <p>Nationality: {adminModel.nationality}</p>
              )}
              {adminModel?.city && <p>City: {adminModel.city}</p>}
            </div>
            {(adminModel?.measurements || adminModel?.experience) && (
              <div className="mt-3">
                <h3 className="text-lg font-semibold mb-2">Physical Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {adminModel?.measurements?.height && (
                    <p>Height: {adminModel.measurements.height} cm</p>
                  )}
                  {adminModel?.measurements?.weight && (
                    <p>Weight: {adminModel.measurements.weight} kg</p>
                  )}
                  {adminModel?.measurements?.hips && (
                    <p>Hips: {adminModel.measurements.hips} cm</p>
                  )}
                  {adminModel?.measurements?.waist && (
                    <p>Waist: {adminModel.measurements.waist} cm</p>
                  )}
                  {adminModel?.measurements?.eye_color && (
                    <p>Eyes: {adminModel.measurements.eye_color}</p>
                  )}
                  {adminModel?.measurements?.hair_color && (
                    <p>Hair: {adminModel.measurements.hair_color}</p>
                  )}
                </div>
              </div>
            )}
            {(progress.model as any).review_notes && (
              <div className="mt-3 text-sm opacity-90">
                <span className="opacity-75">Notes:</span>{" "}
                {(progress.model as any).review_notes}
              </div>
            )}
            <div className="mt-4 mb-2 text-sm opacity-75">
              <p>
                💡 You can delete your application here if you no longer wish to
                continue.
              </p>
            </div>
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => router.push(`/${locale}/registration/model`)}
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
              >
                Continue
              </button>
              <button
                onClick={() =>
                  handleDelete("model", progress.model!.model_id.toString())
                }
                disabled={deleting === `model-${progress.model.model_id}`}
                className="px-4 py-2 rounded-lg border border-red-400 text-red-200 hover:bg-red-500/10 disabled:opacity-60 transition-colors"
              >
                {deleting === `model-${progress.model.model_id}`
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        )}

        {progress.hostess && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Hostess Application</h2>
              {progress.hostess.status && (
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${
                    progress.hostess.status?.toLowerCase() === "accepted"
                      ? "bg-green-500/20 border-green-400 text-green-200"
                      : progress.hostess.status?.toLowerCase() === "rejected"
                      ? "bg-red-500/20 border-red-400 text-red-200"
                      : "bg-yellow-500/20 border-yellow-400 text-yellow-200"
                  }`}
                >
                  {progress.hostess.status}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 opacity-95">
              <p>ID: {progress.hostess.hostess_id}</p>
              <p>Current step: {progress.hostess.current_step}</p>
              {(progress.hostess as any).created_at && (
                <p>Created: {(progress.hostess as any).created_at}</p>
              )}
              {(progress.hostess as any).updated_at && (
                <p>Updated: {(progress.hostess as any).updated_at}</p>
              )}
              {adminHostess?.first_name && (
                <p>
                  Name: {adminHostess.first_name} {adminHostess.last_name}
                </p>
              )}
              {adminHostess?.username && (
                <p>Username: {adminHostess.username}</p>
              )}
              {adminHostess?.email && <p>Email: {adminHostess.email}</p>}
              {adminHostess?.nationality && (
                <p>Nationality: {adminHostess.nationality}</p>
              )}
              {adminHostess?.city && <p>City: {adminHostess.city}</p>}
            </div>
            {(adminHostess?.experience || adminHostess?.measurements) && (
              <div className="mt-3">
                <h3 className="text-lg font-semibold mb-2">Physical Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {adminHostess?.experience?.height && (
                    <p>Height: {adminHostess.experience.height}</p>
                  )}
                  {adminHostess?.experience?.weight && (
                    <p>Weight: {adminHostess.experience.weight}</p>
                  )}
                  {adminHostess?.experience?.eye_color && (
                    <p>Eyes: {adminHostess.experience.eye_color}</p>
                  )}
                  {adminHostess?.experience?.hair_color && (
                    <p>Hair: {adminHostess.experience.hair_color}</p>
                  )}
                </div>
              </div>
            )}
            {(progress.hostess as any).review_notes && (
              <div className="mt-3 text-sm opacity-90">
                <span className="opacity-75">Notes:</span>{" "}
                {(progress.hostess as any).review_notes}
              </div>
            )}
            <div className="mt-4 mb-2 text-sm opacity-75">
              <p>
                💡 You can delete your application here if you no longer wish to
                continue.
              </p>
            </div>
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => router.push(`/${locale}/registration/hostess`)}
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
              >
                Continue
              </button>
              <button
                onClick={() =>
                  handleDelete(
                    "hostess",
                    progress.hostess!.hostess_id.toString()
                  )
                }
                disabled={deleting === `hostess-${progress.hostess.hostess_id}`}
                className="px-4 py-2 rounded-lg border border-red-400 text-red-200 hover:bg-red-500/10 disabled:opacity-60 transition-colors"
              >
                {deleting === `hostess-${progress.hostess.hostess_id}`
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
