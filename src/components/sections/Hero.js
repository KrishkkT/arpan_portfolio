"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Download } from "lucide-react";
import Link from "next/link";

const Hero = () => {
    const [resumeUrl, setResumeUrl] = React.useState("/resume.pdf");

    React.useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await fetch('/api/resume');
                const data = await res.json();
                if (data.url) setResumeUrl(data.url);
            } catch (err) {
                console.error("Resume fetch failed");
            }
        };
        fetchResume();
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background-soft">
            {/* Background Animated Gradient / Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                        opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-secondary rounded-full blur-[120px]"
                />
            </div>

            <div className="section-container relative z-10 flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-12 px-4 sm:px-6">
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-4 md:mb-6 text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                            Electronics & Communication Engineer
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-4 md:mb-6 tracking-tight text-neutral-text leading-tight">
                            Arpan <span className="text-primary">Bhuva</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-neutral-text/70 mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Building innovative solutions in electronics, embedded systems, and technology. Passionate about bridging the gap between hardware and software.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                            <Link href="#projects" className="btn-primary flex items-center justify-center gap-2">
                                View Projects <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href={resumeUrl}
                                target="_blank"
                                className="btn-outline flex items-center justify-center gap-2"
                                id="resume-link"
                            >
                                <Download className="w-4 h-4" /> Download Resume
                            </a>
                        </div>

                        <div className="mt-8 md:mt-12 flex justify-center lg:justify-start items-center space-x-6 text-neutral-text/50">
                            <a href="https://github.com/Arpanbhuva" target="_blank" className="hover:text-primary transition-colors p-2">
                                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                            </a>
                            <a href="https://www.linkedin.com/in/arpan-bhuva/" target="_blank" className="hover:text-primary transition-colors p-2">
                                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Photo */}
                <div className="flex-1 w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[400px]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative mx-auto"
                    >
                        <div className="relative z-10 p-1.5 sm:p-2 bg-white rounded-[30px] sm:rounded-[35px] shadow-2xl border border-blue-50/50">
                            <div className="w-full aspect-square sm:aspect-[4/5] flex items-center justify-center bg-slate-50 rounded-[26px] sm:rounded-[30px] overflow-hidden">
                                <motion.img
                                    src="/profile-arpan.jpg"
                                    alt="Arpan Bhuva"
                                    className="w-full h-full object-cover object-top"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>

                            {/* Floating elements */}
                            <motion.div
                                animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-100 z-20"
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-secondary rounded-full animate-pulse" />
                                    <span className="text-[10px] sm:text-xs font-bold text-neutral-text">IoT Architect</span>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-100 z-20"
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary rounded-full animate-pulse" />
                                    <span className="text-[10px] sm:text-xs font-bold text-neutral-text">Embedded Developer</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Background Decorative Rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/10 rounded-full -z-10 animate-[spin_20s_linear_infinite]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-secondary/10 rounded-full -z-10 animate-[spin_15s_linear_infinite_reverse]" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
