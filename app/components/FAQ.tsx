'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: 'How do I choose the right insurance policy?',
    answer: 'Choosing the right insurance depends on your specific needs. Consider factors like your budget, coverage requirements, and risk factors. Our experts can help you understand your options and find the best fit for your situation.'
  },
  {
    question: 'What factors affect my insurance premiums?',
    answer: 'Insurance premiums are influenced by several factors including your age, driving record, location, type of coverage, deductibles, and claims history. Maintaining a good record and choosing higher deductibles can help lower your premiums.'
  },
  {
    question: 'How long does the claims process take?',
    answer: 'Our streamlined claims process typically takes 5-7 business days from submission to resolution. Complex cases may take longer, but we work diligently to process claims as quickly as possible.'
  },
  {
    question: 'Can I customize my insurance coverage?',
    answer: 'Absolutely! We offer flexible policies that allow you to customize your coverage based on your specific needs. You can add or remove coverage options and adjust your deductibles to find the perfect balance between protection and cost.'
  },
  {
    question: 'What should I do if I need to file a claim?',
    answer: 'To file a claim, you can contact our 24/7 hotline or use our online portal. Have your policy number ready, and provide details about the incident. Our claims team will guide you through every step of the process.'
  },
  {
    question: 'Do you offer discounts for bundling policies?',
    answer: 'Yes! We offer multi-policy discounts when you bundle auto, home, life, or business insurance. Customers who bundle typically save 10-20% on their premiums.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-24 min-h-screen py-20 px-5 bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Frequently Asked Questions
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-center text-gray-600 mb-12"
        >
          Get answers to the most common questions about our insurance services
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                <span className="text-amber-500 shrink-0">
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {openIndex === index && (
                <div
                  data-aos="fade-in"
                  className="px-6 pb-4"
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
