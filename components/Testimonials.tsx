'use client';

import { FaStar } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      text: 'They made getting insured so easy. The process was fast, and I finally feel secure about my future!',
      author: 'Sarah T.',
      location: 'New York',
      rating: 5
    },
    {
      text: 'Excellent customer service and affordable plans. I recommend them to anyone looking for insurance.',
      author: 'David R.',
      location: 'California',
      rating: 5
    },
    {
      text: 'The claims process was incredibly smooth. They truly care about their customers.',
      author: 'Maria L.',
      location: 'Texas',
      rating: 5
    },
  ];

  return (
    <section className="min-h-screen pt-24 pb-20 px-5 flex flex-col items-center justify-center text-center bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          What Our <span className="gradient-text">Clients Say</span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Don't just take our word for it. Here's what our satisfied customers have to say about their experience with us.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>

              <p className="text-gray-600 mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
