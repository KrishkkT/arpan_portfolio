import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    try {
        if (!supabase) {
            return NextResponse.redirect(new URL('/resume.pdf', 'http://localhost:5000'));
        }

        const { data, error } = await supabase
            .from('settings')
            .select('value')
            .eq('id', 'resume_url')
            .single();

        if (error || !data || !data.value) {
            return NextResponse.redirect(new URL('/resume.pdf', 'http://localhost:5000'));
        }

        return NextResponse.redirect(new URL(data.value));
    } catch (error) {
        return NextResponse.redirect(new URL('/resume.pdf', 'http://localhost:5000'));
    }
}
