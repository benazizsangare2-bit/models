"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale = "en" }: { locale: string }) {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-900 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
      <div className="font-bold max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 xl:text-xl">
        <div className="flex font-delius justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center">
              <Image
                src={"/Images/logo.png"}
                alt={""}
                width={120}
                height={120}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-15">
            <Link
              href="/"
              className="text-gray-300 hover:text-rose-500 transition-colors duration-200 font-medium"
            >
              {t("navigation.home")}
            </Link>
            <Link
              href={`/${locale}/gallery`}
              className="text-gray-300 hover:text-rose-500 transition-colors duration-200 font-medium"
            >
              {t("navigation.gallery")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-gray-300 hover:text-rose-500 transition-colors duration-200 font-medium"
            >
              {t("navigation.contact")}
            </Link>
          </nav>

          {/* Language Selector & CTA */}
          <div className="font-garamond hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link
              href="/login"
              className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:from-rose-500 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t("navigation.login")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-rose-500 focus:outline-none focus:text-rose-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg mt-2">
              <Link
                href="/"
                className="text-gray-300 hover:text-rose-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navigation.home")}
              </Link>
              <Link
                href="/gallery"
                className="text-gray-300 hover:text-rose-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navigation.gallery")}
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-rose-500 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navigation.contact")}
              </Link>
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
              <Link
                href="/login"
                className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:from-rose-500 hover:to-pink-600 transition-all duration-200 block text-center mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navigation.login")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
