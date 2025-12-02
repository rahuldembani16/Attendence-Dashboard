import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { label: "asc" },
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { code, label, color, isWorkDay } = body;

        const category = await prisma.category.create({
            data: {
                code,
                label,
                color,
                isWorkDay,
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await prisma.category.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error deleting category:", error);
        if (error.code === 'P2003') {
            return NextResponse.json(
                { error: "Cannot delete this category because it is currently assigned to attendance records." },
                { status: 409 } // Conflict
            );
        }
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
