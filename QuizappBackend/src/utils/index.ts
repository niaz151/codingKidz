const enum ROLES {
  Student,
  Teacher,
  Admin,
}

const JWT_SECRET = process.env.JWT_SECRET || "TOP_SECRET";

const PORT = process.env.PORT;

const MONGO_URI = process.env.MONGO_URI || "";

export { ROLES, JWT_SECRET, PORT, MONGO_URI };
