import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    // Also delete old admin cookie if it exists
    cookieStore.delete("admin_session");
    return NextResponse.json({ success: true });
}
