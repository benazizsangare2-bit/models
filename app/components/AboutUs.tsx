import Link from "next/link";

export default async function AboutUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-delius sm:text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-rose-300 px-3"> Us</span>
            </h2>
            <p className="text-lg font-delius font-bold text-gray-600 mb-6">
              At Models & Hostesses by General Consulting Group, we are more
              than just a modeling and hostess agency. We embody the elegance,
              authenticity, and professionalism at the heart of the fashion,
              events, and hospitality industries.
            </p>
            <p className="text-lg font-delius font-bold text-gray-600 mb-6">
              Founded under the General Consulting Group banner, our modeling
              and hostess services branch is a direct response to the demanding
              and refined needs of modern businesses seeking a unique and
              personalized touch for their events, brand campaigns, or
              promotional activities.
            </p>
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
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-rose-800 drop-shadow-lg">
                  Models
                </span>
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mx-3">
                  &
                </span>
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-pink-600 drop-shadow-lg">
                  Hostesses
                </span>
              </div>

              {/* Byline */}
              <div className="mt-6">
                <span className="text-xl font-delius text-gray-700 font-light">
                  Presented by
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
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-rose-500 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-delius">
              Our <span className="text-rose-300">Vision</span>
            </h3>
            <p className="text-gray-600 font-delius leading-relaxed">
              Our vision is to make Models & Hostesses by General Consulting
              Group a pillar of the modeling and luxury hospitality industry in
              Africa, offering distinctive services and a model of excellence to
              our clients. By leveraging local potential and cultural diversity,
              we aim to promote the art of modeling and hospitality with deep
              respect for the talents that make up our team, while meeting the
              highest international standards.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-purple-500 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-delius">
              Our <span className="text-rose-300">Values</span>
            </h3>
            <p className="text-gray-600 font-delius leading-relaxed">
              We believe in the power of authenticity, diversity, and
              excellence. These founding values guide our daily work and are
              part of our commitment to our clients and our talents. We are
              committed to the growth of our models and hostesses by offering
              them opportunities for professional development and creating a
              respectful and stimulating environment.
            </p>
          </div>

          {/* Commitment */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-pink-500 hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-delius">
              Our{" "}
              <span className="text-rose-300">Commitment to the Future</span>
            </h3>
            <p className="text-gray-600 font-delius leading-relaxed">
              We are committed to building a future where modeling and
              hospitality are valued professions, promoted within an ethical
              framework of mutual respect. As pioneers in this sector in
              Cameroon and Rwanda, we aim to strengthen our position while
              continuing to train and inspire the next generation of talent in
              the industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
