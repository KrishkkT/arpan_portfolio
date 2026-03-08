import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const all = searchParams.get('all') === 'true';

        const supabase = supabaseAdmin;
        if (!supabase) {
            return NextResponse.json([]);
        }

        let query = supabase.from("certificates").select("*").order("created_at", { ascending: false });
        if (!all) {
            query = query.eq("is_visible", true);
        }

        const { data, error } = await query;

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching certificates:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const supabase = supabaseAdmin;
        if (!supabase) {
            return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
        }

        const body = await request.json();

        const { data, error } = await supabase
            .from("certificates")
            .insert([body])
            .select();

        if (error) throw error;

        return NextResponse.json(data[0], { status: 201 });
    } catch (error) {
        console.error("Error creating certificate:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const supabase = supabaseAdmin;
        if (!supabase) {
            return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
        }

        const body = await request.json();
        const { id, ...updateData } = body;
        updateData.updated_at = new Date().toISOString();

        const { data, error } = await supabase
            .from("certificates")
            .update(updateData)
            .eq("id", id)
            .select();

        if (error) throw error;

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error("Error updating certificate:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const supabase = supabaseAdmin;
        if (!supabase) {
            return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
        }

        const url = new URL(request.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "No ID provided" }, { status: 400 });
        }

        const { error } = await supabase
            .from("certificates")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return NextResponse.json({ message: "Certificate deleted successfully" });
    } catch (error) {
        console.error("Error deleting certificate:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
