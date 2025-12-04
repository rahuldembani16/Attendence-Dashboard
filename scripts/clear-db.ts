import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Clearing entire database...");

    // Delete in order to respect foreign key constraints
    console.log("Deleting Attendance records...");
    await prisma.attendance.deleteMany();

    console.log("Deleting Users...");
    await prisma.user.deleteMany();

    console.log("Deleting Departments...");
    await prisma.department.deleteMany();

    console.log("Deleting Categories...");
    await prisma.category.deleteMany();

    console.log("Deleting Holidays...");
    await prisma.holiday.deleteMany();

    console.log("Database cleared successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
