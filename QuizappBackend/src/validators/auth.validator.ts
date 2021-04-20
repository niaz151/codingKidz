import { Role } from "@prisma/client";

const isValidRole = async (role: Role) => {
  return Object.values(Role).indexOf(role) !== -1;
};

export default {isValidRole};