"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, CheckCircle, Github, Linkedin } from "lucide-react";
import axios from "axios";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        try {
            await axios.post("/api/contact", formData);
            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error(error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="py-16 sm:py-20 md:py-24 bg-white overflow-hidden">
            <div className="section-container px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-3 sm:mb-4 block">Get In Touch</span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-neutral-text mb-6 sm:mb-8">Let&apos;s build something <span className="text-primary italic font-serif leading-none">innovative</span>.</h2>

                            <div className="space-y-5 sm:space-y-8 mb-8 sm:mb-12">
                                <div className="flex items-start gap-4 sm:gap-6">
                                    <div className="p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 text-primary shrink-0">
                                        <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-[10px] sm:text-sm font-bold text-neutral-text/40 uppercase tracking-wider mb-1">Email Me</h4>
                                        <p className="text-base sm:text-xl font-bold text-neutral-text break-all">trialemaila1@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 sm:gap-6">
                                    <div className="p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 text-primary shrink-0">
                                        <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] sm:text-sm font-bold text-neutral-text/40 uppercase tracking-wider mb-1">LinkedIn</h4>
                                        <a href="https://www.linkedin.com/in/arpan-bhuva/" target="_blank" className="text-base sm:text-xl font-bold text-neutral-text hover:text-primary transition-colors">arpan-bhuva</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 sm:gap-6">
                                    <div className="p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 text-primary shrink-0">
                                        <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] sm:text-sm font-bold text-neutral-text/40 uppercase tracking-wider mb-1">GitHub</h4>
                                        <a href="https://github.com/Arpanbhuva" target="_blank" className="text-base sm:text-xl font-bold text-neutral-text hover:text-primary transition-colors">@Arpanbhuva</a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-slate-100 relative"
                        >
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className="text-xs sm:text-sm font-bold text-neutral-text/50 ml-1">Your Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-sm sm:text-base"
                                        />
                                    </div>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className="text-xs sm:text-sm font-bold text-neutral-text/50 ml-1">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-sm sm:text-base"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-bold text-neutral-text/50 ml-1">Subject</label>
                                    <input
                                        required
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Project Inquiry"
                                        className="w-full bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-sm sm:text-base"
                                    />
                                </div>

                                <div className="space-y-1.5 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-bold text-neutral-text/50 ml-1">Message</label>
                                    <textarea
                                        required
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Tell me about your project..."
                                        className="w-full bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none text-sm sm:text-base"
                                    ></textarea>
                                </div>

                                <button
                                    disabled={status === "sending"}
                                    type="submit"
                                    className="w-full btn-primary flex items-center justify-center gap-3 py-3.5 sm:py-4 text-base sm:text-lg font-bold disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === "sending" ? (
                                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>Send Message <Send className="w-4 h-4 sm:w-5 sm:h-5" /></>
                                    )}
                                </button>
                            </form>

                            <AnimatePresence>
                                {status === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-x-4 sm:inset-x-10 bottom-4 sm:bottom-10 p-4 sm:p-6 bg-emerald-500 rounded-xl sm:rounded-2xl text-white shadow-xl shadow-emerald-500/20 flex items-center gap-3 sm:gap-4"
                                    >
                                        <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" />
                                        <div>
                                            <p className="font-bold text-sm sm:text-base">Message Sent Successfully!</p>
                                            <p className="text-xs sm:text-sm opacity-90">I'll get back to you as soon as possible.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
