"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  FaUmbrellaBeach,
  FaBuilding,
  FaGlassCheers,
  FaCamera,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

export default function OrderService({ locale }: { locale: string }) {
  const t = useTranslations("Service");
  const services = [
    {
      title: t("title1"),
      description: t("description1"),
      icon: <FaUmbrellaBeach className="w-10 h-10" />,
    },
    {
      title: t("title2"),
      description: t("description2"),
      icon: <FaBuilding className="w-10 h-10" />,
    },
    {
      title: t("title3"),
      description: t("description3"),
      icon: <FaGlassCheers className="w-10 h-10" />,
    },
    {
      title: t("title4"),
      description: t("description4"),
      icon: <FaCamera className="w-10 h-10" />,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const titles = ["Models", "Events", "Promotion", "Hostesses"];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % titles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [titles.length]);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  // Function to scroll to the beginning
  const scrollToStart = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  // Function to scroll to the end
  const scrollToEnd = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 max-w-full">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Title Slide */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-20">
            <span className="text-5xl mb-8 font-semibold text-gray-800 font-delius">
              {t("title")}
            </span>
            <div className="relative h-24 w-[250px] text-black mb-8 flex items-center justify-center">
              {titles.map((title, index) => (
                <h1
                  key={index}
                  className={`absolute text-5xl sm:text-6xl lg:text-7xl font-bold transition-opacity duration-1000 font-delius ${
                    index === currentSlide
                      ? "opacity-100 transform scale-105"
                      : "opacity-0 transform scale-95"
                  }`}
                  style={{
                    color:
                      index === 0
                        ? "#fb7185"
                        : index === 1
                        ? "#db2777"
                        : index === 2
                        ? "#920B4C"
                        : index === 3
                        ? "#E9328B"
                        : "#000",
                  }}
                >
                  {title}
                </h1>
              ))}
            </div>
          </div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-delius">
            {t("description")}
          </p>
        </div>

        {/* Single-row horizontal list with scroll if needed */}
        <div className="relative mb-20">
          {/* Left arrow */}
          <button
            onClick={scrollToStart}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300 opacity-80 hover:opacity-100"
            aria-label="Scroll to beginning"
          >
            <FaArrowLeft className="w-6 h-6 text-rose-600" />
          </button>

          {/* Right arrow */}
          <button
            onClick={scrollToEnd}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300 opacity-80 hover:opacity-100"
            aria-label="Scroll to end"
          >
            <FaArrowRight className="w-6 h-6 text-rose-600" />
          </button>

          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-20"></div>
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-20"></div>

          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex flex-row flex-nowrap gap-10 pt-10 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory scroll-smooth"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="relative shrink-0 snap-start w-[20rem] md:w-[32rem] h-[30rem] rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Gradient background with circles */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-300">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-rose-300 rounded-full -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-400 rounded-full translate-x-20 translate-y-20"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 font-delius">
                  <div className="w-15 h-15 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-8 group-hover:from-rose-600 group-hover:to-pink-700 transition-all duration-300">
                    <div className="text-white text-sm">{service.icon}</div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-8 leading-relaxed text-xl">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Single Order Service Button at Bottom */}
        <div className="text-center font-delius">
          <Link
            href={`/${locale}/contact`}
            className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-12 py-5 rounded-full font-semibold text-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-400 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 inline-flex items-center"
          >
            {t("button")}
            <FaArrowRight className="ml-3 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
