import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const date = searchParams.get("date");
        const month = searchParams.get("month"); // YYYY-MM

        if (userId && date) {
            const record = await prisma.attendance.findUnique({
                where: {
                    userId_date: {
                        userId,
                        date: new Date(date),
                    },
                },
                include: { category: true },
            });
            return NextResponse.json(record);
        }

        if (month) {
            const [year, monthNum] = month.split("-").map(Number);
            const startDate = new Date(year, monthNum - 1, 1);
            const endDate = new Date(year, monthNum, 0);

            const records = await prisma.attendance.findMany({
                where: {
                    date: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
                include: { category: true },
            });
            return NextResponse.json(records);
        }

        const records = await prisma.attendance.findMany({
            include: { category: true },
        });
        return NextResponse.json(records);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch attendance" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, date, categoryId, notes } = body;

        const record = await prisma.attendance.upsert({
            where: {
                userId_date: {
                    userId,
                    date: new Date(date),
                },
            },
            update: {
                categoryId,
                notes,
            },
            create: {
                userId,
                date: new Date(date),
                categoryId,
                notes,
            },
            include: { category: true },
        });
        return NextResponse.json(record);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update attendance" }, { status: 500 });
    }
}
