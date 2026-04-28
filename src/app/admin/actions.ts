"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_OPTIONS,
  adminCredentials,
  createAdminToken,
} from "@/lib/admin-auth";

export type SignInResult = { ok: false; error: string };

export async function signIn(
  _: SignInResult | null,
  formData: FormData,
): Promise<SignInResult> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!username || !password) {
    return { ok: false, error: "Enter username and password." };
  }

  const expected = adminCredentials();
  if (username !== expected.username || password !== expected.password) {
    return { ok: false, error: "Invalid username or password." };
  }

  const token = await createAdminToken(username);
  cookies().set(ADMIN_COOKIE_NAME, token, ADMIN_COOKIE_OPTIONS);

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function signOut() {
  cookies().delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}
