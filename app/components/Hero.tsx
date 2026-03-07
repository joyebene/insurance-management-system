'use client';

import Link from 'next/link';
import { FaArrowRight, FaShieldAlt, FaHeart, FaBuilding } from 'react-icons/fa';

export default function Hero() {
  const insuranceTypes = [
    { icon: FaShieldAlt, label: 'Auto', color: 'bg-blue-500' },
    { icon: FaHeart, label: 'Health', color: 'bg-green-500' },
    { icon: FaShieldAlt, label: 'Life', color: 'bg-purple-500' },
    { icon: FaBuilding, label: 'Business', color: 'bg-amber-500' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "url('/bg1.jpg') no-repeat center center/cover",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 bg-amber-400/20 rounded-full text-amber-400 font-medium text-sm mb-4">
            Trusted by 5,000+ Families
          </span>
        </div>

        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="1000"
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Protect What Matters{' '}
          <span className="gradient-text">Most</span>
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Comprehensive insurance solutions tailored to your unique needs.
          From auto to life insurance, we've got you covered 24/7.
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1000"
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            href="#contact"
            className="btn-primary inline-flex items-center justify-center gap-2 text-lg"
          >
            Get Free Quote
            <FaArrowRight className="text-sm" />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Explore Plans
          </Link>
        </div>

        {/* Insurance Type Icons */}
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="1000"
          className="flex justify-center gap-6 md:gap-12"
        >
          {insuranceTypes.map((type, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={500 + index * 100}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <type.icon className="text-2xl text-white" />
              </div>
              <span className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors">
                {type.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-aos="fade-in"
        data-aos-delay="800"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-amber-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
