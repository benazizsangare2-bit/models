"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AccountPage() {
  const locale = useLocale();
  const t = useTranslations("Account");
  const [user, setUser] = useState<{
    id: number;
    email: string;
    username: string;
    fullname: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/${locale}/login`);
      return;
    }

    fetch("https://modelshostesses.com/api/api/account", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data.user);
      })
      .catch(() => {
        setError("Session expired, please log in again.");
        localStorage.removeItem("token");
        router.push(`/${locale}/login`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router, locale]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      scale: 1.02,
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Session Expired
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href={`/${locale}/login`}
            className="inline-flex items-center bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium"
          >
            Return to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 py-25 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg"
          >
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t("Welcome")}, {user?.username || "User"} 👋
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your account settings, applications, and preferences all in
            one place.
          </p>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Profile Information
            </h2>
            <div
              className="w-3 h-3 bg-green-400 rounded-full animate-pulse"
              title="Online"
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: t("id"), value: user?.id || "N/A", icon: "🔢" },
              { label: t("email"), value: user?.email || "N/A", icon: "📧" },
              {
                label: t("username"),
                value: user?.username || "N/A",
                icon: "👤",
              },
              {
                label: t("fullname"),
                value: user?.fullname || "N/A",
                icon: "👨‍💼",
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {item.label}
                  </p>
                  <p className="text-gray-900 font-semibold">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                href: `/${locale}/account/edit`,
                title: t("editAccount"),
                description: "Update your profile information",
                gradient: "from-rose-400 to-rose-600",
                icon: "✏️",
              },
              {
                href: `/${locale}/applications/view`,
                title: t("viewApplications"),
                description: "View all applications",
                gradient: "from-purple-400 to-purple-600",
                icon: "👀",
              },
            ].map((action, index) => (
              <motion.div
                key={action.title}
                variants={cardHoverVariants}
                whileHover="hover"
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="relative group"
              >
                <Link href={action.href}>
                  <div
                    className={`bg-gradient-to-r ${action.gradient} text-white rounded-2xl p-6 h-full shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden relative`}
                  >
                    <div className="absolute top-4 right-4 text-2xl opacity-80">
                      {action.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 relative z-10">
                      {action.title}
                    </h3>
                    <p className="text-white/90 text-sm relative z-10">
                      {action.description}
                    </p>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Get Started CTA */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t("getStarted")}
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Ready to take the next step? Explore our services and get started
              today.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/${locale}/choose`}
                className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span>{t("getStartedButton")}</span>
                <motion.svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Logout Section */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <button
            onClick={() => {
              // Create custom alert dialog
              const alertBox = document.createElement("div");
              alertBox.className =
                "fixed inset-0 bg-pink-100 flex items-center justify-center z-50";
              alertBox.innerHTML = `
      <div class="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-xl transform transition-all">
        <div class="text-center">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">${t(
            "logoutConfirm"
          )}</h3>
          <p class="text-gray-600 mb-6">${t("logoutConfirmMessage")}</p>
          <div class="flex space-x-3">
            <button id="cancelLogout" class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
              ${t("No")}
            </button>
            <button id="confirmLogout" class="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200">
              ${t("Yes")}
            </button>
          </div>
        </div>
      </div>
    `;

              document.body.appendChild(alertBox);

              // Add event listeners with null checks
              const cancelButton = document.getElementById("cancelLogout");
              const confirmButton = document.getElementById("confirmLogout");

              if (cancelButton) {
                cancelButton.onclick = () => {
                  if (document.body.contains(alertBox)) {
                    document.body.removeChild(alertBox);
                  }
                };
              }

              if (confirmButton) {
                confirmButton.onclick = () => {
                  localStorage.removeItem("token");
                  if (document.body.contains(alertBox)) {
                    document.body.removeChild(alertBox);
                  }
                  router.push(`/${locale}/login`);
                };
              }

              // Close on backdrop click
              alertBox.onclick = (e) => {
                if (e.target === alertBox && document.body.contains(alertBox)) {
                  document.body.removeChild(alertBox);
                }
              };
            }}
            className="inline-flex items-center space-x-2 bg-gray-800 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <span>{t("Logout")}</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
