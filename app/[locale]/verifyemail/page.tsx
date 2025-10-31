"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Footer from "@/app/components/footer";

export default function VerifyEmail({ locale = "en" }: { locale: string }) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(
        //   "https://modelshostesses.com/api/register/verify",
        "https://modelshostesses.com/api/register/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: otp }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || t("signup.messages.invalidOtp"));
        return;
      }

      alert(t("signup.messages.emailVerified"));
      window.location.href = `/${locale}/completesignup?email=${email}`;
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
        <div className="max-w-2xl w-full p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-purple-300 mb-6">
            {t("signup.verifyTitle")}
          </h2>
          <p className="text-pink-300 text-center mb-6">
            {t("signup.messages.emailSent", { email })}
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <input
              type="text"
              name="otp"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder={t("signup.form.otpPlaceholder")}
              className="w-full border text-white border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-rose-400 to-pink-600 text-white py-3 rounded-lg hover:from-rose-600 hover:to-pink-700 disabled:opacity-50"
            >
              {isSubmitting
                ? t("signup.form.verifying")
                : t("signup.form.verify")}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
