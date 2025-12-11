const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Resetting password for rdembani...');

    try {
        const hashedPassword = await bcrypt.hash('password123', 10);

        await prisma.user.update({
            where: { username: 'rdembani' },
            data: { password: hashedPassword },
        });

        console.log('Password for rdembani reset to password123');
    } catch (error) {
        console.error('Error resetting password:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
