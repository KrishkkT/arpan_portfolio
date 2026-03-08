"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Code2, PenTool, Globe } from "lucide-react";

const categoryIcons = {
    "Electronics": Cpu,
    "Programming": Code2,
    "Engineering Tools": PenTool,
    "Technologies": Globe,
};

const Skills = () => {
    const [skillCategories, setSkillCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/skills")
            .then((res) => res.json())
            .then((data) => {
                const categories = Object.keys(data).map((category) => ({
                    title: category,
                    icon: categoryIcons[category] || Globe,
                    skills: data[category],
                }));
                setSkillCategories(categories);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching skills:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section id="skills" className="py-16 sm:py-20 md:py-24 bg-background-soft">
                <div className="section-container px-4 sm:px-6">
                    <div className="flex justify-center">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (skillCategories.length === 0) {
        return null;
    }

const SkillBar = ({ name, level }) => (
    <div className="mb-3 sm:mb-4">
        <div className="flex justify-between mb-1.5 sm:mb-2">
            <span className="text-xs sm:text-sm font-bold text-neutral-text">{name}</span>
            <span className="text-xs sm:text-sm font-bold text-primary">{level}%</span>
        </div>
        <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-full bg-primary rounded-full relative"
            >
                <div className="absolute top-0 right-0 h-full w-2 bg-white/30 skew-x-[45deg]" />
            </motion.div>
        </div>
    </div>
);

const Skills = () => {
    return (
        <section id="skills" className="bg-white py-16 sm:py-20 md:py-24">
            <div className="section-container px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-16">
                    <div className="w-full lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-3 sm:mb-4 block">Skills</span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-neutral-text mb-4 sm:mb-6">Expertise & Specialized Knowledge</h2>
                            <p className="text-neutral-text/60 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                                As an EC Engineer, I've developed a diverse set of technical skills across hardware architecture, embedded software development, and modern technology frameworks.
                            </p>
                            <div className="grid grid-cols-4 lg:grid-cols-2 gap-3 sm:gap-4">
                                {[
                                    { label: "Hardware", count: "10+" },
                                    { label: "Software", count: "15+" },
                                    { label: "Research", count: "5+" },
                                    { label: "IoT", count: "8+" }
                                ].map((stat, i) => (
                                    <div key={i} className="p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
                                        <div className="text-lg sm:text-2xl font-bold text-primary mb-0.5 sm:mb-1">{stat.count}</div>
                                        <div className="text-[9px] sm:text-xs font-bold text-neutral-text/40 uppercase tracking-tight">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {skillCategories.map((category, idx) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
                                    <div className="p-2.5 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                        <category.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-neutral-text">{category.title}</h3>
                                </div>
                                {category.skills.map((skill) => (
                                    <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
