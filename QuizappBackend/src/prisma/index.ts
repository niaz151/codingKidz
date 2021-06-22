import { PrismaClient, Role as ROLES } from "@prisma/client";

// https://www.prisma.io/docs/concepts/components/prisma-client#3-use-prisma-client-to-send-queries-to-your-database
const db = new PrismaClient();

export { db, ROLES };
