"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "../../components/footer";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function Login() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://192.168.137.223:6060/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      router.push(`/${locale}/account`);
    } catch (err: any) {
      alert(err.message);
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
              {t("subtitle")}
            </p>
          </div>

          <div className="py-8 px-6 rounded-2xl font-delius">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-2"
                >
                  {t("form.email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-transparent"
                  placeholder={t("form.emailPlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white mb-2"
                >
                  {t("form.password")}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full text-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-transparent"
                  placeholder={t("form.passwordPlaceholder")}
                />
              </div>

              <div className="text-sm text-right">
                <Link
                  href="/forgot-password"
                  className="font-medium text-rose-300 hover:text-rose-500"
                >
                  {t("form.forgot")}
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-rose-400 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-rose-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? t("form.loginin") : t("form.signin")}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-200">
                  {t("form.noAccount")}{" "}
                  <Link
                    href={`/${locale}/signup`}
                    className="font-medium text-rose-300 hover:text-rose-500"
                  >
                    {t("form.signInHere")}
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
