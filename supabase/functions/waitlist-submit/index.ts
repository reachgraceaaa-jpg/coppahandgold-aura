// Waitlist submission -> appends a row to the configured Google Sheet via the Lovable connector gateway.
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const SPREADSHEET_ID = "1YoH2QH8YTeIjVDgDzZ6hDkCTANjXH4OmI-2FqzcGSHg";
const SHEET_TAB = "Form Responses 1";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clean = (v: unknown, max = 200) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GOOGLE_SHEETS_API_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!GOOGLE_SHEETS_API_KEY) throw new Error("GOOGLE_SHEETS_API_KEY is not configured");

    const body = await req.json().catch(() => ({}));
    const first = clean(body.first, 100);
    const last = clean(body.last, 100);
    const email = clean(body.email, 255);
    const phone = clean(body.phone, 50);

    if (!first || !email || !isEmail(email)) {
      return new Response(JSON.stringify({ error: "Please share your name and a valid email." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const timestamp = new Date().toISOString();
    const range = `${SHEET_TAB}!A:E`;
    const url = `${GATEWAY}/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[timestamp, first, last, email, phone]],
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Sheets append failed", res.status, data);
      throw new Error(`Sheets append failed [${res.status}]`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("waitlist-submit error:", message);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
