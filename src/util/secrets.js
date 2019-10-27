import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  console.log("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  console.error("No .env file found!");
}

export const ENVIRONMENT = process.env.NODE_ENV || "dev"; // Default to dev

export const DB_URI = process.env.DATABASE_URL || "";
if (!DB_URI) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}