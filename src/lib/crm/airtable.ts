import Airtable from "airtable";
import type { LeadInput } from "./index";

function getClient(): Airtable.Base {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  const baseId = process.env.AIRTABLE_BASE_ID as string;
  if (!apiKey || !baseId) {
    throw new Error("Missing Airtable credentials");
  }
  Airtable.configure({ apiKey });
  return Airtable.base(baseId);
}

export async function createLead(input: LeadInput): Promise<void> {
  const base = getClient();
  const tableName = process.env.AIRTABLE_LEADS_TABLE_NAME || "Leads";
  const cleanedInterests = (input.interests || []).map((s) => s.trim()).filter((s) => s.length > 0);
  const fields: Record<string, string> = {
    Name: input.name,
    Email: input.email,
    Phone: input.phone,
    Zip: input.zip,
    // First attempt: write as text (works with single line text columns and is visually clear)
    "Coverage Interest": cleanedInterests.join(", "),
    Message: input.message || "",
    Source: "Website Form",
    Timestamp: new Date().toISOString(),
  };
  try {
    await base(tableName).create([{ fields }]);
  } catch (e) {
    const err = e as { statusCode?: number; error?: string; message?: string };
    const code = err?.statusCode;
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
      const attemptSingle: Record<string, string> = { ...fields, "Coverage Interest": cleanedInterests[0] };
      try {
        await base(tableName).create([{ fields: attemptSingle }]);
        return;
      } catch (fallbackError) {
        // ignore and fall through to final fallback
        console.warn("Single select attempt failed:", fallbackError);
      }
      const attemptMulti: Record<string, string> = { ...fields, "Coverage Interest": cleanedInterests.join(", ") };
      try {
        await base(tableName).create([{ fields: attemptMulti }]);
        return;
      } catch (fallbackError) {
        // fall through
        console.warn("Multi select attempt failed:", fallbackError);
      }
    }

    // Final fallback: write interests into Message and omit the field
    const fallbackFields: Record<string, string> = {
      ...fields,
      Message: `${fields.Message ? fields.Message + "\n" : ""}Interests: ${cleanedInterests.join(", ")}`,
    };
    delete fallbackFields["Coverage Interest"];
    await base(tableName).create([{ fields: fallbackFields }]);
  }
}


