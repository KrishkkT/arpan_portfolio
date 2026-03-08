import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
    try {
        if (!supabaseAdmin) return NextResponse.json({ url: "/resume.pdf" });

        const { data, error } = await supabaseAdmin
            .from('settings')
            .select('value')
            .eq('id', 'resume_url')
            .single();

        if (error || !data) return NextResponse.json({ url: "/resume.pdf" });
        return NextResponse.json({ url: data.value });
    } catch (error) {
        return NextResponse.json({ url: "/resume.pdf" });
    }
}

export async function POST(req) {
    try {
        if (!supabaseAdmin) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

        const { url } = await req.json();
        const { error } = await supabaseAdmin
            .from('settings')
            .upsert({ id: 'resume_url', value: url });

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
