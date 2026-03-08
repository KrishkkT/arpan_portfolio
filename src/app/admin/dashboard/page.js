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
    Award
} from "lucide-react";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

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

                    <button className="btn-primary flex items-center gap-2">
                        <Plus className="w-5 h-5" /> Add Project
                    </button>
                </header>

                {/* Overview Content */}
                {activeTab === "overview" && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            {[
                                { label: "Site Visits", value: "1,284", change: "+12%" },
                                { label: "Project Clicks", value: "456", change: "+5%" },
                                { label: "New Messages", value: "12", change: "+2" },
                                { label: "GitHub Stars", value: "84", change: "+4" },
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

                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 min-h-[400px] flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                        <Settings className="w-10 h-10 text-neutral-text/10" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-text mb-2">Section Under Construction</h3>
                    <p className="text-neutral-text/40 max-w-sm mb-8">
                        We're currently building out the full management capabilities for the {activeTab} section.
                    </p>
                    <button className="btn-outline">Go to Documentation</button>
                </div>
            </div>
        </div>
    );
}
