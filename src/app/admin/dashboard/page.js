"use client";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    Settings,
    MessageSquare,
    LogOut,
    Plus,
    BarChart3,
    Github,
    Award,
    Eye,
    FileText
} from "lucide-react";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");
    const [sectionVisibility, setSectionVisibility] = useState([]);
    const [loadingVisibility, setLoadingVisibility] = useState(false);
    const [stats, setStats] = useState({
        projects: 0,
        messages: 0,
        githubStars: 0,
        siteVisits: 0,
    });
    const [skills, setSkills] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [messagesList, setMessagesList] = useState([]);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'project', 'skill', 'experience', 'certificate'
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
        if (activeTab === "overview") {
            fetchStats();
        }
        if (activeTab === "projects") {
            fetchProjects();
        }
        if (activeTab === "certifications") {
            fetchCertificates();
        }
        if (activeTab === "messages") {
            fetchMessages();
        }
        if (activeTab === "section-visibility") {
            fetchSectionVisibility();
        }
        if (activeTab === "content-management") {
            fetchContentData();
        }
    }, [status, router, activeTab]);

    const fetchContentData = async () => {
        try {
            const [skillsRes, experiencesRes, projectsRes] = await Promise.all([
                fetch("/api/skills?all=true"),
                fetch("/api/experiences?all=true"),
                fetch("/api/projects")
            ]);
            const skillsData = await skillsRes.json();
            const experiencesData = await experiencesRes.json();
            const projectsData = await projectsRes.json();

            setSkills(skillsData);
            setExperiences(experiencesData);
            setProjects(projectsData);
        } catch (error) {
            console.error("Error fetching content data:", error);
        }
    };

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const fetchCertificates = async () => {
        try {
            const res = await fetch("/api/certificates?all=true");
            const data = await res.json();
            setCertificates(data);
        } catch (error) {
            console.error("Error fetching certificates:", error);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            setMessagesList(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const toggleSkillVisibility = async (id, currentVisibility) => {
        try {
            await fetch("/api/skills", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, is_visible: !currentVisibility }),
            });
            await fetchContentData();
        } catch (error) {
            console.error("Error updating skill visibility:", error);
        }
    };

    const toggleExperienceVisibility = async (id, currentVisibility) => {
        try {
            await fetch("/api/experiences", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, is_visible: !currentVisibility }),
            });
            await fetchContentData();
        } catch (error) {
            console.error("Error updating experience visibility:", error);
        }
    };

    const toggleProjectVisibility = async (id, currentVisibility) => {
        try {
            await fetch("/api/projects", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, is_visible: !currentVisibility }),
            });
            await fetchContentData();
        } catch (error) {
            console.error("Error updating project visibility:", error);
        }
    };

    const fetchStats = async () => {
        try {
            // Fetch projects count
            const projectsRes = await fetch("/api/projects");
            const projectsData = await projectsRes.json();
            const projectsCount = Array.isArray(projectsData) ? projectsData.length : 0;

            // Fetch messages count
            const messagesRes = await fetch("/api/contact");
            const messagesData = await messagesRes.json();
            const messagesCount = Array.isArray(messagesData) ? messagesData.length : 0;

            // For GitHub stars, we can sum from projects
            const githubStars = Array.isArray(projectsData)
                ? projectsData.reduce((sum, project) => sum + (project.stars || 0), 0)
                : 0;

            const siteVisitsRes = await fetch("/api/stats/view");
            const siteVisitsData = await siteVisitsRes.json();
            const siteVisits = siteVisitsData.total_visits || 0;

            setStats({
                projects: projectsCount,
                messages: messagesCount,
                githubStars,
                siteVisits,
            });
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const fetchSectionVisibility = async () => {
        try {
            const response = await fetch("/api/section-visibility");
            const data = await response.json();
            setSectionVisibility(data);
        } catch (error) {
            console.error("Error fetching section visibility:", error);
        }
    };

    const toggleSectionVisibility = async (sectionName, currentVisibility) => {
        setLoadingVisibility(true);
        try {
            const response = await fetch("/api/section-visibility", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    section_name: sectionName,
                    is_visible: !currentVisibility,
                }),
            });
            if (response.ok) {
                await fetchSectionVisibility(); // Refresh the data
            }
        } catch (error) {
            console.error("Error updating section visibility:", error);
        } finally {
            setLoadingVisibility(false);
        }
    };

    const handleSave = async (formData) => {
        let endpoint = "";
        let fetchFn = null;
        if (modalType === "project") { endpoint = "/api/projects"; fetchFn = fetchProjects; }
        else if (modalType === "skill") { endpoint = "/api/skills"; fetchFn = fetchContentData; }
        else if (modalType === "experience") { endpoint = "/api/experiences"; fetchFn = fetchContentData; }
        else if (modalType === "certificate") { endpoint = "/api/certificates"; fetchFn = fetchCertificates; }

        if (!endpoint) return;

        try {
            await fetch(endpoint, {
                method: editingItem ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            await fetchFn();
            setIsModalOpen(false);
            setEditingItem(null);
        } catch (error) {
            console.error("Error saving item:", error);
        }
    };

    const handleDelete = async (type, id) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        let endpoint = "";
        let fetchFn = null;
        if (type === "project") { endpoint = "/api/projects"; fetchFn = fetchProjects; }
        else if (type === "skill") { endpoint = "/api/skills"; fetchFn = fetchContentData; }
        else if (type === "experience") { endpoint = "/api/experiences"; fetchFn = fetchContentData; }
        else if (type === "certificate") { endpoint = "/api/certificates"; fetchFn = fetchCertificates; }

        if (!endpoint) return;

        try {
            await fetch(`${endpoint}?id=${id}`, { method: "DELETE" });
            await fetchFn();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const openModal = (type, item = null) => {
        setModalType(type);
        setEditingItem(item);
        setIsModalOpen(true);
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const menuItems = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "projects", label: "Manage Projects", icon: Briefcase },
        { id: "messages", label: "Messages", icon: MessageSquare },
        { id: "certifications", label: "Certifications", icon: Award },
        { id: "section-visibility", label: "Section Visibility", icon: Eye },
        { id: "content-management", label: "Content Management", icon: FileText },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <div className="w-72 bg-white border-r border-slate-100 flex flex-col p-6">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                        <LayoutDashboard className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-xl text-neutral-text font-heading">Admin Panel</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === item.id
                                ? "bg-primary text-white shadow-lg shadow-blue-500/20"
                                : "text-neutral-text/40 hover:bg-slate-50 hover:text-neutral-text"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all mt-auto"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10 overflow-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-text font-heading">
                            Welcome back, Arpan
                        </h1>
                        <p className="text-neutral-text/40 text-sm font-medium mt-1">
                            Here's what's happening with your portfolio today.
                        </p>
                    </div>

                    <button onClick={() => openModal('project')} className="btn-primary flex items-center gap-2">
                        <Plus className="w-5 h-5" /> Add Project
                    </button>
                </header>

                {/* Overview Content */}
                {activeTab === "overview" && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            {[
                                { label: "Site Visits", value: stats.siteVisits.toLocaleString(), change: "+12%" },
                                { label: "Project Clicks", value: stats.projects.toString(), change: "+5%" },
                                { label: "New Messages", value: stats.messages.toString(), change: "+2" },
                                { label: "GitHub Stars", value: stats.githubStars.toString(), change: "+4" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100">
                                    <p className="text-sm font-bold text-neutral-text/40 uppercase tracking-widest mb-2">{stat.label}</p>
                                    <div className="flex items-end justify-between">
                                        <h3 className="text-3xl font-bold text-neutral-text leading-none">{stat.value}</h3>
                                        <span className="text-emerald-500 font-bold text-sm">{stat.change}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Settings Card */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 mb-10">
                            <h3 className="text-xl font-bold text-neutral-text mb-6">Quick Settings</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <label className="block text-sm font-bold text-neutral-text/40 uppercase tracking-widest mb-3">Resume URL</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                                            placeholder="https://drive.google.com/..."
                                            onBlur={async (e) => {
                                                const url = e.target.value;
                                                if (!url) return;
                                                await fetch('/api/resume', {
                                                    method: 'POST',
                                                    body: JSON.stringify({ url })
                                                });
                                                alert("Resume URL updated!");
                                            }}
                                        />
                                        <button className="btn-outline text-xs">Update</button>
                                    </div>
                                    <p className="text-[11px] text-neutral-text/30 mt-3 italic">Link your PDF resume from Google Drive or Cloudinary.</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Section Visibility Content */}
                {activeTab === "section-visibility" && (
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                        <h3 className="text-xl font-bold text-neutral-text mb-6">Section Visibility Management</h3>
                        <p className="text-neutral-text/40 mb-8">
                            Control which sections are visible on your portfolio website.
                        </p>
                        <div className="space-y-6">
                            {sectionVisibility.map((section) => (
                                <div key={section.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                                    <div>
                                        <h4 className="font-bold text-neutral-text capitalize">
                                            {section.section_name} Section
                                        </h4>
                                        <p className="text-sm text-neutral-text/40">
                                            {section.is_visible ? "Currently visible on website" : "Currently hidden from website"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => toggleSectionVisibility(section.section_name, section.is_visible)}
                                        disabled={loadingVisibility}
                                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${section.is_visible ? "bg-primary" : "bg-slate-200"
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${section.is_visible ? "translate-x-7" : "translate-x-1"
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Content Management Content */}
                {activeTab === "content-management" && (
                    <div className="space-y-10">
                        {/* Skills Management */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-neutral-text">Skills Management</h3>
                                <button onClick={() => openModal('skill')} className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
                                    <Plus className="w-4 h-4" /> Add Skill
                                </button>
                            </div>
                            <p className="text-neutral-text/40 mb-8">
                                Control which skills are visible on your portfolio.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {skills.map((skill) => (
                                    <div key={skill.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                        <div>
                                            <h4 className="font-bold text-neutral-text">{skill.name}</h4>
                                            <p className="text-sm text-neutral-text/40">{skill.category}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => openModal('skill', skill)} className="btn-outline text-[10px] px-2 py-1">Edit</button>
                                            <button onClick={() => handleDelete('skill', skill.id)} className="btn-outline text-[10px] px-2 py-1 text-red-500 hover:bg-red-50">Delete</button>
                                            <button
                                                onClick={() => toggleSkillVisibility(skill.id, skill.is_visible)}
                                                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${skill.is_visible ? "bg-primary" : "bg-slate-200"}`}
                                            >
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${skill.is_visible ? "translate-x-6" : "translate-x-1"}`} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Experiences Management */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-neutral-text">Experience Management</h3>
                                <button onClick={() => openModal('experience')} className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
                                    <Plus className="w-4 h-4" /> Add Experience
                                </button>
                            </div>
                            <p className="text-neutral-text/40 mb-8">
                                Control which experiences are visible on your portfolio.
                            </p>
                            <div className="space-y-4">
                                {experiences.map((exp) => (
                                    <div key={exp.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                                        <div>
                                            <h4 className="font-bold text-neutral-text">{exp.role}</h4>
                                            <p className="text-sm text-neutral-text/40">{exp.company} • {exp.period}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => openModal('experience', exp)} className="btn-outline text-[10px] px-2 py-1">Edit</button>
                                            <button onClick={() => handleDelete('experience', exp.id)} className="btn-outline text-[10px] px-2 py-1 text-red-500 hover:bg-red-50">Delete</button>
                                            <button
                                                onClick={() => toggleExperienceVisibility(exp.id, exp.is_visible)}
                                                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${exp.is_visible ? "bg-primary" : "bg-slate-200"}`}
                                            >
                                                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${exp.is_visible ? "translate-x-7" : "translate-x-1"}`} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Projects Visibility Management */}
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-neutral-text mb-6">Projects Visibility</h3>
                            <p className="text-neutral-text/40 mb-8">
                                Control which projects are visible on your portfolio.
                            </p>
                            <div className="space-y-4">
                                {projects.map((project) => (
                                    <div key={project.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                                        <div>
                                            <h4 className="font-bold text-neutral-text">{project.name}</h4>
                                            <p className="text-sm text-neutral-text/40">{project.category}</p>
                                        </div>
                                        <button
                                            onClick={() => toggleProjectVisibility(project.id, project.is_visible)}
                                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${project.is_visible ? "bg-primary" : "bg-slate-200"}`}
                                        >
                                            <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${project.is_visible ? "translate-x-7" : "translate-x-1"}`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Projects Management Content */}
                {activeTab === "projects" && (
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-neutral-text">Project Management</h3>
                            <button onClick={() => openModal('project')} className="btn-primary flex items-center gap-2">
                                <Plus className="w-5 h-5" /> Add Project
                            </button>
                        </div>
                        <p className="text-neutral-text/40 mb-8">
                            Manage your portfolio projects and their details.
                        </p>
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div key={project.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-neutral-text">{project.name}</h4>
                                        <p className="text-sm text-neutral-text/40 line-clamp-2">{project.description}</p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                                {project.category}
                                            </span>
                                            <span className="text-xs text-neutral-text/40">
                                                ⭐ {project.stars || 0} stars
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal('project', project)} className="btn-outline text-xs">Edit</button>
                                        <button onClick={() => handleDelete('project', project.id)} className="btn-outline text-xs text-red-500 hover:bg-red-50">Delete</button>
                                    </div>
                                </div>
                            ))}
                            {projects.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-neutral-text/40">No projects found. Add your first project!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Certifications Management Content */}
                {activeTab === "certifications" && (
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-neutral-text">Certifications Management</h3>
                            <button onClick={() => openModal('certificate')} className="btn-primary flex items-center gap-2">
                                <Plus className="w-5 h-5" /> Add Certificate
                            </button>
                        </div>
                        <p className="text-neutral-text/40 mb-8">
                            Manage your certifications and achievements.
                        </p>
                        <div className="space-y-4">
                            {certificates.map((cert) => (
                                <div key={cert.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-neutral-text">{cert.name}</h4>
                                        <p className="text-sm text-neutral-text/40 line-clamp-1">{cert.issuer} • {cert.date}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal('certificate', cert)} className="btn-outline text-xs">Edit</button>
                                        <button onClick={() => handleDelete('certificate', cert.id)} className="btn-outline text-xs text-red-500 hover:bg-red-50">Delete</button>
                                    </div>
                                </div>
                            ))}
                            {certificates.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-neutral-text/40">No certificates found. Add your first certificate!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Messages Content */}
                {activeTab === "messages" && (
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-neutral-text">Messages List</h3>
                        </div>
                        <p className="text-neutral-text/40 mb-8">
                            View messages received from your contact form.
                        </p>
                        <div className="space-y-4">
                            {messagesList.map((msg) => (
                                <div key={msg.id} className="p-6 bg-slate-50 rounded-2xl">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-neutral-text">{msg.name}</h4>
                                            <p className="text-sm text-neutral-text/40">{msg.email}</p>
                                        </div>
                                        <span className="text-xs text-neutral-text/40">
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold mt-2">{msg.subject}</p>
                                    <p className="text-sm text-neutral-text/70 mt-1 whitespace-pre-wrap">{msg.message}</p>
                                </div>
                            ))}
                            {messagesList.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-neutral-text/40">No messages found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Placeholder for remaining tabs */}
                {!["overview", "projects", "certifications", "messages", "section-visibility", "content-management"].includes(activeTab) && (
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 min-h-[400px] flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                            <Settings className="w-10 h-10 text-neutral-text/10" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-text mb-2">Section Under Construction</h3>
                        <p className="text-neutral-text/40 max-w-sm mb-8">
                            We&apos;re currently building out the full management capabilities for the {activeTab} section.
                        </p>
                        <button className="btn-outline">Go to Documentation</button>
                    </div>
                )}

                <AdminModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    type={modalType}
                    item={editingItem}
                    onSave={handleSave}
                />
            </div>
        </div>
    );
}

function AdminModal({ isOpen, onClose, type, item, onSave }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (item) {
            setFormData(item);
        } else {
            setFormData({}); // Reset for new items
        }
    }, [item, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-[30px] shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold capitalize">{item ? 'Edit' : 'Add'} {type}</h3>
                    <button onClick={onClose} className="text-neutral-text/50 hover:text-red-500 font-bold">X</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Project Fields */}
                    {type === 'project' && (
                        <>
                            <div>
                                <label className="block text-sm font-bold mb-1">Name</label>
                                <input required type="text" name="name" value={formData.name || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Description</label>
                                <textarea required name="description" value={formData.description || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Category (Hardware / Software / Research)</label>
                                <input required type="text" name="category" value={formData.category || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">GitHub Link</label>
                                <input type="text" name="github_link" value={formData.github_link || formData.githubLink || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                        </>
                    )}

                    {/* Skill Fields */}
                    {type === 'skill' && (
                        <>
                            <div>
                                <label className="block text-sm font-bold mb-1">Category</label>
                                <input required type="text" name="category" value={formData.category || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Name</label>
                                <input required type="text" name="name" value={formData.name || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Level (0-100)</label>
                                <input required type="number" name="level" value={formData.level || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                        </>
                    )}

                    {/* Experience Fields */}
                    {type === 'experience' && (
                        <>
                            <div>
                                <label className="block text-sm font-bold mb-1">Role</label>
                                <input required type="text" name="role" value={formData.role || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Company</label>
                                <input required type="text" name="company" value={formData.company || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Location</label>
                                <input required type="text" name="location" value={formData.location || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Period (e.g. 2023 - Present)</label>
                                <input required type="text" name="period" value={formData.period || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Description</label>
                                <textarea required name="description" value={formData.description || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Type (e.g. Internship, Project)</label>
                                <input required type="text" name="type" value={formData.type || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                        </>
                    )}

                    {/* Certificate Fields */}
                    {type === 'certificate' && (
                        <>
                            <div>
                                <label className="block text-sm font-bold mb-1">Name</label>
                                <input required type="text" name="name" value={formData.name || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Issuer</label>
                                <input required type="text" name="issuer" value={formData.issuer || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Date</label>
                                <input required type="text" name="date" value={formData.date || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Credential URL</label>
                                <input type="text" name="credential_url" value={formData.credential_url || ""} onChange={handleChange} className="w-full border rounded-xl px-4 py-2" />
                            </div>
                        </>
                    )}

                    <div className="pt-4 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
                        <button type="submit" className="btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
