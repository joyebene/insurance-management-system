'use client';

import { FaAward, FaUserShield, FaHeart } from "react-icons/fa";

export default function WhyWeExist() {
  const stats = [
    { icon: FaUserShield, label: '5,000+ policyholders nationwide', description: 'Trusted by families across the country' },
    { icon: FaAward, label: 'Accredited & licensed professionals', description: 'Expert guidance you can rely on' },
    { icon: FaHeart, label: 'Rated A+ for customer satisfaction', description: 'Your peace of matter is our priority' },
  ];

  return (
    <section className="bg-linear-to-br from-amber-400 via-amber-300 to-amber-500 min-h-screen pt-24 pb-20 px-5 flex flex-col items-center justify-center text-center w-full">
      <div className="max-w-4xl mx-auto">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Why We Exist
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-gray-700 mb-12 text-lg max-w-2xl mx-auto"
        >
          Our mission is to protect what matters most: your family, your health, and your financial security.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:bg-white/50 transition-all duration-300 card-hover"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <stat.icon className="text-3xl text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{stat.label}</h3>
              <p className="text-gray-700 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="mt-12"
        >
          <button className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl">
            Learn More About Us
          </button>
        </div>
      </div>
    </section>
  );
}
