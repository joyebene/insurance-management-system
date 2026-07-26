"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import { FaShieldAlt } from "react-icons/fa";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#stats", label: "Statistics" },
  { href: "#features", label: "Features" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMobileMenuOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? "bg-gray-900/95 py-3 shadow-lg backdrop-blur-md"
          : "bg-gray-800 py-4"
        }`}
    >
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}

          <div
            data-aos="fade-down"
            className="flex items-center"
          >
            <Link
              href="#home"
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-gray-900 text-xl" />
              </div>

              <span
                className="hidden text-lg font-semibold text-white sm:block"
                style={{
                  fontFamily:
                    "var(--font-playfair)",
                }}
              >
                Insurance Management System
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}

          <ul className="hidden items-center space-x-1 md:flex">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                data-aos="fade-down"
                data-aos-delay={index * 50}
              >
                <Link
                  href={link.href}
                  className="rounded-lg px-4 py-2 font-medium text-gray-300 transition-all duration-300 hover:bg-white/10 hover:text-amber-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Auth */}

          {!loading && (
            <div className="hidden items-center gap-3 md:flex">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="rounded-full bg-amber-500 px-5 py-2 font-medium text-white transition hover:bg-amber-600"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-full border border-white/30 px-5 py-2 font-medium text-white transition hover:bg-white/10"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-full border border-white/30 px-5 py-2 font-medium text-white transition hover:bg-white/10"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-full bg-amber-500 px-5 py-2 font-medium text-white transition hover:bg-amber-600"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile Button */}

          <button
            className="rounded-lg p-2 text-white md:hidden"
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}

        {mobileMenuOpen && (
          <div
            data-aos="fade-down"
            className="mt-5 rounded-2xl border border-white/10 bg-gray-900/95 p-4 md:hidden"
          >
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="block rounded-lg px-4 py-3 font-medium text-gray-300 transition hover:bg-white/10 hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-white/10 pt-5">
              {!loading &&
                (user ? (
                  <div className="space-y-3">
                    <Link
                      href="/dashboard"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="block rounded-xl bg-amber-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-amber-600"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full rounded-xl border border-white/20 px-4 py-3 font-semibold text-white transition hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="block rounded-xl border border-white/20 px-4 py-3 text-center font-semibold text-white transition hover:bg-white/10"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() =>
                        setMobileMenuOpen(false)
                      }
                      className="block rounded-xl bg-amber-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-amber-600"
                    >
                      Create Account
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}