import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Lock } from "lucide-react";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Admin sign in · Panchratna" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const session = await verifyAdminToken(cookies().get(ADMIN_COOKIE_NAME)?.value);
  if (session) redirect(searchParams.next ?? "/admin");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(85,161,37,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(249,115,22,0.10),transparent_50%)]"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-soft ring-1 ring-brand-700/10">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight text-gray-900">
            Panchratna admin
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to manage orders and leads.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
          <LoginForm next={searchParams.next} />
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Secured area · authorized staff only
        </p>
      </div>
    </div>
  );
}
