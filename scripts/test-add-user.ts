import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Testing add user...");

    // Get a department first
    const dept = await prisma.department.findFirst();
    if (!dept) {
        console.error("No department found. Run seed first.");
        return;
    }

    try {
        const user = await prisma.user.create({
            data: {
                am: "9999",
                surname: "Test",
                name: "User",
                username: "testuser",
                password: "password123",
                departmentId: dept.id,
                startDate: new Date(),
            }
        });
        console.log("User created successfully:", user);

        // Clean up
        await prisma.user.delete({ where: { id: user.id } });
        console.log("Test user deleted.");
    } catch (e) {
        console.error("Failed to create user:", e);
    }
}

main()
    .finally(async () => await prisma.$disconnect());
