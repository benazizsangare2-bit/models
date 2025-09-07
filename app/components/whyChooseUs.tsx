import { useTranslations } from "next-intl";

export default function WhyChooseUs() {
  const t = useTranslations("WhyChooseUs");

  const features = [
    {
      title: t("Subtitle1"),
      description: t("description1"),
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      title: t("Subtitle2"),
      description: t("description2"),
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
    {
      title: t("subtitle3"),
      description: t("description3"),
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2
          c0-.656-.126-1.283-.356-1.857M7 20H2v-2
          a3 3 0 015.356-1.857M7 20v-2
          c0-.656.126-1.283.356-1.857m0 0
          a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0
          3 3 0 016 0zm6 3a2 2 0 11-4 0
          2 2 0 014 0zM7 10a2 2 0 11-4 0
          2 2 0 014 0z"
        />
      ),
    },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 font-delius">
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-transparent bg-clip-text">
              {t("title1")}
            </span>{" "}
            {t("title2")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-delius font-semibold">
            {t("description")}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group transform transition duration-500 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transform transition duration-500 group-hover:scale-110 group-hover:shadow-rose-300/50">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {feature.icon}
                </svg>
              </div>

              {/* Text */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-delius">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-delius font-medium text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Sentence */}
        <div className="text-center pt-16">
          <p className="text-2xl max-w-3xl mx-auto text-rose-600 font-delius font-bold">
            {t("lastSentence")}
          </p>
        </div>
      </div>

      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
    </section>
  );
}
