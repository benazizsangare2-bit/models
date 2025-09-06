import Image from "next/image";
import Link from "next/link";
export default function Ourmodels() {
  // Create an array of model data
  const models = [
    {
      id: 1,
      name: "Sophia Laurent",
      role: "Fashion Model",
      image: "/Images/model5.jpg", // Path in public folder
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-delius text-gray-900 mb-4">
            Our{" "}
            <span className="font-dancing text-5xl text-rose-300"> Models</span>
            <span className="font-dancing text-5xl text-gray-400"> & </span>
            <span className="font-dancing text-5xl text-pink-600">
              {" "}
              Hostesses
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-delius">
            Meet some of our exceptional professionals ready to make your event
            unforgettable
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {models.map((model) => (
            <div
              key={model.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="w-full h-80 relative">
                <Image
                  src={model.image}
                  alt={model.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Info on Hover */}
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="font-semibold text-lg">{model.name}</h4>
                  <p className="text-sm text-rose-200">{model.role}</p>
                  <p className="text-xs text-gray-300 mt-1">{model.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center font-delius">
          <Link
            href="/gallery"
            className="inline-flex items-center bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View Full Gallery
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
          </Link>
        </div>
      </div>
    </section>
  );
}
