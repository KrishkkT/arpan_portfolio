import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export async function POST(req) {
    try {
        const body = await req.json();

        if (!supabaseAdmin) {
            return NextResponse.json({ error: "Supabase Admin not configured" }, { status: 503 });
        }

        const { data, error } = await supabaseAdmin
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
                const sheetRes = await fetch(process.env.GOOGLE_SHEET_HOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                });
                const sheetData = await sheetRes.json();
                console.log("Google Sheet Sync Result:", sheetData);
            } catch (err) {
                console.error("Google Sheet Sync Failed:", err);
            }
        }

        return NextResponse.json({ success: true, id: data[0].id });
    } catch (error) {
        console.error("Contact Form Error:", error);
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
            .from('contacts')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ message: "Message deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function GET() {
    try {
        if (!supabaseAdmin) {
            return NextResponse.json([]);
        }

        const { data: messages, error } = await supabaseAdmin
            .from('contacts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
