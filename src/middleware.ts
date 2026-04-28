import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Pass the pathname through to server components so the root layout can
  // skip the public chrome (Header/Footer/etc.) on /admin routes.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", path);

  // Auth-gate /admin (everything except /admin/login).
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const session = await verifyAdminToken(
      request.cookies.get(ADMIN_COOKIE_NAME)?.value,
    );
    if (!session) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/admin/login";
      redirect.searchParams.set("next", path);
      return NextResponse.redirect(redirect);
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Run on every route except Next.js internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|media/).*)"],
};
