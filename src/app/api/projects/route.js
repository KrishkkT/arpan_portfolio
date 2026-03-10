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

        const insertData = {
            name: body.name,
            description: body.description,
            category: body.category || 'Software',
            github_link: body.github_link || body.githubLink,
            stars: parseInt(body.stars) || 0,
            image_url: body.image_url || body.imageUrl,
            is_featured: body.is_featured ?? body.isFeatured ?? false,
            is_github_sync: body.is_github_sync ?? body.isGitHubSync ?? false,
            is_visible: body.is_visible ?? body.isVisible ?? true
        };

        const { data, error } = await supabaseAdmin
            .from('projects')
            .insert([insertData])
            .select();

        if (error) throw error;
        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        console.error("POST Project Error:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ error: "No ID provided" }, { status: 400 });
        }

        // Handle demo data
        if (id.toString().startsWith("demo")) {
            return NextResponse.json({ message: "Demo project updated (simulated)" });
        }

        const updateData = {};
        if (body.name !== undefined) updateData.name = body.name;
        if (body.description !== undefined) updateData.description = body.description;
        if (body.category !== undefined) updateData.category = body.category;

        const github_link = body.github_link !== undefined ? body.github_link : body.githubLink;
        if (github_link !== undefined) updateData.github_link = github_link;

        if (body.stars !== undefined) updateData.stars = parseInt(body.stars) || 0;

        const image_url = body.image_url !== undefined ? body.image_url : body.imageUrl;
        if (image_url !== undefined) updateData.image_url = image_url;

        const is_featured = body.is_featured !== undefined ? body.is_featured : body.isFeatured;
        if (is_featured !== undefined) updateData.is_featured = is_featured;

        const is_github_sync = body.is_github_sync !== undefined ? body.is_github_sync : body.isGitHubSync;
        if (is_github_sync !== undefined) updateData.is_github_sync = is_github_sync;

        const is_visible = body.is_visible !== undefined ? body.is_visible : body.isVisible;
        if (is_visible !== undefined) updateData.is_visible = is_visible;

        updateData.last_update = new Date().toISOString();

        const { data, error } = await supabaseAdmin
            .from('projects')
            .update(updateData)
            .eq('id', id)
            .select();

        if (error) throw error;
        return NextResponse.json(data[0]);
    } catch (error) {
        console.error("PUT Project Error:", error);
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

        // Handle demo data
        if (id.toString().startsWith("demo")) {
            return NextResponse.json({ message: "Demo project deleted (simulated)" });
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
