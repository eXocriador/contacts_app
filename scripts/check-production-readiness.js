#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

/**
 * Check production readiness of the project
 */
function checkProductionReadiness() {
  console.log("🔍 Checking production readiness...\n");

  const checks = [
    {
      name: "Environment Variables",
      check: () => {
        const backendEnv = fs.existsSync(
          path.join(__dirname, "../backend/.env")
        );
        const frontendEnv = fs.existsSync(
          path.join(__dirname, "../frontend/.env")
        );
        return backendEnv && frontendEnv;
      },
      message: "Environment files (.env) should be created from env.example"
    },
    {
      name: "Docker Files",
      check: () => {
        const backendDockerfile = fs.existsSync(
          path.join(__dirname, "../backend/Dockerfile")
        );
        const frontendDockerfile = fs.existsSync(
          path.join(__dirname, "../frontend/Dockerfile")
        );
        const dockerCompose = fs.existsSync(
          path.join(__dirname, "../docker-compose.yml")
        );
        return backendDockerfile && frontendDockerfile && dockerCompose;
      },
      message: "Docker configuration files should be present"
    },
    {
      name: "Security Headers",
      check: () => {
        const securityFile = fs.existsSync(
          path.join(__dirname, "../backend/src/middlewares/security.ts")
        );
        return securityFile;
      },
      message: "Security middleware should be configured"
    },
    {
      name: "API Documentation",
      check: () => {
        const docsDir = fs.existsSync(path.join(__dirname, "../backend/docs"));
        return docsDir;
      },
      message: "API documentation should be generated"
    },
    {
      name: "TypeScript Configuration",
      check: () => {
        const backendTsConfig = fs.existsSync(
          path.join(__dirname, "../backend/tsconfig.json")
        );
        const frontendTsConfig = fs.existsSync(
          path.join(__dirname, "../frontend/tsconfig.json")
        );
        return backendTsConfig && frontendTsConfig;
      },
      message: "TypeScript configuration should be present"
    },
    {
      name: "Package.json Scripts",
      check: () => {
        const backendPackage = JSON.parse(
          fs.readFileSync(path.join(__dirname, "../backend/package.json"))
        );
        const frontendPackage = JSON.parse(
          fs.readFileSync(path.join(__dirname, "../frontend/package.json"))
        );

        const backendHasBuild =
          backendPackage.scripts && backendPackage.scripts.build;
        const frontendHasBuild =
          frontendPackage.scripts && frontendPackage.scripts.build;

        return backendHasBuild && frontendHasBuild;
      },
      message: "Build scripts should be configured in package.json"
    },
    {
      name: "GitHub Actions",
      check: () => {
        const actionsDir = fs.existsSync(
          path.join(__dirname, "../.github/workflows")
        );
        return actionsDir;
      },
      message: "CI/CD pipeline should be configured"
    },
    {
      name: "README Documentation",
      check: () => {
        const readme = fs.existsSync(path.join(__dirname, "../README.md"));
        return readme;
      },
      message: "README.md should be present with deployment instructions"
    }
  ];

  let passedChecks = 0;
  let totalChecks = checks.length;

  console.log("📋 Production Readiness Checklist:\n");

  checks.forEach((check, index) => {
    const passed = check.check();
    const status = passed ? "✅" : "❌";

    console.log(`${index + 1}. ${status} ${check.name}`);
    if (!passed) {
      console.log(`   ⚠️  ${check.message}`);
    }

    if (passed) passedChecks++;
  });

  console.log("\n" + "=".repeat(50));
  console.log(`📊 Results: ${passedChecks}/${totalChecks} checks passed`);

  if (passedChecks === totalChecks) {
    console.log("🎉 All checks passed! Your project is ready for production.");
  } else {
    console.log(
      "⚠️  Some checks failed. Please address the issues above before deploying."
    );
  }

  console.log("\n🔧 Next steps:");
  console.log("1. Set up environment variables");
  console.log("2. Configure your database");
  console.log("3. Set up SSL certificates");
  console.log("4. Configure monitoring and logging");
  console.log("5. Set up backup strategies");
  console.log("6. Test the deployment process");
}

// Run if called directly
if (require.main === module) {
  checkProductionReadiness();
}

module.exports = { checkProductionReadiness };
