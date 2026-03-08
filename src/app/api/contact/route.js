import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
    try {
        const body = await req.json();

        if (!supabase) {
            return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
        }

        const { data, error } = await supabase
            .from('contacts')
            .insert([body])
            .select();

        if (error) throw error;

        // SYNC TO EMAIL (CONCEPTUAL)
        // In a real environment, you would use a service like Resend or EmailJS
        // For now, we'll log it and the user can add their API key to .env
        console.log(`Email would be sent to trialemaila1@gmail.com with content:`, body);

        // SYNC TO GOOGLE SHEETS (CONCEPTUAL)
        // If the user provides a GOOGLE_SHEET_HOOK_URL, we can post to it
        if (process.env.GOOGLE_SHEET_HOOK_URL) {
            try {
                await fetch(process.env.GOOGLE_SHEET_HOOK_URL, {
                    method: 'POST',
                    body: JSON.stringify(body)
                });
            } catch (err) {
                console.error("Google Sheet Sync Failed:", err);
            }
        }

        return NextResponse.json({ success: true, data: data[0] }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function GET() {
    try {
        if (!supabase) {
            return NextResponse.json([]);
        }

        const { data: messages, error } = await supabase
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
