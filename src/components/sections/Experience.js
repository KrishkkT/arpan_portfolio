"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Building, MapPin } from "lucide-react";

const experiences = [
    {
        role: "Embedded Systems Intern",
        company: "Tech Electronics Solutions",
        location: "Ahmedabad, India",
        period: "2024 - Present",
        description: "Developing firmware for STM32 microcontrollers and designing PCBS for IoT sensing modules.",
        type: "Internship",
    },
    {
        role: "Junior Research Assistant",
        company: "University Research Lab",
        location: "Remote",
        period: "2023 - 2024",
        description: "Assisted in research on digital signal processing algorithms for biomedical signal analysis.",
        type: "Research",
    },
    {
        role: "Hardware Design Lead",
        company: "Student Project - EcoTrack",
        location: "College Campus",
        period: "2022 - 2023",
        description: "Led a team of 4 to build a solar-powered environmental monitoring station.",
        type: "Project",
    },
];

const Experience = () => {
    return (
        <section id="experience" className="py-16 sm:py-20 md:py-24 bg-background-soft">
            <div className="section-container px-4 sm:px-6">
                <div className="flex flex-col items-center mb-10 sm:mb-16">
                    <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-3 sm:mb-4">Journey</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-neutral-text mb-4 sm:mb-6 text-center">Experience & Career</h2>
                    <div className="w-16 sm:w-20 h-1.5 bg-primary rounded-full" />
                </div>

                <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
                    {/* Timeline Line - visible on md+ centered, on mobile left side */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 md:-translate-x-1/2" />

                    <div className="space-y-8 sm:space-y-12">
                        {experiences.map((exp, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.2 }}
                                viewport={{ once: true }}
                                className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[-20px] md:left-1/2 md:-translate-x-1/2 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-4 border-primary flex items-center justify-center z-10 shadow-lg">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                                    <div className="glass-card hover:bg-white hover:scale-[1.02] transition-all duration-300 p-4 sm:p-6">
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
                                            <span className="px-2.5 sm:px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                                                {exp.type}
                                            </span>
                                            <span className="text-xs sm:text-sm font-medium text-neutral-text/50">{exp.period}</span>
                                        </div>
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-text mb-2">{exp.role}</h3>
                                        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 text-xs sm:text-sm text-neutral-text/60 mb-4 sm:mb-6 font-medium">
                                            <div className="flex items-center gap-1 sm:gap-1.5">
                                                <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {exp.company}
                                            </div>
                                            <div className="flex items-center gap-1 sm:gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {exp.location}
                                            </div>
                                        </div>
                                        <p className="text-neutral-text/60 leading-relaxed text-xs sm:text-sm">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Spacer for md screens */}
                                <div className="hidden md:block w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
