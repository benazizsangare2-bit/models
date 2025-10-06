"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaUserTie, FaUserFriends } from "react-icons/fa";
import { useParams } from "next/navigation";

export default function RolePicker() {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const t = useTranslations("Role");

  const roles = [
    {
      title: t("model"), // e.g. "I am a Model"
      description: t("modelDesc"), // short subtitle if you want
      icon: <FaUserTie className="w-12 h-12" />,
      link: `/${locale}/model-registration`, // where it should lead
      color: "from-rose-500 to-pink-600",
    },
    {
      title: t("hostess"), // e.g. "I am an Hostess"
      description: t("hostessDesc"),
      icon: <FaUserFriends className="w-12 h-12" />,
      link: `/${locale}/hostess-registration`,
      color: "from-pink-400 to-rose-700",
    },
  ];

  return (
    <section className="py-30 max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-pink-400 font-delius mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-delius">
            {t("subtitle")}
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
          {roles.map((role, index) => (
            <Link
              key={index}
              href={role.link}
              className={`relative h-[28rem] rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2`}
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${role.color}`}
              >
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 right-0 w-52 h-52 bg-white rounded-full translate-x-20 translate-y-20"></div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-10 flex flex-col items-center justify-center h-full text-center font-delius">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/30 transition-all duration-300">
                  <div className="text-white">{role.icon}</div>
                </div>

                <h3 className="text-3xl font-semibold text-white mb-4">
                  {role.title}
                </h3>
                <p className="text-white/90 text-lg max-w-sm">
                  {role.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
