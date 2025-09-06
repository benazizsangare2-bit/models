import Link from "next/link";

export default function Services() {
  const services = [
    {
      category: "Fashion & Modeling",
      items: [
        {
          title: "Runway Models",
          description:
            "Professional runway models for fashion shows, designer presentations, and industry events.",
          features: [
            "Height requirements: 5'8\"+",
            "Professional training",
            "Portfolio development",
            "Event coordination",
          ],
          price: "From $500/day",
          icon: "👗",
        },
        {
          title: "Photo Shoot Models",
          description:
            "Versatile models for commercial photography, editorial shoots, and advertising campaigns.",
          features: [
            "Portfolio building",
            "Professional makeup",
            "Location scouting",
            "Digital delivery",
          ],
          price: "From $400/day",
          icon: "📸",
        },
        {
          title: "Fashion Event Hostesses",
          description:
            "Elegant hostesses for fashion launches, boutique openings, and style events.",
          features: [
            "Fashion knowledge",
            "Customer service",
            "Event coordination",
            "Brand representation",
          ],
          price: "From $350/day",
          icon: "✨",
        },
      ],
    },
    {
      category: "Corporate Events",
      items: [
        {
          title: "Conference Hostesses",
          description:
            "Professional staff for corporate conferences, seminars, and business events.",
          features: [
            "Registration management",
            "Guest assistance",
            "Event coordination",
            "Professional appearance",
          ],
          price: "From $300/day",
          icon: "🏢",
        },
        {
          title: "Product Launch Staff",
          description:
            "Engaging hostesses for product launches, demonstrations, and promotional events.",
          features: [
            "Product knowledge",
            "Customer engagement",
            "Sales support",
            "Event management",
          ],
          price: "From $400/day",
          icon: "🚀",
        },
        {
          title: "Trade Show Representatives",
          description:
            "Professional representatives for exhibitions, trade shows, and industry events.",
          features: [
            "Industry expertise",
            "Lead generation",
            "Booth management",
            "Customer relations",
          ],
          price: "From $350/day",
          icon: "🎪",
        },
      ],
    },
    {
      category: "Special Events",
      items: [
        {
          title: "Private Party Hostesses",
          description:
            "Charming hostesses for private celebrations, birthdays, and special occasions.",
          features: [
            "Event planning",
            "Guest management",
            "Entertainment coordination",
            "Personalized service",
          ],
          price: "From $250/day",
          icon: "🎉",
        },
        {
          title: "Wedding & Ceremony Staff",
          description:
            "Elegant staff for weddings, ceremonies, and formal celebrations.",
          features: [
            "Ceremony coordination",
            "Guest assistance",
            "Photography support",
            "Event flow management",
          ],
          price: "From $400/day",
          icon: "💒",
        },
        {
          title: "VIP Event Services",
          description:
            "Exclusive services for high-end events and luxury experiences.",
          features: [
            "Premium selection",
            "Personalized attention",
            "Luxury standards",
            "Discrete service",
          ],
          price: "From $600/day",
          icon: "⭐",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-rose-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions for all your modeling and hostessing needs.
            From fashion shows to corporate events, we deliver excellence.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional, reliable, and tailored services for every occasion
            </p>
          </div>

          {services.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {category.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((service, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="p-8">
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>

                      <div className="mb-6">
                        <h5 className="font-semibold text-gray-900 mb-3">
                          Features:
                        </h5>
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <svg
                                className="w-4 h-4 text-rose-500 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <p className="text-2xl font-bold text-rose-600">
                          {service.price}
                        </p>
                      </div>

                      <button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-rose-600 hover:to-pink-700 transition-all duration-200">
                        Order Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to get the perfect service for your event
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description:
                  "Discuss your needs and requirements with our experts",
              },
              {
                step: "02",
                title: "Selection",
                description:
                  "Choose from our curated selection of professionals",
              },
              {
                step: "03",
                title: "Booking",
                description:
                  "Confirm your booking with our secure payment system",
              },
              {
                step: "04",
                title: "Service",
                description: "Enjoy exceptional service on your special day",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-400 to-pink-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Book Your Service?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Contact us today to discuss your requirements and get a personalized
            quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-rose-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Get a Quote
            </Link>
            <Link
              href="/gallery"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-rose-600 transition-all duration-200"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
