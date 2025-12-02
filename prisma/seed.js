const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create Categories
    const onSite = await prisma.category.create({
        data: {
            code: 'OS',
            label: 'On Site',
            color: 'bg-green-100 text-green-800 border-green-200',
            isWorkDay: true,
        },
    });

    const teleworking = await prisma.category.create({
        data: {
            code: 'T',
            label: 'Teleworking',
            color: 'bg-blue-100 text-blue-800 border-blue-200',
            isWorkDay: true,
        },
    });

    const outOfOffice = await prisma.category.create({
        data: {
            code: 'OOO',
            label: 'Out of Office',
            color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            isWorkDay: false,
        },
    });

    const businessTrip = await prisma.category.create({
        data: {
            code: 'BT',
            label: 'Business Trip',
            color: 'bg-purple-100 text-purple-800 border-purple-200',
            isWorkDay: true,
        },
    });

    // Create Departments
    const rd = await prisma.department.create({ data: { name: 'R&D' } });
    const hr = await prisma.department.create({ data: { name: 'HR' } });
    const sales = await prisma.department.create({ data: { name: 'Sales' } });
    const marketing = await prisma.department.create({ data: { name: 'Marketing' } });

    // Create Users
    await prisma.user.create({
        data: {
            am: '8818',
            surname: 'Dembani',
            name: 'Rachid',
            departmentId: rd.id,
        },
    });

    await prisma.user.create({
        data: {
            am: '1001',
            surname: 'Doe',
            name: 'John',
            departmentId: sales.id,
        },
    });

    console.log('Seed data created successfully');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
