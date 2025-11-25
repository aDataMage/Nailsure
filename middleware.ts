import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
    const isLoginPath = request.nextUrl.pathname === "/admin/login";

    if (isAdminPath && !isLoginPath) {
        const hasAccess = request.cookies.has("admin_access");

        if (!hasAccess) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/admin/:path*",
};
