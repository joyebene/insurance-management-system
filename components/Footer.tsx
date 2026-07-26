'use client';

import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaShieldAlt } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-gray-900 text-xl" />
              </div>
              <span className="text-white font-semibold text-lg" style={{ fontFamily: 'var(--font-playfair)' }}>
              Insurance Management System              </span>
            </div>
            <p className="mb-6 max-w-md">
              Comprehensive insurance solutions tailored to protect what matters most. Trusted by thousands of families and businesses nationwide.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-gray-900 transition-all duration-300">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-gray-900 transition-all duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-gray-900 transition-all duration-300">
                <FaLinkedin />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-gray-900 transition-all duration-300">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-amber-400 transition-colors">Features</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Insurance Types */}
          <div>
            <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Insurance</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-amber-400 transition-colors">Auto Insurance</a></li>
              <li><a href="#features" className="hover:text-amber-400 transition-colors">Health Insurance</a></li>
              <li><a href="#features" className="hover:text-amber-400 transition-colors">Life Insurance</a></li>
              <li><a href="#features" className="hover:text-amber-400 transition-colors">Business Insurance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © {currentYear} Insurance Management System & Co. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
