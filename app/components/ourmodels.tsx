"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "./motion";

export default function Ourmodels({ locale }: { locale: string }) {
  const t = useTranslations("ourmodels");

  const models = [
    {
      id: 1,
      name: "Sophia Laurent",
      role: "Fashion Model",
      image: "/Images/model5.jpg",
      category: "Fashion & Runway",
    },
    {
      id: 2,
      name: "Emma Johnson",
      role: "Event Hostess",
      image: "/Images/model4.jpeg",
      category: "Corporate Events",
    },
    {
      id: 3,
      name: "Isabella Rossi",
      role: "Brand Ambassador",
      image: "/Images/model2.jpeg",
      category: "Brand Promotions",
    },
    {
      id: 4,
      name: "Mia Chen",
      role: "Promotional Model",
      image: "/Images/model3.jpeg",
      category: "Product Launches",
    },
  ];

  return (
    <section className="relative bg-gray-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Title */}
        <div className="text-center mb-20">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-3xl sm:text-5xl font-extrabold font-delius text-gray-900 mb-6"
          >
            {t("title1")}{" "}
            <span className="font-dancing text-6xl text-rose-400">
              {t("title2")}
            </span>{" "}
            <span className="font-dancing text-6xl text-gray-400">&</span>{" "}
            <span className="font-dancing text-6xl text-pink-600">
              {t("title3")}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto font-delius leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Models Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {models.map((model) => (
            <motion.div
              key={model.id}
              variants={fadeInUp}
              className="group relative rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-96">
                <Image
                  src={model.image}
                  alt={model.name}
                  fill
                  className="object-cover rounded-3xl group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              {/* Info */}
              <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <h4 className="font-semibold text-lg">{model.name}</h4>
                <p className="text-sm text-rose-200">{model.role}</p>
                <p className="text-xs text-gray-300 mt-1">{model.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Button */}
        <div className="text-center mt-16">
          <motion.a
            href={`/${locale}/gallery`}
            className="inline-flex items-center bg-gradient-to-r from-rose-500 to-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {t("button")}
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
