const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Starting password migration...');

    try {
        const users = await prisma.user.findMany();
        console.log(`Found ${users.length} users.`);

        for (const user of users) {
            // Check if password seems to be already hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
            if (user.password.startsWith('$2') && user.password.length === 60) {
                console.log(`User ${user.username} already has a hashed password. Skipping.`);
                continue;
            }

            console.log(`Hashing password for user: ${user.username}`);
            const hashedPassword = await bcrypt.hash(user.password, 10);

            await prisma.user.update({
                where: { id: user.id },
                data: { password: hashedPassword },
            });
        }

        console.log('Password migration completed successfully.');
    } catch (error) {
        console.error('Error during password migration:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
