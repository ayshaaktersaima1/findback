import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

interface SessionUserRole {
    role?: string;
}

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    const pathname = request.nextUrl.pathname;

    if (!session) {
        return NextResponse.redirect(
            new URL("/login", request.url),
        );
    }

    const user = session.user as
        typeof session.user & SessionUserRole;

    const role =
        user.role?.toLowerCase() === "admin"
            ? "admin"
            : "user";

    if (
        pathname.startsWith("/dashboard/user") &&
        role !== "user"
    ) {
        return NextResponse.redirect(
            new URL("/dashboard/admin", request.url),
        );
    }

    if (
        pathname.startsWith("/dashboard/admin") &&
        role !== "admin"
    ) {
        return NextResponse.redirect(
            new URL("/dashboard/user", request.url),
        );
    }

    if (pathname === "/dashboard") {
        return NextResponse.redirect(
            new URL(`/dashboard/${role}`, request.url),
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};