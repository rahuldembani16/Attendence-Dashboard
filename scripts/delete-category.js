const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const categories = await prisma.category.findMany();
    console.log("All Categories:", categories);

    try {
        // First find the category to get its ID
        const category = await prisma.category.findUnique({
            where: { code: "TS" }
        });

        if (category) {
            // Delete attendance records using this category
            const deletedAttendance = await prisma.attendance.deleteMany({
                where: { categoryId: category.id }
            });
            console.log("Deleted Attendance Records:", deletedAttendance);

            // Then delete the category
            const deletedCategory = await prisma.category.delete({
                where: { code: "TS" },
            });
            console.log("Deleted Category:", deletedCategory);
        } else {
            console.log("Category TS not found");
        }

    } catch (e) {
        console.error("Error deleting category:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
