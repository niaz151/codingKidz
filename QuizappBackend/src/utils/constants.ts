const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET || "ACCESS_TOP_SECRET";
const REFRESH_JWT_SECRET =
  process.env.REFRESH_JWT_SECRET || "REFRESH_TOP_SECRET";

export const ACCESS_EXPIRATION_TIME = "30m";
export const REFRESH_EXPIRATION_TIME = "7d";

const PORT = process.env.PORT;

const DB_URI = process.env.DB_URI || "";

export { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET, PORT, DB_URI };
