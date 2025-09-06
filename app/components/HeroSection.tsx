// components/HeroSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("homepage.hero");

  const slides = [
    "/Images/model1.jpeg",
    "/Images/model2.jpeg",
    "/Images/model3.jpeg",
    "/Images/model4.jpeg",
    "/Images/model5.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden bg-gray-50">
      {/* Slideshow */}
      <div className="relative w-full lg:w-1/2 h-[500px] lg:h-screen flex items-center justify-center p-6 lg:p-12 lg:pt-35">
        <div className="relative w-full max-w-md lg:max-w-2xl h-[450px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>

          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide}
                alt={`Model ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="text-center lg:text-left max-w-2xl pt-15 font-delius">
          <h1 className="text-4xl font-dancing sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
            <span className=" text-5xl md:text-6xl lg:text-7xl font-bold text-violet-400 drop-shadow-lg">
              {t("title1")}
            </span>
            <span className="font-dancing text-gray-800 text-6xl"> & </span>
            <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-pink-600 drop-shadow-lg">
              {t("title2")}
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-900">
            {t("subtitle1")}
          </p>
          <p className="text-xl sm:text-2xl mb-8 text-gray-900">
            {t("subtitle2")}
          </p>
          <div className="flex font-garamond gap-4 justify-center lg:justify-start">
            <Link
              href={`/${locale}/login`}
              className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-xl"
            >
              {t("login")}
            </Link>
            <Link
              href={`/${locale}/signup`}
              className="border-2 border-rose-500 text-rose-500 px-8 py-4 rounded-lg font-semibold text-xl"
            >
              {t("signup")}
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-lg text-gray-700 mb-4">{t("getStarted")}</p>
            <Link
              href="/model-registration"
              className="inline-flex items-center border border-pink-500 text-pink px-8 py-4 rounded-lg font-medium text-xl hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 hover:text-white transition-all duration-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>{t("getStartedButton")}</span>
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 -z-10"></div>
    </section>
  );
}
