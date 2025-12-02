import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const holidays = await prisma.holiday.findMany({
            orderBy: { date: "asc" },
        });
        return NextResponse.json(holidays);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch holidays" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { date, description, isRecurring } = body;

        const holiday = await prisma.holiday.create({
            data: {
                date: new Date(date),
                description,
                isRecurring,
            },
        });
        return NextResponse.json(holiday);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create holiday" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await prisma.holiday.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete holiday" }, { status: 500 });
    }
}
