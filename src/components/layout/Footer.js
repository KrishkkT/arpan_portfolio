import React from "react";
import Link from "next/link";
import { Cpu, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-50 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 border-t border-slate-200">
            <div className="section-container px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-16">
                    <div className="sm:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4 sm:mb-6 group">
                            <div className="p-1.5 sm:p-2 bg-primary rounded-lg">
                                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <span className="text-lg sm:text-xl font-bold font-heading tracking-tight text-neutral-text">
                                Arpan<span className="text-primary">Bhuva</span>
                            </span>
                        </Link>
                        <p className="text-neutral-text/50 max-w-sm leading-relaxed text-sm sm:text-base">
                            Electronics & Communication Engineer building hardware and software solutions that push the boundaries of technology.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-text uppercase tracking-widest mb-4 sm:mb-6">Navigation</h4>
                        <ul className="space-y-2.5 sm:space-y-4">
                            {["About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link href={`#${item.toLowerCase()}`} className="text-sm text-neutral-text/60 hover:text-primary transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-text uppercase tracking-widest mb-4 sm:mb-6">Connect</h4>
                        <div className="flex gap-3 sm:gap-4">
                            <a href="https://github.com/Arpanbhuva" target="_blank" className="p-2.5 sm:p-3 bg-white border border-slate-200 rounded-lg sm:rounded-xl text-neutral-text/40 hover:text-primary hover:border-primary transition-all shadow-sm">
                                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/arpan-bhuva/" target="_blank" className="p-2.5 sm:p-3 bg-white border border-slate-200 rounded-lg sm:rounded-xl text-neutral-text/40 hover:text-primary hover:border-primary transition-all shadow-sm">
                                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                            <a href="mailto:trialemaila1@gmail.com" className="p-2.5 sm:p-3 bg-white border border-slate-200 rounded-lg sm:rounded-xl text-neutral-text/40 hover:text-primary hover:border-primary transition-all shadow-sm">
                                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-6 sm:pt-8 border-t border-slate-200 text-center text-xs sm:text-sm text-neutral-text/40 font-medium">
                    <p>© {new Date().getFullYear()} Arpan Bhuva. Built with Innovation.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
