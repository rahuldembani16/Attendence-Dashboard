import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Public paths
    if (
        pathname === "/login" ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api/auth") ||
        pathname === "/favicon.ico"
    ) {
        return NextResponse.next();
    }

    const sessionCookie = request.cookies.get("session");

    // Redirect to login if no session
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_please_change");
        const { payload } = await jwtVerify(sessionCookie.value, secret);
        const session = payload as any;

        // Admin protection
        if (pathname.startsWith("/admin")) {
            if (!session.isAdmin) {
                // Redirect non-admins to dashboard
                return NextResponse.redirect(new URL("/", request.url));
            }
        }

        // Prevent logged-in users from accessing login page (already handled by logic above since /login is public, 
        // but if they visit it manually, we might want to redirect them away? 
        // Usually middleware handles protected routes, logic for redirecting logged-in users away from /login is often done in the page or here if matched)

    } catch (e) {
        // Invalid session
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
