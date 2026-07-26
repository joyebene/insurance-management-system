'use client';

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 min-h-screen pt-24 pb-20 px-5 flex flex-col items-center justify-center text-center bg-white">
      <div className="max-w-4xl mx-auto">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          About <span className="gradient-text">Us</span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="font-semibold text-gray-700 mb-8 text-lg"
        >
          Who We Are
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="space-y-6"
        >
          <p className="text-gray-600 text-lg leading-relaxed">
            At <span className="font-semibold text-amber-500">All Round Insurance & Co</span>, we believe insurance should be simple, affordable, and dependable. With over 20 years of experience, we've helped thousands of clients safeguard their future and gain peace of mind.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our mission is to provide personalized insurance solutions that protect what matters most to you — your family, your health, your business, and your financial security.
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-amber-500 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>20+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-amber-500 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>5,000+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-amber-500 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
