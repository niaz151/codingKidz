const enum ROLES {
  Student = "STUDENT",
  Teacher = "TEACHER",
  Admin = "ADMIN",
}

const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET || "ACCESS_TOP_SECRET";
const REFRESH_JWT_SECRET =
  process.env.REFRESH_JWT_SECRET || "REFRESH_TOP_SECRET";

const PORT = process.env.PORT;

const MONGO_URI = process.env.MONGO_URI || "";

export { ROLES, ACCESS_JWT_SECRET, REFRESH_JWT_SECRET, PORT, MONGO_URI };
