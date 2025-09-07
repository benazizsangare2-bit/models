"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type AdminUser = { id: string; name: string; email: string };

const DEFAULT_ADMINS: AdminUser[] = [
  { id: "1", name: "Site Owner", email: "owner@example.com" },
  { id: "2", name: "Moderator", email: "moderator@example.com" },
];

export default function AdminHomePage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);

  useEffect(() => {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem("admins") : null;
    if (raw) {
      try {
        setAdmins(JSON.parse(raw));
      } catch {
        setAdmins(DEFAULT_ADMINS);
      }
    } else {
      setAdmins(DEFAULT_ADMINS);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admins", JSON.stringify(admins));
    }
  }, [admins]);

  const gallery = useMemo(
    () => [
      "/Images/model1.jpeg",
      "/Images/model2.jpeg",
      "/Images/model3.jpeg",
      "/Images/model4.jpeg",
      "/Images/model5.jpg",
      "/Images/models/maria.jpeg",
      "/Images/models/sofia.jpg",
    ],
    []
  );

  const removeAdmin = (id: string) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-semibold mb-4">
          Registered Models & Hostesses
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {gallery.map((src, idx) => (
            <div
              key={idx}
              className="relative aspect-square overflow-hidden rounded-lg bg-gray-800"
            >
              <Image
                src={src}
                alt={`gallery-${idx}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Admins</h2>
        <div className="overflow-hidden rounded-lg border border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-900 text-gray-300">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2 w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.length === 0 ? (
                <tr>
                  <td className="px-4 py-3 text-gray-400" colSpan={3}>
                    No admins.
                  </td>
                </tr>
              ) : (
                admins.map((a) => (
                  <tr key={a.id} className="border-t border-gray-800">
                    <td className="px-4 py-3">{a.name}</td>
                    <td className="px-4 py-3 text-gray-300">{a.email}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => removeAdmin(a.id)}
                        className="inline-flex items-center rounded-md bg-rose-600 hover:bg-rose-700 px-3 py-1 text-white"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
