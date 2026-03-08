import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
    try {
        let projects = [];
        let error = null;

        if (supabaseAdmin) {
            const { data, error: queryError } = await supabaseAdmin
                .from('projects')
                .select('*')
                .order('last_update', { ascending: false });

            projects = data;
            error = queryError;
        } else {
            console.warn("Supabase client not initialized. Check your environment variables.");
        }

        if (error) {
            console.error("Supabase Error:", error);
            // Fall through to demo data on error to keep UI working
        }

        // If no projects, return some demo data
        if (!projects || projects.length === 0) {
            return NextResponse.json([
                {
                    id: "demo1",
                    name: "Smart Agriculture IoT System (Demo)",
                    description: "An automated irrigation and monitoring system using ESP32, soil sensors, and a mobile dashboard.",
                    technologies: ["ESP32", "C++", "MQTT", "React"],
                    githubLink: "https://github.com/Arpanbhuva",
                    stars: 12,
                    category: "Hardware",
                    lastUpdate: new Date(),
                },
                {
                    id: "demo2",
                    name: "Embedded RTOS Kernel (Demo)",
                    description: "A lightweight real-time operating system kernel implemented for ARM Cortex-M microcontrollers.",
                    technologies: ["Embedded C", "ARM Architecture", "RTOS"],
                    githubLink: "https://github.com/Arpanbhuva",
                    stars: 25,
                    category: "Software",
                    lastUpdate: new Date(),
                },
                {
                    id: "demo3",
                    name: "Biomedical Signal Analyzer (Demo)",
                    description: "Processing and analyzing ECG signals to detect arrhythmias using digital signal processing.",
                    technologies: ["MATLAB", "DSP", "Machine Learning"],
                    githubLink: "https://github.com/Arpanbhuva",
                    stars: 8,
                    category: "Research",
                    lastUpdate: new Date(),
                }
            ]);
        }

        return NextResponse.json(projects.map(p => ({
            ...p,
            githubLink: p.github_link,
            lastUpdate: p.last_update,
            imageUrl: p.image_url,
            isFeatured: p.is_featured,
            isGitHubSync: p.is_github_sync
        })));
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { data, error } = await supabaseAdmin
            .from('projects')
            .insert([body])
            .select();

        if (error) throw error;
        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { id, ...updateData } = body;

        updateData.updated_at = new Date().toISOString();

        const { data, error } = await supabaseAdmin
            .from('projects')
            .update(updateData)
            .eq('id', id)
            .select();

        if (error) throw error;
        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "No ID provided" }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ message: "Project deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
