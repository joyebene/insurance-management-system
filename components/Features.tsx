'use client';

import { useState } from "react";
import { FaCar, FaHeartbeat, FaLifeRing, FaBuilding } from "react-icons/fa";

type IconComponent = React.ComponentType<{ className?: string }>;

type featuresType = {
  title: string;
  briefInfo: string;
  description: string;
  typesOfCoverage?: string[];
  icon: IconComponent;
  color: string;
}

export default function Features() {
  const [selected, setSelected] = useState<number | null>(0)

  const features: featuresType[] = [
    {
      title: 'Auto Insurance',
      briefInfo: 'Drive with confidence knowing you\'re fully protected.',
      description: 'Auto insurance is a legal contract between you and an insurance company that provides financial protection if you are involved in a car accident or your vehicle is damaged. In exchange for paying a fee called a premium, the insurer agrees to pay for specific losses as defined in your policy.',
      typesOfCoverage: ['Liability Coverage', 'Collision Coverage', 'Comprehensive Coverage', 'Personal Injury Protection (PIP)', 'Uninsured/Underinsured Motorist Coverage'],
      icon: FaCar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Health Insurance',
      briefInfo: 'Comprehensive coverage to keep you and your family healthy.',
      description: 'Health insurance is a contract between you and an insurance company that helps cover the cost of medical care.You pay a regular premium, and in return the insurer pays part of your healthcare expenses, such as doctor visits, hospital stays, prescriptions, and preventive care',
      typesOfCoverage: ['HMO (Health Maintenance Organization)', 'PPO (Preferred Provider Organization)', 'EPO (Exclusive Provider Organization)', 'POS (Point of Service)', 'High-Deductible Health Plan (HDHP)'],
      icon: FaHeartbeat,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Life Insurance',
      briefInfo: 'Secure your loved ones\' future with flexible life policies.',
      description: 'Life insurance is a contract that provides financial support to your beneficiaries after you pass away. You pay regular premiums, and in return the insurance company pays a lump sum (called a death benefit) to the people you choose.',
      typesOfCoverage: ['Term Life Insurance', 'Whole Life Insurance', 'Universal Life Insurance', 'Variable Life Insurance', 'Final Expense Insurance'],
      icon: FaLifeRing,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Business Insurance',
      briefInfo: 'Protect your company from risks and unexpected losses.',
      description: 'Business insurance protects a company from financial losses due to unexpected events. It helps cover risks such as property damage, lawsuits, employee injuries, theft, or business interruptions',
      typesOfCoverage: ['Property Insurance', 'Liability Insurance', 'Workers Compensation Insurance', 'Commercial Auto Insurance', 'Business Interruption Insurance'],
      icon: FaBuilding,
      color: 'from-amber-500 to-amber-600'
    },
  ];

  function handleSelection(getCurrentId: number) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };

  const renderIcon = (Icon: IconComponent) => {
    return <Icon className="text-2xl text-white" />;
  };

  return (
    <section id="features" className="scroll-mt-24 min-h-screen pt-24 pb-20 px-5 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Our Insurance <span className="gradient-text">Solutions</span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="font-semibold text-gray-300 max-w-2xl mx-auto"
          >
            Comprehensive coverage options tailored to protect what matters most to you and your family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`p-6 bg-gray-700 rounded-2xl shadow-lg hover:bg-gray-600 transition-all duration-300 card-hover ${selected === index ? 'ring-2 ring-amber-400' : ''}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 bg-linear-to-br ${feature.color} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}>
                  {renderIcon(feature.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-amber-300 mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {feature.title}
                  </h3>
                  <span className="text-gray-300 text-sm">{feature.briefInfo}</span>
                </div>
                <button
                  onClick={() => handleSelection(index)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-600 text-white rounded-full font-bold hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 shrink-0"
                  aria-label={selected === index ? 'Collapse' : 'Expand'}
                >
                  {selected === index ? '−' : '+'}
                </button>
              </div>

              <p className="text-gray-300 mb-4">{feature.description}</p>

              {selected === index && feature.typesOfCoverage && (
                <div
                  data-aos="fade-in"
                  className="mt-4 pt-4 border-t border-gray-600"
                >
                  <h4 className="text-lg font-semibold text-amber-300 mb-3">Types of Coverage:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {feature.typesOfCoverage.map((coverage, coverageIndex) => (
                      <li
                        key={coverageIndex}
                        className="text-gray-300 text-sm flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                        {coverage}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
