import { PrismaClient } from "@prisma/client";

declare global {
    // Allow global 'prisma' in development to avoid multiple instances.
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma; 