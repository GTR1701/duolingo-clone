import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    try{
        console.log("Seeding the database");

        await prisma.userProgress.deleteMany({});
        await prisma.courses.deleteMany({});

        console.log("Database seeded successfully");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
}

main()