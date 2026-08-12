import bcrypt from "bcryptjs";

/**
 * Generates a bcrypt hash for a new admin password.
 * Run with: npm run hash-password -- "YourNewPassword"
 * Paste the output into ADMIN_PASSWORD_HASH in .env.local / Vercel env vars.
 */
const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash-password -- "YourNewPassword"');
  process.exit(1);
}

if (password.length < 8) {
  console.error("Choose a password with at least 8 characters.");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("\nADMIN_PASSWORD_HASH=" + hash + "\n");
