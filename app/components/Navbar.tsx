'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#stats', label: 'Statistics' },
  { href: '#features', label: 'Features' },
  { href: '#about', label: 'About' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg py-3' : 'bg-gray-800 py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center">
          <div
            data-aos="fade-down"
            className="flex items-center"
          >
            <Link href="#home" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xl" style={{ fontFamily: 'var(--font-playfair)' }}>A</span>
              </div>
              <span className="text-white font-semibold text-lg hidden sm:block" style={{ fontFamily: 'var(--font-playfair)' }}>
                All Round Insurance
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex justify-center items-center space-x-1">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                data-aos="fade-down"
                data-aos-delay={index * 50}
              >
                <Link
                  href={link.href}
                  className="text-gray-300 font-medium px-4 py-2 rounded-lg hover:text-amber-400 hover:bg-white/10 transition-all duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            data-aos="fade-down"
            className="md:hidden mt-4 pb-4"
          >
            <ul className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-300 font-medium px-4 py-2 rounded-lg hover:text-amber-400 hover:bg-white/10 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
