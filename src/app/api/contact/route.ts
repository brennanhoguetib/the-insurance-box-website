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
  } catch (error: any) {
    if (error?.issues) {
      return NextResponse.json({ ok: false, errors: error.issues }, { status: 400 });
    }
    console.error("/api/contact error", error);
    return NextResponse.json({ ok: false, message: error?.message || "Server error" }, { status: 500 });
  }
}


