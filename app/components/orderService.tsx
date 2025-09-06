"use client";
import localFont from "next/font/local";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaUmbrellaBeach,
  FaBuilding,
  FaGlassCheers,
  FaCamera,
  FaArrowRight,
} from "react-icons/fa";

export default function OrderService() {
  const services = [
    {
      title: "Professional Models",
      description:
        "We provide carefully selected models to meet the needs of advertising campaigns, fashion shows, editorial shoots, and much more. Our models combine charisma, stage presence, and professionalism, providing an impeccable visual representation for each brand.",
      icon: <FaUmbrellaBeach className="w-8 h-8" />,
    },
    {
      title: "Hostesses & Models",
      description:
        "Our hostesses and models are trained to provide exceptional hospitality, combining courtesy, elegance, and professionalism. Whether for trade shows, conferences, private or corporate events, our reception staff reflects the excellence we stand for.",
      icon: <FaBuilding className="w-8 h-8" />,
    },
    {
      title: "Promotion & Street Marketing Services",
      description:
        "For promotional campaigns that require a direct and impactful approach, we provide dynamic and experienced teams capable of representing your brand in on-the-ground actions with a commitment that makes a lasting impression.",
      icon: <FaGlassCheers className="w-8 h-8" />,
    },
    {
      title: "Event Coordination",
      description:
        "With solid expertise in event management, we handle the planning and organization of your events, guaranteeing flawless execution. Our team provides a turnkey service, from design to implementation, for a memorable event.",
      icon: <FaCamera className="w-8 h-8" />,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const titles = ["Models", "Events", "Promotion", "Hostesses"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % titles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Title Slide */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-20">
            <span className="text-5xl mb-8 font-semibold text-gray-800 font-delius">
              Our Services :
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
            We offer a range of top-notch services, tailored to the specific
            needs of each client.
          </p>
        </div>

        {/* Services Grid - 4 services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative w-full h-96 rounded-2xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Gradient background with circles */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-300">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-rose-300 rounded-full -translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-400 rounded-full translate-x-20 translate-y-20"></div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 font-delius text">
                {/* Icon with gradient background */}
                <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:from-rose-600 group-hover:to-pink-700 transition-all duration-300">
                  <div className="text-white text-3xl">{service.icon}</div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed text-xl">
                  {service.description}
                </p>

                {/* <button className="inline-flex items-center text-rose-700 hover:text-rose-800 font-medium transition-colors duration-200">
                  Learn more
                  <FaArrowRight className="ml-2 w-4 h-4" />
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Single Order Service Button at Bottom */}
        <div className="text-center font-delius">
          <Link
            href={"/contact"}
            className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-12 py-5 rounded-2xl font-semibold text-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 inline-flex items-center"
          >
            Order a Service Now
            <FaArrowRight className="ml-3 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
