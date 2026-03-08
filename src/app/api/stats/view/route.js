import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
    try {
        if (!supabaseAdmin) {
            return NextResponse.json({ total_visits: 0 });
        }

        const { data, error } = await supabaseAdmin
            .from('site_visits')
            .select('total_visits')
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') throw error;

        return NextResponse.json({ total_visits: data?.total_visits || 0 });
    } catch (error) {
        console.error("Error fetching site visits:", error);
        return NextResponse.json({ total_visits: 0 }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        if (!supabaseAdmin) {
            return NextResponse.json({ success: false, error: "Supabase Admin not configured" }, { status: 503 });
        }

        let { data, error } = await supabaseAdmin
            .from('site_visits')
            .select('id, total_visits')
            .limit(1)
            .single();

        if (error && error.code === 'PGRST116') {
            const { data: newData, error: insertError } = await supabaseAdmin
                .from('site_visits')
                .insert([{ total_visits: 1 }])
                .select()
                .single();

            if (insertError) throw insertError;
            return NextResponse.json({ success: true, total_visits: 1 });
        } else if (error) {
            throw error;
        }

        const newTotal = (data.total_visits || 0) + 1;

        const { error: updateError } = await supabaseAdmin
            .from('site_visits')
            .update({
                total_visits: newTotal,
                updated_at: new Date().toISOString()
            })
            .eq('id', data.id);

        if (updateError) throw updateError;

        return NextResponse.json({ success: true, total_visits: newTotal });
    } catch (error) {
        console.error("Error recording site visit:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
