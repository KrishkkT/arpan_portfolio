"use client";
import React, { useEffect, useState } from "react";
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
  const [sectionVisibility, setSectionVisibility] = useState({
    about: true,
    skills: true,
    projects: true,
    experience: true,
    contact: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });

    // Fetch section visibility
    fetch("/api/section-visibility")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const visibilityMap = {};
          data.forEach((item) => {
            visibilityMap[item.section_name] = item.is_visible;
          });
          setSectionVisibility(visibilityMap);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching section visibility:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-soft">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="relative bg-background-soft min-h-screen">
      <Navbar />

      <div className="relative">
        <Hero />

        {sectionVisibility.about && (
          <div data-aos="fade-up">
            <About />
          </div>
        )}

        {sectionVisibility.skills && (
          <div data-aos="fade-up">
            <Skills />
          </div>
        )}

        {sectionVisibility.projects && (
          <div data-aos="fade-up">
            <Projects />
          </div>
        )}

        {sectionVisibility.experience && (
          <div data-aos="fade-up">
            <Experience />
          </div>
        )}

        {/* Certifications & Achievements could be added here similarly */}

        {sectionVisibility.contact && (
          <div data-aos="fade-up">
            <Contact />
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
