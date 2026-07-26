'use client';

import { useEffect, useState } from 'react';
import { FaUsers, FaShieldAlt, FaHandshake, FaAward } from 'react-icons/fa';

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('stats');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { icon: FaUsers, value: isVisible ? '5,000+' : '0', label: 'Happy Clients', color: 'text-blue-400' },
    { icon: FaShieldAlt, value: isVisible ? '20+' : '0', label: 'Years Experience', color: 'text-green-400' },
    { icon: FaHandshake, value: isVisible ? '98%' : '0', label: 'Customer Satisfaction', color: 'text-amber-400' },
    { icon: FaAward, value: isVisible ? '50+' : '0', label: 'Awards Won', color: 'text-purple-400' },
  ];

  return (
    <section id="stats" className="scroll-mt-24 py-20 px-5 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="text-center"
            >
              <div className={`${stat.color} text-4xl mb-4 flex justify-center`}>
                <stat.icon />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
