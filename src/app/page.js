"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <main className="relative bg-background-soft min-h-screen">
      <Navbar />

      <div className="relative">
        <Hero />

        <div data-aos="fade-up">
          <About />
        </div>

        <div data-aos="fade-up">
          <Skills />
        </div>

        <div data-aos="fade-up">
          <Projects />
        </div>

        <div data-aos="fade-up">
          <Experience />
        </div>

        {/* Certifications & Achievements could be added here similarly */}

        <div data-aos="fade-up">
          <Contact />
        </div>
      </div>

      <Footer />
    </main>
  );
}
