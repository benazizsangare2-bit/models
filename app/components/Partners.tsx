import Image from "next/image";

export default function Partners() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 font-delius">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-rose-400">Partners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by leading brands and organizations worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-delius">
          {[
            {
              name: "Fashion House International",
              description: "Leading fashion brand with global presence",
              logo: "/Images/partners/cathy.png",
              width: 160, // Desired display width
              height: 160, // Desired display height
            },
            {
              name: "Corporate Events Plus",
              description: "Premium event management and consulting services",
              logo: "/Images/partners/GCG.png",
              width: 270,
              height: 270,
            },
            {
              name: "Luxury Brands Group",
              description:
                "Exclusive luxury brand representation and management",
              logo: "/Images/partners/media-vision.png",
              width: 160,
              height: 160,
            },
          ].map((partner, index) => (
            <div
              key={index}
              className="text-center p-8 bg-slate-700 rounded-2xl hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1 flex flex-col items-center justify-center"
            >
              {/* Logo Image with Next.js Optimization */}
              <div className="mb-6 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={partner.width}
                  height={partner.height}
                  className="object-contain"
                />
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-semibold text-slate-300 mb-3">
                {partner.name}
              </h3>
              <p className="text-slate-300">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
