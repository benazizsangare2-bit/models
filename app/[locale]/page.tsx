// app/[locale]/page.tsx
import Partners from "../components/Partners";
import Footer from "../components/footer";
import Ourmodels from "../components/ourmodels";
import OrderService from "../components/orderService";
import WhyChooseUs from "../components/whyChooseUs";
import AboutUs from "../components/AboutUs";
import HeroSection from "../components/HeroSection";
import BackgroundPatterns from "../components/BackgroundPatterns";

// ✅ Let Next.js infer params, but unwrap the Promise
export default function HomePage({
  params,
}: {
  params: Awaited<{ locale: string }>;
}) {
  const { locale } = params;

  return (
    <div className="relative min-h-screen bg-gray-50">
      <BackgroundPatterns />
      <HeroSection locale={locale} />
      <AboutUs />
      <WhyChooseUs />
      <OrderService locale={locale} />
      <Ourmodels locale={locale} />
      <Partners />
      <Footer />
    </div>
  );
}
