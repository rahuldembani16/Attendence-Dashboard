import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, isActive } = body;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const category = await prisma.category.update({
            where: { id },
            data: { isActive },
        });

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
    }
}
