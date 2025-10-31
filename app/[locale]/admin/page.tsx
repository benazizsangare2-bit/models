"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import ModelsManagement from "./components/ModelsManagement";
import HostessesManagement from "./components/HostessesManagement";
import { adminLogout } from "./utils/adminLogout";

export default function AdminPage() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<"models" | "hostesses">("models");
  const [isLoading, setIsLoading] = useState(false);

  // Create a wrapper function that uses the current locale
  const handleLogout = () => {
    adminLogout(locale);
  };

  const tabs = [
    { id: "models", label: "Models", count: 0 },
    { id: "hostesses", label: "Hostesses", count: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
            <p className="mt-2 text-gray-600">
              Manage models and hostesses registrations
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "models" | "hostesses")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
          </div>
        ) : (
          <>
            {activeTab === "models" && <ModelsManagement />}
            {activeTab === "hostesses" && <HostessesManagement />}
          </>
        )}
      </div>
    </div>
  );
}
