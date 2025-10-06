// components/HeroSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import BackgroundPatterns from "./BackgroundPatterns";

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
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden">
      {/* Slideshow */}
      <BackgroundPatterns />
      <div className="relative w-full lg:w-1/2 h-[500px] lg:h-screen flex items-center justify-center p-6 lg:p-12 lg:pt-35">
        <div className="relative w-full max-w-md lg:max-w-2xl h-[450px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>

          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              initial={{ scale: 1.01, opacity: 0 }}
              animate={{
                scale: index === currentSlide ? 1 : 1.05,
                opacity: index === currentSlide ? 1 : 0,
              }}
              transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={slide}
                alt={`Model ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
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
        <motion.div
          className="text-center lg:text-left max-w-2xl pt-15 font-delius"
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-dancing sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
          >
            <span className=" text-5xl md:text-6xl lg:text-7xl font-bold text-violet-400 drop-shadow-lg">
              {t("title1")}
            </span>
            <span className="font-dancing text-gray-800 text-6xl"> & </span>
            <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-pink-600 drop-shadow-lg">
              {t("title2")}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl sm:text-2xl mb-8 text-gray-900"
          >
            {t("subtitle1")}
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="text-xl sm:text-2xl mb-8 text-gray-900"
          >
            {t("subtitle2")}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex font-garamond gap-4 justify-center lg:justify-start"
          >
            <Link
              href={`/${locale}/login`}
              className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-xl hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
            >
              {t("login")}
            </Link>
            <Link
              href={`/${locale}/signup`}
              className="border-2 border-rose-500 text-rose-500 px-8 py-4 rounded-lg font-semibold text-xl hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
            >
              {t("signup")}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 -z-10"></div>
    </section>
  );
}
