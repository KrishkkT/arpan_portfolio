import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = supabaseAdmin;
    if (!supabase) {
      return NextResponse.json([]);
    }

    const { data, error } = await supabase
      .from("section_visibility")
      .select("*")
      .order("section_name");

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching section visibility:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const supabase = supabaseAdmin;
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const { section_name, is_visible } = await request.json();

    const { data, error } = await supabase
      .from("section_visibility")
      .update({ is_visible, updated_at: new Date().toISOString() })
      .eq("section_name", section_name)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error updating section visibility:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}