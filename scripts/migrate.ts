import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

/**
 * Applies every migration in ./drizzle to the database at DATABASE_URL.
 * Run with: npm run db:migrate
 * (generate new migration files first with: npm run db:generate)
 */
async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local before running migrations.");
  }

  const needsSsl = !/localhost|127\.0\.0\.1/.test(connectionString);
  const client = postgres(connectionString, { max: 1, ssl: needsSsl ? "require" : false });
  const db = drizzle(client);

  console.log("Running migrations...");
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migrations complete.");

  await client.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
