import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "../src/lib/db";

// This will automatically run needed migrations on the database
migrate(db, { migrationsFolder: "drizzle" });

console.log("Database initialized successfully"); 