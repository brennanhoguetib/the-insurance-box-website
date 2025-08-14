import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";
import { createLead } from "@/lib/crm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Basic rate limit placeholder; real impl would use edge KV or IP header
    const start = Number(body?.ttfb ?? 0);
    const parsed = contactSchema.parse({ ...body, ttfb: start });
    await createLead({
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone,
      zip: parsed.zip,
      interests: parsed.interests,
      message: parsed.message,
      source: parsed.source,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const err = error as { issues?: unknown; message?: string };
    if (err?.issues) {
      return NextResponse.json({ ok: false, errors: err.issues }, { status: 400 });
    }
    console.error("/api/contact error", err);
    return NextResponse.json({ ok: false, message: err?.message || "Server error" }, { status: 500 });
  }
}


