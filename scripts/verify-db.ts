import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const userCount = await prisma.user.count();
    const attendanceCount = await prisma.attendance.count();
    const categoryCount = await prisma.category.count();
    const departmentCount = await prisma.department.count();

    console.log(`Users: ${userCount}`);
    console.log(`Attendance: ${attendanceCount}`);
    console.log(`Categories: ${categoryCount}`);
    console.log(`Departments: ${departmentCount}`);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
