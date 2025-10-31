"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Footer from "@/app/components/footer";

export default function AdminLogin() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("login");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        "https://modelshostesses.com/api/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Admin login failed");
      }

      // Store admin token and data
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminData", JSON.stringify(data.admin));

      // Redirect to admin dashboard
      router.push(`/${locale}/admin`);
    } catch (err: any) {
      console.error("Admin login error:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900">
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-5xl font-bold text-white font-delius">
              <span className="font-dancing text-6xl text-rose-300">
                {t("title1")}
              </span>
              <span className="font-dancing text-6xl text-gray-400"> & </span>
              <span className="font-dancing text-6xl text-pink-600">
                {t("title2")}
              </span>
            </h2>
            <p className="mt-2 text-lg text-white font-garamond">
              Admin Portal
            </p>
          </div>

          <div className="py-8 px-6 rounded-2xl font-delius">
            {error && (
              <div className="mb-6 bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full text-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-transparent"
                  placeholder="Enter admin username"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full text-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-transparent"
                  placeholder="Enter admin password"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-rose-400 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-rose-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Admin Sign In"}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-200">
                  Back to main site?{" "}
                  <Link
                    href={`/${locale}`}
                    className="font-medium text-rose-300 hover:text-rose-500"
                  >
                    Click here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
