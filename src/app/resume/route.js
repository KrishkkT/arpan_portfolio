import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
    try {
        const origin = request.nextUrl.origin;
        if (!supabase) {
            return NextResponse.redirect(new URL('/resume.pdf', origin));
        }

        const { data, error } = await supabase
            .from('settings')
            .select('value')
            .eq('id', 'resume_url')
            .single();

        if (error || !data || !data.value) {
            return NextResponse.redirect(new URL('/resume.pdf', origin));
        }

        return NextResponse.redirect(new URL(data.value));
    } catch (error) {
        // Fallback to origin + /resume.pdf if anything fails
        const origin = request.nextUrl.origin;
        return NextResponse.redirect(new URL('/resume.pdf', origin));
    }
}
