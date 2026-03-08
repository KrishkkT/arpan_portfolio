"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, Code2, Cpu, FlaskConical } from "lucide-react";
import axios from "axios";

const filters = [
    { name: "All", value: "All", icon: Code2 },
    { name: "Hardware", value: "Hardware", icon: Cpu },
    { name: "Software", value: "Software", icon: Code2 },
    { name: "Research", value: "Research", icon: FlaskConical },
];

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-card group flex flex-col h-full p-4 sm:p-6"
        >
            <div className="relative overflow-hidden rounded-lg sm:rounded-xl mb-4 sm:mb-6 bg-slate-50 border border-slate-100 aspect-video flex items-center justify-center">
                {project.imageUrl ? (
                    <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="p-6 sm:p-8 bg-blue-50/50 rounded-full group-hover:bg-blue-100/50 transition-colors">
                        {project.category === "Hardware" ? (
                            <Cpu className="w-8 h-8 sm:w-12 sm:h-12 text-primary/40 group-hover:text-primary transition-colors" />
                        ) : (
                            <Code2 className="w-8 h-8 sm:w-12 sm:h-12 text-primary/40 group-hover:text-primary transition-colors" />
                        )}
                    </div>
                )}
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-text group-hover:text-primary transition-colors line-clamp-2">
                        {project.name}
                    </h3>
                    <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 bg-amber-50 rounded-lg text-amber-700 text-[10px] sm:text-xs font-bold border border-amber-100 shrink-0">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {project.stars || 0}
                    </div>
                </div>

                <p className="text-neutral-text/60 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                    {project.technologies?.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 bg-slate-100 text-slate-600 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wider"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-slate-50 mt-auto">
                <a
                    href={project.githubLink}
                    target="_blank"
                    className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-neutral-text/50 hover:text-primary transition-colors"
                >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Code
                </a>
                <a
                    href={project.demoLink || "#"}
                    className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-primary hover:text-accent-electric transition-colors"
                >
                    Demo <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get("/api/projects");
                setProjects(res.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = activeFilter === "All"
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section id="projects" className="py-16 sm:py-20 md:py-24">
            <div className="section-container px-4 sm:px-6">
                <div className="text-center mb-10 sm:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-3 sm:mb-4 block">Portfolio</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-neutral-text mb-4 sm:mb-6">Recent Work</h2>
                        <p className="text-neutral-text/60 max-w-2xl mx-auto text-sm sm:text-base">
                            A selection of my engineering projects ranging from embedded systems and hardware design to full-stack applications.
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
                    {filters.map((filter) => {
                        const Icon = filter.icon;
                        return (
                            <button
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${activeFilter === filter.value
                                    ? "bg-primary text-white shadow-lg shadow-blue-500/20 active:scale-95"
                                    : "bg-white text-neutral-text/60 hover:bg-slate-50 border border-slate-100"
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                {filter.name}
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="glass-card animate-pulse p-4 sm:p-6">
                                <div className="aspect-video bg-slate-100 rounded-lg sm:rounded-xl mb-4 sm:mb-6"></div>
                                <div className="h-5 sm:h-6 bg-slate-100 rounded-md w-3/4 mb-3 sm:mb-4"></div>
                                <div className="h-3 sm:h-4 bg-slate-100 rounded-md w-full mb-2"></div>
                                <div className="h-3 sm:h-4 bg-slate-100 rounded-md w-full mb-4 sm:mb-6"></div>
                                <div className="flex gap-2">
                                    <div className="h-5 sm:h-6 bg-slate-100 rounded-md w-16"></div>
                                    <div className="h-5 sm:h-6 bg-slate-100 rounded-md w-16"></div>
                                </div>
                            </div>
                        ))
                    ) : filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <ProjectCard key={project._id || project.id || index} project={project} index={index} />
                        ))
                    ) : (
                        <div className="col-span-full py-16 sm:py-20 text-center">
                            <p className="text-neutral-text/40 italic text-sm sm:text-base">No projects found for this category yet.</p>
                        </div>
                    )}
                </div>

                <div className="mt-10 sm:mt-16 text-center">
                    <a
                        href="https://github.com/Arpanbhuva"
                        target="_blank"
                        className="btn-outline inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                    >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" /> More on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
