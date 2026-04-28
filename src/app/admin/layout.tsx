import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";
import { signOut } from "./actions";
import { Sidebar } from "./_components/Sidebar";

export const metadata = { title: "Admin · Panchratna" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await verifyAdminToken(cookies().get(ADMIN_COOKIE_NAME)?.value);

  // /admin/login renders bare (middleware lets it through unauthenticated).
  if (!session) return <>{children}</>;

  const signOutButton = (
    <form action={signOut}>
      <button
        type="submit"
        className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
      >
        Sign out
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <Sidebar username={session.username} signOutAction={signOutButton} />
      <div className="md:pl-64">
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
