import { User } from ".prisma/client";
import { db } from "../prisma";

const isValidUserID = async (userId: User["id"]) => {
  const user = await db.user.findUnique({ where: { id: Number(userId) } });
  if (!user) {
    throw new Error("User does not exist");
  }

  return true;
};

export default {isValidUserID};