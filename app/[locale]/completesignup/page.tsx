"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Footer from "@/app/components/footer";

export default function CompleteRegistration({
  locale = "en",
}: {
  locale: string;
}) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    phone_number: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(
        //  "https://modelshostesses.com/api/register/complete",
        "https://modelshostesses.com/api/register/complete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, email }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || t("signup.messages.registrationFailed"));
        return;
      }

      alert(t("signup.messages.registrationCompleted"));
      window.location.href = `/${locale}/login`;
    } catch (err) {
      console.error("Error:", err);
      setError(t("signup.messages.networkError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900">
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-300 text-center mb-6">
            {t("signup.completeTitle")}
          </h2>
          <p className="text-pink-300 text-center mb-6">
            {t("signup.messages.completeRegistration", { email })}
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder={t("signup.form.fullname")}
              className="w-full border text-white border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t("signup.form.username")}
              className="w-full border text-white border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder={t("signup.form.phone")}
              className="w-full border text-white border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t("signup.form.password")}
              className="w-full border text-white border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-rose-400 to-pink-600 text-white py-3 rounded-lg hover:from-rose-600 hover:to-pink-700 disabled:opacity-50"
            >
              {isSubmitting
                ? t("signup.form.submitting")
                : t("signup.form.submit")}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
