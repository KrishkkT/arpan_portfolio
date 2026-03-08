"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Cpu, Lock, Mail } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result.error) {
            setError("Invalid credentials. Please try again.");
        } else {
            router.push("/admin/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl border border-slate-100 p-12">
                <div className="flex flex-col items-center mb-10">
                    <div className="p-4 bg-primary rounded-2xl mb-6">
                        <Cpu className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-neutral-text font-heading">Admin Portal</h1>
                    <p className="text-neutral-text/50 text-sm mt-2">Manage your portfolio content</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-text/50 ml-1">Admin Email</label>
                        <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-text/20" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-slate-50 px-14 py-4 rounded-2xl border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                placeholder="admin@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-text/50 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-text/20" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-slate-50 px-14 py-4 rounded-2xl border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary py-4 text-lg font-bold"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
