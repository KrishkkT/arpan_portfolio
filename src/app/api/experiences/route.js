"use server";
import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    const supabase = supabaseAdmin;
    if (!supabase) {
      return NextResponse.json([]);
    }

    let query = supabase.from("experiences").select("*").order("created_at", { ascending: false });
    if (!all) {
      query = query.eq("is_visible", true);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const supabase = supabaseAdmin;
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const { id, is_visible } = await request.json();

    const { data, error } = await supabase
      .from("experiences")
      .update({ is_visible, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error updating experience visibility:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}