'use client';

import AOSInit from "./components/AOSInit";
import About from "./components/About";
import Contact from "./components/Contact";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/whychooseUs";
import WhyWeExist from "./components/whyWeExist";
import Stats from "./components/Stats";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <main>
      <AOSInit />
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <About />
      <WhyWeExist />
      <WhyChooseUs />
      <FAQ />
      <Contact />
      <Testimonials />
      <Footer />
    </main>
  );
}
