"use client";
import React, { useEffect, useState } from "react";
import { Award, ExternalLink } from "lucide-react";

export default function Certificates() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const res = await fetch("/api/certificates");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setCertificates(data);
                }
            } catch (error) {
                console.error("Failed to fetch certificates:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    if (loading) {
        return (
            <section id="certificates" className="py-20 bg-white">
                <div className="section-container">
                    <div className="flex justify-center">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (certificates.length === 0) {
        return null; // hide section if no certificates
    }

    return (
        <section id="certificates" className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="section-container relative z-10">
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                        Achievements
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-neutral-text font-heading">
                        Licenses & <span className="text-primary">Certifications</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert) => (
                        <div
                            key={cert.id}
                            data-aos="fade-up"
                            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                                <Award className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                            </div>

                            <h3 className="text-xl font-bold text-neutral-text mb-2 line-clamp-2">
                                {cert.name}
                            </h3>
                            <p className="text-neutral-text/60 font-medium mb-1">
                                {cert.issuer}
                            </p>
                            <p className="text-sm text-neutral-text/40 mb-6">
                                Issued: {cert.date}
                            </p>

                            {cert.credential_url && (
                                <a
                                    href={cert.credential_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors"
                                >
                                    Show credential <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
