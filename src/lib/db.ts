import { PrismaClient } from "@prisma/client";

/** True when a database is configured. When false the app serves seed data. */
export const dbEnabled = Boolean(process.env.DATABASE_URL);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/** Lazily-created singleton Prisma client (only used when dbEnabled). */
export const prisma =
  globalForPrisma.prisma ??
  (dbEnabled
    ? new PrismaClient({ log: ["error", "warn"] })
    : (undefined as unknown as PrismaClient));

if (process.env.NODE_ENV !== "production" && dbEnabled) {
  globalForPrisma.prisma = prisma;
}
