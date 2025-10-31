"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Gallery({ locale }: { locale: string }) {
  const t = useTranslations();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: "all", name: t("gallery.categories.all") },
    { id: "models", name: t("gallery.categories.models") },
    { id: "hostesses", name: t("gallery.categories.hostesses") },
  ];

  // Helper function to clean and construct image URLs
  const getImageUrl = (photoPath: string | null | undefined): string => {
    console.log("🔍 getImageUrl received:", photoPath);

    if (!photoPath) {
      console.log("❌ No photo path provided, using default");
      return "/Images/models/default.jpg";
    }

    // If it's already a full URL, return as is
    if (photoPath.startsWith("http")) {
      return photoPath;
    }

    // Clean the path - remove any curly braces that might be left
    let cleanPath = photoPath.replace(/[{}"]/g, "").trim();

    if (!cleanPath) {
      console.log("❌ Clean path is empty, using default");
      return "/Images/models/default.jpg";
    }

    // Remove leading slash if present (to avoid double slashes)
    cleanPath = cleanPath.startsWith("/") ? cleanPath.slice(1) : cleanPath;

    const finalUrl = `https://modelshostesses.com/api/${cleanPath}`;
    console.log("✅ Final image URL:", finalUrl);

    return finalUrl;
  };
  // Simple fetch function
  const fetchApprovedProfiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const baseUrl = "https://modelshostesses.com/api";

      // Fetch both models and hostesses
      const [modelsResponse, hostessesResponse] = await Promise.all([
        fetch(`${baseUrl}/api/models/approved`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }),
        fetch(`${baseUrl}/api/hostesses/approved`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }),
      ]);

      let allProfiles: any[] = [];

      // Process models
      if (modelsResponse.ok) {
        const data = await modelsResponse.json();
        console.log("Models API Response:", data);

        const modelsArray = Array.isArray(data)
          ? data
          : data.models || data.data || [];
        console.log("Models array:", modelsArray);

        if (modelsArray.length > 0) {
          const mappedModels = modelsArray.map((model: any) => {
            console.log("🔍 Model data:", {
              id: model.id,
              directPhoto: model.photo,
              measurementsPhotos: model.measurements?.photo,
              fullModel: model,
            });

            // Get the first photo - either from direct photo field or measurements array
            let firstPhoto = model.photo; // This now contains the first photo

            // If direct photo is empty, try to get from measurements array
            if (
              !firstPhoto &&
              model.measurements?.photo &&
              Array.isArray(model.measurements.photo)
            ) {
              firstPhoto = model.measurements.photo[0];
            }

            const imageUrl = getImageUrl(firstPhoto);
            console.log("📸 Final image URL:", imageUrl);

            return {
              id: model.id,
              name: `${model.first_name} ${model.last_name}`,
              codeName:
                model.username ||
                `${model.first_name?.toUpperCase()}-${model.id}`,
              category: "models",
              nationality: model.nationality || "N/A",
              city: model.city || "N/A",
              sex: model.gender || "N/A",
              eyesColor: model.measurements?.eye_color || "N/A",
              hair: model.measurements?.hair_color || "N/A",
              height: model.measurements?.height || "N/A",
              image: imageUrl,
              allPhotos: model.measurements?.photo || [], // All photos from measurements
            };
          });
          allProfiles = [...allProfiles, ...mappedModels];
        }
      } else {
        console.warn("Models API failed:", modelsResponse.status);
      }

      // Process hostesses
      if (hostessesResponse.ok) {
        const data = await hostessesResponse.json();
        console.log("Hostesses API Response:", data);

        const hostessesArray = Array.isArray(data)
          ? data
          : data.hostesses || data.data || [];
        console.log("Hostesses array:", hostessesArray);

        if (hostessesArray.length > 0) {
          const mappedHostesses = hostessesArray.map((hostess: any) => {
            console.log("🔍 hostess data:", {
              id: hostess.id,
              directPhoto: hostess.photo,
              experiencePhotos: hostess.experience?.photo,
              fullModel: hostess,
            });

            // Get the first photo - either from direct photo field or experience array
            let firstPhoto = hostess.photo; // This now contains the first photo

            // If direct photo is empty, try to get from experience array
            if (
              !firstPhoto &&
              hostess.experience?.photo &&
              Array.isArray(hostess.experience.photo)
            ) {
              firstPhoto = hostess.experience.photo[0];
            }

            const imageUrl = getImageUrl(firstPhoto);
            console.log("📸 Final image URL:", imageUrl);
            return {
              id: hostess.id,
              name: `${hostess.first_name} ${hostess.last_name}`,
              codeName:
                hostess.username ||
                `${hostess.first_name?.toUpperCase()}-${hostess.id}`,
              category: "hostesses",
              nationality: hostess.nationality || "N/A",
              city: hostess.city || "N/A",
              sex: hostess.gender || "N/A",
              eyesColor: hostess.experience?.eye_color || "N/A",
              hair: hostess.experience?.hair_color || "N/A",
              height: hostess.experience?.height || "N/A",
              image: imageUrl,
              allPhotos: hostess.experience?.photo || [],
            };
          });
          allProfiles = [...allProfiles, ...mappedHostesses];
        }
      } else {
        console.warn("Hostesses API failed:", hostessesResponse.status);
      }

      console.log("Final profiles:", allProfiles);
      setModels(allProfiles);

      // Handle authentication errors
      if (allProfiles.length === 0) {
        if (modelsResponse.status === 401 || hostessesResponse.status === 401) {
          throw new Error(
            "Authentication required. Please log in to view profiles."
          );
        }
      }
    } catch (err: any) {
      console.error("Error fetching approved profiles:", err);
      setError(
        err.message || "Failed to load profiles. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedProfiles();
  }, []);

  const filteredModels = models.filter((model) => {
    return selectedCategory === "all" || model.category === selectedCategory;
  });

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen pt-20 font-delius">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {t("gallery.title1")}{" "}
            <span className="text-rose-600">{t("gallery.title2")}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("gallery.subtitle")}
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="text-sm font-medium text-gray-700">
                {t("gallery.filters.category")}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600">
              {filteredModels.length}{" "}
              {filteredModels.length === 1
                ? t("gallery.filters.result")
                : t("gallery.filters.results")}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-500 mx-auto mb-4"></div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Loading Profiles...
              </h3>
              <p className="text-gray-600">
                Please wait while we fetch the latest approved models and
                hostesses.
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Error Loading Profiles
              </h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={fetchApprovedProfiles}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-700 transition-all duration-200"
                >
                  Try Again
                </button>
                {error.includes("Authentication required") && (
                  <Link
                    href={`/${locale}/login`}
                    className="bg-transparent border-2 border-rose-500 text-rose-500 px-6 py-3 rounded-lg font-medium hover:bg-rose-500 hover:text-white transition-all duration-200"
                  >
                    Log In
                  </Link>
                )}
              </div>
            </div>
          ) : filteredModels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredModels.map((model) => (
                <div
                  key={model.id}
                  className="group relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div
                    className="relative h-96 w-full cursor-pointer bg-gray-200"
                    onClick={() => openImageModal(model.image)}
                  >
                    {/* Use regular img tag for testing */}
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        console.error("❌ Image failed to load:", model.image);
                        e.currentTarget.src = "/Images/models/default.jpg";
                      }}
                      onLoad={() => {
                        console.log(
                          "✅ Image loaded successfully:",
                          model.image
                        );
                      }}
                    />
                    {/* Readability overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    {/* Category badge */}
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium shadow-md 
                        ${
                          model.category === "models"
                            ? "bg-blue-600 text-white"
                            : "bg-pink-600 text-white"
                        }
                      `}
                    >
                      {model.category === "models"
                        ? t("gallery.categories.models")
                        : t("gallery.categories.hostesses")}
                    </span>
                  </div>

                  {/* Thumbnails (show additional photos if available) */}
                  {Array.isArray(model.allPhotos) &&
                    model.allPhotos.length > 1 && (
                      <div className="px-4 pb-4 pt-3 bg-white/70">
                        <div className="grid grid-cols-5 gap-2">
                          {model.allPhotos
                            .slice(0, 5)
                            .map((thumbPath: string, idx: number) => {
                              const thumbUrl = getImageUrl(thumbPath);
                              return (
                                <button
                                  key={`${model.id}-thumb-${idx}`}
                                  onClick={() => openImageModal(thumbUrl)}
                                  className="relative w-full aspect-square overflow-hidden rounded-md border border-gray-200 hover:ring-2 hover:ring-rose-400"
                                  aria-label={`View photo ${idx + 1} of ${
                                    model.name
                                  }`}
                                >
                                  <img
                                    src={thumbUrl}
                                    alt={`${model.name} thumbnail ${idx + 1}`}
                                    className="object-cover w-full h-full"
                                    onError={(e) => {
                                      e.currentTarget.src =
                                        "/Images/models/default.jpg";
                                    }}
                                  />
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    )}

                  {/* Info */}
                  <div className="w-full p-5 text-gray-900">
                    <h3 className="text-lg font-semibold mb-1">{model.name}</h3>
                    <p className="text-sm text-rose-600 mb-3">
                      {model.codeName}
                    </p>

                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <p>
                        <span className="text-gray-600">
                          {t("gallery.modelCard.nationality")}
                        </span>{" "}
                        {model.nationality}
                      </p>
                      <p>
                        <span className="text-gray-600">
                          {t("gallery.modelCard.city")}
                        </span>{" "}
                        {model.city}
                      </p>
                      <p>
                        <span className="text-gray-600">
                          {t("gallery.modelCard.sex")}
                        </span>{" "}
                        {model.sex}
                      </p>
                      <p>
                        <span className="text-gray-600">
                          {t("gallery.modelCard.height")}
                        </span>{" "}
                        {model.height}
                      </p>
                      <p>
                        <span className="text-gray-600">
                          {t("gallery.modelCard.eyes")}
                        </span>{" "}
                        {model.eyesColor}
                      </p>
                      <p>
                        <span className="text-gray-600">
                          {t("gallery.modelCard.hair")}
                        </span>{" "}
                        {model.hair}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No Approved Profiles Yet
              </h3>
              <p className="text-gray-600 mb-6">
                We're currently reviewing applications. Check back soon to see
                our approved models and hostesses!
              </p>
              <button
                onClick={fetchApprovedProfiles}
                className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-700 transition-all duration-200"
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-400 to-pink-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t("gallery.cta.title")}
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            {t("gallery.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="bg-white text-rose-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {t("gallery.cta.contactUs")}
            </Link>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Enlarged model image"
              fill
              className="object-contain"
              sizes="90vw"
            />
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
