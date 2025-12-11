import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { surname: "asc" },
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
        const { surname, name, departmentId, startDate, endDate, username, password, isAdmin } = body;

        // Find the highest current AM (ID)
        const users = await prisma.user.findMany({
            select: { am: true },
        });

        let maxId = 0;
        users.forEach((user) => {
            const num = parseInt(user.am, 10);
            if (!isNaN(num) && num > maxId) {
                maxId = num;
            }
        });

        const nextId = (maxId + 1).toString();

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
