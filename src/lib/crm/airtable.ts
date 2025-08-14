import Airtable from "airtable";
import type { LeadInput } from "./index";

function getClient() {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const baseId = process.env.AIRTABLE_BASE_ID as string;
  if (!apiKey || !baseId) {
    throw new Error("Missing Airtable credentials");
  }
  Airtable.configure({ apiKey });
  return Airtable.base(baseId);
}

export async function createLead(input: LeadInput) {
  const base = getClient();
  const tableName = process.env.AIRTABLE_LEADS_TABLE_NAME || "Leads";
  const cleanedInterests = (input.interests || []).map((s) => s.trim()).filter((s) => s.length > 0);
  const fields: Record<string, any> = {
    Name: input.name,
    Email: input.email,
    Phone: input.phone,
    Zip: input.zip,
    // First attempt: write as text (works with single line text columns and is visually clear)
    "Coverage Interest": cleanedInterests.join(", "),
    Message: input.message || "",
    Timestamp: new Date().toISOString(),
  };
  // Always tag leads from this site as Website Form to match your Airtable select option
  (fields as any).Source = "Website Form";
  try {
    await base(tableName).create([{ fields }]);
  } catch (err: any) {
    const code = err?.statusCode || err?.error?.statusCode;
    const errorCode = String(err?.error || "");
    const msg = String(err?.message || "");
    const isCoverageIssue =
      code === 422 ||
      errorCode.includes("MULTIPLE_CHOICE") ||
      msg.includes("Coverage Interest") ||
      msg.includes("MULTIPLE_CHOICE") ||
      msg.includes("INVALID_VALUE_FOR_COLUMN");
    if (!isCoverageIssue) throw err;

    // Second attempt: if field is a multi/single select, try sending options (array or single)
    if (cleanedInterests.length > 0) {
      const attemptSingle: Record<string, any> = { ...fields, "Coverage Interest": cleanedInterests[0] };
      try {
        await base(tableName).create([{ fields: attemptSingle }]);
        return;
      } catch (_) {
        // ignore and fall through to final fallback
      }
      const attemptMulti: Record<string, any> = { ...fields, "Coverage Interest": cleanedInterests };
      try {
        await base(tableName).create([{ fields: attemptMulti }]);
        return;
      } catch (_) {
        // fall through
      }
    }

    // Final fallback: write interests into Message and omit the field
    const fallbackFields: Record<string, any> = {
      ...fields,
      Message: `${fields.Message ? fields.Message + "\n" : ""}Interests: ${cleanedInterests.join(", ")}`,
    };
    delete fallbackFields["Coverage Interest"];
    await base(tableName).create([{ fields: fallbackFields }]);
  }
}


