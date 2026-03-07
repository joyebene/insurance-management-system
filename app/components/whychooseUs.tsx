'use client';

import { FaDollarSign, FaClock, FaHeadset, FaSlidersH, FaUsers } from "react-icons/fa";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: FaDollarSign,
      title: 'Affordable Coverage',
      description: 'Flexible plans for every budget. Get the coverage you need without breaking the bank.',
      color: 'bg-green-500'
    },
    {
      icon: FaClock,
      title: 'Fast Claims',
      description: 'Get help when you need it most, with a simple and quick claims process.',
      color: 'bg-blue-500'
    },
    {
      icon: FaHeadset,
      title: '24/7 Support',
      description: 'Our team is always available, day or night, to assist you.',
      color: 'bg-purple-500'
    },
    {
      icon: FaSlidersH,
      title: 'Custom Plans',
      description: 'Only pay for what you truly need with our flexible coverage options.',
      color: 'bg-amber-500'
    },
    {
      icon: FaUsers,
      title: 'Trusted by Thousands',
      description: 'Families and businesses count on us every day for their protection.',
      color: 'bg-red-500'
    },
  ];

  return (
    <section className="bg-gray-900 min-h-screen pt-24 pb-20 px-5 flex flex-col items-center justify-center text-center text-white">
      <div className="max-w-6xl mx-auto">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Why Choose <span className="gradient-text">Us</span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Experience the difference of working with an insurance provider that truly cares about your needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:bg-gray-700 transition-all duration-300 card-hover group"
            >
              <div className={`w-14 h-14 ${benefit.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-semibold text-amber-400 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                {benefit.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="mt-12"
        >
          <div className="inline-flex items-center gap-4 bg-gray-800 rounded-full px-8 py-4">
            <span className="text-gray-300">Ready to get started?</span>
            <a
              href="#contact"
              className="bg-amber-400 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-amber-500 transition-colors"
            >
              Contact Us Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
