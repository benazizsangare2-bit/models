"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp } from "./motion";
export default function AboutUs() {
  const t = useTranslations("About");
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-3xl font-delius sm:text-4xl font-bold text-gray-900 mb-6"
            >
              {t("title1")}{" "}
              <span className="text-rose-300 px-3"> {t("title2")}</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-lg font-delius font-bold text-gray-600 mb-6"
            >
              {t("subtitle1")}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-lg font-delius font-bold text-gray-600 mb-6"
            >
              {t("subtitle2")}
            </motion.p>
          </div>
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-rose-200 to-pink-300 rounded-2xl shadow-2xl relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-32 h-32 bg-rose-400 rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-400 rounded-full translate-x-20 translate-y-20"></div>
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 rounded-2xl">
              {/* Main Title */}
              <div className="mb-4 font-dancing">
                <span className="text-5xl md:text-6xl lg:text-6xl font-bold text-rose-800 drop-shadow-lg">
                  {t("cardModels")}
                </span>
                <span className="text-5xl md:text-6xl lg:text-6xl font-bold text-gray-800 mx-3">
                  &
                </span>
                <span className="text-5xl md:text-6xl lg:text-6xl font-bold text-pink-600 drop-shadow-lg">
                  {t("cardHostesses")}
                </span>
              </div>

              {/* Byline */}
              <div className="mt-6">
                <span className="text-xl font-delius text-gray-700 font-light">
                  {t("present")}
                </span>
                <div className="font-garamond text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 mt-2">
                  General Consulting Group
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-4 h-4 bg-rose-500 rounded-full"></div>
              <div className="absolute bottom-6 left-6 w-4 h-4 bg-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* New Info Grid Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Vision */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-rose-500 hover:shadow-xl transition-all"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-delius">
              {t("visiont1")}{" "}
              <span className="text-rose-300">{t("visiont2")}</span>
            </h3>
            <p className="text-gray-600 font-delius leading-relaxed">
              {t("visionDesc")}
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-purple-500 hover:shadow-xl transition-all"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-delius">
              {t("valuet1")}{" "}
              <span className="text-rose-300">{t("valuet2")}</span>
            </h3>
            <p className="text-gray-600 font-delius leading-relaxed">
              {t("valueDesc")}
            </p>
          </motion.div>

          {/* Commitment */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-pink-500 hover:shadow-xl transition-all"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-delius">
              {t("commit1")}
              <span className="text-rose-300">{t("commit2")}</span>
            </h3>
            <p className="text-gray-600 font-delius leading-relaxed">
              {t("commitDesc")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
