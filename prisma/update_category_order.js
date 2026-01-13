const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const updates = [
        { code: 'OS', order: 1 },
        { code: 'T', order: 2 },
        { code: 'BT', order: 3 },
        { code: 'OOO', order: 4 },
    ];

    console.log('Updating category display orders...');

    for (const update of updates) {
        try {
            const category = await prisma.category.findUnique({
                where: { code: update.code },
            });

            if (category) {
                await prisma.category.update({
                    where: { id: category.id },
                    data: { displayOrder: update.order },
                });
                console.log(`Updated ${update.code} to order ${update.order}`);
            } else {
                console.log(`Category ${update.code} not found, skipping.`);
            }
        } catch (e) {
            console.error(`Error updating ${update.code}:`, e);
        }
    }

    console.log('Update complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
