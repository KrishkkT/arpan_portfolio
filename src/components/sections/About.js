"use client";
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Target, Cpu, CircuitBoard, Zap, Code2 } from "lucide-react";

const stats = [
    { label: "Projects Completed", value: "15+", icon: Code2 },
    { label: "Technologies Used", value: "20+", icon: Zap },
    { label: "Certifications", value: "5+", icon: Target },
];

const focusAreas = [
    { title: "Embedded Systems", icon: Cpu, desc: "Architecting robust firmware and hardware integrations for STM32 & ESP32." },
    { title: "IoT Solutions", icon: Target, desc: "Connecting the physical world with cloud-based intelligence and data." },
    { title: "Circuit Design", icon: CircuitBoard, desc: "Designing precision PCBs for specialized industrial applications." },
];

const About = () => {
    return (
        <section id="about" className="py-16 sm:py-20 md:py-24 bg-white">
            <div className="section-container px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-20 items-start">

                    {/* Left side — Animated Stats & Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-5/12"
                    >
                        {/* Animated Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.15 }}
                                    viewport={{ once: true }}
                                    className="bg-slate-50 border border-slate-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary/40 mx-auto mb-2 sm:mb-3 group-hover:text-primary transition-colors" />
                                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-text mb-1">{stat.value}</p>
                                    <p className="text-[9px] sm:text-[10px] font-bold text-neutral-text/40 uppercase tracking-wider">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Decorative animated card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="relative bg-gradient-to-br from-primary to-blue-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                            <div className="relative z-10">
                                <h4 className="text-base sm:text-lg font-bold mb-2">Currently Exploring</h4>
                                <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
                                    Edge AI on microcontrollers, LoRaWAN networks, and FPGA-based signal processing for next-gen communication systems.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Edge AI", "LoRaWAN", "FPGA", "5G"].map(tag => (
                                        <span key={tag} className="px-2.5 py-1 bg-white/15 rounded-lg text-[10px] sm:text-xs font-bold">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right side — Content */}
                    <div className="w-full lg:w-7/12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-3 sm:mb-4 block underline underline-offset-8 decoration-primary/30">Background</span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-neutral-text mb-6 sm:mb-8">Engineering with <span className="text-primary">Purpose</span> & Innovation</h2>

                            <p className="text-neutral-text/70 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                                I am Arpan Bhuva, an Electronics & Communication Engineering student passionate about building systems that solve real-world problems. My interest lies in the intersection of hardware and software, specifically in embedded systems and IoT.
                            </p>

                            <p className="text-neutral-text/60 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
                                From firmware to full-stack, I enjoy taking a project from concept to completion. I'm constantly exploring new technologies and applying them to create impactful solutions in the real world.
                            </p>

                            <div className="space-y-8 sm:space-y-10">
                                {/* Education */}
                                <div>
                                    <h4 className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl font-bold text-neutral-text mb-4 sm:mb-6">
                                        <GraduationCap className="text-primary w-5 h-5 sm:w-auto sm:h-auto" /> Education
                                    </h4>
                                    <div className="pl-4 sm:pl-5 border-l-2 border-primary/20 relative">
                                        <div className="absolute top-2 left-[-5px] w-2 h-2 rounded-full bg-primary" />
                                        <h5 className="font-bold text-neutral-text text-sm sm:text-base">Bachelor of Engineering in Electronics & Communication</h5>
                                        <p className="text-xs sm:text-sm text-neutral-text/50 font-medium">Expected 2025 | 2021 - 2025</p>
                                    </div>
                                </div>

                                {/* Focus Areas Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                                    {focusAreas.map((area, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                            className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all duration-300"
                                        >
                                            <area.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-2 sm:mb-3" />
                                            <h5 className="font-bold text-sm text-neutral-text mb-1">{area.title}</h5>
                                            <p className="text-[10px] sm:text-[11px] text-neutral-text/50 leading-snug">{area.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
