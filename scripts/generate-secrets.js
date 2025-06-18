#!/usr/bin/env node

const crypto = require("crypto");

/**
 * Generate secure random secrets for production
 */
function generateSecrets() {
  console.log("🔐 Generating secure secrets for production...\n");

  const secrets = {
    JWT_SECRET: crypto.randomBytes(64).toString("hex"),
    JWT_REFRESH_SECRET: crypto.randomBytes(64).toString("hex"),
    SESSION_SECRET: crypto.randomBytes(32).toString("hex")
  };

  console.log("📋 Copy these secrets to your .env file:\n");
  console.log("=".repeat(60));

  Object.entries(secrets).forEach(([key, value]) => {
    console.log(`${key}=${value}`);
  });

  console.log("=".repeat(60));
  console.log("\n⚠️  Important security notes:");
  console.log(
    "• Keep these secrets secure and never commit them to version control"
  );
  console.log(
    "• Use different secrets for each environment (dev, staging, prod)"
  );
  console.log("• Rotate secrets regularly in production");
  console.log(
    "• Store secrets in environment variables or secret management systems"
  );
  console.log("\n✅ Secrets generated successfully!");
}

// Run if called directly
if (require.main === module) {
  generateSecrets();
}

module.exports = { generateSecrets };
