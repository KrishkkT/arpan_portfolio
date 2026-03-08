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

    let query = supabase.from("skills").select("*").order("category");
    if (!all) {
      query = query.eq("is_visible", true);
    }

    const { data, error } = await query;

    if (error) throw error;

    if (all) {
      return NextResponse.json(data);
    }

    // Group by category for homepage
    const groupedSkills = data.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    return NextResponse.json(groupedSkills);
  } catch (error) {
    console.error("Error fetching skills:", error);
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
      .from("skills")
      .update({ is_visible, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error updating skill visibility:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}