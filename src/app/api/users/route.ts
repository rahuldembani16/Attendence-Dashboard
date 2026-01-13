import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            include: { department: true },
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { am, surname, name, departmentId, startDate, endDate, username, password, isAdmin } = body;

        if (!am) {
            return NextResponse.json({ error: "Employee ID (AM) is required." }, { status: 400 });
        }

        const nextId = am;

        // Check if provided AM exists
        const existingAm = await prisma.user.findUnique({
            where: { am: nextId },
        });
        if (existingAm) {
            return NextResponse.json({ error: "Employee ID (AM) already exists." }, { status: 400 });
        }

        // Generate default username if not provided: first letter of name + surname
        const baseUsername = username || `${name.charAt(0).toLowerCase()}${surname.toLowerCase()}`.replace(/\s+/g, '');
        const finalUsername = baseUsername;

        // Check for existing user with this username
        const existingUser = await prisma.user.findUnique({
            where: { username: finalUsername },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Username already exists." }, { status: 400 });
        }

        const user = await prisma.user.create({
            data: {
                am: nextId,
                surname,
                name,
                departmentId,
                startDate: startDate ? new Date(startDate) : new Date(),
                endDate: endDate ? new Date(endDate) : null,
                username: finalUsername,
                password: await bcrypt.hash(password || "password123", 10), // Default password hashed
                isAdmin: isAdmin || false,
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        console.error("Failed to create user:", error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await prisma.user.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, am, surname, name, departmentId, startDate, endDate, username, password, isAdmin } = body;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const user = await prisma.user.update({
            where: { id },
            data: {
                am,
                surname,
                name,
                departmentId,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : null,
                username,
                password: password ? await bcrypt.hash(password, 10) : undefined,
                isAdmin,
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}
