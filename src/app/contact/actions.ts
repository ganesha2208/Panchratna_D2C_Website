"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { notifyNewLead } from "@/lib/notify";

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; error: string };

type Input = {
  name: string;
  phone?: string;
  email?: string;
  city?: string;
  message?: string;
};

export async function submitContactLead(input: Input): Promise<ContactSubmitResult> {
  const name = input.name?.trim();
  if (!name) return { ok: false, error: "Please enter your name." };
  if (name.length > 200) return { ok: false, error: "Name is too long." };

  const phone = input.phone?.trim() || null;
  const email = input.email?.trim() || null;
  const city = input.city?.trim() || null;
  const message = input.message?.trim() || null;

  if (!phone && !email) {
    return { ok: false, error: "Please share a phone number or email so we can reply." };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_leads").insert({
      name,
      phone,
      email,
      city,
      message,
    });
    if (error) {
      console.error("[contact] insert failed", error);
      return { ok: false, error: "Something went wrong. Please WhatsApp us instead." };
    }

    await notifyNewLead({ name, phone, email, city, message });

    return { ok: true };
  } catch (err) {
    console.error("[contact] unexpected", err);
    return { ok: false, error: "Server is not configured yet. Please WhatsApp us." };
  }
}
