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

  // Fetch approved models and hostesses from API
  useEffect(() => {
    const fetchApprovedProfiles = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const baseUrl = "https://modelshostesses.com/api";

        // Fetch both models and hostesses in parallel
        const [modelsResponse, hostessesResponse] = await Promise.allSettled([
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

        // Process models response
        console.log("Models response status:", modelsResponse.status);
        if (modelsResponse.status === "fulfilled") {
          console.log("Models response ok:", modelsResponse.value.ok);
          console.log(
            "Models response status code:",
            modelsResponse.value.status
          );
        }

        if (modelsResponse.status === "fulfilled" && modelsResponse.value.ok) {
          const modelsData = await modelsResponse.value.json();
          console.log("Models API Response:", modelsData);
          console.log("Models data is array:", Array.isArray(modelsData));

          // Handle different response formats
          let modelsArray = [];
          if (Array.isArray(modelsData)) {
            modelsArray = modelsData;
          } else if (modelsData && Array.isArray(modelsData.data)) {
            modelsArray = modelsData.data;
          } else if (modelsData && Array.isArray(modelsData.models)) {
            modelsArray = modelsData.models;
          } else if (
            modelsData &&
            modelsData.results &&
            Array.isArray(modelsData.results)
          ) {
            modelsArray = modelsData.results;
          } else {
            console.error("Models data is not in expected format:", modelsData);
            console.log(
              "Available keys in models data:",
              Object.keys(modelsData || {})
            );
          }

          console.log("Models array length:", modelsArray.length);

          if (modelsArray.length > 0) {
            const mappedModels = modelsArray.map((model: any) => {
              const imageUrl = model.photo
                ? model.photo.startsWith("http")
                  ? model.photo
                  : `https://modelshostesses.com/api${
                      model.photo.startsWith("/") ? "" : "/"
                    }${model.photo}`
                : "/Images/models/default.jpg";

              console.log(`Model ${model.id} photo:`, model.photo);
              console.log(`Model ${model.id} imageUrl:`, imageUrl);

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
                shoeSize: model.shoe_size || "N/A",
                eyesColor: model.eye_color || "N/A",
                hair: model.hair_color || "N/A",
                height: model.height || "N/A",
                image: imageUrl,
              };
            });
            console.log("Mapped models:", mappedModels);
            allProfiles = [...allProfiles, ...mappedModels];
            console.log("allProfiles after models:", allProfiles);
          }
        } else if (modelsResponse.status === "fulfilled") {
          console.warn("Models API failed:", modelsResponse.value.status);
        } else {
          console.error("Models API rejected:", modelsResponse.reason);
        }

        // Process hostesses response
        console.log("Hostesses response status:", hostessesResponse.status);
        if (hostessesResponse.status === "fulfilled") {
          console.log("Hostesses response ok:", hostessesResponse.value.ok);
          console.log(
            "Hostesses response status code:",
            hostessesResponse.value.status
          );
        }

        if (
          hostessesResponse.status === "fulfilled" &&
          hostessesResponse.value.ok
        ) {
          const hostessesData = await hostessesResponse.value.json();
          console.log("Hostesses API Response:", hostessesData);

          // Handle different response formats
          let hostessesArray = [];
          if (Array.isArray(hostessesData)) {
            hostessesArray = hostessesData;
          } else if (hostessesData && Array.isArray(hostessesData.data)) {
            hostessesArray = hostessesData.data;
          } else if (hostessesData && Array.isArray(hostessesData.hostesses)) {
            hostessesArray = hostessesData.hostesses;
          } else if (
            hostessesData &&
            hostessesData.results &&
            Array.isArray(hostessesData.results)
          ) {
            hostessesArray = hostessesData.results;
          } else {
            console.error(
              "Hostesses data is not in expected format:",
              hostessesData
            );
            console.log(
              "Available keys in hostesses data:",
              Object.keys(hostessesData || {})
            );
          }

          console.log("Hostesses array length:", hostessesArray.length);

          if (hostessesArray.length > 0) {
            const mappedHostesses = hostessesArray.map((hostess: any) => ({
              id: hostess.id,
              name: `${hostess.first_name} ${hostess.last_name}`,
              codeName:
                hostess.username ||
                `${hostess.first_name?.toUpperCase()}-${hostess.id}`,
              category: "hostesses",
              nationality: hostess.nationality || "N/A",
              city: hostess.city || "N/A",
              sex: hostess.gender || "N/A",
              shoeSize: hostess.shoe_size || "N/A",
              eyesColor: hostess.eye_color || "N/A",
              hair: hostess.hair_color || "N/A",
              height: hostess.height || "N/A",
              image: hostess.photo
                ? hostess.photo.startsWith("http")
                  ? hostess.photo
                  : `https://modelshostesses.com/api${
                      hostess.photo.startsWith("/") ? "" : "/"
                    }${hostess.photo}`
                : "/Images/models/default.jpg",
            }));
            console.log("Mapped hostesses:", mappedHostesses);
            allProfiles = [...allProfiles, ...mappedHostesses];
            console.log("allProfiles after hostesses:", allProfiles);
          }
        } else if (hostessesResponse.status === "fulfilled") {
          console.warn("Hostesses API failed:", hostessesResponse.value.status);
        } else {
          console.warn("Hostesses API rejected:", hostessesResponse.reason);
        }

        // Debug: Log the final profiles array
        console.log("Final allProfiles array:", allProfiles);
        console.log("allProfiles length:", allProfiles.length);

        // Check if we have any profiles
        if (allProfiles.length === 0) {
          // Check if both APIs failed with auth errors
          const modelsAuthError =
            modelsResponse.status === "fulfilled" &&
            modelsResponse.value.status === 401;
          const hostessesAuthError =
            hostessesResponse.status === "fulfilled" &&
            hostessesResponse.value.status === 401;

          if (modelsAuthError || hostessesAuthError) {
            throw new Error(
              "Authentication required. Please log in to view profiles."
            );
          } else {
            // Check if both APIs failed completely
            const modelsFailed =
              modelsResponse.status === "rejected" ||
              (modelsResponse.status === "fulfilled" &&
                !modelsResponse.value.ok);
            const hostessesFailed =
              hostessesResponse.status === "rejected" ||
              (hostessesResponse.status === "fulfilled" &&
                !hostessesResponse.value.ok);

            if (modelsFailed && hostessesFailed) {
              throw new Error(
                "Unable to connect to the server. Please check your internet connection and try again."
              );
            } else {
              // This is not an error - just no approved profiles yet
              console.log("No approved profiles found - this is normal");
              setModels([]);
              return; // Exit early without setting error
            }
          }
        }

        console.log("Setting models with", allProfiles.length, "profiles");
        setModels(allProfiles);
      } catch (err: any) {
        console.error("Error fetching approved profiles:", err);
        setError(
          err.message || "Failed to load profiles. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

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
      <section className="bg-gradient-to-br from-rose-50 to-pink-50 py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
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
            {/* Category Filter */}
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

            {/* Results Count */}
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
                  onClick={() => window.location.reload()}
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
                    <Image
                      src={model.image}
                      alt={model.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      onError={(e) => {
                        console.error(
                          `Failed to load image for ${model.name}:`,
                          model.image
                        );
                        // Hide the image and show fallback
                        e.currentTarget.style.display = "none";
                        const fallback = document.getElementById(
                          `fallback-${model.id}`
                        );
                        if (fallback) {
                          fallback.style.opacity = "1";
                        }
                      }}
                      onLoad={() => {
                        console.log(
                          `Successfully loaded image for ${model.name}:`,
                          model.image
                        );
                      }}
                    />
                    {/* Fallback content if image fails - hidden by default */}
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500 opacity-0 transition-opacity duration-300"
                      id={`fallback-${model.id}`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2">📷</div>
                        <div className="text-sm">No Image Available</div>
                      </div>
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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

                  {/* Info */}
                  <div className="absolute bottom-0 w-full p-5 text-white">
                    <h3 className="text-lg font-semibold mb-1">{model.name}</h3>
                    <p className="text-sm text-gray-200 mb-3">
                      {model.codeName}
                    </p>

                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <p>
                        <span className="text-gray-300">
                          {t("gallery.modelCard.nationality")}
                        </span>{" "}
                        {model.nationality}
                      </p>
                      <p>
                        <span className="text-gray-300">
                          {t("gallery.modelCard.city")}
                        </span>{" "}
                        {model.city}
                      </p>
                      <p>
                        <span className="text-gray-300">
                          {t("gallery.modelCard.sex")}
                        </span>{" "}
                        {model.sex}
                      </p>
                      <p>
                        <span className="text-gray-300">
                          {t("gallery.modelCard.height")}
                        </span>{" "}
                        {model.height}
                      </p>
                      <p>
                        <span className="text-gray-300">
                          {t("gallery.modelCard.shoeSize")}
                        </span>{" "}
                        {model.shoeSize}
                      </p>
                      <p>
                        <span className="text-gray-300">
                          {t("gallery.modelCard.eyes")}
                        </span>{" "}
                        {model.eyesColor}
                      </p>
                      <p>
                        <span className="text-gray-300">
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-700 transition-all duration-200"
                >
                  Refresh
                </button>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="bg-transparent border-2 border-rose-500 text-rose-500 px-6 py-3 rounded-lg font-medium hover:bg-rose-500 hover:text-white transition-all duration-200"
                >
                  Show All Categories
                </button>
              </div>
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
