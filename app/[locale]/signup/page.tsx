"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Footer from "@/app/components/footer";

export default function SignUp({ locale = "en" }: { locale: string }) {
  const t = useTranslations();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        "https://modelshostesses.com/api/register/start",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to send OTP");
        return;
      }

      alert("OTP sent to your email!");
      window.location.href = `/${locale}/verifyemail?email=${formData.email}`;
    } catch (err) {
      console.error("Error:", err);
      alert("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900">
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-white font-delius">
              {t("signup.welcome")}
            </h2>
            <h2 className="text-5xl font-bold text-white font-delius">
              <span className="font-dancing text-6xl text-rose-300">
                {" "}
                {t("signup.title1")}
              </span>
              <span className="font-dancing text-6xl text-gray-400"> & </span>
              <span className="font-dancing text-6xl text-pink-600">
                {" "}
                {t("signup.title2")}
              </span>
            </h2>
            <p className="mt-10 text-xl text-white font-delius">
              {t("signup.subtitle")}
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                {t("signup.form.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border text-white border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder={t("signup.form.emailPlaceholder")}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-rose-400 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-rose-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? t("signup.form.creatingAccount")
                : t("signup.form.createAccount")}
            </button>

            <div className="text-center">
              <p className="text-sm text-white font-delius">
                {t("signup.form.alreadyHaveAccount")}{" "}
                <Link
                  href={`/${locale}/login`}
                  className="font-medium text-rose-300 hover:text-rose-300"
                >
                  {t("signup.form.signInHere")}
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
