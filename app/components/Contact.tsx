'use client';

import { useState, FormEvent } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
  });
  const [validationMessage, setValidationMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.number || !formData.message) {
      setValidationMessage('Please fill in all fields.');
      setSuccessMessage('');
      return;
    }

    setValidationMessage('');
    setIsSubmitted(true);
    setSuccessMessage('Form submitted successfully! We will contact you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="scroll-mt-24 min-h-screen pt-24 pb-20 px-5 bg-linear-to-br from-gray-100 via-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-gray-600 mb-6 max-w-2xl mx-auto"
          >
            Get in touch with us! Have questions? Ready to protect your future? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            data-aos="fade-right"
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaPhone className="text-xl text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <p className="text-gray-600">(XXX) XXX-XXXX</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FaEnvelope className="text-xl text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">support@allroundinsurance.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-xl text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Office</p>
                    <p className="text-gray-600">123 Main Street, YouCity, Pancinia Island</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <FaClock className="text-xl text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Hours</p>
                    <p className="text-gray-600">24/7 Support Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            data-aos="fade-left"
          >
            {!isSubmitted ? (
              <form id="userForm" onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Send us a Message
                </h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name-input" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      id="name-input"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      id="email-input"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="number-input" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      id="number-input"
                      name="number"
                      type="tel"
                      value={formData.number}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                      placeholder="(XXX) XXX-XXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="tx-Area" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="tx-Area"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all h-32 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {validationMessage && (
                    <p className="text-red-500 text-sm">{validationMessage}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-amber-400 text-gray-900 font-semibold py-4 rounded-xl hover:bg-amber-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <FaPaperPlane />
                    Request a Free Quote
                  </button>
                </div>
              </form>
            ) : (
              <div
                data-aos="fade-in"
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaPaperPlane className="text-3xl text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Thank You!
                </h3>
                <p className="text-green-600 text-lg">{successMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
