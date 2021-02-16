import { PrismaClient, Role as ROLES } from "@prisma/client";

const db = new PrismaClient();

export { db, ROLES };
