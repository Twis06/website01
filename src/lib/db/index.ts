import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

// Initialize database
const sqlite = new Database("sqlite.db", { verbose: console.log });

// Enable foreign keys
sqlite.pragma("foreign_keys = ON");

// Test the connection
try {
  sqlite.prepare("SELECT 1").get();
  console.log("Database connection successful");
} catch (error) {
  console.error("Database connection failed:", error);
  throw error;
}

// Initialize drizzle
export const db = drizzle(sqlite, { schema });

// Run migrations
try {
  migrate(db, { migrationsFolder: "drizzle" });
  console.log("Database migrations completed");
} catch (error) {
  console.error("Database migration failed:", error);
  throw error;
} 