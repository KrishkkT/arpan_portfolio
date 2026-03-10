import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (id) {
            const { data, error } = await supabaseAdmin
                .from('settings')
                .select('*')
                .eq('id', id)
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            return NextResponse.json(data || { id, value: "" });
        }

        const { data, error } = await supabaseAdmin
            .from('settings')
            .select('*');

        if (error) throw error;

        // Convert array to object for easier use
        const settings = data.reduce((acc, curr) => {
            acc[curr.id] = curr.value;
            return acc;
        }, {});

        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { id, value } = body;

        if (!id) {
            return NextResponse.json({ error: "No ID provided" }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('settings')
            .upsert({ id, value, updated_at: new Date().toISOString() })
            .select();

        if (error) throw error;
        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
