import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user || user.password !== password) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const cookieStore = await cookies();
        const sessionData = JSON.stringify({
            userId: user.id,
            isAdmin: user.isAdmin,
            name: user.name,
            surname: user.surname
        });

        // Set session cookie
        cookieStore.set("session", sessionData, {
            httpOnly: true,
            secure: false, // process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return NextResponse.json({ success: true, user: { isAdmin: user.isAdmin, name: user.name } });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
