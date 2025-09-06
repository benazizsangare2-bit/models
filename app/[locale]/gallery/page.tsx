"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Gallery({ locale }: { locale: string }) {
  const t = useTranslations();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { id: "all", name: t("gallery.categories.all") },
    { id: "models", name: t("gallery.categories.models") },
    { id: "hostesses", name: t("gallery.categories.hostesses") },
  ];

  const models = [
    {
      id: 1,
      name: "Sophia Rodriguez",
      codeName: "SOPHIA-001",
      category: "models",
      nationality: "Spanish",
      city: "New York",
      sex: "Female",
      shoeSize: "7",
      eyesColor: "Brown",
      hair: "Dark Brown",
      height: "5'8\"",
      image: "/Images/models/maria.jpeg",
    },
    {
      id: 2,
      name: "Emma Thompson",
      codeName: "EMMA-002",
      category: "models",
      nationality: "American",
      city: "Los Angeles",
      sex: "Female",
      shoeSize: "8",
      eyesColor: "Blue",
      hair: "Blonde",
      height: "5'9\"",
      image: "/Images/models/sofia.jpg",
    },
    {
      id: 3,
      name: "Isabella Chen",
      codeName: "ISABELLA-003",
      category: "hostesses",
      nationality: "Chinese",
      city: "Miami",
      sex: "Female",
      shoeSize: "6",
      eyesColor: "Dark Brown",
      hair: "Black",
      height: "5'6\"",
      image: "/Images/models/maria.jpeg",
    },
    {
      id: 4,
      name: "Ava Johnson",
      codeName: "AVA-004",
      category: "models",
      nationality: "American",
      city: "Paris",
      sex: "Female",
      shoeSize: "7.5",
      eyesColor: "Green",
      hair: "Red",
      height: "5'10\"",
      image: "/Images/models/sofia.jpg",
    },
    {
      id: 5,
      name: "Mia Williams",
      codeName: "MIA-005",
      category: "models",
      nationality: "British",
      city: "London",
      sex: "Female",
      shoeSize: "6.5",
      eyesColor: "Hazel",
      hair: "Light Brown",
      height: "5'7\"",
      image: "/Images/models/maria.jpeg",
    },
    {
      id: 6,
      name: "Chloe Davis",
      codeName: "CHLOE-006",
      category: "hostesses",
      nationality: "American",
      city: "New York",
      sex: "Female",
      shoeSize: "8",
      eyesColor: "Blue",
      hair: "Blonde",
      height: "5'8\"",
      image: "/Images/models/sofia.jpg",
    },
    {
      id: 7,
      name: "Lily Anderson",
      codeName: "LILY-007",
      category: "hostesses",
      nationality: "Canadian",
      city: "Los Angeles",
      sex: "Female",
      shoeSize: "7",
      eyesColor: "Brown",
      hair: "Dark Brown",
      height: "5'6\"",
      image: "/Images/models/maria.jpeg",
    },
    {
      id: 8,
      name: "Grace Martinez",
      codeName: "GRACE-008",
      category: "models",
      nationality: "Mexican",
      city: "Miami",
      sex: "Female",
      shoeSize: "6.5",
      eyesColor: "Dark Brown",
      hair: "Black",
      height: "5'9\"",
      image: "/Images/models/sofia.jpg",
    },
    {
      id: 9,
      name: "Zoe Brown",
      codeName: "ZOE-009",
      category: "models",
      nationality: "French",
      city: "Paris",
      sex: "Female",
      shoeSize: "7",
      eyesColor: "Blue",
      hair: "Blonde",
      height: "5'10\"",
      image: "/Images/models/maria.jpeg",
    },
    {
      id: 10,
      name: "Nora Wilson",
      codeName: "NORA-010",
      category: "hostesses",
      nationality: "British",
      city: "London",
      sex: "Female",
      shoeSize: "8",
      eyesColor: "Green",
      hair: "Red",
      height: "5'7\"",
      image: "/Images/models/sofia.jpg",
    },
    {
      id: 11,
      name: "Ruby Taylor",
      codeName: "RUBY-011",
      category: "hostesses",
      nationality: "American",
      city: "New York",
      sex: "Female",
      shoeSize: "7.5",
      eyesColor: "Hazel",
      hair: "Light Brown",
      height: "5'8\"",
      image: "/Images/models/maria.jpeg",
    },
    {
      id: 12,
      name: "Scarlett Garcia",
      codeName: "SCARLETT-012",
      category: "models",
      nationality: "Spanish",
      city: "Los Angeles",
      sex: "Female",
      shoeSize: "6",
      eyesColor: "Brown",
      hair: "Dark Brown",
      height: "5'9\"",
      image: "/Images/models/sofia.jpg",
    },
  ];

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
          {filteredModels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredModels.map((model) => (
                <div
                  key={model.id}
                  className="group relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div
                    className="relative h-96 w-full cursor-pointer"
                    onClick={() => openImageModal(model.image)}
                  >
                    <Image
                      src={model.image}
                      alt={model.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
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
              <div className="text-6xl mb-4 animate-bounce">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {t("gallery.noResults.title")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("gallery.noResults.description")}
              </p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-700 transition-all duration-200"
              >
                {t("gallery.noResults.clearFilters")}
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
            <Link
              href={`/${locale}/services`}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-rose-600 transition-all duration-200"
            >
              {t("gallery.cta.viewServices")}
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
