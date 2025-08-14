import { createLead as createAirtableLead } from "./airtable";

export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  zip: string;
  interests: string[];
  message?: string;
  source?: string;
};

export async function createLead(input: LeadInput) {
  await createAirtableLead(input);
}




